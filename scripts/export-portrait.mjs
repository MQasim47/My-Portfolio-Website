// Re-exports the hero portrait derivatives from public/images/hero-portrait.png.
//   node scripts/export-portrait.mjs
// Writes hero-portrait.avif and hero-portrait.webp next to the source (overwriting the old
// derivatives). Target: each under 180 KB. The source is expected to be the figure cutout
// at 504:991 with a transparent background; if the ratio is off by >2% it is cropped to
// the figure's bounding box at that ratio.
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';

const SRC = 'public/images/hero-portrait.png';
const RATIO = 504 / 991;
const meta = await sharp(SRC).metadata();
console.log(`source ${meta.width}x${meta.height}`);

let img = sharp(SRC);
if (Math.abs(meta.width / meta.height - RATIO) / RATIO > 0.02) {
  console.warn('ratio is not 504:991 — cropping to the figure');
  const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  let minX = info.width, maxX = 0;
  for (let y = 0; y < info.height; y++)
    for (let x = 0; x < info.width; x++)
      if (data[(y * info.width + x) * 4 + 3] > 40) { minX = Math.min(minX, x); maxX = Math.max(maxX, x); }
  const cw = Math.round(info.height * RATIO);
  const left = Math.max(0, Math.min(info.width - cw, Math.round((minX + maxX) / 2 - cw / 2)));
  img = img.extract({ left, top: 0, width: cw, height: info.height });
}

const avif = await img.clone().avif({ quality: 50, effort: 6 }).toBuffer();
const webp = await img.clone().webp({ quality: 72, effort: 6, alphaQuality: 90 }).toBuffer();
writeFileSync('public/images/hero-portrait.avif', avif);
writeFileSync('public/images/hero-portrait.webp', webp);
console.log(`avif ${(avif.length / 1024).toFixed(0)} KB, webp ${(webp.length / 1024).toFixed(0)} KB`);
