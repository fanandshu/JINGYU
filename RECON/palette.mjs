import fs from 'node:fs';
const s = fs.readFileSync('assets/app.css', 'utf8');
for (const k of ['--paper:', '--ink:', '--mist:', '--sand:', '--sea:', '--font-serif:"Songti']) {
  const i = s.indexOf(k);
  console.log('\n', k, i, i > -1 ? s.slice(i, i + 240) : '');
}
const i = s.indexOf('__tokens');
const j = s.indexOf('--radius:.5rem');
console.log('\nTOKEN BLOCK\n', s.slice(Math.max(0, j - 900), j + 700));
