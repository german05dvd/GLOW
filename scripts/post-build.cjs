const fs = require('fs');
const path = require('path');

const distClient = path.resolve('dist/client');
const assetsDir = path.join(distClient, 'assets');

if (!fs.existsSync(assetsDir)) {
  console.error('❌ Assets directory not found at', assetsDir);
  process.exit(1);
}

const files = fs.readdirSync(assetsDir);

// CSS
const cssFiles = files.filter(f => f.endsWith('.css'));
const cssLinks = cssFiles.map(css => 
  `<link rel="stylesheet" href="/assets/${css}" />`
).join('\n    ');

// JS entry points
const jsFiles = files.filter(f => f.endsWith('.js') && f.startsWith('index-'));
if (jsFiles.length === 0) {
  console.error('❌ No index JS files found');
  process.exit(1);
}

const sortedJs = jsFiles.sort((a, b) => {
  const sizeA = fs.statSync(path.join(assetsDir, a)).size;
  const sizeB = fs.statSync(path.join(assetsDir, b)).size;
  return sizeA - sizeB;
});

const scriptTags = sortedJs.map(js => 
  `<script type="module" src="/assets/${js}"></script>`
).join('\n    ');

const html = `<!DOCTYPE html>
<html lang="es" class="scroll-smooth">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Glow · Agencia de Marketing Digital</title>
    <meta name="description" content="Agencia de marketing digital especializada en mipymes cubanas. Gestión de redes sociales, branding y sitios web conectados a WhatsApp." />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    ${cssLinks}
  </head>
  <body class="min-h-screen bg-background font-sans antialiased">
    ${scriptTags}
  </body>
</html>`;

fs.writeFileSync(path.join(distClient, 'index.html'), html);
fs.writeFileSync(path.join(distClient, '404.html'), html);
console.log('✅ Generated dist/client/index.html and 404.html');
