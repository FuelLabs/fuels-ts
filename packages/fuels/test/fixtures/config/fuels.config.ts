import { FUEL_NETWORK_URL } from '@fuel-ts/wallet/configs';
import { join } from 'path';

import type { FuelsConfig } from '../../../src';

const projectPath = join(__dirname, '..', 'project');

const contractsDir = join(projectPath, 'contracts');
const scriptsDir = join(projectPath, 'scripts');
const predicatesDir = join(projectPath, 'predicates');

export const fuelsConfig: FuelsConfig = {
  basePath: projectPath,
  // workspace: '/root/project',
  contracts: [join(contractsDir, 'foo'), join(contractsDir, 'bar')],
  scripts: [join(scriptsDir, 'script')],
  predicates: [join(predicatesDir, 'predicate')],
  output: '/generated-types',
  deployConfig: {
    gasPrice: 5,
  },
  useBuiltinForc: false,
  useBuiltinFuelCore: false,
  autoStartFuelCore: true,
  fuelCorePort: 4000,
  providerUrl: FUEL_NETWORK_URL,
  configPath: __filename,
};
