import fs from 'node:fs';
const js = fs.readFileSync('assets/app.js', 'utf8');
const needles = ['一块原石，一滴精油', '这里先空着', '为什么是「水晶 + 精油」', '三步，一次用完'];
for (const n of needles) {
  const i = js.indexOf(n);
  console.log('\n===', n, i, '===\n');
  console.log(js.slice(Math.max(0, i - 2500), i + 1200));
}
