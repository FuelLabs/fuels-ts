import { readFileSync, readdirSync, writeFileSync } from 'fs';
import { hexlify } from 'fuels';
import { join } from 'path';

const projectsDir = join(__dirname, '../test/fixtures/forc-projects');

const files = readdirSync(projectsDir).filter((file) => file.includes('predicate-'));

const { log } = console;

files.forEach((filePath) => {
  log('Process predicate: ', filePath);

  const basePath = join(projectsDir, filePath);
  const binaryPath = join(basePath, '/out/release/', `${filePath}.bin`);
  const binaryTSPath = join(basePath, 'index.ts');
  const bytes = readFileSync(binaryPath);

  // Put hexlified binary in a TS file so it can be imported
  const predicateTs = `export default '${hexlify(bytes)}';\n`;
  writeFileSync(binaryTSPath, predicateTs);
});
