import * as chokidar from 'chokidar';
import { error } from 'console';
import { globSync } from 'glob';
import kill from 'tree-kill';

import { startFuelCore } from '../services/fuel-core/startFuelCore';
import type { LoadedConfig } from '../types';

import { flow } from './flow';

export async function dev(config: LoadedConfig) {
  const fuelCoreNode = await startFuelCore(config);
  const fuelCoreNodePID = fuelCoreNode.pid as number;

  const { contracts, scripts, predicates } = config;
  const dirs = [contracts, scripts, predicates, config.chainConfig, config.workspace].flat();

  const filepaths = dirs
    .flatMap((d) => [
      globSync(`${d}/**/*.toml`, { cwd: config.basePath }),
      globSync(`${d}/**/*.sw`, { cwd: config.basePath }),
    ])
    .flat();

  try {
    await flow(config);

    const changeListeaner = (_path: string) => flow(config);

    chokidar
      .watch(filepaths, { persistent: true, ignoreInitial: true })
      .on('add', changeListeaner)
      .on('change', changeListeaner)
      .on('unlink', changeListeaner);
  } catch (err: unknown) {
    error(err);
    kill(fuelCoreNodePID);
  }
}
