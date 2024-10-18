import { ProgramTypeEnum } from '@fuel-ts/abi-typegen';
import { runTypegen } from '@fuel-ts/abi-typegen/runTypegen';
import { getBinaryVersions } from '@fuel-ts/versions/cli';
import { globSync } from 'glob';
import { join } from 'path';

import { getABIPaths } from '../../config/forcUtils';
import type { FuelsConfig } from '../../types';
import { debug, log, loggingConfig } from '../../utils/logger';
import { runFuelsTypegen } from '../typegen';

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
    const loaderFiles = paths.flatMap((dirpath) => {
      const glob = `*-abi.json`;
      const cwd = `${dirpath}/out`;
      return globSync(glob, { cwd }).map((filename) => `${dirpath}/out/${filename}`);
    });
    filepaths = filepaths.concat(loaderFiles);
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

export function generateTypes(config: FuelsConfig) {
  log('Generating types..');

  const { contracts, scripts, predicates, output } = config;

  const paths = contracts
    .concat(scripts, predicates)
    .map((path) => `${path}/out/${config.buildMode}`);

  runFuelsTypegen({ inputs: paths, output, silent: false });
}
