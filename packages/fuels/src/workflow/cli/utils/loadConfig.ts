import type { BuildOptions } from 'esbuild';
import JoyCon from 'joycon';
import path from 'path';

import { readForcToml, readSwayType, SwayType } from '../../services';
import type { LoadedConfig } from '../../types';

import { validateConfig } from './validateConfig';

export async function loadConfig(cwd: string): Promise<LoadedConfig> {
  // bundle-require needs to be imported dynamically
  // in order to be able to use it
  // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
  const { bundleRequire } = require('bundle-require');
  const configJoycon = new JoyCon();
  const configPath = await configJoycon.resolve({
    files: ['fuels.config.ts'],
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
      cwd,
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
      const members = forcToml.workspace.members.map((member) =>
        path.resolve(config.workspace, member)
      );
      const projectTypes = await Promise.all(
        members.map(async (m) => ({
          type: await readSwayType(m),
          path: m,
        }))
      );

      // Set the contracts paths on loaded config
      config.contracts = projectTypes
        .filter((pt) => pt.type === SwayType.contract)
        .map((pt) => pt.path);
      // Set the predicates paths on loaded config
      config.predicates = projectTypes
        .filter((pt) => pt.type === SwayType.predicate)
        .map((pt) => pt.path);
      // Set the scripts paths on loaded config
      config.scripts = projectTypes
        .filter((pt) => pt.type === SwayType.script)
        .map((pt) => pt.path);
      // If workspace is not set, resolve the contract paths
      // on loaded config
    } else if (config.contracts || config.scripts || config.predicates) {
      config.contracts = (config.contracts || []).map((contract: string) =>
        path.resolve(cwd, contract)
      );
      config.scripts = (config.scripts || []).map((script: string) => path.resolve(cwd, script));
      config.predicates = (config.predicates || []).map((predicate: string) =>
        path.resolve(cwd, predicate)
      );
    }

    return config;
  }

  throw new Error('Config file not found!');
}
