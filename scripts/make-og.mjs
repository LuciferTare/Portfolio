import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync, mkdirSync, mkdtempSync } from 'node:fs';
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
  <p class="line">Sole mobile developer behind OctaNet, used by ISPs across 7&nbsp;countries. Five research papers.</p>
</div>
<div class="grid">
  ${['octanet.png', 'cravecoin.png', 'fitfuel.png', 'powergauge.png'].map((i) => `<img src="${icon(i)}">`).join('')}
</div>
<p class="bar"><span>sushanttare.netlify.app</span><span>Palghar, India</span></p>
</body></html>`;

// One card per app page. Keep name and tagline in step with src/data/portfolio.ts and apps.ts,
// and the alt text built in work/[id].astro and [app]/index.astro, which describes this layout.
const cards = [
  { id: 'cravecoin', name: 'Cravecoin', tagline: 'Real-time crypto tracking', icon: 'cravecoin.png', chips: ['Android', 'Flutter'],
    shots: ['04-home-all-coins', '07-coin-line-chart', '13-heatmap'] },
  { id: 'powergauge', name: 'Power Gauge', tagline: 'Battery telemetry', icon: 'powergauge.png', chips: ['Android', 'Flutter'],
    shots: ['01-home', '03-sessions', '04-battery-health'] },
  { id: 'quantaview', name: 'Quantaview', tagline: 'Crypto analyser', icon: 'quantaview.png', chips: ['Android', 'Flutter'],
    shots: ['02-markets', '05-heatmap', '07-coin-detail-btc'] },
  { id: 'stoxium', name: 'Stoxium', tagline: 'Stock analyser', icon: 'stoxium.png', chips: ['Android', 'Flutter'],
    shots: ['02-home', '06-heatmap', '07-stock-detail'] },
  { id: 'fitfuel', name: 'Fit&amp;Fuel', tagline: 'Run your gym from your phone', icon: 'fitfuel.png',
    chips: ['Android', 'Works offline', 'From ₹599/month'], shots: [] },
];

const card = (c) => {
  const tops = [96, 40, 128];
  const phones = c.shots.map((f, i) => {
    const file = join(root, 'src/assets/projects', c.id, f + '.png');
    return `<img class="phone" style="left:${548 + i * 214}px; top:${tops[i]}px" src="${pathToFileURL(file).href}">`;
  }).join('');
  return `<!doctype html><html><head>${base}<style>
body { position: relative; width: 1200px; height: 630px; }
.text { position: absolute; left: 80px; top: 0; bottom: 0; width: ${c.shots.length ? 440 : 1040}px; display: flex; flex-direction: column; justify-content: center; }
.icon { width: 112px; height: 112px; border-radius: 22%; }
.name { margin-top: 36px; font-size: ${c.shots.length ? 76 : 120}px; font-weight: 620; letter-spacing: -0.055em; line-height: .95; }
.tag { margin-top: 20px; font-size: 34px; color: #A8AEB8; line-height: 1.25; }
.chips { margin-top: 36px; display: flex; gap: 12px; flex-wrap: wrap; font-family: GeistMono; font-size: 20px; color: #FCD535; }
.chips span { padding: 8px 16px; border: 1px solid #3a3f4b; border-radius: 999px; }
.phone { position: absolute; width: 190px; height: 422px; object-fit: cover; object-position: top; border-radius: 28px; border: 1px solid #3a3f4b; background: #0f1115; }
.bar { position: absolute; left: 80px; bottom: 56px; font-family: GeistMono; font-size: 20px; color: #8A909B; }
</style></head><body>
<div class="text">
  <img class="icon" src="${icon(c.icon)}">
  <p class="name">${c.name}</p>
  <p class="tag">${c.tagline}</p>
  <p class="chips">${c.chips.map((t) => `<span>${t}</span>`).join('')}</p>
</div>
${phones}
<p class="bar">Sushant Tare · sushanttare.netlify.app</p>
</body></html>`;
};

const mark = (size) => `<!doctype html><html><head>${base}<style>
body { width: ${size}px; height: ${size}px; display: grid; place-items: center; background: #FCD535; color: #181A20;
  font-family: GeistMono; font-weight: 700; font-size: ${Math.round(size * 0.42)}px; letter-spacing: -0.02em; }
</style></head><body>ST</body></html>`;

const shots = [
  { html: og, w: 1200, h: 630, out: 'public/og.png' },
  { html: mark(180), w: 180, h: 180, out: 'public/apple-touch-icon.png' },
  { html: mark(32), w: 32, h: 32, out: 'public/favicon-32.png' },
];

mkdirSync(join(root, 'public/og'), { recursive: true });
for (const c of cards) shots.push({ html: card(c), w: 1200, h: 630, out: `public/og/${c.id}.png` });

for (const s of shots) {
  const file = join(tmp, `${s.out.replace(/[^a-z0-9]/gi, '-')}.html`);
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
