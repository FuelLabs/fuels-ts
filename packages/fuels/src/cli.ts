import { configureCliOptions as configureTypegenCliOptions } from '@fuel-ts/abi-typegen/cli';
import { versions } from '@fuel-ts/versions';
import { runVersions } from '@fuel-ts/versions/cli';
import { Command, Option } from 'commander';

import { build } from './cli/commands/build';
import { deploy } from './cli/commands/deploy';
import { init } from './cli/commands/init';
import { withConfig } from './cli/commands/withConfig';
import { withProgram } from './cli/commands/withProgram';
import { Commands } from './cli/types';

export async function run(argv: string[]) {
  const program = new Command();

  program.name('fuels');
  program.version(versions.FUELS, '-v, --version', 'Output the version number');
  program.helpOption('-h, --help', 'Display help');
  program.addHelpCommand('help [command]', 'Display help for command');

  const pathOption = new Option(
    '-p, --path <path>',
    'Path to the directory where `fuel.config.ts` file is located'
  ).default(process.cwd());

  const silentOption = new Option(
    '-V, --verbose [boolean]',
    'Omit output and status messages'
  ).default(true);

  let command: Command;

  (command = program.command(Commands.init))
    .description('Create a sample `fuel.config.ts` file')
    .addOption(pathOption)
    .addOption(silentOption)
    .option('-w, --workspace <path>', 'Relative dir path to Sway workspace', './sway-workspace')
    .option('-o, --output <path>', 'Relative dir path to generating Typescript', './types')
    .action(withProgram(command, Commands.init, init));

  (command = program.command(Commands.dev))
    .description('Start a Fuel node and run build + deploy on every file change')
    .addOption(pathOption)
    .addOption(silentOption)
    .action(withConfig(command, Commands.dev, build));

  (command = program.command(Commands.build))
    .description('Build Sway programs and generate Typescript for them')
    .addOption(pathOption)
    .addOption(silentOption)
    .action(withConfig(command, Commands.build, build));

  (command = program.command(Commands.deploy))
    .description('Deploy contracts to Fuel network')
    .addOption(pathOption)
    .addOption(silentOption)
    .action(withConfig(command, Commands.deploy, deploy));

  /**
   * Routing external CLI from sub-packages
   */

  // Typegen
  const typegen = program
    .command('typegen')
    .description(`Generate Typescript from Sway ABI JSON files`);

  configureTypegenCliOptions(typegen);

  // Versions
  program
    .command('versions')
    .description('Check for version incompatibilities')
    .action(runVersions);

  // Lets go
  return program.parseAsync(argv);
}
