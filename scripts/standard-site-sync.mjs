import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';
import matter from 'gray-matter';

const did = 'did:plc:27g2oqb2vz6k2mkezsx4a2sx';
const site = `at://${did}/site.standard.publication/3mywkviwovv25`;
const collection = 'site.standard.document';
const root = path.resolve('content');
const output = path.resolve('docs/standard-site-records');
const sync = process.argv.includes('--publish');
let password = process.env.ATPROTO_APP_PASSWORD;
if (sync && !password) {
  if (!process.stdin.isTTY) throw new Error('ATPROTO_APP_PASSWORD is required when no interactive terminal is available');
  const prompt = spawnSync('bash', ['-c', "IFS= read -rsp 'App password AT Protocol: ' password || exit 1; printf '\\n' >&2; printf '%s' \"$password\""], {
    encoding: 'utf8',
    stdio: ['inherit', 'pipe', 'inherit'],
  });
  if (prompt.status !== 0 || !prompt.stdout) throw new Error('App password was not provided');
  password = prompt.stdout;
}
const graphemeSegmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
const tidPattern = /^[234567abcdefghij][234567abcdefghijklmnopqrstuvwxyz]{12}$/;

function stableTid(route, publishedAt) {
  const hash = crypto.createHash('sha256').update(route).digest();
  const micros = BigInt(publishedAt.getTime()) * 1000n + BigInt(hash.readUInt16BE(0) % 1000);
  let value = (micros << 10n) | BigInt(hash.readUInt16BE(2) % 1024);
  const alphabet = '234567abcdefghijklmnopqrstuvwxyz';
  let tid = '';
  for (let index = 0; index < 13; index++) {
    tid = alphabet[Number(value & 31n)] + tid;
    value >>= 5n;
  }
  return tid;
}

function excerpt(content, description) {
  const paragraphs = content.replace(/\r\n/g, '\n').split(/\n\s*\n/)
    .map(block => block.trim())
    .filter(block => block && !/^(?:#{1,6}\s|[-*+]\s|\d+[.)]\s|>|```|~~~|\||<|!\[)/.test(block))
    .slice(0, 3)
    .map(block => block
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
      .replace(/[*_`~]/g, '')
      .replace(/\s+/g, ' ')
      .trim());
  const result = [description.trim(), ...paragraphs].join('\n\n');
  if ([...graphemeSegmenter.segment(result)].length > 3000) throw new Error('Standard.site description exceeds 3000 graphemes');
  return result;
}

async function files(dir) {
  return (await Promise.all((await fs.readdir(dir, { withFileTypes: true })).map(async entry => {
    if (entry.name === 'draft') return [];
    const name = path.join(dir, entry.name);
    return entry.isDirectory() ? files(name) : entry.isFile() && name.endsWith('.md') ? [name] : [];
  }))).flat();
}

async function xrpc(pds, method, body, token) {
  const response = await fetch(`${pds}/xrpc/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error(`${method}: HTTP ${response.status} ${await response.text()}`);
  return response.json();
}

let pds, token;
if (sync) {
  const plcResponse = await fetch(`https://plc.directory/${did}`);
  if (!plcResponse.ok) throw new Error(`PLC lookup: HTTP ${plcResponse.status}`);
  const plc = await plcResponse.json();
  if (plc.id !== did) throw new Error('Unexpected DID in PLC response');
  pds = plc.service?.find(s => s.id === '#atproto_pds' && s.type === 'AtprotoPersonalDataServer')?.serviceEndpoint;
  if (!/^https:\/\/[a-zA-Z0-9.-]+$/.test(pds ?? '')) throw new Error('Invalid PDS endpoint');
  const session = await xrpc(pds, 'com.atproto.server.createSession', { identifier: did, password });
  if (session.did !== did || !session.accessJwt) throw new Error('Unexpected session DID');
  token = session.accessJwt;
}

await fs.mkdir(output, { recursive: true });
const expected = new Set();
let count = 0;
for (const file of (await files(root)).sort()) {
  const relative = path.relative(root, file).split(path.sep);
  const locale = relative[0] === 'it' ? 'it' : 'en';
  if (locale === 'it') relative.shift();
  const slug = relative.at(-1).replace(/\.md$/, '');
  relative[relative.length - 1] = slug;
  const route = `${locale === 'it' ? '/it' : ''}/blog/${relative.join('/')}/`;
  const source = await fs.readFile(file, 'utf8');
  const parsed = matter(source);
  const data = parsed.data;
  if (data.draft) continue;
  if (!data.title || !data.description || !data.datePublished) throw new Error(`Missing title, description or datePublished: ${file}`);
  const publishedAt = new Date(data.datePublished);
  if (Number.isNaN(publishedAt.getTime())) throw new Error(`Invalid datePublished: ${file}`);
  const record = {
    $type: collection,
    site,
    path: route,
    title: data.title,
    description: excerpt(parsed.content, data.description),
    langs: [locale],
    locale: locale === 'it' ? 'it-IT' : 'en-US',
    publishedAt: publishedAt.toISOString(),
  };
  const existing = data.atUri;
  const prefix = `at://${did}/${collection}/`;
  if (existing && (typeof existing !== 'string' || !existing.startsWith(prefix))) throw new Error(`Invalid atUri: ${file}`);
  const existingKey = existing?.slice(prefix.length);
  if (existingKey && !tidPattern.test(existingKey) && !/^p[0-9a-f]{24}$/.test(existingKey)) throw new Error(`Invalid atUri rkey: ${file}`);
  const rkey = existingKey && tidPattern.test(existingKey) ? existingKey : stableTid(route, publishedAt);
  const uri = `${prefix}${rkey}`;
  const jsonName = `${locale === 'it' ? '' : 'en-'}${slug}.json`;
  if (expected.has(jsonName)) throw new Error(`Duplicate JSON filename: ${jsonName}`);
  expected.add(jsonName);
  const jsonPath = path.join(output, jsonName);
  await fs.writeFile(jsonPath, `${JSON.stringify(record, null, 2)}\n`);
  if (sync) {
    const result = await xrpc(pds, 'com.atproto.repo.putRecord', { repo: did, collection, rkey, record }, token);
    if (result.uri !== uri) throw new Error(`Unexpected record URI for ${file}: ${result.uri}`);
  }
  if (data.atUri !== uri) {
    const frontmatterEnd = source.match(/^---\r?\n[\s\S]*?\r?\n---/);
    if (!frontmatterEnd) throw new Error(`Missing YAML frontmatter: ${file}`);
    const updatedFrontmatter = existing
      ? frontmatterEnd[0].replace(/^atUri:.*$/m, `atUri: "${uri}"`)
      : frontmatterEnd[0].replace(/^---\r?\n/, `---\natUri: "${uri}"\n`);
    const updated = source.replace(frontmatterEnd[0], updatedFrontmatter);
    await fs.writeFile(file, updated);
  }
  count++;
}
for (const name of await fs.readdir(output)) {
  if (name.endsWith('.json') && !expected.has(name)) await fs.rm(path.join(output, name));
}
console.log(`${count} Standard.site records generated${sync ? ' and published' : ''}.`);
