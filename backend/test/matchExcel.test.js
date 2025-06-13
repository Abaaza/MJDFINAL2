import assert from 'node:assert/strict';
import { spawnSync } from 'child_process';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import XLSX from 'xlsx';

const __dirname = dirname(fileURLToPath(import.meta.url));
const cwd = path.resolve(__dirname, '..');

// Create a temporary input workbook so tests do not rely on external files
const tmpInput = path.resolve(__dirname, 'tmpInput.xlsx');
const wb = XLSX.utils.book_new();
const ws = XLSX.utils.aoa_to_sheet([
  ['Description', 'Qty', 'Rate', 'Unit'],
  ['Test item', 1, 10, 'm']
]);
XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
XLSX.writeFile(wb, tmpInput);
assert.ok(fs.existsSync(tmpInput));

const proc = spawnSync('node', [
  'scripts/matchExcel.js',
  'MJD-PRICELIST.xlsx',
  tmpInput
], { encoding: 'utf8', cwd });

// Clean up the temporary file if it exists
try { fs.unlinkSync(tmpInput); } catch { /* ignore */ }

assert.strictEqual(proc.status, 0);
const lines = proc.stdout.trim().split('\n');
const start = lines.findIndex(l => l.trim().startsWith('['));
const jsonStr = lines.slice(start).join('\n');
const data = JSON.parse(jsonStr);
assert.ok(Array.isArray(data));
assert.ok(data.length > 0);
assert.ok(Array.isArray(data[0].matches));

