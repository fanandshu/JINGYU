import fs from 'node:fs';

const j = fs.readFileSync('source-app.js', 'utf8');
const c = fs.readFileSync('source-app.css', 'utf8');

const urls = [...j.matchAll(/https?:\/\/[^"'`\s)]{6,140}/g)].map((x) => x[0]);
console.log('HTTP URLS', new Set(urls).size);
console.log([...new Set(urls)].slice(0, 100).join('\n'));

const assets = [...j.matchAll(/["'`](\/assets\/[^"'`]{2,140})/g)].map((x) => x[1]);
console.log('--- /assets refs ---');
console.log([...new Set(assets)].slice(0, 80).join('\n'));

const apis = [...j.matchAll(/["'`](\/api\/[^"'`]{0,100})/g)].map((x) => x[1]);
console.log('--- /api refs ---');
console.log([...new Set(apis)].slice(0, 40).join('\n'));

const data = [...j.matchAll(/["'`]data:([a-z/+.-]+);base64,([A-Za-z0-9+/=]{20,40})/g)].map((x) => x[1]);
console.log('--- data uri types ---', [...new Set(data)].join(','));

console.log('--- CSS head ---');
console.log(c.slice(0, 1200));
console.log('--- CSS images ---', (c.match(/image-set|background-image|url\(/g) || []).length);
