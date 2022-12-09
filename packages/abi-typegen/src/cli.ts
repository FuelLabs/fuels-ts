import { versions } from '@fuel-ts/versions';
import { Command } from 'commander';
import { resolve } from 'path';

import { runTypegen } from './runTypegen';

export function runCliAction(options: Record<string, string>) {
  const cwd = process.cwd();

  const input = resolve(options.input);
  const output = resolve(options.output);
  const silent = Boolean(options.silent);

  runTypegen({ cwd, input, output, silent });
}

export function configureCliOptions(program: Command) {
  program
    .requiredOption('-i, --input <path|glob>', 'input path/global to your abi json files')
    .requiredOption('-o, --output <dir>', 'directory path for generated files')
    .option('-s, --silent', 'omit output messages')
    .action(runCliAction);
}

export function run(params: { argv: string[]; programName: string }) {
  const program = new Command();

  const { argv, programName } = params;

  program.name(programName);
  program.version(versions.FUELS);
  program.usage(`-i ../out/*-abi.json -o ./generated/`);

  configureCliOptions(program);

  program.parse(argv);
}
