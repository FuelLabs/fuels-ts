import { versions } from '@fuel-ts/versions';
import { Command, Option } from 'commander';

import { runTypegen } from './runTypegen';
import { CategoryEnum } from './types/enums/CategoryEnum';

export interface ICliParams {
  inputs: string[];
  output: string;
  silent: boolean;
  contract: boolean;
  script: boolean;
  predicate: boolean;
}

export function resolveCategory(params: {
  contract: boolean;
  script: boolean;
  predicate: boolean;
}) {
  const { contract, script, predicate } = params;

  const noneSpecified = !contract && !script && !predicate;

  if (contract || noneSpecified) {
    return CategoryEnum.CONTRACT;
  }

  if (predicate) {
    return CategoryEnum.PREDICATE;
  }

  return CategoryEnum.SCRIPT;
}

export function runCliAction(options: ICliParams) {
  const { inputs, output, silent, contract, script, predicate } = options;

  const cwd = process.cwd();
  const category = resolveCategory({ contract, script, predicate });

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
      new Option('-c, --contract', 'generate types for Contracts [default]')
        .conflicts(['script', 'predicate'])
        .implies({ script: undefined, predicate: undefined })
    )
    .addOption(
      new Option('-s, --script', 'generate types for Scripts')
        .conflicts(['contract', 'predicate'])
        .implies({ contract: undefined, predicate: undefined })
    )
    .addOption(
      new Option('-p, --predicate', 'generate types for Predicates')
        .conflicts(['contract', 'script'])
        .implies({ contract: undefined, script: undefined })
    )
    .option('-S, --silent', 'omit output messages')
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
