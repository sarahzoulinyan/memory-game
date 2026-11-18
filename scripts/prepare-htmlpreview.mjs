import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const docsDir = new URL('../docs/', import.meta.url);
const indexPath = new URL('index.html', docsDir);
let html = readFileSync(indexPath, 'utf8');
const scriptTag = html.match(/<script type="module" crossorigin src="\.\/assets\/([^"/]+\.js)"><\/script>/);

if (!scriptTag) {
  throw new Error('Could not find the Vite JavaScript bundle in docs/index.html');
}

const sourceName = scriptTag[1];
const sourcePath = new URL(`assets/${sourceName}`, docsDir);
const classicName = sourceName.replace(/\.js$/, '.classic.js');
const classicPath = new URL(`assets/${classicName}`, docsDir);
const source = readFileSync(sourcePath, 'utf8');
const classic = source.replaceAll('import.meta.url', 'document.baseURI');

if (/\bimport\.meta\b/.test(classic)) {
  throw new Error('The preview bundle still contains module-only syntax');
}

writeFileSync(classicPath, classic);
html = html
  .replace('<html lang="pt-BR">', '<html lang="en">')
  .replace(scriptTag[0], `<script defer src="./assets/${classicName}"></script>`)
  .replace(/<script id="vite-plugin-pwa:register-sw"[^>]*><\/script>/, '');
writeFileSync(indexPath, html);

console.log(`Prepared HTMLPreview bundle: ${join('docs', 'assets', classicName)}`);
