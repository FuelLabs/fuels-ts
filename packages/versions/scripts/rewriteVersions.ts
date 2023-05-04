import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

export const readVersionsFromFiles = () => {
  const rootDir = join(__dirname, '../../..');
  const packagesDir = join(rootDir, 'packages');
  const dockerDir = join(rootDir, '.docker');

  // forc-bin
  const forcPath = join(packagesDir, 'forc-bin', 'package.json');
  const forcPkgJson = JSON.parse(readFileSync(forcPath, 'utf8'));

  // fuel-core
  const dockerFilePath = join(dockerDir, 'fuel-core', 'Dockerfile');
  const dockerFileContents = readFileSync(dockerFilePath, 'utf8');
  const regexFuelcore = /FROM ghcr\.io\/fuellabs\/fuel-core:v(\d+\.\d+\.\d+)/;
  const match = dockerFileContents.match(regexFuelcore);

  // fuels
  const fuelsPath = join(packagesDir, 'fuels', 'package.json');
  const fuelsPkgJson = JSON.parse(readFileSync(fuelsPath, 'utf8'));

  const versions = {
    FORC: forcPkgJson.config.forcVersion,
    FUELS: fuelsPkgJson.version,
    FUEL_CORE: match?.[1],
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

  const filepath = join(__dirname, '..', 'src', 'lib', 'getSupportedVersions.ts');

  let contents = readFileSync(filepath, 'utf8');

  contents = contents.replace(/FUELS: '[\d.]+'/, `FUELS: '${FUELS}'`);
  contents = contents.replace(/FORC: '[\d.]+'/, `FORC: '${FORC}'`);
  contents = contents.replace(/FUEL_CORE: '[\d.]+'/, `FUEL_CORE: '${FUEL_CORE}'`);

  writeFileSync(filepath, contents);
};

// Do not auto-run script when inside jest runner
if (!/jest\.js$/m.test(process.argv[1])) {
  rewriteVersions();
}
