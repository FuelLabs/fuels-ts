import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

export const readVersionsFromFiles = () => {
  const rootDir = join(__dirname, '../../..');
  const packagesDir = join(rootDir, 'packages');

  // forc
  const forcPath = join(packagesDir, 'forc', 'VERSION');
  const forcContents = readFileSync(forcPath, 'utf8');
  const forcVersion = forcContents.match(/^.+$/m)?.[0] || forcContents;

  // fuel-core
  const fuelCorePath = join(packagesDir, 'fuel-core', 'VERSION');
  const fuelCoreContents = readFileSync(fuelCorePath, 'utf8');
  const fuelCoreVersion = fuelCoreContents.match(/^.+$/m)?.[0] || fuelCoreContents;

  // fuels
  const fuelsPath = join(packagesDir, 'fuels', 'package.json');
  const fuelsPkgJson = JSON.parse(readFileSync(fuelsPath, 'utf8'));

  const versions = {
    FORC: forcVersion,
    FUELS: fuelsPkgJson.version,
    FUEL_CORE: fuelCoreVersion,
  };

  return versions;
};

export const readVersionsFromEnv = () => {
  const versions = {
    FORC: process.env.FORC_VERSION,
    FUEL_CORE: process.env.FUEL_CORE_VERSION,
    FUELS: process.env.BUILD_VERSION,
  };
  return versions;
};

export const readVersions = () => {
  const fromFiles = readVersionsFromFiles();
  const fromEnv = readVersionsFromEnv();

  const FUELS = fromEnv.FUELS || fromFiles.FUELS;
  const FORC = fromEnv.FORC || fromFiles.FORC;
  const FUEL_CORE = fromEnv.FUEL_CORE || fromFiles.FUEL_CORE;

  return { FUELS, FORC, FUEL_CORE };
};

export const rewriteVersions = () => {
  const { FUELS, FORC, FUEL_CORE } = readVersions();

  const filepath = join(__dirname, '..', 'src', 'lib', 'getBuiltinVersions.ts');

  let contents = readFileSync(filepath, 'utf8');

  contents = contents.replace(/FUELS: '[\d.]+'/, `FUELS: '${FUELS}'`);
  contents = contents.replace(/FORC: '[\d.]+'/, `FORC: '${FORC}'`);
  contents = contents.replace(/FUEL_CORE: '[\d.]+'/, `FUEL_CORE: '${FUEL_CORE}'`);

  writeFileSync(filepath, contents);
};

/* istanbul ignore next */
// Do not auto-run script when inside vitest
if (!process.env.VITEST) {
  rewriteVersions();
}
