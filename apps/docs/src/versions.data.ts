import fs from 'fs';
import path from 'path';

const readVersionsFromFiles = () => {
  const versions = {
    FORC: '0.0.0',
    FUELS: '0.0.0',
    FUEL_CORE: '0.0.0',
  };

  try {
    const forcBinPath = path.join(__dirname, '../../../packages/forc-bin/package.json');
    const forcFile = fs.readFileSync(forcBinPath, 'utf8');
    const { config } = JSON.parse(forcFile);
    ({ forcVersion: versions.FORC } = config);

    const fuelsPath = path.join(__dirname, '../../../packages/fuels/package.json');
    const fuelsFile = fs.readFileSync(fuelsPath, 'utf8');
    ({ version: versions.FUELS } = JSON.parse(fuelsFile));

    const dockerfilePath = path.join(__dirname, '../../../services/fuel-core/Dockerfile');
    const dockerfile = fs.readFileSync(dockerfilePath, 'utf8');
    const regexFuelcore = /FROM ghcr\.io\/fuellabs\/fuel-core:v(\d+\.\d+\.\d+)/;
    const match = dockerfile.match(regexFuelcore);
    versions.FUEL_CORE = match?.[1] || versions.FUEL_CORE;
  } catch {
    return versions;
  }

  return versions;
};

export default {
  load() {
    const { FORC, FUELS, FUEL_CORE } = readVersionsFromFiles();

    return {
      forc: FORC,
      fuels: FUELS,
      fuelCore: FUEL_CORE,
    };
  },
};
