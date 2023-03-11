import { configureCliOptions as configureTypegenCliOptions } from '@fuel-ts/abi-typegen/cli';
import { configureCliOptions as configureContractsCliOptions } from '@fuel-ts/contracts/cli';
import { versions } from '@fuel-ts/versions';
import { run as runVersions } from '@fuel-ts/versions/cli';
import { Command } from 'commander';

export async function run(argv: string[]) {
  const program = new Command();

  program.name('fuels');
  program.version(versions.FUELS);

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

  // routing `contracts` sub-command
  const contracts = program
    .command('contracts')
    .description('utility to build, deploy and generate types for Sway Contracts');
  configureContractsCliOptions(contracts);

  // vroom vroom
  return program.parseAsync(argv);
}
