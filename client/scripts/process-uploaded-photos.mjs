import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import convert from 'heic-convert';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const imgDir = path.join(root, 'public/img');
const previewsDir = path.join(root, 'public/img/previews');
await fs.mkdir(previewsDir, { recursive: true });

// Read existing imageMeta.js
const metaPath = path.join(root, 'src/data/imageMeta.js');
let existingMeta = {};
try {
  const metaContent = await fs.readFile(metaPath, 'utf8');
  const match = metaContent.match(/export const IMAGES = ({[\s\S]*?});/);
  if (match) {
    existingMeta = JSON.parse(match[1]);
  }
} catch (e) {
  console.warn('Could not read existing meta', e);
}

const dirEntries = await fs.readdir(imgDir);
const targetFiles = dirEntries.filter(
  (f) =>
    /\.(heic|jpg|jpeg|png)$/i.test(f) &&
    !f.includes('-640') &&
    !f.includes('-1280') &&
    !f.includes('-1920')
);

console.log(`Processing ${targetFiles.length} photos...`);

function getSlug(filename) {
  const base = path.parse(filename).name;
  return base
    .toLowerCase()
    .replace(/\s*-\s*copy/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

const processedList = [];

for (const file of targetFiles) {
  const slug = getSlug(file);
  const srcPath = path.join(imgDir, file);
  console.log(`Converting ${file} -> ${slug}...`);

  try {
    let inputBuffer = await fs.readFile(srcPath);

    if (/\.heic$/i.test(file)) {
      try {
        inputBuffer = await convert({
          buffer: inputBuffer,
          format: 'JPEG',
          quality: 0.92,
        });
      } catch (heicErr) {
        // If file is already JPEG/PNG, sharp will decode it directly
      }
    }

    const s = sharp(inputBuffer).rotate();
    const meta = await s.metadata();
    const origW = meta.width || 1920;
    const origH = meta.height || 1080;

    const widths = [640, 1280];
    if (origW >= 1600) widths.push(1920);

    for (const w of widths) {
      const outPath = path.join(imgDir, `${slug}-${w}.webp`);
      await sharp(inputBuffer)
        .rotate()
        .resize({ width: w })
        .webp({ quality: 82 })
        .toFile(outPath);
    }

    // Save small preview jpeg
    await sharp(inputBuffer)
      .rotate()
      .resize({ width: 400 })
      .jpeg({ quality: 75 })
      .toFile(path.join(previewsDir, `${slug}.jpg`));

    existingMeta[slug] = {
      w: origW,
      h: origH,
      widths: widths,
    };

    processedList.push({
      slug,
      origFile: file,
      w: origW,
      h: origH,
      isPortrait: origH > origW,
    });
    console.log(`✓ Completed ${slug} (${origW}x${origH})`);
  } catch (err) {
    console.error(`✗ Failed converting ${file}:`, err.message);
  }
}

// Write back updated imageMeta.js
const updatedContent = `// Generated from the processed photos in /public/img\nexport const IMAGES = ${JSON.stringify(
  existingMeta,
  null,
  2
)};\n`;
await fs.writeFile(metaPath, updatedContent, 'utf8');

// Write metadata summary for categorization
await fs.writeFile(
  path.join(root, 'scripts/processed-summary.json'),
  JSON.stringify(processedList, null, 2),
  'utf8'
);

console.log(`\nAll done! Successfully processed ${processedList.length} photos.`);
