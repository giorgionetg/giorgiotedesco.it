import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'out');
const site = 'https://giorgiotedesco.it';
const sitemapFile = path.join(out, 'sitemap.xml');
const failures = [];
const knownRedirectPages = new Set(['/it/servizi/siti-web-commerciali/']);
const canonicalOf = (html) => html.match(/<link\b(?=[^>]*\brel=["']canonical["'])[^>]*\bhref=["']([^"']+)["'][^>]*>/i)?.[1];
const noindexOf = (html) => [...html.matchAll(/<meta\b(?=[^>]*\bname=["']robots["'])[^>]*\bcontent=["']([^"']+)["'][^>]*>/gi)].some((match) => /\bnoindex\b/i.test(match[1]));

if (!fs.existsSync(out)) {
  console.error('ERROR out/: production export directory is missing');
  process.exit(1);
}

const read = (file) => fs.readFileSync(file, 'utf8');
const htmlFiles = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(file);
    else if (entry.name.endsWith('.html')) htmlFiles.push(file);
  }
}
walk(out);

function routeFor(file) {
  const relative = path.relative(out, file).split(path.sep).join('/');
  return relative === 'index.html' ? '/' : `/${relative.replace(/index\.html$/, '').replace(/\.html$/, '').replace(/\/$/, '')}/`;
}

const htmlByRoute = new Map();
for (const file of htmlFiles) {
  const route = routeFor(file);
  const html = read(file);
  htmlByRoute.set(route, html);
  if (route.startsWith('/preview/') || route === '/preview/' || route.startsWith('/test/') || route === '/test/') {
    failures.push(`ERROR ${route}: development route exists in production artifact`);
  }
  const canonicalMatches = [...html.matchAll(/<link\b(?=[^>]*\brel=["']canonical["'])[^>]*\bhref=["']([^"']+)["'][^>]*>/gi)];
  if (canonicalMatches.some((match) => /https?:\/\/www\.giorgiotedesco\.it/i.test(match[1]))) {
    failures.push(`ERROR ${route}: canonical contains www.giorgiotedesco.it`);
  }
  if (/https?:\/\/www\.giorgiotedesco\.it/i.test(html)) {
    failures.push(`ERROR ${route}: HTML contains www.giorgiotedesco.it`);
  }
  if (!noindexOf(html) && canonicalMatches.length === 0 && !knownRedirectPages.has(route)) {
    failures.push(`ERROR ${route}: missing canonical on public indexable page`);
  }
}

if (!fs.existsSync(sitemapFile)) {
  failures.push('ERROR sitemap.xml: file is missing');
} else {
  const sitemap = read(sitemapFile);
  if (/https?:\/\/www\.giorgiotedesco\.it/i.test(sitemap)) failures.push('ERROR sitemap.xml: contains www.giorgiotedesco.it');
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/gs)].map((m) => m[1].trim());
  for (const url of urls) {
    let route;
    try { route = new URL(url).pathname; } catch { failures.push(`ERROR sitemap.xml: invalid URL ${url}`); continue; }
    if (!url.startsWith(site)) failures.push(`ERROR sitemap.xml: URL is outside canonical apex domain: ${url}`);
    const html = htmlByRoute.get(route.endsWith('/') ? route : `${route}/`);
    if (!html) { failures.push(`ERROR ${route}: sitemap URL has no exported HTML`); continue; }
    if (noindexOf(html)) failures.push(`ERROR ${route}: sitemap URL contains noindex`);
  }
}

const legacyPostRoutes = JSON.parse(read(path.join(root, 'src/app/lib/markdown/legacy-post-routes.json')));
for (const locale of ['en', 'it']) {
  for (const pair of legacyPostRoutes[locale]) {
    const prefix = locale === 'it' ? '/it/blog/' : '/blog/';
    const oldRoute = `${prefix}${pair.from.join('/')}/`;
    const canonicalRoute = `${prefix}${pair.to.join('/')}/`;
    const aliasHtml = htmlByRoute.get(oldRoute);
    if (!aliasHtml) {
      failures.push(`ERROR ${oldRoute}: legacy alias missing from production artifact`);
      continue;
    }
    const canonical = canonicalOf(aliasHtml);
    if (!noindexOf(aliasHtml)) failures.push(`ERROR ${oldRoute}: legacy alias emitted as indexable HTML`);
    if (canonical !== `${site}${canonicalRoute}`) failures.push(`ERROR ${oldRoute}: canonical is not ${site}${canonicalRoute}`);
    const targetHtml = htmlByRoute.get(canonicalRoute);
    if (!targetHtml) failures.push(`ERROR ${canonicalRoute}: canonical slug missing from production artifact`);
    else if (canonicalOf(targetHtml) !== `${site}${canonicalRoute}`) failures.push(`ERROR ${canonicalRoute}: canonical slug has incorrect canonical`);
  }
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log(`SEO validation passed: ${htmlFiles.length} HTML routes, ${fs.existsSync(sitemapFile) ? [...read(sitemapFile).matchAll(/<loc>/g)].length : 0} sitemap URLs.`);
