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

const POOL_IMAGES = [
  {
    srcFile: 'Gemini_Generated_Image_gehlisgehlisgehl.png',
    slug: 'pool-day',
    desc: 'Private sheltered swimming pool at Sai Ranga Shores with sun lounger floats and colorful canopy',
  },
  {
    srcFile: 'Gemini_Generated_Image_k3ulxzk3ulxzk3ul.png',
    slug: 'pool-night',
    desc: 'Private swimming pool illuminated at night with underwater lights at Sai Ranga Shores',
  },
];

async function run() {
  await fs.mkdir(imgDir, { recursive: true });
  await fs.mkdir(originalsDir, { recursive: true });

  // Read existing imageMeta
  const metaContent = await fs.readFile(metaPath, 'utf8');
  const match = metaContent.match(/export const IMAGES = ({[\s\S]*?});/);
  if (!match) throw new Error('Could not parse imageMeta.js');
  const meta = JSON.parse(match[1]);

  for (const item of POOL_IMAGES) {
    const srcPath = path.join(publicDir, item.srcFile);
    console.log(`Processing ${item.slug} from ${srcPath}...`);

    // Copy to originals
    const origTarget = path.join(originalsDir, `${item.slug}.png`);
    await fs.copyFile(srcPath, origTarget);

    const s = sharp(srcPath).rotate();
    const info = await s.metadata();
    const origW = info.width || 1920;
    const origH = info.height || 1080;

    const widths = [640, 1280];
    if (origW >= 1600) widths.push(1920);

    for (const w of widths) {
      const outPath = path.join(imgDir, `${item.slug}-${w}.webp`);
      await sharp(srcPath)
        .rotate()
        .resize({ width: w, withoutEnlargement: true })
        .modulate({ saturation: 1.08, brightness: 1.02 })
        .webp({ quality: 82 })
        .toFile(outPath);
      console.log(`  ✓ Created ${item.slug}-${w}.webp`);
    }

    meta[item.slug] = {
      w: origW,
      h: origH,
      widths,
    };
  }

  // Save updated imageMeta.js
  const updatedMetaStr = `// Generated from the processed photos in /public/img\nexport const IMAGES = ${JSON.stringify(meta, null, 2)};\n`;
  await fs.writeFile(metaPath, updatedMetaStr, 'utf8');
  console.log('✓ Successfully updated imageMeta.js with pool-day and pool-night!');
}

run().catch((err) => {
  console.error('Error processing pool images:', err);
  process.exit(1);
});

