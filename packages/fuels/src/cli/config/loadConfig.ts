import { FUEL_NETWORK_URL } from '@fuel-ts/account/configs';
import { defaultConsensusKey } from '@fuel-ts/utils';
import { bundleRequire } from 'bundle-require';
import type { BuildOptions } from 'esbuild';
import JoyCon from 'joycon';
import { resolve, parse } from 'path';

import { shouldUseBuiltinForc } from '../commands/init/shouldUseBuiltinForc';
import { shouldUseBuiltinFuelCore } from '../commands/init/shouldUseBuiltinFuelCore';
import type { FuelsConfig, UserFuelsConfig } from '../types';

import { readForcToml, readSwayType } from './forcUtils';
import { validateConfig } from './validateConfig';

export async function loadConfig(cwd: string): Promise<FuelsConfig> {
  const configJoycon = new JoyCon();

  const configPath = await configJoycon.resolve({
    files: ['ts', 'js', 'cjs', 'mjs'].map((e) => `fuels.config.${e}`),
    cwd,
    stopDir: parse(cwd).root,
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

  const useBuiltinForc = userConfig.useBuiltinForc ?? shouldUseBuiltinForc();
  const useBuiltinFuelCore = userConfig.useBuiltinFuelCore ?? shouldUseBuiltinFuelCore();

  const { forcBuildFlags = [] } = userConfig;
  const releaseFlag = forcBuildFlags.find((f) => f === '--release');
  const buildMode = releaseFlag ? 'release' : 'debug';

  // Start clone-object while initializing optional props
  const config: FuelsConfig = {
    contracts: [],
    scripts: [],
    predicates: [],
    deployConfig: {},
    autoStartFuelCore: true,
    fuelCorePort: 4000,
    providerUrl: FUEL_NETWORK_URL,
    privateKey: defaultConsensusKey,
    ...userConfig,
    basePath: cwd,
    useBuiltinForc,
    useBuiltinFuelCore,
    configPath,
    forcBuildFlags,
    buildMode,
  };

  // Resolve the output path on loaded config
  config.output = resolve(cwd, config.output);

  // Initialize optional variables
  config.autoStartFuelCore = userConfig.autoStartFuelCore ?? true;

  if (!userConfig.workspace) {
    // Resolve members individually
    const { contracts, predicates, scripts } = userConfig;
    config.contracts = (contracts || []).map((c: string) => resolve(cwd, c));
    config.scripts = (scripts || []).map((s: string) => resolve(cwd, s));
    config.predicates = (predicates || []).map((p: string) => resolve(cwd, p));
  } else {
    // Resolve members via workspace
    const workspace = resolve(cwd, userConfig.workspace);
    const forcToml = readForcToml(workspace);

    if (!forcToml.workspace) {
      const workspaceMsg = `Forc workspace not detected in:\n  ${workspace}/Forc.toml`;

      const swayProgramType = readSwayType(workspace);
      const exampleMsg = `Try using '${swayProgramType}s' instead of 'workspace' in:\n  ${configPath}`;

      throw new Error([workspaceMsg, exampleMsg].join('\n\n'));
    }

    const swayMembers = forcToml.workspace.members.map((member) => resolve(workspace, member));

    swayMembers.forEach((path) => {
      const type = readSwayType(path);
      config[`${type}s`].push(path);
    });

    config.workspace = workspace;
  }

  return config;
}
