import fs from 'node:fs';
import path from 'node:path';

const deliverable = ['index.html', 'assets/app.js', 'assets/app.css'];
for (const f of deliverable) {
  const s = fs.readFileSync(f, 'utf8');
  console.log(f, 'meoo/秒悟:', (s.match(/meoo|秒悟/gi) || []).length, 'external http:', (s.match(/https?:\/\/[^"'`\s)]+/g) || []).filter((u) => !u.includes('react.dev') && !u.includes('w3.org') && !u.includes('localhost')).length);
}

const dir = 'assets/images';
for (const f of fs.readdirSync(dir)) {
  const b = fs.readFileSync(path.join(dir, f));
  const isJpg = b[0] === 0xff && b[1] === 0xd8;
  const isPng = b.slice(0, 8).toString('hex') === '89504e470d0a1a0a';
  let w = 0;
  let h = 0;
  if (isPng) {
    w = b.readUInt32BE(16);
    h = b.readUInt32BE(20);
  } else if (isJpg) {
    let i = 2;
    while (i < b.length) {
      if (b[i] !== 0xff) { i++; continue; }
      const m = b[i + 1];
      const len = b.readUInt16BE(i + 2);
      if (m >= 0xc0 && m <= 0xc3) { h = b.readUInt16BE(i + 5); w = b.readUInt16BE(i + 7); break; }
      i += 2 + len;
    }
  }
  console.log(f, isJpg ? 'jpeg' : isPng ? 'png' : '?', w + 'x' + h, Math.round(b.length / 1024) + 'KB');
}

const html = fs.readFileSync('index.html', 'utf8');
console.log('watermark node:', /meoo-brand-watermark|baxia/.test(html));
console.log('placeholder:', /\{\{|\}\}/.test(html));
