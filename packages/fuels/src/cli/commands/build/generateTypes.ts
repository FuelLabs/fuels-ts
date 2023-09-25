import { ProgramTypeEnum } from '@fuel-ts/abi-typegen';
import { runTypegen } from '@fuel-ts/abi-typegen/runTypegen';
import { writeFileSync } from 'fs';
import { join } from 'path';

import { getABIPaths } from '../../config/forcUtils';
import { renderIndexTemplate } from '../../templates';
import type { ParsedFuelsConfig } from '../../types';
import { log, loggingConfig } from '../../utils/logger';

async function generateTypesForProgramType(
  config: ParsedFuelsConfig,
  paths: string[],
  programType: ProgramTypeEnum
) {
  const filepaths = await getABIPaths(paths);
  const pluralizedFolderName = `${String(programType).toLocaleLowerCase()}s`;

  if (!filepaths.length) {
    return null;
  }

  runTypegen({
    programType,
    cwd: config.basePath,
    filepaths,
    output: join(config.output, pluralizedFolderName),
    silent: !loggingConfig.isDebugEnabled,
  });

  return pluralizedFolderName;
}

export async function generateTypes(config: ParsedFuelsConfig) {
  log('Generating types..');

  const folders = (
    await Promise.all([
      generateTypesForProgramType(config, config.contracts, ProgramTypeEnum.CONTRACT),
      generateTypesForProgramType(config, config.predicates, ProgramTypeEnum.PREDICATE),
      generateTypesForProgramType(config, config.scripts, ProgramTypeEnum.SCRIPT),
    ])
  ).filter((f) => !!f) as string[];

  const indexFile = await renderIndexTemplate(folders);

  writeFileSync(join(config.output, 'index.ts'), indexFile);
}
