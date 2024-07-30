import { versions as builtinVersion } from '@fuel-ts/versions';
import { Command, Option } from 'commander';

import { runTypegen } from './runTypegen';
import { ProgramTypeEnum } from './types/enums/ProgramTypeEnum';

export interface ICliParams {
  inputs: string[];
  output: string;
  silent?: boolean;
  contract?: boolean;
  script?: boolean;
  predicate?: boolean;
}

export function resolveProgramType(params: {
  contract?: boolean;
  script?: boolean;
  predicate?: boolean;
}) {
  const { contract, script, predicate } = params;

  const noneSpecified = !contract && !script && !predicate;

  if (contract || noneSpecified) {
    return ProgramTypeEnum.CONTRACT;
  }

  if (predicate) {
    return ProgramTypeEnum.PREDICATE;
  }

  return ProgramTypeEnum.SCRIPT;
}

export function runCliAction(options: ICliParams) {
  const { inputs, output, silent, contract, script, predicate } = options;

  const cwd = process.cwd();

  const programType = resolveProgramType({ contract, script, predicate });

  try {
    runTypegen({
      cwd,
      inputs,
      output,
      programType,
      silent: !!silent,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(`error: ${(<Error>err).message}`);
    process.exit(1);
  }
}

export function configureCliOptions(program: Command) {
  return program
    .requiredOption('-i, --inputs <path|glob...>', 'Input paths/globals to your ABI JSON files')
    .requiredOption('-o, --output <dir>', 'Directory path for generated files')
    .addOption(
      new Option('-c, --contract', 'Generate types for Contracts [default]')
        .conflicts(['script', 'predicate'])
        .implies({ script: undefined, predicate: undefined })
    )
    .addOption(
      new Option('-s, --script', 'Generate types for Scripts')
        .conflicts(['contract', 'predicate'])
        .implies({ contract: undefined, predicate: undefined })
    )
    .addOption(
      new Option('-p, --predicate', 'Generate types for Predicates')
        .conflicts(['contract', 'script'])
        .implies({ contract: undefined, script: undefined })
    )
    .option('-S, --silent', 'Omit output messages')
    .action(runCliAction);
}

export function run(params: { argv: string[]; programName: string }) {
  const program = new Command();

  const { argv, programName } = params;

  program.name(programName);
  program.version(builtinVersion.FUELS);
  program.usage(`-i ../out/*-abi.json -o ./generated/`);

  configureCliOptions(program);

  program.parse(argv);
}
