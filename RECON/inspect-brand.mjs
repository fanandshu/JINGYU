import fs from 'node:fs';
const js = fs.readFileSync('assets/app.js', 'utf8');

for (const re of [/meoo/gi, /秒悟/g, /baixa|baxia/gi, /https?:\/\//g]) {
  const m = [...js.matchAll(re)];
  console.log(re, m.length);
  const idx = m.slice(0, 10).map((x) => x.index);
  for (const i of idx) console.log('  ...' + js.slice(Math.max(0, i - 80), i + 90).replace(/\n/g, ' '));
}

const i = js.indexOf('function A_');
const nav = js.indexOf('"nav"');
console.log('NAV CTX', js.slice(nav - 1500, nav + 1500));
