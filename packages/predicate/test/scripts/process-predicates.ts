import { hexlify } from '@ethersproject/bytes';
import { readFileSync, readdirSync, writeFileSync } from 'fs';
import { join } from 'path';

const projectsDir = join(__dirname, '../fixtures/forc-projects');

console.log('dan', projectsDir);

const files = readdirSync(projectsDir).filter((file) => file.includes('predicate-'));


console.log('da2n', files);

const { log } = console;

files.forEach((filePath) => {
  log('Process predicate: ', filePath);

  const basePath = join(projectsDir, filePath);
  const binaryPath = join(basePath, '/out/debug/', `${filePath}.bin`);
  const binaryTSPath = join(basePath, 'index.ts');
  const bytes = readFileSync(binaryPath);

  // Put hexlified binary in a TS file so it can be imported
  const predicateTs = `export default '${hexlify(bytes)}';\n`;
  writeFileSync(binaryTSPath, predicateTs);
});
