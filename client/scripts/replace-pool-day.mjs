import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientDir = path.resolve(__dirname, '..');
const publicDir = path.join(clientDir, 'public');
const imgDir = path.join(publicDir, 'img');
const originalsDir = path.resolve(clientDir, '../photos-originals');
const metaPath = path.join(clientDir, 'src/data/imageMeta.js');

const NEW_POOL_SRC = 'C:\\Users\\HP\\.gemini\\antigravity\\brain\\0d9b80c9-05b9-4b36-b7ef-095f65a2d695\\.user_uploaded\\media_1793872399911_e4647063.jpg';

async function run() {
  console.log('Replacing pool-day with new clean photo (person removed)...');

  // Copy to originals and public
  await fs.copyFile(NEW_POOL_SRC, path.join(originalsDir, 'pool-day.jpg'));
  await fs.copyFile(NEW_POOL_SRC, path.join(publicDir, 'pool-day.jpg'));
  await fs.copyFile(NEW_POOL_SRC, path.join(imgDir, 'pool-day.jpg'));

  const s = sharp(NEW_POOL_SRC).rotate();
  const info = await s.metadata();
  console.log(`Original dimensions: ${info.width}x${info.height}`);

  // We generate 640, 1280, 1920 (or matching existing widths)
  const widths = [640, 1280, 1920];
  for (const w of widths) {
    const outPath = path.join(imgDir, `pool-day-${w}.webp`);
    await sharp(NEW_POOL_SRC)
      .rotate()
      .resize({ width: w })
      .modulate({ saturation: 1.05, brightness: 1.02 })
      .webp({ quality: 85 })
      .toFile(outPath);
    console.log(`✓ Generated pool-day-${w}.webp (${w}px)`);
  }

  // Update imageMeta.js
  const metaContent = await fs.readFile(metaPath, 'utf8');
  const match = metaContent.match(/export const IMAGES = ({[\s\S]*?});/);
  if (!match) throw new Error('Could not parse imageMeta.js');
  const meta = JSON.parse(match[1]);

  meta['pool-day'] = {
    w: info.width || 1024,
    h: info.height || 1020,
    widths: [640, 1280, 1920],
  };

  const updatedMetaStr = `// Generated from the processed photos in /public/img\nexport const IMAGES = ${JSON.stringify(meta, null, 2)};\n`;
  await fs.writeFile(metaPath, updatedMetaStr, 'utf8');
  console.log('✓ Successfully updated imageMeta.js for pool-day!');
}

run().catch((err) => {
  console.error('Failed to replace pool-day:', err);
  process.exit(1);
});

