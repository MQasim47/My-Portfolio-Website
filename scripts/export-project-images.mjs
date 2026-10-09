// Re-encodes the project imagery to AVIF + WebP, each file under 180 KB.
//   node scripts/export-project-images.mjs
// Sources live in design-source/projects/<project>/ (not served, not committed); outputs go to
// public/images/projects/<project>/<name>.avif and .webp. Add a row to JOBS to add an image.
// `crop` extracts a 16:9 window from a tall full-page capture before resizing.
import sharp from 'sharp';
import { mkdirSync, writeFileSync, statSync } from 'node:fs';

const SRC = 'design-source/projects';
const OUT = 'public/images/projects';
const MAX = 180 * 1024;

const JOBS = [
  // Unknot — banner first, then the phone screens
  ['unknot', 'unknot banner image.png', 'banner', { width: 800 }],
  ...[1, 2, 3, 4, 5, 6, 7].map((n) => ['unknot', `unknot-image${n}.jpg`, `screen-${n}`, { width: 576 }]),
  // Synthect — poster first, then the phone screens (the source has no image-7)
  ['synthect', 'poster.png', 'poster', { width: 941 }],
  ...[1, 2, 3, 4, 5, 6, 8].map((n, i) => ['synthect', `image-${n}.jpeg`, `screen-${i + 1}`, { width: 576 }]),
  // M Hassan Traders — one flat poster
  ['m-hassan-traders', 'poster.png', 'poster', { width: 940 }],
  // Flacron GameZone — landscape carousel
  ['flacron-gamezone', 'gamezone-poster1.png', 'gamezone-poster1', { width: 1600 }],
  ['flacron-gamezone', 'gamezone1.png', 'gamezone1', { width: 1600 }],
  ['flacron-gamezone', 'gamezone2.png', 'gamezone2', { width: 1600 }],
  ['flacron-gamezone', 'gamezone3.png', 'gamezone3', { width: 1600 }],
  ['flacron-gamezone', 'gamezone4.png', 'gamezone4', { width: 1600 }],
  ['flacron-gamezone', 'gamezone6.png', 'gamezone6', { width: 1600, crop: { top: 0 } }],
  ['flacron-gamezone', 'gamezone7.png', 'gamezone7', { width: 1600, crop: { top: 290 } }],
  ['flacron-gamezone', 'gamezone-poster2.jpg', 'gamezone-poster2', { width: 1600 }],
];

// quality ladder: first encode that fits under MAX wins
async function encode(img, fmt) {
  const ladder = fmt === 'avif' ? [58, 50, 42, 34, 28, 22] : [82, 74, 66, 58, 50, 42];
  let buf;
  for (const q of ladder) {
    buf = await (fmt === 'avif' ? img.clone().avif({ quality: q, effort: 6 }) : img.clone().webp({ quality: q, effort: 6 })).toBuffer();
    if (buf.length <= MAX) return { buf, q };
  }
  return { buf, q: ladder.at(-1) };
}

let tAvif = 0, tWebp = 0;
for (const [proj, file, name, o] of JOBS) {
  const path = `${SRC}/${proj}/${file}`;
  let img = sharp(path);
  const m = await img.metadata();
  if (o.crop) {
    const h = Math.round((m.width * 9) / 16);
    img = sharp(await img.extract({ left: 0, top: o.crop.top, width: m.width, height: h }).toBuffer());
  }
  img = img.resize({ width: Math.min(o.width, m.width) });
  mkdirSync(`${OUT}/${proj}`, { recursive: true });
  const a = await encode(img, 'avif');
  const w = await encode(img, 'webp');
  writeFileSync(`${OUT}/${proj}/${name}.avif`, a.buf);
  writeFileSync(`${OUT}/${proj}/${name}.webp`, w.buf);
  const { width, height } = await sharp(a.buf).metadata();
  tAvif += a.buf.length; tWebp += w.buf.length;
  console.log(`${proj}/${name}  ${width}x${height}  avif ${(a.buf.length / 1024).toFixed(0)} KB (q${a.q})  webp ${(w.buf.length / 1024).toFixed(0)} KB (q${w.q})`);
}
console.log(`TOTAL avif ${(tAvif / 1024).toFixed(0)} KB, webp ${(tWebp / 1024).toFixed(0)} KB`);
