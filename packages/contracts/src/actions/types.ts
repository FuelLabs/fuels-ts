import { runTypegen } from '@fuel-ts/abi-typegen';

import { getABIPaths } from '../services';
import type { LoadedConfig } from '../types';
import { logSection } from '../utils';

export async function types(config: LoadedConfig) {
  logSection('🟦 Generating types...');
  const filepaths = await getABIPaths(config.contracts);
  await runTypegen({
    filepaths,
    cwd: config.basePath,
    output: config.output,
  });
}
