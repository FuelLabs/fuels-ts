import { versions } from '@fuel-ts/versions';
import { Command } from 'commander';

import { runTypegen } from './runTypegen';

export interface CliParams {
  inputs: string[];
  output: string;
  silent: boolean;
}

export function runCliAction(options: CliParams) {
  const cwd = process.cwd();
  const { inputs, output, silent } = options;
  runTypegen({ cwd, inputs, output, silent: !!silent });
}

export function configureCliOptions(program: Command) {
  program
    .requiredOption('-i, --inputs <path|glob...>', 'input paths/globals to your abi json files')
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
