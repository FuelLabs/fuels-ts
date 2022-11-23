import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

import { expectCleanIndex } from './expectCleanIndex';

const dockerFilepath = join(__dirname, '..', '..', '..', 'services', 'fuel-core', 'Dockerfile');
const forcPackagePath = join(__dirname, '..', '..', 'forc-bin', 'package.json');
const fuelsPackagePath = join(__dirname, '..', '..', 'fuels', 'package.json');

function getLocalVersions() {
  const dockerContents = readFileSync(dockerFilepath, 'utf-8');
  const forcJson = JSON.parse(readFileSync(forcPackagePath, 'utf-8'));
  const fuelsJson = JSON.parse(readFileSync(fuelsPackagePath, 'utf-8'));

  const dockerMatch = /fuel-core:v([0-9.]+)$/gm.exec(dockerContents);

  if (!dockerMatch?.length) {
    throw new Error(`Could not read version from ${dockerFilepath}`);
  }

  const fuelCore = dockerMatch[1];
  const forc = forcJson.config.forcVersion;
  const fuels = fuelsJson.version;

  return {
    fuelCore,
    forc,
    fuels,
  };
}

export function rewriteIndex() {
  const indexFilepath = join(__dirname, '..', 'src', 'index.ts');

  const { fuelCore, forc, fuels } = getLocalVersions();

  let contents = readFileSync(indexFilepath, 'utf-8');

  contents = contents.replace(/FUELS:.+/, `FUELS: process.env.BUILD_VERSION || '${fuels}',`);
  contents = contents.replace(/FUEL_CORE:.+/, `FUEL_CORE: '${fuelCore}',`);
  contents = contents.replace(/FORC:.+/, `FORC: '${forc}',`);

  writeFileSync(indexFilepath, contents);

  expectCleanIndex();
}

rewriteIndex();
