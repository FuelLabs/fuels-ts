import { bundleRequire } from 'bundle-require';
import JoyCon from 'joycon';
import path from 'path';

import { validateConfig } from '../actions/validateConfig';
import type { ContractsConfig } from '../types';

import { createContractsConfig } from './createContractsConfig';

function normalizeConfigPaths(cwd: string, config: ContractsConfig): ContractsConfig {
  const { contracts, types, ...rest } = config;
  return {
    ...rest,
    types: {
      output: path.resolve(cwd, types.output),
    },
    contracts: contracts.map((contract) => ({
      ...contract,
      path: path.resolve(cwd, contract.path),
    })),
    onSuccess: config.onSuccess || createContractsConfig,
  };
}

export async function loadConfig(cwd: string): Promise<ContractsConfig> {
  const configJoycon = new JoyCon();
  const configPath = await configJoycon.resolve({
    files: ['contracts.config.ts'],
    cwd,
    stopDir: path.parse(cwd).root,
    packageKey: 'tsup',
  });

  if (configPath) {
    const result = await bundleRequire({
      filepath: configPath,
    });
    const config = result.mod.default;

    if (config.env) {
      // If env config is provide override current
      // process.env with new envs
      Object.assign(process.env, config.env);
    }

    await validateConfig(config);

    return normalizeConfigPaths(cwd, config);
  }

  throw new Error('Config file not found!');
}
