// Sai Ranga Shores: dependency-free Node server.
//   • POST /api/contact   validates and stores an enquiry (data/enquiries.json), optional webhook
//   • GET  /api/health    liveness check
//   • serves the built React app from ../client/dist in production
import http from 'node:http';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = process.env.DIST_DIR ? path.resolve(process.env.DIST_DIR) : path.resolve(__dirname, '../client/dist');
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'enquiries.json');

// tiny .env loader (no dotenv needed)
try {
  for (const line of fs.readFileSync(path.join(__dirname, '.env'), 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && !line.trim().startsWith('#') && process.env[m[1]] === undefined) process.env[m[1]] = m[2];
  }
} catch { /* no .env, fine */ }

const PORT = Number(process.env.PORT) || 4000;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || '';
const WEBHOOK = process.env.NOTIFY_WEBHOOK_URL || '';

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png',
  '.mp4': 'video/mp4', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.txt': 'text/plain',
  '.xml': 'application/xml; charset=utf-8',
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^[+\d][\d\s-]{7,16}$/;
const clean = (s, max) => String(s ?? '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max);

export function validate(body) {
  const v = {
    name: clean(body.name, 80),
    email: clean(body.email, 120),
    phone: clean(body.phone, 20),
    checkin: clean(body.checkin, 10),
    message: clean(body.message, 2000),
  };
  const fields = {};
  if (v.name.length < 2) fields.name = 'Please enter your name.';
  if (!EMAIL.test(v.email)) fields.email = 'Enter a valid email address.';
  if (!PHONE.test(v.phone)) fields.phone = 'Enter a valid phone number.';
  if (v.checkin && !/^\d{4}-\d{2}-\d{2}$/.test(v.checkin)) fields.checkin = 'Enter a valid date.';
  if (v.message.length < 5) fields.message = 'Tell us a little about your stay.';
  return { v, fields };
}

// very small in-memory rate limit: 5 enquiries / 10 min / IP
const hits = new Map();
function limited(ip) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < 600_000);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > 5;
}

function send(res, status, obj, extra = {}) {
  const body = JSON.stringify(obj);
  res.writeHead(status, { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body), ...extra });
  res.end(body);
}

function readJson(req, limit = 20_000) {
  return new Promise((resolve, reject) => {
    let size = 0; const chunks = [];
    req.on('data', (c) => { size += c.length; if (size > limit) { reject(Object.assign(new Error('Payload too large'), { status: 413 })); req.destroy(); } else chunks.push(c); });
    req.on('end', () => { try { resolve(JSON.parse(Buffer.concat(chunks).toString() || '{}')); } catch { reject(Object.assign(new Error('Invalid JSON'), { status: 400 })); } });
    req.on('error', reject);
  });
}

let writeChain = Promise.resolve();
async function saveEnquiry(entry) {
  writeChain = writeChain.then(async () => {
    await fsp.mkdir(DATA_DIR, { recursive: true });
    let list = [];
    try { list = JSON.parse(await fsp.readFile(DATA_FILE, 'utf8')); } catch { /* new file */ }
    list.push(entry);
    await fsp.writeFile(DATA_FILE, JSON.stringify(list, null, 2));
  });
  return writeChain;
}

async function handleApi(req, res, url) {
  const cors = ALLOWED_ORIGIN ? { 'Access-Control-Allow-Origin': ALLOWED_ORIGIN, Vary: 'Origin' } : {};
  if (req.method === 'OPTIONS') {
    res.writeHead(204, { ...cors, 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' });
    return res.end();
  }
  if (url.pathname === '/api/health' && req.method === 'GET') return send(res, 200, { ok: true }, cors);

  if (url.pathname === '/api/contact' && req.method === 'POST') {
    const ip = req.socket.remoteAddress || 'unknown';
    if (limited(ip)) return send(res, 429, { error: 'Too many messages. Please try again in a few minutes.' }, cors);
    let body;
    try { body = await readJson(req); } catch (e) { return send(res, e.status || 400, { error: e.message }, cors); }
    if (clean(body.website, 50)) return send(res, 200, { ok: true }, cors); // honeypot: pretend success
    const { v, fields } = validate(body);
    if (Object.keys(fields).length) return send(res, 422, { error: 'Please check the highlighted fields.', fields }, cors);
    const entry = { id: Date.now().toString(36), receivedAt: new Date().toISOString(), ...v };
    try { await saveEnquiry(entry); } catch (e) { console.error('save failed', e); return send(res, 500, { error: 'Could not save your message. Please try WhatsApp.' }, cors); }
    if (WEBHOOK) fetch(WEBHOOK, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(entry) }).catch((e) => console.error('webhook failed', e.message));
    console.log(`New enquiry from ${v.name} (${v.phone})`);
    return send(res, 201, { ok: true, id: entry.id }, cors);
  }
  return send(res, 404, { error: 'Not found' }, cors);
}

async function serveStatic(req, res, url) {
  let rel = decodeURIComponent(url.pathname);
  let file = path.normalize(path.join(DIST, rel));
  if (!file.startsWith(DIST)) { res.writeHead(403); return res.end(); }
  try {
    const st = await fsp.stat(file);
    if (st.isDirectory()) file = path.join(file, 'index.html');
  } catch {
    // SPA fallback so React Router can handle /stay, /gallery, ...
    if (path.extname(rel)) { res.writeHead(404); return res.end('Not found'); }
    file = path.join(DIST, 'index.html');
  }
  try {
    const ext = path.extname(file);
    // Byte-range support: Safari/iOS will not play <video> without it.
    if (ext === '.mp4') {
      const { size } = await fsp.stat(file);
      const range = /bytes=(\d*)-(\d*)/.exec(req.headers.range || '');
      const headers = { 'Content-Type': MIME[ext], 'Accept-Ranges': 'bytes', 'Cache-Control': 'public, max-age=31536000, immutable' };
      if (range) {
        const start = range[1] ? parseInt(range[1], 10) : 0;
        const end = range[2] ? Math.min(parseInt(range[2], 10), size - 1) : size - 1;
        if (start > end || start >= size) { res.writeHead(416, { 'Content-Range': `bytes */${size}` }); return res.end(); }
        res.writeHead(206, { ...headers, 'Content-Range': `bytes ${start}-${end}/${size}`, 'Content-Length': end - start + 1 });
        return fs.createReadStream(file, { start, end }).pipe(res);
      }
      res.writeHead(200, { ...headers, 'Content-Length': size });
      return fs.createReadStream(file).pipe(res);
    }
    const data = await fsp.readFile(file);
    const immutable = /\/assets\/|\/img\/|\/video\//.test(file);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream', 'Cache-Control': immutable ? 'public, max-age=31536000, immutable' : 'no-cache' });
    res.end(data);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Build the client first: cd client && npm run build');
  }
}

export const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    if (url.pathname.startsWith('/api/')) return await handleApi(req, res, url);
    return await serveStatic(req, res, url);
  } catch (e) {
    console.error(e);
    if (!res.headersSent) send(res, 500, { error: 'Server error' });
  }
});

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  server.listen(PORT, () => console.log(`Sai Ranga Shores server on http://localhost:${PORT}`));
}
