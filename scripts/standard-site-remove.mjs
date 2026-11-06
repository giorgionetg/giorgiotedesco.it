import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

const did = 'did:plc:27g2oqb2vz6k2mkezsx4a2sx';
const site = `at://${did}/site.standard.publication/3mywkviwovv25`;
const collection = 'site.standard.document';
const remove = process.argv.includes('--delete');
if (remove && !process.env.ATPROTO_APP_PASSWORD) throw new Error('ATPROTO_APP_PASSWORD is required for --delete');

async function json(response, operation) {
  if (!response.ok) throw new Error(`${operation}: HTTP ${response.status} ${await response.text()}`);
  return response.json();
}
const plc = await json(await fetch(`https://plc.directory/${did}`), 'PLC lookup');
if (plc.id !== did) throw new Error('Unexpected DID in PLC response');
const pds = plc.service?.find(s => s.id === '#atproto_pds' && s.type === 'AtprotoPersonalDataServer')?.serviceEndpoint;
if (!/^https:\/\/[a-zA-Z0-9.-]+$/.test(pds ?? '')) throw new Error('Invalid PDS endpoint');

async function listRecords() {
  const records = [];
  let cursor;
  do {
    const url = new URL(`${pds}/xrpc/com.atproto.repo.listRecords`);
    url.searchParams.set('repo', did);
    url.searchParams.set('collection', collection);
    url.searchParams.set('limit', '100');
    if (cursor) url.searchParams.set('cursor', cursor);
    const page = await json(await fetch(url), 'listRecords');
    records.push(...page.records);
    cursor = page.cursor;
  } while (cursor);
  return records;
}
const all = await listRecords();
const selected = all.filter(item => item.value?.site === site);
console.log(`Found ${selected.length} records for this site; ${all.length - selected.length} other records will remain untouched.`);
for (const item of selected) console.log(`${item.uri} ${item.value.path ?? ''}`);
if (!remove) {
  console.log('Read-only preview. Pass --delete with ATPROTO_APP_PASSWORD to remove the selected records.');
  process.exit(0);
}
const backupDir = await fs.mkdtemp(path.join(os.tmpdir(), 'standard-site-pds-backup-'));
const backupPath = path.join(backupDir, 'records.json');
await fs.writeFile(backupPath, `${JSON.stringify(selected, null, 2)}\n`, { mode: 0o600 });
console.log(`Backup: ${backupPath}`);
const session = await json(await fetch(`${pds}/xrpc/com.atproto.server.createSession`, {
  method: 'POST', headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ identifier: did, password: process.env.ATPROTO_APP_PASSWORD }),
}), 'createSession');
if (session.did !== did || !session.accessJwt) throw new Error('Unexpected session DID');
for (const item of selected) {
  const rkey = item.uri.slice(item.uri.lastIndexOf('/') + 1);
  await json(await fetch(`${pds}/xrpc/com.atproto.repo.deleteRecord`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.accessJwt}` },
    body: JSON.stringify({ repo: did, collection, rkey }),
  }), `deleteRecord ${item.uri}`);
}
const remaining = (await listRecords()).filter(item => item.value?.site === site);
if (remaining.length) throw new Error(`${remaining.length} site records remain after deletion`);
console.log(`Removed ${selected.length} site records; verified zero remain.`);
