import type { BuildOptions } from 'esbuild';
import JoyCon from 'joycon';
import { resolve, parse } from 'path';

import { readForcToml, readSwayType, SwayType } from '../../services';
import type { ParsedFuelsConfig, UserFuelsConfig } from '../../types';

import { validateConfig } from './validateConfig';

export async function loadConfig(cwd: string): Promise<ParsedFuelsConfig> {
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

  const userConfig: UserFuelsConfig = result.mod.default;

  await validateConfig(userConfig);

  // Start clone-object while initializiung optional props
  const config: ParsedFuelsConfig = {
    contracts: [],
    scripts: [],
    predicates: [],
    deployConfig: {},
    useSystemForc: false,
    useSystemFuelCore: false,
    autoStartFuelCore: true,
    fuelCorePort: 4000,
    ...userConfig,
    basePath: cwd,
  };

  // Resolve the output path on loaded config
  config.output = resolve(cwd, config.output);

  // Initialize optional variables
  config.useSystemForc = config.useSystemForc ?? false;
  config.useSystemFuelCore = config.useSystemFuelCore ?? false;
  config.autoStartFuelCore = config.autoStartFuelCore ?? true;

  const { contracts, predicates, scripts } = userConfig;

  if (!userConfig.workspace) {
    // Resolve members individually
    config.contracts = (contracts || []).map((c: string) => resolve(cwd, c));
    config.scripts = (scripts || []).map((s: string) => resolve(cwd, s));
    config.predicates = (predicates || []).map((p: string) => resolve(cwd, p));
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

    config.workspace = workspace;

    config.contracts = projectTypes
      .filter(({ type }) => type === SwayType.contract)
      .map(({ path }) => path);

    config.predicates = projectTypes
      .filter(({ type }) => type === SwayType.predicate)
      .map(({ path }) => path);

    config.scripts = projectTypes
      .filter(({ type }) => type === SwayType.script)
      .map(({ path }) => path);
  }

  return config;
}
