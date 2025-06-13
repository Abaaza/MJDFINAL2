import assert from 'node:assert/strict';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import XLSX from 'xlsx';
import { matchFromFiles } from '../src/services/matchService.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pricePath = path.resolve(__dirname, '../MJD-PRICELIST.xlsx');
// Generate a temporary input workbook so the test is self-contained
const tmpInput = path.resolve(__dirname, 'tmpInput.xlsx');
const wb = XLSX.utils.book_new();
const ws = XLSX.utils.aoa_to_sheet([
  ['Description', 'Qty', 'Rate', 'Unit'],
  ['Test item', 2, 15, 'm']
]);
XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
XLSX.writeFile(wb, tmpInput);
const inputBuf = fs.readFileSync(tmpInput);

const results = matchFromFiles(pricePath, inputBuf);

fs.unlinkSync(tmpInput);

assert.ok(Array.isArray(results));
assert.ok(results.length > 0);
assert.ok(results[0].hasOwnProperty('inputDescription'));
assert.ok(Array.isArray(results[0].matches));

