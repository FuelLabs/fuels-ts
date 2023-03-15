import { versions } from '@fuel-ts/versions';
import fs from 'fs';
import path from 'path';

type TVersions = {
  FUELS: string;
  FUEL_CORE: string;
  FORC: string;
};

const normalizeVersions = (params: TVersions) => {
  let { FORC, FUELS, FUEL_CORE } = params;

  const versionRegex = /0\.0\.0/;

  try {
    if (versionRegex.test(FORC)) {
      const forcBinPath = path.join(__dirname, '../../../packages/forc-bin/package.json');
      const forcFile = fs.readFileSync(forcBinPath, 'utf8');
      const { config } = JSON.parse(forcFile);
      ({ forcVersion: FORC } = config);
    }

    if (versionRegex.test(FUELS)) {
      const fuelsPath = path.join(__dirname, '../../../packages/fuels/package.json');
      const fuelsFile = fs.readFileSync(fuelsPath, 'utf8');
      ({ version: FUELS } = JSON.parse(fuelsFile));
    }

    if (versionRegex.test(FUEL_CORE)) {
      const dockerfilePath = path.join(__dirname, '../../../services/fuel-core/Dockerfile');
      const dockerfile = fs.readFileSync(dockerfilePath, 'utf8');
      const regexFuelcore = /FROM ghcr\.io\/fuellabs\/fuel-core:v(\d+\.\d+\.\d+)/;
      const match = dockerfile.match(regexFuelcore);
      FUEL_CORE = match?.[1] || FUEL_CORE;
    }
  } catch {
    return params;
  }

  return {
    FORC,
    FUELS,
    FUEL_CORE,
  };
};

export default {
  load() {
    const { FORC, FUELS, FUEL_CORE } = normalizeVersions(versions);

    return {
      forc: FORC,
      sway: FORC,
      fuels: FUELS,
      fuelCore: FUEL_CORE,
    };
  },
};
