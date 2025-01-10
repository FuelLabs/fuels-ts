import { FuelError } from '@fuel-ts/errors';
import { defaultConsensusKey } from '@fuel-ts/utils';
import { bundleRequire } from 'bundle-require';
import type { BuildOptions } from 'esbuild';
import JoyCon from 'joycon';
import { resolve, parse } from 'path';

import { tryFindBinaries } from '../../cli-utils';
import type { FuelsConfig, UserFuelsConfig } from '../types';

import { SwayType, readForcToml, readSwayType } from './forcUtils';
import { validateConfig } from './validateConfig';

export async function loadUserConfig(
  cwd: string
): Promise<{ userConfig: UserFuelsConfig; configPath: string }> {
  const configJoycon = new JoyCon();

  const configPath = await configJoycon.resolve({
    files: ['ts', 'js', 'cjs', 'mjs'].map((e) => `fuels.config.${e}`),
    cwd,
    stopDir: parse(cwd).root,
  });

  if (!configPath) {
    throw new FuelError(FuelError.CODES.CONFIG_FILE_NOT_FOUND, 'Config file not found!');
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
  return { configPath, userConfig };
}

export async function loadConfig(cwd: string): Promise<FuelsConfig> {
  const { configPath, userConfig } = await loadUserConfig(cwd);
  await validateConfig(userConfig);

  const { forcBuildFlags = [] } = userConfig;
  const releaseFlag = forcBuildFlags.find((f) => f === '--release');
  const buildMode = releaseFlag ? 'release' : 'debug';

  const { forcPath, fuelCorePath } = tryFindBinaries({
    forcPath: userConfig.forcPath,
    fuelCorePath: userConfig.fuelCorePath,
  });

  // Start clone-object while initializing optional props
  const config: FuelsConfig = {
    contracts: [],
    scripts: [],
    predicates: [],
    deployConfig: {},
    autoStartFuelCore: true,
    fuelCorePort: 4000,
    providerUrl: process.env.FUEL_NETWORK_URL ?? 'http://127.0.0.1:4000/v1/graphql',
    privateKey: defaultConsensusKey,
    ...userConfig,
    basePath: cwd,
    forcPath,
    fuelCorePath,
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

      throw new FuelError(
        FuelError.CODES.WORKSPACE_NOT_DETECTED,
        [workspaceMsg, exampleMsg].join('\n\n')
      );
    }

    const swayMembers = forcToml.workspace.members.map((member) => resolve(workspace, member));

    swayMembers
      .map((path) => ({ path, type: readSwayType(path) }))
      .filter(({ type }) => type !== SwayType.library)
      .forEach(({ path, type }) => config[`${type as Exclude<SwayType, 'library'>}s`].push(path));

    config.workspace = workspace;
  }

  return config;
}
