#!/usr/bin/env node

import { mkdir, writeFile } from 'node:fs/promises';
import { basename, dirname, resolve } from 'node:path';

const DEFAULT_URL =
  'https://giorgiotedesco.it/blog/on-web-development/an-agent-is-a-state-machine/';
const DEFAULT_OUTPUT = 'artifacts/an-agent-is-a-state-machine.html';

const sourceUrl = new URL(process.argv[2] || DEFAULT_URL);
const outputPath = resolve(process.argv[3] || DEFAULT_OUTPUT);
const cache = new Map();

async function fetchAsset(url) {
  const absoluteUrl = new URL(url, sourceUrl).href;

  if (!cache.has(absoluteUrl)) {
    cache.set(
      absoluteUrl,
      fetch(absoluteUrl).then(async (response) => {
        if (!response.ok) {
          throw new Error(`Unable to fetch ${absoluteUrl}: ${response.status} ${response.statusText}`);
        }

        return {
          bytes: Buffer.from(await response.arrayBuffer()),
          contentType: response.headers.get('content-type')?.split(';')[0] || 'application/octet-stream',
        };
      }),
    );
  }

  return cache.get(absoluteUrl);
}

function dataUrl(bytes, contentType) {
  return `data:${contentType};base64,${bytes.toString('base64')}`;
}

async function replaceAsync(value, pattern, replacer) {
  const matches = [...value.matchAll(pattern)];
  const replacements = await Promise.all(matches.map((match) => replacer(...match)));

  let cursor = 0;
  let result = '';

  matches.forEach((match, index) => {
    result += value.slice(cursor, match.index) + replacements[index];
    cursor = match.index + match[0].length;
  });

  return result + value.slice(cursor);
}

async function inlineCssResources(css, cssUrl) {
  return replaceAsync(
    css,
    /url\(\s*(["']?)(?!data:|#)([^"')]+)\1\s*\)/gi,
    async (match, quote, assetReference) => {
      if (/^(data:|#|%23)/i.test(assetReference.trim())) return match;

      try {
        const assetUrl = new URL(assetReference.trim(), cssUrl).href;
        const asset = await fetchAsset(assetUrl);
        return `url("${dataUrl(asset.bytes, asset.contentType)}")`;
      } catch (error) {
        console.warn(`Warning: ${error.message}`);
        return match;
      }
    },
  );
}

async function inlineIcons(html) {
  return replaceAsync(
    html,
    /(<link\b(?=[^>]*\brel=["'](?:icon|shortcut icon|apple-touch-icon)["'])[^>]*\bhref=["'])([^"']+)(["'][^>]*>)/gi,
    async (match, before, reference, after) => {
      try {
        const assetUrl = new URL(reference, sourceUrl).href;
        const asset = await fetchAsset(assetUrl);
        return `${before}${dataUrl(asset.bytes, asset.contentType)}${after}`;
      } catch (error) {
        console.warn(`Warning: ${error.message}`);
        return match;
      }
    },
  );
}

async function inlineStylesheets(html) {
  return replaceAsync(
    html,
    /<link\b(?=[^>]*\brel=["']stylesheet["'])(?=[^>]*\bhref=["']([^"']+)["'])[^>]*>/gi,
    async (match, href) => {
      const cssUrl = new URL(href, sourceUrl).href;
      const asset = await fetchAsset(cssUrl);
      const css = await inlineCssResources(asset.bytes.toString('utf8'), cssUrl);
      return `<style data-inlined-from="${cssUrl}">\n${css}\n</style>`;
    },
  );
}

async function inlineAttribute(html, element, attribute) {
  const pattern = new RegExp(
    `(<${element}\\b[^>]*\\b${attribute}=["'])([^"']+)(["'][^>]*>)`,
    'gi',
  );

  return replaceAsync(html, pattern, async (match, before, reference, after) => {
    if (/^(data:|#|mailto:|tel:|javascript:)/i.test(reference)) return match;

    try {
      const assetUrl = new URL(reference, sourceUrl).href;
      const asset = await fetchAsset(assetUrl);
      return `${before}${dataUrl(asset.bytes, asset.contentType)}${after}`;
    } catch (error) {
      console.warn(`Warning: ${error.message}`);
      return match;
    }
  });
}

function removeRuntime(html) {
  return html
    .replace(
      /<script\b(?![^>]*\btype=["']application\/ld\+json["'])[^>]*>[\s\S]*?<\/script>/gi,
      '',
    )
    .replace(
      /<link\b(?=[^>]*\brel=["'](?:preload|modulepreload|prefetch)["'])[^>]*>/gi,
      '',
    );
}

function absolutizeLinks(html) {
  return html.replace(/(<a\b[^>]*\bhref=["'])([^"']+)(["'])/gi, (match, before, href, after) => {
    if (/^(https?:|mailto:|tel:|#)/i.test(href)) return match;
    return `${before}${new URL(href, sourceUrl).href}${after}`;
  });
}

function makeStaticCtas(html) {
  return html.replace(
    /<button\b([^>]*)>\s*Book a Call\s*<\/button>/gi,
    '<a$1 href="https://cal.com/giorgio-tedesco/30min" target="_blank" rel="noopener noreferrer">Book a Call</a>',
  );
}

function addExportMetadata(html) {
  const marker = `<!-- Single-file export generated from ${sourceUrl.href} -->`;
  return html.replace(/<html\b/i, `${marker}\n<html`);
}

const page = await fetchAsset(sourceUrl.href);
let html = page.bytes.toString('utf8');

html = removeRuntime(html);
html = await inlineStylesheets(html);
html = await inlineAttribute(html, 'img', 'src');
html = await inlineIcons(html);
html = absolutizeLinks(html);
html = makeStaticCtas(html);
html = addExportMetadata(html);
html = html.replace(/[ \t]+$/gm, '');

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, html, 'utf8');

const remainingResources = [
  ...html.matchAll(/<(?:script|img|iframe|source)\b[^>]*\bsrc=["'](https?:\/\/[^"']+)/gi),
  ...html.matchAll(
    /<link\b(?=[^>]*\brel=["'](?:stylesheet|icon|shortcut icon|apple-touch-icon|preload|modulepreload|prefetch)["'])[^>]*\bhref=["'](https?:\/\/[^"']+)/gi,
  ),
].map((match) => match[1]);

console.log(`Created ${outputPath}`);
console.log(`Source: ${sourceUrl.href}`);
console.log(`Size: ${(Buffer.byteLength(html) / 1024 / 1024).toFixed(2)} MiB`);
console.log(`Fetched resources: ${cache.size - 1}`);
console.log(`Remaining external resources: ${remainingResources.length}`);
if (remainingResources.length) {
  console.log([...new Set(remainingResources)].join('\n'));
}
console.log(`File: ${basename(outputPath)}`);
