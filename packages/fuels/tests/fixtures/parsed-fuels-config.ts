import type { ParsedFuelsConfig } from '../../src';

export const parsedFuelsConfig: ParsedFuelsConfig = {
  basePath: '/root',
  // workspace: '/root/project',
  contracts: ['/root/project/foo', '/root/project/bar'],
  predicates: ['/root/project/predicate'],
  scripts: ['/root/project/script'],
  output: '/types',
  useSystemForc: false,
  useSystemFuelCore: false,
  autoStartFuelCore: false,
  fuelCorePort: 4000,
  deployConfig: {
    gasPrice: 5,
  },
};
