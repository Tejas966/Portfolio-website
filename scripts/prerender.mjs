// Prerenders every route into static HTML after `vite build` and `vite build --ssr`.
// Optional: SITE_URL=https://your-domain.tld enables canonical URLs, og:url/og:image and sitemap.xml.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const { render, routes } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);
const SITE = (process.env.SITE_URL || '').replace(/\/$/, '');

// Preload the two Latin web fonts the first screen is set in, so they're usually ready before first paint
// and the hero doesn't re-wrap (layout shift) when they swap in. File names are hashed, so find them in the build.
const fontPreloads = fs.readdirSync(path.join(dist, 'assets'))
  .filter((f) => /^(geist-latin-wght-normal|bricolage-grotesque-latin-standard-normal)-.+\.woff2$/.test(f))
  .map((f) => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin />`);

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function head(url, seo, { noindex = false } = {}) {
  const tags = [
    ...fontPreloads,
    `<title>${esc(seo.title)}</title>`,
    `<meta name="description" content="${esc(seo.description)}" />`,
    `<meta property="og:type" content="${url === '/' ? 'website' : 'article'}" />`,
    `<meta property="og:site_name" content="Tejas Joshi" />`,
    `<meta property="og:title" content="${esc(seo.title)}" />`,
    `<meta property="og:description" content="${esc(seo.description)}" />`,
    `<meta name="twitter:card" content="${SITE ? 'summary_large_image' : 'summary'}" />`,
  ];
  if (noindex) tags.push('<meta name="robots" content="noindex" />');
  if (SITE && !noindex) {
    tags.push(`<link rel="canonical" href="${SITE}${url}" />`, `<meta property="og:url" content="${SITE}${url}" />`);
    tags.push(`<meta property="og:image" content="${SITE}/og.png" />`, `<meta property="og:image:width" content="1200" />`, `<meta property="og:image:height" content="630" />`);
  }
  return tags.join('\n    ');
}

function write(file, url, opts) {
  const { html, seo } = render(url);
  const page = template.replace('<!--app-head-->', head(url, seo, opts)).replace('<!--app-html-->', html);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, page);
  console.log(`prerendered ${url} → ${path.relative(root, file)}`);
}

for (const url of routes) {
  if (url === '/') { write(path.join(dist, 'index.html'), url); continue; }
  // Both forms, so /work/x, /work/x/ and /work/x.html resolve on any static host without rewrites.
  write(path.join(dist, url, 'index.html'), url);
  write(path.join(dist, `${url}.html`), url);
}
write(path.join(dist, '404.html'), '/404', { noindex: true });

let robots = 'User-agent: *\nAllow: /\n';
if (SITE) {
  const urls = routes.map((u) => `  <url><loc>${SITE}${u}</loc></url>`).join('\n');
  fs.writeFileSync(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
  robots += `Sitemap: ${SITE}/sitemap.xml\n`;
  console.log('wrote sitemap.xml');
} else {
  console.log('SITE_URL not set: skipped canonical URLs, og:image and sitemap.xml');
}
fs.writeFileSync(path.join(dist, 'robots.txt'), robots);
fs.rmSync(ssrDir, { recursive: true, force: true });
