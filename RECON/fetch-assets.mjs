import fs from 'node:fs';
import path from 'node:path';

const BASE = 'https://xdtyto0zeq04.meoo.fun';
const OUT = 'assets';
fs.mkdirSync(path.join(OUT, 'images'), { recursive: true });

async function get(url) {
  const res = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36' } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return { buf: Buffer.from(await res.arrayBuffer()), type: res.headers.get('content-type'), len: res.headers.get('content-length') };
}

const files = [
  ['/assets/index-CYPTaxr2.js', 'assets/app.js'],
  ['/assets/index-VgKclbYY.css', 'assets/app.css'],
  ['/favicon.ico', 'assets/favicon.ico'],
];

for (const [url, dest] of files) {
  const { buf } = await get(BASE + url);
  fs.writeFileSync(dest, buf);
  console.log(dest, buf.length);
}

const js = fs.readFileSync('assets/app.js', 'utf8');
const imgs = [...new Set([...js.matchAll(/https:\/\/conversation\.cdn\.meoo\.host\/[^"'`\s)]+/g)].map((m) => m[0]))];
console.log('IMAGES', imgs.length);
const map = {};
for (const u of imgs) {
  const name = decodeURIComponent(new URL(u).pathname.split('/').pop()).replace(/[^\w.\-]/g, '');
  const dest = `assets/images/${name}`;
  const { buf } = await get(u);
  fs.writeFileSync(dest, buf);
  map[u] = dest;
  console.log(dest, buf.length);
}
fs.writeFileSync('RECON/image-map.json', JSON.stringify(map, null, 2));
