import { ProgramTypeEnum } from '@fuel-ts/abi-typegen';
import { runTypegen } from '@fuel-ts/abi-typegen/runTypegen';
import { writeFile } from 'fs/promises';
import { join } from 'path';

import { getABIPaths } from '../services';
import { renderIndexTemplate } from '../templates';
import type { LoadedConfig } from '../types';
import { logSection } from '../utils';

async function runTypegenProgramType(
  config: LoadedConfig,
  paths: Array<string>,
  programType: ProgramTypeEnum
) {
  const filepaths = await getABIPaths(paths);
  const pluralizedFolderName = `${String(programType).toLocaleLowerCase()}s`;

  if (filepaths.length) {
    await runTypegen({
      programType,
      cwd: config.basePath,
      filepaths,
      output: join(config.output, pluralizedFolderName),
    });
    return pluralizedFolderName;
  }

  return null;
}

export async function types(config: LoadedConfig) {
  logSection('🟦 Generating types...');
  const folders = (
    await Promise.all([
      runTypegenProgramType(config, config.contracts, ProgramTypeEnum.CONTRACT),
      runTypegenProgramType(config, config.predicates, ProgramTypeEnum.PREDICATE),
      runTypegenProgramType(config, config.scripts, ProgramTypeEnum.SCRIPT),
    ])
  ).filter((f) => !!f) as string[];
  const indexFile = await renderIndexTemplate(folders);
  await writeFile(join(config.output, 'index.ts'), indexFile);
}
