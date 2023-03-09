/* eslint-disable no-console */
import fs from 'fs';
import { readFile, writeFile } from 'fs/promises';
import { hexlify } from 'fuels';
import { join } from 'path';

console.log('Process predicates');

const files = fs
  .readdirSync(join(__dirname, '../test-projects'))
  .filter((file) => file.includes('predicate-'));

async function init() {
  Promise.all(
    files.map(async (filePath) => {
      console.log('Process predicate: ', filePath);
      const basePath = join(__dirname, '../test-projects', filePath);
      const binaryPath = join(basePath, '/out/debug/', `${filePath}.bin`);
      const binaryTSPath = join(basePath, 'index.ts');
      const bytes = await readFile(binaryPath);
      const predicateTs = `export default '${hexlify(bytes)}';\n`;
      await writeFile(binaryTSPath, predicateTs);
    })
  );
}

init();
