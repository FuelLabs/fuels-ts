import { getBinaryVersions } from '@fuel-ts/versions/cli';
import type { Command } from 'commander';
import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

import { AbiGen } from '../abi-gen';

import { getProgramDetails, loggingConfig } from './utils';

export interface RunTypegenOptions {
  inputs: string[];
  output: string;
  silent?: boolean;
}

export function runTypegen(options: RunTypegenOptions) {
  const { inputs, output, silent } = options;

  loggingConfig.silent = !!silent;

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

export function configureTypegenCliOptions(program: Command) {
  return program
    .description(`Generate Typescript from forc build outputs`)
    .requiredOption('-i, --inputs <path|glob...>', 'Input paths/globals to your ABI JSON files')
    .requiredOption('-o, --output <dir>', 'Directory path for generated files')
    .action(runTypegen);
}
