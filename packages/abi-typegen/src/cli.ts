import { versions } from '@fuel-ts/versions';
import { Command } from 'commander';

import { CategoryEnum } from './interfaces/CategoryEnum';
import { runTypegen } from './runTypegen';

export interface ICliParams {
  inputs: string[];
  output: string;
  silent: boolean;
  contract: boolean;
  script: boolean;
}

export function resolveCategory(params: { contract: boolean; script: boolean }) {
  const { contract, script } = params;

  if (contract) {
    return CategoryEnum.CONTRACT;
  }

  if (script) {
    return CategoryEnum.SCRIPT;
  }

  throw new Error(`Could not resolve cateogry: ${params}`);
}

export function runCliAction(options: ICliParams) {
  const { inputs, output, silent, contract, script } = options;

  const cwd = process.cwd();
  const category = resolveCategory({ contract, script });

  runTypegen({
    cwd,
    inputs,
    output,
    category,
    silent: !!silent,
  });
}

export function configureCliOptions(program: Command) {
  program
    .requiredOption('-i, --inputs <path|glob...>', 'input paths/globals to your abi json files')
    .requiredOption('-o, --output <dir>', 'directory path for generated files')
    .addOption(
      new Option('-c, --contract', 'generate code for contracts [default]')
        .conflicts('script')
        .implies({ script: undefined })
    )
    .addOption(
      new Option('-s, --script', 'generate code for scripts')
        .conflicts('contract')
        .implies({ contract: undefined })
    )
    .option('--silent', 'omit output messages')
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
