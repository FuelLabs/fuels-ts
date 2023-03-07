import { versions } from '@fuel-ts/versions';
import { Command } from 'commander';

import { buildContracts } from '../actions/buildContracts';
import { deployContracts } from '../actions/deployContracts';
import { runAll } from '../actions/runAll';
import { buildTypes } from '../actions/typegen/buildTypes';
import { createAction } from '../helpers/createAction';
import { Commands } from '../types';

export function configureCliOptions(program: Command) {
  program.option('-c, --config <path>', 'Root folder where the config file is located', './');

  program
    .command(Commands.build)
    .description('Build Sway contracts and generate types')
    .action(createAction(program, Commands.build, buildContracts));

  program
    .command(Commands.deploy)
    .description('Deploy contract to fuel network')
    .action(createAction(program, Commands.deploy, deployContracts));

  program
    .command(Commands.run)
    .description('Build Sway contracts, generate types and deploy contracts to fuel network')
    .action(createAction(program, Commands.run, runAll));

  program
    .command(Commands.types)
    .description('Generate contract types')
    .action(createAction(program, Commands.types, buildTypes));
}

export function run(params: { argv: string[]; programName: string }) {
  const program = new Command();

  const { argv, programName } = params;

  program.name(programName);
  program.version(versions.FUELS);
  program.usage(`run`);

  configureCliOptions(program);

  return program.parseAsync(argv);
}
