import { join } from 'path';

import type { FuelsConfig } from '../../src';

const projectPath = join(__dirname, 'workspace');

const contractsDir = join(projectPath, 'contracts');
const scriptsDir = join(projectPath, 'scripts');
const predicatesDir = join(projectPath, 'predicates');

export const fuelsConfig: FuelsConfig = {
  basePath: projectPath,
  // workspace: '/root/project',
  contracts: [join(contractsDir, 'foo'), join(contractsDir, 'bar')],
  scripts: [join(scriptsDir, 'script')],
  predicates: [join(predicatesDir, 'predicate')],
  output: '/output',
  forcPath: 'fuels-forc',
  fuelCorePath: 'fuels-core',
  deployConfig: {},
  autoStartFuelCore: true,
  fuelCorePort: 4000,
  providerUrl: 'http://127.0.0.1:4000/v1/graphql',
  configPath: __filename,
  forcBuildFlags: [],
  buildMode: 'debug',
};
