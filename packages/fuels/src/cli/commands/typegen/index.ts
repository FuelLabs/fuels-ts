import { AbiGen } from '@fuel-ts/abi';
import { getBinaryVersions } from '@fuel-ts/versions/cli';
import type { Command } from 'commander';
import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

import type { FuelsConfig } from '../../types';
import { debug } from '../../utils/logger';

import { getProgramDetails } from './utils';

interface RunTypegen {
  inputs: string[];
  output: string;
}

function runFuelsTypegen(options: RunTypegen) {
  const { inputs, output } = options;

  const programDetails = getProgramDetails(inputs);

  const results = AbiGen.generate({ programDetails, versions: getBinaryVersions() });

  mkdirSync(output, { recursive: true });

  const subDirectories = new Set<string>();

  results.forEach((r) => {
    const dir = r.filename.split('/').slice(0, -1).join('/');
    if (dir !== '') {
      subDirectories.add(dir);
    }
  });

  subDirectories.forEach((dir) => {
    mkdirSync(join(output, dir), { recursive: true });
  });

  results.forEach((r) => {
    const outputPath = join(output, r.filename);
    writeFileSync(outputPath, r.content);
  });
}

export function typegen(program: Command) {
  const options = program.opts();
  const { inputs, output } = options;

  runFuelsTypegen({ inputs, output });
}

export function generateTypes(config: FuelsConfig) {
  debug('Generating types...');

  const { contracts, scripts, predicates, output } = config;

  const loaderPaths = scripts.concat(predicates).map((path) => `${path}/out`);

  const paths = contracts
    .concat(scripts, predicates)
    .map((path) => `${path}/out/${config.buildMode}`)
    .concat(loaderPaths);

  runFuelsTypegen({ inputs: paths, output });
}
