import { defaultConsensusKey } from '@fuel-ts/utils';

import type { FuelsConfig } from '../../types';

import type { FuelCoreNode } from './startFuelCore';
import { startFuelCore } from './startFuelCore';

export const autoStartFuelCore = async (config: FuelsConfig) => {
  let fuelCore: FuelCoreNode | undefined;

  if (config.autoStartFuelCore) {
    fuelCore = await startFuelCore(config);
    // eslint-disable-next-line no-param-reassign
    config.providerUrl = fuelCore.providerUrl;
    // eslint-disable-next-line no-param-reassign
    config.privateKey = defaultConsensusKey;
  }

  return fuelCore;
};
