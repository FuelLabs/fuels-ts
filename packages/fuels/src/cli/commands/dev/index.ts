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
  // here we inject a `providerUrl` into the config if necessary
  if (config.autoStartFuelCore) {
    const client = await startFuelCore(config);
    // eslint-disable-next-line no-param-reassign
    config.providerUrl = client.providerUrl;
  }

  const { contracts, scripts, predicates, chainConfig, workspace } = config;

  const projectDirs = [contracts, scripts, predicates, chainConfig].flat();

  if (workspace) {
    projectDirs.push(workspace);
  }

  const pathsToWatch = projectDirs
    .flatMap((dir) => [
      globSync(`${dir}/**/*.toml`, { cwd: config.basePath }),
      globSync(`${dir}/**/*.sw`, { cwd: config.basePath }),
    ])
    .flat();

  try {
    // Run once
    await buildAndDeploy(config);

    // Then on every change
    const onChange = changeListener(config);

    fileHandlers.watcher = chokidar
      .watch(pathsToWatch, { persistent: true, ignoreInitial: true })
      .on('add', onChange)
      .on('change', onChange)
      .on('unlink', onChange);
  } catch (err: unknown) {
    error(err);
    throw err;
  }
}
