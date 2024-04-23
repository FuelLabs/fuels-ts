import { versions } from '@fuel-ts/versions';

export default {
  load() {
    const { FORC, FUELS, FUEL_CORE } = versions;

    return {
      forc: FORC,
      fuels: FUELS,
      fuelCore: FUEL_CORE,
      fuelsInstallVersion: '~0.82.0',
    };
  },
};
