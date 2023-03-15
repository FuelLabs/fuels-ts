import { ProgramTypeEnum } from '@fuel-ts/abi-typegen';
import { runTypegen } from '@fuel-ts/abi-typegen/runTypegen';

import { getABIPaths } from '../services';
import type { LoadedConfig } from '../types';
import { logSection } from '../utils';

async function runTypegenProgramType(
  config: LoadedConfig,
  paths: Array<string>,
  programType: ProgramTypeEnum
) {
  const filepaths = await getABIPaths(paths);
  if (filepaths.length) {
    await runTypegen({
      programType,
      cwd: config.basePath,
      filepaths,
      output: config.output,
    });
  }
}

export async function types(config: LoadedConfig) {
  logSection('🟦 Generating types...');
  await runTypegenProgramType(config, config.contracts, ProgramTypeEnum.CONTRACT);
  await runTypegenProgramType(config, config.predicates, ProgramTypeEnum.PREDICATE);
  await runTypegenProgramType(config, config.scripts, ProgramTypeEnum.SCRIPT);
}
