import type { FSWatcher } from 'chokidar';
import { watch } from 'chokidar';
import { globSync } from 'glob';

import { loadConfig } from '../../config/loadConfig';
import { type FuelsConfig } from '../../types';
import { error, log } from '../../utils/logger';
import { build } from '../build';
import { deploy } from '../deploy';
import { withConfigErrorHandler } from '../withConfig';

import type { FuelCoreNode } from './autoStartFuelCore';
import { autoStartFuelCore } from './autoStartFuelCore';

export const closeAllFileHandlers = (handlers: FSWatcher[]) => {
  handlers.forEach((h) => h.close());
};

export const buildAndDeploy = async (config: FuelsConfig) => {
  await build(config);
  const deployedContracts = await deploy(config);
  config.onDev?.(config);

  return deployedContracts;
};

export const getConfigFilepathsToWatch = (config: FuelsConfig) => {
  const configFilePathsToWatch: string[] = [config.configPath];
  if (config.snapshotDir) {
    configFilePathsToWatch.push(config.snapshotDir);
  }
  return configFilePathsToWatch;
};

export type DevState = {
  config: FuelsConfig;
  watchHandlers: FSWatcher[];
  fuelCore?: FuelCoreNode;
  workspaceFilesUnderProcessing: string[];
};

export const workspaceFileChanged = (state: DevState) => async (_event: string, path: string) => {
  if (!state.workspaceFilesUnderProcessing.includes(path)) {
    log(state.workspaceFilesUnderProcessing);
    log({
      state,
    });
    log('hii');
    log(`\nFile changed: ${path}`);
    state.workspaceFilesUnderProcessing.push(path);

    try {
      await buildAndDeploy(state.config);
    } catch (err: unknown) {
      log('Error building and deploying', err);
    } finally {
      const newState = { ...state };
      newState.workspaceFilesUnderProcessing = [...state.workspaceFilesUnderProcessing].filter(
        (p) => p !== path
      );
      Object.assign(state, newState);
    }
  } else {
    log(`\nFile changed: ${path} (already processing)`);
  }
};

export const configFileChanged = (state: DevState) => async (_event: string, path: string) => {
  log(`\nFile changed config: ${path}`);

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
    const state: DevState = { config, watchHandlers, fuelCore, workspaceFilesUnderProcessing: [] };

    // watch: fuels.config.ts and snapshotDir
    watchHandlers.push(watch(configFilePaths, options).on('all', configFileChanged(state)));

    // watch: Forc's workspace members
    watchHandlers.push(watch(workspaceFilePaths, options).on('all', workspaceFileChanged(state)));
  } catch (err: unknown) {
    error(err);
    throw err;
  }
};
