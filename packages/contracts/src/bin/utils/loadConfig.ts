import type { BuildOptions } from 'esbuild';
import JoyCon from 'joycon';
import path from 'path';

import { readForcToml } from '../../services';
import type { LoadedConfig } from '../../types';

import { validateConfig } from './validateConfig';

export async function loadConfig(cwd: string): Promise<LoadedConfig> {
  // bundle-require needs to be imported dynamically
  // in order to be able to use it
  // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
  const { bundleRequire } = require('bundle-require');
  const configJoycon = new JoyCon();
  const configPath = await configJoycon.resolve({
    files: ['contracts.config.ts'],
    cwd,
    stopDir: path.parse(cwd).root,
    packageKey: 'tsup',
  });

  if (configPath) {
    const esbuildOptions: BuildOptions = {
      target: 'ES2021',
      platform: 'node',
      format: 'esm',
    };
    const result = await bundleRequire({
      filepath: configPath,
      esbuildOptions,
    });
    const config = result.mod.default;

    await validateConfig(config);

    // Set the base path on loaded config
    config.basePath = cwd;
    // Resolve the output path on loaded config
    config.output = path.resolve(cwd, config.output);

    // If workspace is set, resolve the members of the workspace and
    // set the contract paths on loaded config
    if (config.workspace) {
      config.workspace = path.resolve(cwd, config.workspace);
      const forcToml = await readForcToml(config.workspace);
      config.contracts = forcToml.workspace.members.map((member) =>
        path.resolve(config.workspace, member)
      );
      // If workspace is not set, resolve the contract paths
      // on loaded config
    } else if (config.contracts) {
      config.contracts = (config.contracts || []).map((contract: string) =>
        path.resolve(cwd, contract)
      );
    }

    return config;
  }

  throw new Error('Config file not found!');
}
