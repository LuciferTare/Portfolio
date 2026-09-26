import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const browser = [
  process.env.CHROME_PATH,
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
].find((p) => p && existsSync(p));
if (!browser) throw new Error('No Chrome/Edge found. Set CHROME_PATH.');

const font = (p) => pathToFileURL(join(root, 'node_modules/@fontsource-variable', p)).href;
const icon = (name) => `data:image/png;base64,${readFileSync(join(root, 'src/assets/icons', name)).toString('base64')}`;
const tmp = mkdtempSync(join(tmpdir(), 'og-'));

const base = `
<style>
@font-face { font-family: Geist; src: url(${font('geist/files/geist-latin-wght-normal.woff2')}); font-weight: 100 900; }
@font-face { font-family: GeistMono; src: url(${font('geist-mono/files/geist-mono-latin-wght-normal.woff2')}); font-weight: 100 900; }
* { margin: 0; box-sizing: border-box; }
html, body { background: #181A20; color: #EAECEF; font-family: Geist, sans-serif; overflow: hidden; }
</style>`;

const og = `<!doctype html><html><head>${base}<style>
body { width: 1200px; height: 630px; padding: 72px 80px; display: grid; grid-template-columns: 1fr auto; align-items: center; }
.name { font-size: 132px; font-weight: 620; letter-spacing: -0.055em; line-height: .9; }
.name span { display: block; color: #A8AEB8; }
.flap { display: flex; gap: 3px; margin-top: 40px; font-family: GeistMono; font-size: 30px; }
.flap b { display: grid; place-items: center; width: 25px; height: 44px; border-radius: 3px; font-weight: 500;
  background: linear-gradient(180deg, #2b2f39 0 50%, #262a33 50%); color: #FCD535; }
.line { margin-top: 30px; font-size: 26px; color: #A8AEB8; }
.grid { display: grid; grid-template-columns: repeat(2, 104px); gap: 20px; }
.grid img { width: 104px; height: 104px; border-radius: 22%; }
.bar { position: absolute; left: 80px; right: 80px; bottom: 56px; display: flex; justify-content: space-between;
  font-family: GeistMono; font-size: 20px; color: #8A909B; }
</style></head><body>
<div>
  <p class="name">Sushant<span>Tare</span></p>
  <p class="flap">${'Flutter Developer'.split('').map((c) => `<b>${c === ' ' ? '&nbsp;' : c}</b>`).join('')}</p>
  <p class="line">Sole mobile developer behind OctaNet. Five research papers.</p>
</div>
<div class="grid">
  ${['octanet.png', 'cravecoin.png', 'fitfuel.png', 'powergauge.png'].map((i) => `<img src="${icon(i)}">`).join('')}
</div>
<p class="bar"><span>sushanttare.netlify.app</span><span>Palghar, India</span></p>
</body></html>`;

const mark = (size) => `<!doctype html><html><head>${base}<style>
body { width: ${size}px; height: ${size}px; display: grid; place-items: center; background: #FCD535; color: #181A20;
  font-family: GeistMono; font-weight: 700; font-size: ${Math.round(size * 0.42)}px; letter-spacing: -0.02em; }
</style></head><body>ST</body></html>`;

const shots = [
  { html: og, w: 1200, h: 630, out: 'public/og.png' },
  { html: mark(180), w: 180, h: 180, out: 'public/apple-touch-icon.png' },
  { html: mark(32), w: 32, h: 32, out: 'public/favicon-32.png' },
];

for (const s of shots) {
  const file = join(tmp, `${s.w}x${s.h}.html`);
  writeFileSync(file, s.html);
  execFileSync(browser, [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    `--window-size=${s.w},${s.h}`,
    `--screenshot=${join(root, s.out)}`,
    '--virtual-time-budget=2000',
    pathToFileURL(file).href,
  ], { stdio: 'ignore' });
  console.log(`wrote ${s.out}`);
}

// favicon.ico: a one-image ICO container wrapping the 32px PNG, for clients that request it directly.
const png = readFileSync(join(root, 'public/favicon-32.png'));
const ico = Buffer.alloc(22);
ico.writeUInt16LE(1, 2);
ico.writeUInt16LE(1, 4);
ico.writeUInt8(32, 6);
ico.writeUInt8(32, 7);
ico.writeUInt16LE(1, 10);
ico.writeUInt16LE(32, 12);
ico.writeUInt32LE(png.length, 14);
ico.writeUInt32LE(22, 18);
writeFileSync(join(root, 'public/favicon.ico'), Buffer.concat([ico, png]));
console.log('wrote public/favicon.ico');
