import fs from 'node:fs';
const js = fs.readFileSync('assets/app.js', 'utf8');
let i = -1;
while ((i = js.indexOf('fetch(', i + 1)) !== -1) {
  console.log('---\n' + js.slice(Math.max(0, i - 200), i + 240));
}
