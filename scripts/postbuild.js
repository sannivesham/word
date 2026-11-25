import fs from 'node:fs';

if (fs.existsSync('dist/index.html')) {
  fs.copyFileSync('dist/index.html', 'dist/404.html');
  console.log('✓ Successfully duplicated dist/index.html to dist/404.html for GitHub Pages SPA routes.');
}
