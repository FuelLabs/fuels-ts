import * as chokidar from 'chokidar';
import { globSync } from 'glob';

import type { FuelsConfig } from '../../types';
import { error, log } from '../../utils/logger';
import { build } from '../build';
import { deploy } from '../deploy';

import { startFuelCore } from './startFuelCore';

export const fileHandlers: {
  watcher?: chokidar.FSWatcher;
} = {};

export const buildAndDeploy = async (config: FuelsConfig) => {
  await build(config);
  return deploy(config);
};

export const changeListener = (config: FuelsConfig) => async (path: string) => {
  log(`\nFile changed: ${path}`);
  await buildAndDeploy(config);
};

export async function dev(config: FuelsConfig) {
  /**
   * Create a copy of the config param, so we can safely
   * re-assign the `providerUrl` param when auto-starting a node.
   */
  const configCopy = { ...config };

  if (configCopy.autoStartFuelCore) {
    const client = await startFuelCore(configCopy);
    configCopy.providerUrl = client.providerUrl;
  }

  const { contracts, scripts, predicates, chainConfig, workspace } = configCopy;

  const projectDirs = [contracts, scripts, predicates, chainConfig].flat();

  if (workspace) {
    projectDirs.push(workspace);
  }

  const pathsToWatch = projectDirs
    .flatMap((dir) => [
      globSync(`${dir}/**/*.toml`, { cwd: configCopy.basePath }),
      globSync(`${dir}/**/*.sw`, { cwd: configCopy.basePath }),
    ])
    .flat();

  try {
    // Run once
    await buildAndDeploy(configCopy);

    // Then on every change
    const onChange = changeListener(configCopy);

    fileHandlers.watcher = chokidar
      .watch(pathsToWatch, { persistent: true, ignoreInitial: true })
      .on('add', onChange)
      .on('change', onChange)
      .on('unlink', onChange);
  } catch (err: unknown) {
    error(err);
  }
}
