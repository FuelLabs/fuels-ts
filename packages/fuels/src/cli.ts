import { configureCliOptions as configureTypegenCliOptions } from '@fuel-ts/abi-typegen/cli';
import { versions } from '@fuel-ts/versions';
import { run as runVersions } from '@fuel-ts/versions/cli';
import { Command } from 'commander';

import { configureCliOptions as configureFuelsCliOptions } from './workflow/cli';

export async function run(argv: string[]) {
  const program = new Command();

  program.name('fuels');
  program.description(
    'Automate Fuel projects workflows, check environment compatibility, and generate types'
  );
  program.version(versions.FUELS);

  // Add fuels workflow commands
  configureFuelsCliOptions(program);

  // routing `versions` sub-command
  program
    .command('versions')
    .description('check for version incompatibilities')
    .action(runVersions);

  // routing `typegen` sub-command
  const typegen = program
    .command('typegen')
    .description(`generate typescript from contract abi json files`);
  configureTypegenCliOptions(typegen);

  // vroom vroom
  return program.parseAsync(argv);
}
