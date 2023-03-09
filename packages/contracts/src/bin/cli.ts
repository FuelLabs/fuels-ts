import { versions } from '@fuel-ts/versions';
import { Command } from 'commander';

import * as actions from '../actions';
import { Commands } from '../types';

import { createAction } from './utils/createAction';

export function configureCliOptions(program: Command) {
  program.option('-p, --path <path>', 'Root folder where the config file is located', './');

  program
    .command(Commands.build)
    .description('Build Sway contracts')
    .action(createAction(program, Commands.build, actions.build));

  program
    .command(Commands.types)
    .description('Generate contracts TypeScript types')
    .action(createAction(program, Commands.types, actions.types));

  program
    .command(Commands.deploy)
    .description('Deploy contract to fuel network')
    .action(createAction(program, Commands.deploy, actions.deploy));

  program
    .command(Commands.run)
    .description('Build Sway contracts, generate types and deploy contracts to fuel network')
    .action(createAction(program, Commands.run, actions.run));
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
