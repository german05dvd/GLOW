const fs = require('fs');
const path = require('path');

const distClient = path.resolve('dist/client');
const manifestPath = path.join(distClient, '.vite', 'manifest.json');

if (!fs.existsSync(manifestPath)) {
  console.error('❌ Vite manifest not found at', manifestPath);
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

// Busca el entry point (src/main.tsx o similar)
const entry = manifest['src/main.tsx'] 
  || manifest['index.html'] 
  || Object.values(manifest).find(e => e.isEntry);

if (!entry) {
  console.error('❌ Entry point not found in manifest');
  process.exit(1);
}

const cssLinks = (entry.css || []).map(css => 
  `<link rel="stylesheet" href="/${css}" />`
).join('\n  ');

const scriptTag = `<script type="module" src="/${entry.file}"></script>`;

const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Glow · Agencia de Marketing Digital</title>
  <meta name="description" content="Agencia de marketing digital especializada en mipymes cubanas." />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  ${cssLinks}
</head>
<body>
  <div id="root"></div>
  ${scriptTag}
</body>
</html>`;

fs.writeFileSync(path.join(distClient, 'index.html'), html);
console.log('✅ Generated dist/client/index.html');
