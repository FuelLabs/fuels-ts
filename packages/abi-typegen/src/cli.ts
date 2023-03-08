import { versions } from '@fuel-ts/versions';
import { Command, Option } from 'commander';

import { runTypegen } from './runTypegen';
import { ProgramTypeEnum } from './types/enums/ProgramTypeEnum';

export interface ICliParams {
  inputs: string[];
  output: string;
  silent: boolean;
  contract: boolean;
  script: boolean;
}

export function resolveProgramType(params: { contract: boolean; script: boolean }) {
  const { contract, script } = params;

  const noneSpecified = !contract && !script;

  if (contract || noneSpecified) {
    return ProgramTypeEnum.CONTRACT;
  }

  return ProgramTypeEnum.SCRIPT;
}

export function runCliAction(options: ICliParams) {
  const { inputs, output, silent, contract, script } = options;

  const cwd = process.cwd();
  const programType = resolveProgramType({ contract, script });

  runTypegen({
    cwd,
    inputs,
    output,
    programType,
    silent: !!silent,
  });
}

export function configureCliOptions(program: Command) {
  program
    .requiredOption('-i, --inputs <path|glob...>', 'input paths/globals to your abi json files')
    .requiredOption('-o, --output <dir>', 'directory path for generated files')
    .addOption(
      new Option('-c, --contract', 'generate types for contracts [default]')
        .conflicts('script')
        .implies({ script: undefined })
    )
    .addOption(
      new Option('-s, --script', 'generate types for scripts')
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
