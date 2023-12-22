import type { FSWatcher } from 'chokidar';
import { watch } from 'chokidar';
import { globSync } from 'glob';

import { loadConfig } from '../../config/loadConfig';
import type { FuelsConfig } from '../../types';
import { error, log } from '../../utils/logger';
import { build } from '../build';
import { deploy } from '../deploy';
import { withConfigErrorHandler } from '../withConfig';

import { autoStartFuelCore } from './autoStartFuelCore';
import type { FuelCoreNode } from './startFuelCore';

export const closeAllFileHandlers = (handlers: FSWatcher[]) => {
  handlers.forEach((h) => h.close());
};

export const buildAndDeploy = async (config: FuelsConfig) => {
  await build(config);
  return deploy(config);
};

export const getConfigFilepathsToWatch = (config: FuelsConfig) => {
  const configFilePathsToWatch: string[] = [config.configPath];
  if (config.chainConfig) {
    configFilePathsToWatch.push(config.chainConfig);
  }
  return configFilePathsToWatch;
};

export type DevState = {
  config: FuelsConfig;
  watchHandlers: FSWatcher[];
  fuelCore?: FuelCoreNode;
};

export const workspaceFileChanged = (state: DevState) => async (_event: string, path: string) => {
  log(`\nFile changed: ${path}`);
  await buildAndDeploy(state.config);
};

export const configFileChanged = (state: DevState) => async (_event: string, path: string) => {
  log(`\nFile changed: ${path}`);

  closeAllFileHandlers(state.watchHandlers);
  state.fuelCore?.killChildProcess();

  try {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    await dev(await loadConfig(state.config.basePath));
  } catch (err: unknown) {
    await withConfigErrorHandler(<Error>err, state.config);
  }
};

export const dev = async (config: FuelsConfig) => {
  const fuelCore = await autoStartFuelCore(config);

  const configFilePaths = getConfigFilepathsToWatch(config);

  const { contracts, scripts, predicates, basePath: cwd } = config;

  const workspaceFilePaths = [contracts, predicates, scripts]
    .flat()
    .flatMap((dir) => [
      dir,
      globSync(`${dir}/**/*.toml`, { cwd }),
      globSync(`${dir}/**/*.sw`, { cwd }),
    ])
    .flat();

  try {
    // Run once
    await buildAndDeploy(config);

    const watchHandlers: FSWatcher[] = [];
    const options = { persistent: true, ignoreInitial: true, ignored: '**/out/**' };
    const state = { config, watchHandlers, fuelCore };

    // watch: fuels.config.ts and chainConfig.json
    watchHandlers.push(watch(configFilePaths, options).on('all', configFileChanged(state)));

    // watch: Forc's workspace members
    watchHandlers.push(watch(workspaceFilePaths, options).on('all', workspaceFileChanged(state)));
  } catch (err: unknown) {
    error(err);
    throw err;
  }
};
