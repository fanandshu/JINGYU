import fs from 'node:fs';

let js = fs.readFileSync('assets/app.js', 'utf8');
for (const n of ['chujian', 'yehang', 'chenbai', 'shiguang', 'shouye', 'sishilihe']) {
  fs.renameSync(`assets/images/${n}.jpg`, `assets/images/${n}.png`);
  js = js.split(`assets/images/${n}.jpg`).join(`assets/images/${n}.png`);
}
fs.writeFileSync('assets/app.js', js);
console.log('png refs', (js.match(/assets\/images\//g) || []).length);
console.log('jpg refs left', (js.match(/assets\/images\/[a-z]+\.jpg/g) || []).length);
