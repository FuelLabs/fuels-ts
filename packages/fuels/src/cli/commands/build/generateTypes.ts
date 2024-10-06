import { ProgramTypeEnum } from '@fuel-ts/abi-typegen';
import { runTypegen } from '@fuel-ts/abi-typegen/runTypegen';
import { getBinaryVersions } from '@fuel-ts/versions/cli';
import { writeFileSync, mkdirSync } from 'fs';
import { globSync } from 'glob';
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

  let filepaths = await getABIPaths(paths, config);
  const pluralizedDirName = `${String(programType).toLocaleLowerCase()}s`;
  const versions = getBinaryVersions(config);

  const isScript = programType === ProgramTypeEnum.SCRIPT;
  const isPredicate = programType === ProgramTypeEnum.PREDICATE;

  if (isScript || isPredicate) {
    filepaths = paths.flatMap((dirpath) => {
      const glob = `*-abi.json`;
      const cwd = `${dirpath}/out/${config.buildMode}`;
      return globSync(glob, { cwd }).map(
        (filename) => `${dirpath}/out/${config.buildMode}/${filename}`
      );
    });
    filepaths = filepaths.slice(0);
  }

  runTypegen({
    programType,
    cwd: config.basePath,
    filepaths,
    output: join(config.output, pluralizedDirName),
    silent: !loggingConfig.isDebugEnabled,
    versions,
  });

  return pluralizedDirName;
}

export async function generateTypes(config: FuelsConfig) {
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
      .map(({ programs, type }) => generateTypesForProgramType(config, programs, type))
  );

  const indexFile = await renderIndexTemplate(pluralizedDirNames);

  writeFileSync(join(config.output, 'index.ts'), indexFile);
}
