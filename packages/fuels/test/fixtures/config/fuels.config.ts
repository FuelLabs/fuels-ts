import { FUEL_NETWORK_URL } from '@fuel-ts/wallet/configs';

import type { FuelsConfig } from '../../../src';

export const fuelsConfig: FuelsConfig = {
  basePath: '/root',
  // workspace: '/root/project',
  contracts: ['/root/project/foo', '/root/project/bar'],
  predicates: ['/root/project/predicate'],
  scripts: ['/root/project/script'],
  output: '/types',
  deployConfig: {
    gasPrice: 5,
  },
  useBuiltinForc: true,
  useBuiltinFuelCore: true,
  autoStartFuelCore: false,
  fuelCorePort: 4000,
  providerUrl: FUEL_NETWORK_URL,
};
