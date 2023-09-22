import * as chokidar from 'chokidar';
import { globSync } from 'glob';

import type { ParsedFuelsConfig } from '../../types';
import { error, logSection } from '../../utils/logger';
import { build } from '../build';
import { deploy } from '../deploy';

import { startFuelCore } from './startFuelCore';

export async function buildAndDeploy(config: ParsedFuelsConfig) {
  await build(config);
  return deploy(config);
}

export async function dev(config: ParsedFuelsConfig) {
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
    const changeListeaner = async (_path: string) => {
      await buildAndDeploy(configCopy);
      logSection(`🎉 dev completed successfully!`);
    };

    chokidar
      .watch(pathsToWatch, { persistent: true, ignoreInitial: true })
      .on('add', changeListeaner)
      .on('change', changeListeaner)
      .on('unlink', changeListeaner);
  } catch (err: unknown) {
    error(err);
  }
}
