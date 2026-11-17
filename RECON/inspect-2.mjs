import fs from 'node:fs';
const js = fs.readFileSync('assets/app.js', 'utf8');
const checks = ['BASE_URL', 'import(', 'fetch(', 'localStorage', 'sessionStorage', 'document.cookie', 'location.href'];
for (const c of checks) {
  console.log(c, (js.split(c).length - 1));
}
const imps = [...new Set([...js.matchAll(/import\(["']([^"']+)["']\)/g)].map((x) => x[1]))];
console.log('DYNAMIC IMPORTS', imps.join('\n'));
const srcs = [...new Set([...js.matchAll(/src:\s*["']([^"']{2,80})["']/g)].map((x) => x[1]))];
console.log('SRC ATTRS', srcs.slice(0, 40).join('\n'));
