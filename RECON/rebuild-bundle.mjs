import fs from 'node:fs';

let js = fs.readFileSync('source-app.js', 'utf8');
const map = JSON.parse(fs.readFileSync('RECON/image-map.json', 'utf8'));

let missing = 0;
for (const [url, local] of Object.entries(map)) {
  const before = js.length;
  js = js.split(url).join(local);
  if (js.length === before) {
    missing++;
    console.log('MISSING', url);
  }
}
js = js.split('storageKey:"meoo-theme"').join('storageKey:"jingyu-theme"');
fs.writeFileSync('assets/app.js', js);
console.log('missing', missing, 'len', js.length, 'remote', (js.match(/meoo/g) || []).length);
