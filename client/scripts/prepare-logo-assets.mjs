import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function main() {
  const inputPath = path.resolve('public/img/logo.jpeg');
  if (!fs.existsSync(inputPath)) {
    console.error('logo.jpeg not found in public/img/');
    return;
  }

  console.log('Reading logo.jpeg...');
  // 1. Trim outer white background with threshold
  const { data: rawTrimmed, info } = await sharp(inputPath)
    .trim({ threshold: 10 })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const w = info.width;
  const h = info.height;
  console.log(`Trimmed size: ${w}x${h}`);

  const isWhite = (x, y) => {
    const idx = (y * w + x) * 3;
    return rawTrimmed[idx] >= 238 && rawTrimmed[idx + 1] >= 238 && rawTrimmed[idx + 2] >= 238;
  };

  const visited = new Uint8Array(w * h);
  const isTransparent = new Uint8Array(w * h);

  // BFS flood-fill for all white areas
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = y * w + x;
      if (visited[idx] || !isWhite(x, y)) continue;

      const pixels = [];
      let touchesBorder = false;
      let minY = y, maxY = y, minX = x, maxX = x;

      const q = [x, y];
      visited[idx] = 1;
      let qHead = 0;
      while (qHead < q.length) {
        const cx = q[qHead++];
        const cy = q[qHead++];
        pixels.push(cx, cy);
        if (cx < minX) minX = cx;
        if (cx > maxX) maxX = cx;
        if (cy < minY) minY = cy;
        if (cy > maxY) maxY = cy;
        if (cx === 0 || cx === w - 1 || cy === 0 || cy === h - 1) touchesBorder = true;

        for (const [nx, ny] of [
          [cx + 1, cy],
          [cx - 1, cy],
          [cx, cy + 1],
          [cx, cy - 1]
        ]) {
          if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
            const nIdx = ny * w + nx;
            if (!visited[nIdx] && isWhite(nx, ny)) {
              visited[nIdx] = 1;
              q.push(nx, ny);
            }
          }
        }
      }

      // Outer background touches border, or inner loops of letters in text region (minY >= 630)
      const isLetterHole = !touchesBorder && minY >= 630;
      if (touchesBorder || isLetterHole) {
        for (let i = 0; i < pixels.length; i += 2) {
          isTransparent[pixels[i + 1] * w + pixels[i]] = 1;
        }
      }
    }
  }

  // RGBA buffer with smooth edge antialiasing
  const rgba = Buffer.alloc(w * h * 4);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 3;
      const oIdx = (y * w + x) * 4;
      const r = rawTrimmed[idx];
      const g = rawTrimmed[idx + 1];
      const b = rawTrimmed[idx + 2];
      const pIdx = y * w + x;

      rgba[oIdx] = r;
      rgba[oIdx + 1] = g;
      rgba[oIdx + 2] = b;

      if (isTransparent[pIdx]) {
        const minVal = Math.min(r, g, b);
        if (minVal >= 252) {
          rgba[oIdx + 3] = 0;
        } else if (minVal >= 238) {
          const factor = (252 - minVal) / (252 - 238);
          rgba[oIdx + 3] = Math.round(255 * factor);
        } else {
          rgba[oIdx + 3] = 255;
        }
      } else {
        rgba[oIdx + 3] = 255;
      }
    }
  }

  // Save transparent PNG and WebP full logos
  await sharp(rgba, { raw: { width: w, height: h, channels: 4 } })
    .png()
    .toFile('public/img/logo.png');
  await sharp(rgba, { raw: { width: w, height: h, channels: 4 } })
    .webp({ quality: 95 })
    .toFile('public/img/logo.webp');
  console.log('Created public/img/logo.png and logo.webp');

  // Extract Emblem (villa, palms, sun, waves) for favicon & mark
  let eMinX = w, eMaxX = 0, eMinY = h, eMaxY = 0;
  for (let y = 0; y <= Math.min(580, h - 1); y++) {
    for (let x = 0; x < w; x++) {
      const a = rgba[(y * w + x) * 4 + 3];
      if (a > 20) {
        if (x < eMinX) eMinX = x;
        if (x > eMaxX) eMaxX = x;
        if (y < eMinY) eMinY = y;
        if (y > eMaxY) eMaxY = y;
      }
    }
  }

  // Extract Zoomed Emblem (sun, villa, palms, waves) tightly filling the square
  // Center is x = (eMinX + eMaxX) / 2 = 582.5, height is 570 (from 0 to 570)
  const eh = eMaxY - eMinY;
  const sqSize = eh; // 570
  const cropLeft = Math.max(0, Math.round((eMinX + eMaxX) / 2 - sqSize / 2));

  const squareEmblem = await sharp(rgba, { raw: { width: w, height: h, channels: 4 } })
    .extract({ left: cropLeft, top: 0, width: sqSize, height: sqSize })
    .png()
    .toBuffer();

  // Save square logo-mark
  await sharp(squareEmblem).png().toFile('public/img/logo-mark.png');
  await sharp(squareEmblem).webp({ quality: 95 }).toFile('public/img/logo-mark.webp');

  // Favicons
  await sharp(squareEmblem).resize(16, 16).png().toFile('public/favicon-16x16.png');
  await sharp(squareEmblem).resize(32, 32).png().toFile('public/favicon-32x32.png');
  await sharp(squareEmblem).resize(48, 48).png().toFile('public/favicon.png');
  await sharp(squareEmblem).resize(180, 180).png().toFile('public/apple-touch-icon.png');
  await sharp(squareEmblem).resize(192, 192).png().toFile('public/android-chrome-192x192.png');
  await sharp(squareEmblem).resize(512, 512).png().toFile('public/android-chrome-512x512.png');

  // favicon.ico (32x32 PNG container works across all modern browsers)
  const icoBuf = await sharp(squareEmblem).resize(32, 32).png().toBuffer();
  fs.writeFileSync('public/favicon.ico', icoBuf);

  // favicon.svg with embedded high-res mark
  const b64 = (await sharp(squareEmblem).resize(256, 256).png().toBuffer()).toString('base64');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
  <image width="256" height="256" href="data:image/png;base64,${b64}" />
</svg>`;
  fs.writeFileSync('public/favicon.svg', svg);

  console.log('All favicon and logo assets generated successfully!');
}

main().catch(console.error);
