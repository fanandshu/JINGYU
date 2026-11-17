import fs from 'node:fs';

let js = fs.readFileSync('assets/app.js', 'utf8');
for (const n of ['chujian', 'yehang', 'chenbai', 'shiguang', 'shouye', 'sishilihe']) {
  fs.renameSync(`assets/images/${n}.png`, `assets/images/${n}.jpg`);
  js = js.split(`assets/images/${n}.png`).join(`assets/images/${n}.jpg`);
}
fs.writeFileSync('assets/app.js', js);
console.log('renamed to jpg');

const i = js.indexOf('--font-sans');
console.log('FONT CTX', JSON.stringify(js.slice(Math.max(0, i - 400), i + 400)));

const routes = [...new Set([...js.matchAll(/path:\s*["']([^"']*)["']/g)].map((x) => x[1]))];
console.log('ROUTES', routes.join(' | '));

const paths = [...new Set([...js.matchAll(/"(\/[a-z0-9-]{2,40})"/g)].map((x) => x[1]))];
console.log('PATHLIKE', paths.slice(0, 80).join(' | '));

const cn = [...new Set([...js.matchAll(/["']([\u4e00-\u9fa5][^"']{1,60})["']/g)].map((x) => x[1]))];
console.log('CHINESE STRINGS', cn.length);
console.log(cn.slice(0, 200).join('\n'));
