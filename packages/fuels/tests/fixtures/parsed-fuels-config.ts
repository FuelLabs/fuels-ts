import { FUEL_NETWORK_URL, type FuelsConfig } from '../../src';

export const parsedFuelsConfig: FuelsConfig = {
  basePath: '/root',
  // workspace: '/root/project',
  contracts: ['/root/project/foo', '/root/project/bar'],
  predicates: ['/root/project/predicate'],
  scripts: ['/root/project/script'],
  output: '/types',
  deployConfig: {
    gasPrice: 5,
  },
  useSystemForc: false,
  useSystemFuelCore: false,
  autoStartFuelCore: false,
  fuelCorePort: 4000,
  providerUrl: FUEL_NETWORK_URL,
};
