import { ProgramTypeEnum } from '@fuel-ts/abi-typegen';
import { runTypegen } from '@fuel-ts/abi-typegen/runTypegen';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

import type { BuildMode } from '../../config/forcUtils';
import { getABIPaths } from '../../config/forcUtils';
import { renderIndexTemplate } from '../../templates';
import type { FuelsConfig } from '../../types';
import { debug, log, loggingConfig } from '../../utils/logger';

async function generateTypesForProgramType(
  config: FuelsConfig,
  paths: string[],
  programType: ProgramTypeEnum,
  mode: BuildMode
) {
  debug('Generating types..');

  const filepaths = await getABIPaths(paths, mode);
  const pluralizedDirName = `${String(programType).toLocaleLowerCase()}s`;

  runTypegen({
    programType,
    cwd: config.basePath,
    filepaths,
    output: join(config.output, pluralizedDirName),
    silent: !loggingConfig.isDebugEnabled,
  });

  return pluralizedDirName;
}

export async function generateTypes(config: FuelsConfig, mode: BuildMode) {
  log('Generating types..');

  const { contracts, scripts, predicates, output } = config;

  mkdirSync(output, { recursive: true });

  const members = [
    { type: ProgramTypeEnum.CONTRACT, programs: contracts },
    { type: ProgramTypeEnum.SCRIPT, programs: scripts },
    { type: ProgramTypeEnum.PREDICATE, programs: predicates },
  ];

  const pluralizedDirNames = await Promise.all(
    members
      .filter(({ programs }) => !!programs.length)
      .map(({ programs, type }) => generateTypesForProgramType(config, programs, type, mode))
  );

  const indexFile = await renderIndexTemplate(pluralizedDirNames);

  writeFileSync(join(config.output, 'index.ts'), indexFile);
}
