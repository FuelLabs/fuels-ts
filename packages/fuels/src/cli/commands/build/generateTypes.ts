import { ProgramTypeEnum } from '@fuel-ts/abi-typegen';
import { runTypegen } from '@fuel-ts/abi-typegen/runTypegen';
import { writeFileSync } from 'fs';
import { join } from 'path';

import { getABIPaths } from '../../config/forcUtils';
import { renderIndexTemplate } from '../../templates';
import type { FuelsConfig } from '../../types';
import { debug, log, loggingConfig } from '../../utils/logger';

async function generateTypesForProgramType(
  config: FuelsConfig,
  paths: string[],
  programType: ProgramTypeEnum
) {
  debug('Generating types..');

  const filepaths = await getABIPaths(paths);
  const pluralizedFolderName = `${String(programType).toLocaleLowerCase()}s`;

  runTypegen({
    programType,
    cwd: config.basePath,
    filepaths,
    output: join(config.output, pluralizedFolderName),
    silent: !loggingConfig.isDebugEnabled,
  });

  return pluralizedFolderName;
}

export async function generateTypes(config: FuelsConfig) {
  log('Generating types..');

  const { contracts, scripts, predicates } = config;

  const members = [
    { type: ProgramTypeEnum.CONTRACT, artifacts: contracts },
    { type: ProgramTypeEnum.SCRIPT, artifacts: scripts },
    { type: ProgramTypeEnum.PREDICATE, artifacts: predicates },
  ];

  const folders = await Promise.all(
    members
      .filter(({ artifacts }) => !!artifacts.length)
      .map(({ artifacts, type }) => generateTypesForProgramType(config, artifacts, type))
  );

  const indexFile = await renderIndexTemplate(folders);

  writeFileSync(join(config.output, 'index.ts'), indexFile);
}
