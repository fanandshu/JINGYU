import fs from 'node:fs';
const js = fs.readFileSync('assets/app.js', 'utf8');
const css = fs.readFileSync('assets/app.css', 'utf8');

for (const n of ['--font-serif:', '--font-sans:', 'font-family', 'JINGYU', 'ngyu']) {
  console.log('JS', n, js.split(n).length - 1);
}
const i = js.indexOf('--font-serif:');
if (i > -1) console.log(js.slice(i - 400, i + 400));
const j = css.indexOf('--font-serif:');
if (j > -1) console.log('CSS', css.slice(j - 300, j + 400));
const k = js.indexOf('--font-sans:');
if (k > -1) console.log('SANS', js.slice(k - 300, k + 400));
console.log('CSS MEoo', /meoo/i.test(css));
