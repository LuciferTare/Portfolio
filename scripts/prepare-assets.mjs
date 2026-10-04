import { copyFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = new URL('../', import.meta.url);
const at = (p) => new URL(p, root);

const copies = [
  ['assets-src/icons/octanet.png', 'src/assets/icons/octanet.png'],
  ['assets-src/icons/cravecoin.png', 'src/assets/icons/cravecoin.png'],
  ['assets-src/icons/fit&fuel.png', 'src/assets/icons/fitfuel.png'],
  ['assets-src/icons/quantaview.png', 'src/assets/icons/quantaview.png'],
  ['assets-src/icons/stoxium.png', 'src/assets/icons/stoxium.png'],
  ['assets-src/icons/powergauge.png', 'src/assets/icons/powergauge.png'],
  ['assets-src/icons/towzer.png', 'src/assets/icons/towzer.png'],
  ['assets-src/resume/Sushant_Tare_CV.pdf', 'public/cv/Sushant_Tare_CV.pdf'],
  ['assets-src/certificates/Cravecoin Paper.pdf', 'public/papers/cravecoin-paper.pdf'],
  ['assets-src/certificates/Cravecoin Certificate.pdf', 'public/papers/cravecoin-certificate.pdf'],
  ['assets-src/certificates/FiberFlow Paper.pdf', 'public/papers/fiberflow-paper.pdf'],
  ['assets-src/certificates/FiberFlow Certificate.pdf', 'public/papers/fiberflow-certificate.pdf'],
  ['assets-src/certificates/Fit&Fuel Paper.pdf', 'public/papers/fitfuel-paper.pdf'],
  ['assets-src/certificates/Fit&Fuel Certificate.pdf', 'public/papers/fitfuel-certificate.pdf'],
  ['assets-src/certificates/Quantaview Paper.pdf', 'public/papers/quantaview-paper.pdf'],
  ['assets-src/certificates/Quantaview Certificate.pdf', 'public/papers/quantaview-certificate.pdf'],
  ['assets-src/certificates/Towzer Paper.pdf', 'public/papers/towzer-paper.pdf'],
  ['assets-src/certificates/Towzer Certificate.pdf', 'public/papers/towzer-certificate.pdf'],
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

if (existsSync(at('assets-src/portrait/image.jpeg'))) {
  await sharp(fileURLToPath(at('assets-src/portrait/image.jpeg')))
    .rotate()
    .extract({ left: 420, top: 760, width: 2240, height: 2800 })
    .resize(1600, 2000)
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(fileURLToPath(at('src/assets/portrait.jpg')));
  console.log('cropped assets-src/portrait/image.jpeg -> src/assets/portrait.jpg');
}
