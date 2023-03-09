import { ProgramTypeEnum } from '@fuel-ts/abi-typegen';
import { runTypegen } from '@fuel-ts/abi-typegen/runTypegen';

import { getABIPaths } from '../services';
import type { LoadedConfig } from '../types';
import { logSection } from '../utils';

export async function types(config: LoadedConfig) {
  logSection('🟦 Generating types...');
  const filepaths = await getABIPaths(config.contracts);
  await runTypegen({
    programType: ProgramTypeEnum.CONTRACT,
    cwd: config.basePath,
    filepaths,
    output: config.output,
  });
}
