import * as chokidar from 'chokidar';
import { error } from 'console';
import { globSync } from 'glob';

import { startFuelCore } from '../services/fuel-core/startFuelCore';
import type { ParsedFuelsConfig } from '../types';

import { flow } from './flow';

export async function dev(config: ParsedFuelsConfig) {
  /**
   * Create a copy of the config param, so we can safely
   * re-assign the `providerUrl` param when auto-starting a node.
   */
  const configCopy = structuredClone(config);

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
    await flow(configCopy);

    // Then on every change
    const changeListeaner = (_path: string) => flow(configCopy);

    chokidar
      .watch(pathsToWatch, { persistent: true, ignoreInitial: true })
      .on('add', changeListeaner)
      .on('change', changeListeaner)
      .on('unlink', changeListeaner);
  } catch (err: unknown) {
    error(err);
  }
}
