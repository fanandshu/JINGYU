import fs from 'node:fs';
import path from 'node:path';

const map = JSON.parse(fs.readFileSync('RECON/image-map.json', 'utf8'));
const named = {
  '初见': 'chujian',
  '夜航': 'yehang',
  '晨白': 'chenbai',
  '拾光': 'shiguang',
  '守夜': 'shouye',
  '四时礼盒': 'sishilihe',
};

const jsPath = 'assets/app.js';
let js = fs.readFileSync(jsPath, 'utf8');
const newMap = {};

for (const [url, local] of Object.entries(map)) {
  const decoded = decodeURIComponent(url);
  const key = Object.keys(named).find((k) => decoded.includes(k));
  const ext = path.extname(local);
  const dest = `assets/images/${named[key] || 'product'}${ext}`;
  fs.renameSync(local, dest);
  newMap[url] = dest;
  js = js.split(url).join(dest);
  console.log(key, '->', dest);
}

fs.writeFileSync(jsPath, js);
fs.writeFileSync('RECON/image-map.json', JSON.stringify(newMap, null, 2));
console.log('remaining remote', (js.match(/conversation\.cdn\.meoo\.host/g) || []).length);
