import type { Command } from 'commander';

import * as actions from '../actions';
import { build } from '../commands/build';
import { init } from '../commands/init';
import { withConfig } from '../commands/withConfig';
import { withProgram } from '../commands/withProgram';
import { Commands } from '../types';

import { createAction } from './utils/createAction';

export function configureCliOptions(program: Command) {
  program.option('-p, --path <path>', 'Root folder where the config file is located', './');

  program
    .command('init')
    .description('Create a `fuel.config.ts` and `chainConfig.json`')
    .action(withProgram(program, init));

  program
    .command('dev')
    .description('Start a Fuel node, watch files and run `flow` on every change')
    .action(createAction(program, Commands.dev, actions.dev));

  program
    .command(Commands.flow)
    .description('Serially run build——>types——>deploy')
    .action(createAction(program, Commands.flow, actions.flow));

  program
    .command(Commands.build)
    .description('Build Sway programs using Forc')
    .action(withConfig(program, Commands.build, build));

  program
    .command(Commands.types)
    .description('Generate TypeScript definitions')
    .action(createAction(program, Commands.types, actions.types));

  program
    .command(Commands.deploy)
    .description('Deploy contracts to Fuel network')
    .action(createAction(program, Commands.deploy, actions.deploy));
}
