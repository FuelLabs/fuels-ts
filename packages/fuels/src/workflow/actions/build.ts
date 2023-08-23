/* eslint-disable no-restricted-syntax */

import { forcBuild } from '../services';
import type { LoadedConfig } from '../types';
import { logSection } from '../utils';

export async function build(config: LoadedConfig) {
  logSection('🧰 Building...');

  // If workspace is set, build using the workspace
  // path this increases also the performance of the build
  const paths = config.workspace
    ? [config.workspace]
    : [config.contracts, config.predicates, config.scripts].flat();

  for (const path of paths) {
    await forcBuild(config, path);
  }
}
