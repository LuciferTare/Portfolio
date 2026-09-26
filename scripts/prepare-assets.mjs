import { copyFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = new URL('../', import.meta.url);
const at = (p) => new URL(p, root);

const copies = [
  ['octanet.png', 'src/assets/icons/octanet.png'],
  ['cravecoin.png', 'src/assets/icons/cravecoin.png'],
  ['fit&fuel.png', 'src/assets/icons/fitfuel.png'],
  ['quantaview.png', 'src/assets/icons/quantaview.png'],
  ['stoxium.png', 'src/assets/icons/stoxium.png'],
  ['powergauge.png', 'src/assets/icons/powergauge.png'],
  ['towzer.png', 'src/assets/icons/towzer.png'],
  ['Sushant_Tare_Master_Resume.pdf', 'public/cv/Sushant_Tare_CV.pdf'],
  ['FiberFlow Paper.pdf', 'public/papers/fiberflow-ijirt-2025.pdf'],
  ['Quantaview Paper.pdf', 'public/papers/quantaview-myresearchgo-2025.pdf'],
  ['Towzer Certificate.pdf', 'public/papers/towzer-certificate.pdf'],
  ['Cravecoin certificate.pdf', 'public/papers/cravecoin-certificate.pdf'],
];

for (const [from, to] of copies) {
  if (!existsSync(at(from))) {
    console.warn(`skip: ${from} not found`);
    continue;
  }
  await mkdir(new URL('.', at(to)), { recursive: true });
  await copyFile(at(from), at(to));
  console.log(`copied ${from} -> ${to}`);
}

if (existsSync(at('image.jpeg'))) {
  await sharp(fileURLToPath(at('image.jpeg')))
    .rotate()
    .extract({ left: 420, top: 760, width: 2240, height: 2800 })
    .resize(1600, 2000)
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(fileURLToPath(at('src/assets/portrait.jpg')));
  console.log('cropped image.jpeg -> src/assets/portrait.jpg');
}
