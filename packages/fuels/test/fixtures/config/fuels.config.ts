import { FUEL_NETWORK_URL } from '@fuel-ts/wallet/configs';
import { join } from 'path';

import type { FuelsConfig } from '../../../src';

const projectPath = join(__dirname, '..', 'project');

export const fuelsConfig: FuelsConfig = {
  basePath: projectPath,
  // workspace: '/root/project',
  contracts: [join(projectPath, 'foo'), join(projectPath, 'bar')],
  predicates: [join(projectPath, 'predicate')],
  scripts: [join(projectPath, 'script')],
  output: '/generated-types',
  deployConfig: {
    gasPrice: 5,
  },
  useBuiltinForc: false,
  useBuiltinFuelCore: false,
  autoStartFuelCore: true,
  fuelCorePort: 4000,
  providerUrl: FUEL_NETWORK_URL,
};
