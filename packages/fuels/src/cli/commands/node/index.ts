import { watch, type FSWatcher } from 'chokidar';

import { loadConfig } from '../../config/loadConfig';
import type { FuelsConfig } from '../../types';
import { error, log } from '../../utils/logger';
import type { FuelCoreNode } from '../dev/autoStartFuelCore';
import { autoStartFuelCore } from '../dev/autoStartFuelCore';
import { withConfigErrorHandler } from '../withConfig';

export type NodeState = {
  config: FuelsConfig;
  watchHandlers: FSWatcher[];
  fuelCore?: FuelCoreNode;
};

export const getConfigFilepathsToWatch = (config: FuelsConfig) => {
  const configFilePathsToWatch: string[] = [config.configPath];
  if (config.snapshotDir) {
    configFilePathsToWatch.push(config.snapshotDir);
  }
  return configFilePathsToWatch;
};

export const closeAllFileHandlers = (handlers: FSWatcher[]) => {
  handlers.forEach((h) => h.close());
};

export const configFileChanged = (state: NodeState) => async (_event: string, path: string) => {
  log(`\nFile changed config: ${path}`);

  closeAllFileHandlers(state.watchHandlers);
  state.fuelCore?.killChildProcess();

  try {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    await node(await loadConfig(state.config.basePath));
    state.config.onNode?.(state.config);
  } catch (err: unknown) {
    await withConfigErrorHandler(<Error>err, state.config);
  }
};

export const node = async (config: FuelsConfig) => {
  const fuelCore = await autoStartFuelCore(config);

  const configFilePaths = getConfigFilepathsToWatch(config);

  try {
    const watchHandlers: FSWatcher[] = [];
    const options = { persistent: true, ignoreInitial: true, ignored: '**/out/**' };
    const state = { config, watchHandlers, fuelCore };

    // watch: fuels.config.ts and snapshotDir
    watchHandlers.push(watch(configFilePaths, options).on('all', configFileChanged(state)));
  } catch (err: unknown) {
    error(err);
    throw err;
  }
};
