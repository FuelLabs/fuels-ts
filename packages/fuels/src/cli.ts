import { configureCliOptions as configureTypegenCliOptions } from '@fuel-ts/abi-typegen/cli';
import { versions } from '@fuel-ts/versions';
import { runVersions } from '@fuel-ts/versions/cli';
import { Command, Option } from 'commander';
import { join } from 'path';

import { build } from './cli/commands/build';
import { deploy } from './cli/commands/deploy';
import { dev } from './cli/commands/dev';
import { init } from './cli/commands/init';
import { withConfig } from './cli/commands/withConfig';
import { withProgram } from './cli/commands/withProgram';
import { Commands } from './cli/types';
import { findPackageRoot } from './cli/utils/findPackageRoot';

export async function run(argv: string[]) {
  const program = new Command();

  program.name('fuels');
  program.version(versions.FUELS, '-v, --version', 'Output the version number');
  program.helpOption('-h, --help', 'Display help');
  program.addHelpCommand('help [command]', 'Display help for command');
  program.enablePositionalOptions(true);

  program.option('-S, --silent [boolean]', 'Omit output messages', false);

  /**
   * Defining local commands
   */

  const pathOption = new Option('-p, --path <path>', 'Path to project root').default(process.cwd());

  let command: Command;

  (command = program.command(Commands.init))
    .description('Create a sample `fuel.config.ts` file')
    .addOption(pathOption)
    .option('-w, --workspace <path>', 'Relative dir path to Sway workspace', './sway-workspace')
    .option('-o, --output <path>', 'Relative dir path to generating Typescript', './types')
    .action(withProgram(command, Commands.init, init));

  (command = program.command(Commands.dev))
    .description('Start a Fuel node and run build + deploy on every file change')
    .addOption(pathOption)
    .action(withConfig(command, Commands.dev, dev));

  (command = program.command(Commands.build))
    .description('Build Sway programs and generate Typescript for them')
    .addOption(pathOption)
    .action(withConfig(command, Commands.build, build));

  (command = program.command(Commands.deploy))
    .description('Deploy contracts to Fuel network')
    .addOption(pathOption)
    .action(withConfig(command, Commands.deploy, deploy));

  /**
   * Routing external commands from sub-packages' CLIs
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

  /**
   * Binary wrappers
   */

  const pkgRootDir = findPackageRoot();
  const binPath = join(pkgRootDir, 'node_modules', '.bin', `fuels`);

  program.command('core', 'Wrapper around Fuel Core binary', {
    executableFile: `${binPath}-core`,
  });

  program.command('forc', 'Wrapper around Sway / Forc binary', {
    executableFile: `${binPath}-forc`,
  });

  /**
   * Let's go
   */
  return program.parseAsync(argv);
}
