/* eslint-disable no-restricted-syntax */
import { resolve } from 'path';

import { forcVersion, forcBuild } from '../services';
import type { LoadedConfig } from '../types';
import { logSection } from '../utils';

export async function build(config: LoadedConfig) {
  logSection('🧰 Building contracts...');
  // Check if forc exists if not throw error
  // requesting to install forc
  await forcVersion();
  // If workspace is set, build using the workspace
  // path this increases also the performance of the build
  const paths = config.workspace ? [config.workspace] : config.contracts;
  for (const path of paths) {
    const contractPath = resolve(config.basePath, path);
    await forcBuild(contractPath);
  }
}
