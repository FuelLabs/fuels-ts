import * as chokidar from 'chokidar';
import { error } from 'console';
import { globSync } from 'glob';

import { startFuelCore } from '../services/fuel-core/startFuelCore';
import type { ParsedFuelsConfig } from '../types';

import { flow } from './flow';

export async function dev(config: ParsedFuelsConfig) {
  if (config.autoStartFuelCore) {
    await startFuelCore(config);
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
    // run once
    await flow(config);

    // and then on every change
    const changeListeaner = (_path: string) => flow(config);

    chokidar
      .watch(pathsToWatch, { persistent: true, ignoreInitial: true })
      .on('add', changeListeaner)
      .on('change', changeListeaner)
      .on('unlink', changeListeaner);
  } catch (err: unknown) {
    error(err);
  }
}
