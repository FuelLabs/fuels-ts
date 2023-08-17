import type { BuildOptions } from 'esbuild';
import JoyCon from 'joycon';
import { resolve, parse } from 'path';

import { readForcToml, readSwayType, SwayType } from '../../services';
import type { LoadedConfig } from '../../types';

import { validateConfig } from './validateConfig';

export async function loadConfig(cwd: string): Promise<LoadedConfig> {
  // The package `bundle-require` needs to be imported dynamically for it to work
  // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
  const { bundleRequire } = require('bundle-require');

  const configJoycon = new JoyCon();

  const configPath = await configJoycon.resolve({
    files: ['fuels.config.ts'],
    cwd,
    stopDir: parse(cwd).root,
    packageKey: 'tsup',
  });

  if (!configPath) {
    throw new Error('Config file not found!');
  }

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
  config.output = resolve(cwd, config.output);

  // If workspace is set, expand resolved members' paths
  if (config.workspace) {
    config.workspace = resolve(cwd, config.workspace);

    const forcToml = await readForcToml(config.workspace);

    const members = forcToml.workspace.members.map((member) => resolve(config.workspace, member));

    const projectTypes = await Promise.all(
      members.map(async (m) => ({
        type: await readSwayType(m),
        path: m,
      }))
    );

    // Contracts
    config.contracts = projectTypes
      .filter((pt) => pt.type === SwayType.contract)
      .map((pt) => pt.path);

    // Predicates
    config.predicates = projectTypes
      .filter((pt) => pt.type === SwayType.predicate)
      .map((pt) => pt.path);

    // Scripts
    config.scripts = projectTypes.filter((pt) => pt.type === SwayType.script).map((pt) => pt.path);

    // Otherwise (if workspace is not set), resolve paths as-is
  } else if (config.contracts || config.scripts || config.predicates) {
    config.contracts = (config.contracts || []).map((contract: string) => resolve(cwd, contract));

    config.scripts = (config.scripts || []).map((script: string) => resolve(cwd, script));

    config.predicates = (config.predicates || []).map((predicate: string) =>
      resolve(cwd, predicate)
    );
  }

  return config;
}
