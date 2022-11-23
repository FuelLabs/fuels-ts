import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

import { expectCleanIndex } from './expectCleanIndex';
import { getToolchainVersions } from './getToolchainVersions';

export function rewriteIndex() {
  const indexFilepath = join(__dirname, '..', 'src', 'index.ts');

  const { FUEL_CORE, FORC, FUELS } = getToolchainVersions();

  let contents = readFileSync(indexFilepath, 'utf-8');

  contents = contents.replace(/FUELS:.+/, `FUELS: process.env.BUILD_VERSION || '${FUELS}',`);
  contents = contents.replace(/FUEL_CORE:.+/, `FUEL_CORE: '${FUEL_CORE}',`);
  contents = contents.replace(/FORC:.+/, `FORC: '${FORC}',`);

  writeFileSync(indexFilepath, contents);

  expectCleanIndex();
}

rewriteIndex();
