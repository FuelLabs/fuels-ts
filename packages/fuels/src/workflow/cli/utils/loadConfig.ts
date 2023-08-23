import type { BuildOptions } from 'esbuild';
import JoyCon from 'joycon';
import { resolve, parse } from 'path';

import { readForcToml, readSwayType, SwayType } from '../../services';
import type { LoadedConfig, FuelsConfig } from '../../types';

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

  const userConfig: FuelsConfig = result.mod.default;

  await validateConfig(userConfig);

  // Start clone-object while initializiung optional props
  const config: LoadedConfig = {
    contracts: [],
    scripts: [],
    predicates: [],
    ...userConfig,
    basePath: cwd,
  };

  // Resolve the output path on loaded config
  config.output = resolve(cwd, config.output);

  // Initialize optional variables
  config.useSystemForc = config.useSystemForc ?? false;
  config.useSystemFuelCore = config.useSystemFuelCore ?? false;
  config.shouldAutoStartFuelCoreNode = config.shouldAutoStartFuelCoreNode ?? true;

  if (!userConfig.workspace) {
    // Resolve members individually
    userConfig.contracts = (userConfig.contracts || []).map((c: string) => resolve(cwd, c));
    userConfig.scripts = (userConfig.scripts || []).map((s: string) => resolve(cwd, s));
    userConfig.predicates = (userConfig.predicates || []).map((p: string) => resolve(cwd, p));
  } else {
    // Resolve members via workspace
    const workspace = resolve(cwd, userConfig.workspace);
    const forcToml = await readForcToml(workspace);
    const swayMembers = forcToml.workspace.members.map((member) => resolve(workspace, member));

    const projectTypes = await Promise.all(
      swayMembers.map(async (m) => ({
        type: await readSwayType(m),
        path: m,
      }))
    );

    userConfig.contracts = projectTypes
      .filter((pt) => pt.type === SwayType.contract)
      .map((pt) => pt.path);

    userConfig.predicates = projectTypes
      .filter((pt) => pt.type === SwayType.predicate)
      .map((pt) => pt.path);

    userConfig.scripts = projectTypes
      .filter((pt) => pt.type === SwayType.script)
      .map((pt) => pt.path);
  }

  return config;
}
