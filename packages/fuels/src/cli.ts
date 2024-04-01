import { configureCliOptions as configureTypegenCliOptions } from '@fuel-ts/abi-typegen/cli';
import { findBinPath } from '@fuel-ts/utils/cli-utils';
import { versions } from '@fuel-ts/versions';
import { runVersions } from '@fuel-ts/versions/cli';
import { Command, Option } from 'commander';

import { build } from './cli/commands/build';
import { deploy } from './cli/commands/deploy';
import { dev } from './cli/commands/dev';
import { init } from './cli/commands/init';
import { withConfig } from './cli/commands/withConfig';
import { withProgram } from './cli/commands/withProgram';
import { Commands } from './cli/types';
import { configureLogging } from './cli/utils/logger';

export const onPreAction = (command: Command) => {
  const opts = command.opts();
  configureLogging({
    isDebugEnabled: opts.debug,
    isLoggingEnabled: !opts.silent,
  });
};

export const configureCli = () => {
  // eslint-disable-next-line no-console
  console.log('test');
  const program = new Command();
  program.name('fuels');

  program.option('-D, --debug', 'Enables verbose logging', false);
  program.option('-S, --silent', 'Omit output messages', false);

  program.version(versions.FUELS, '-v, --version', 'Output the version number');
  program.helpOption('-h, --help', 'Display help');
  program.addHelpCommand('help [command]', 'Display help for command');

  program.enablePositionalOptions(true);

  program.hook('preAction', onPreAction);

  /**
   * Defining local commands
   */

  const pathOption = new Option('-p, --path <path>', 'Path to project root').default(process.cwd());

  let command: Command;

  const desc = `Relative path/globals to `;
  const arg = `<path|global>`;

  (command = program.command(Commands.init))
    .description('Create a sample `fuel.config.ts` file')
    .addOption(pathOption)
    .option('-w, --workspace <path>', 'Relative dir path to Forc workspace')
    .addOption(new Option(`-c, --contracts ${arg}`, `${desc} Contracts`).conflicts('workspace'))
    .addOption(new Option(`-s, --scripts ${arg}`, `${desc} Scripts`).conflicts('workspace'))
    .addOption(new Option(`-p, --predicates ${arg}`, `${desc} Predicates`).conflicts('workspace'))
    .requiredOption('-o, --output <path>', 'Relative dir path for Typescript generation output')
    .option('--use-builtin-forc', 'Use buit-in `forc` to build Sway programs')
    .option('--use-builtin-fuel-core', 'Use buit-in `fuel-core` when starting a Fuel node')
    .option('--auto-start-fuel-core', 'Auto-starts a `fuel-core` node during `dev` command')
    .action(withProgram(command, Commands.init, init));

  (command = program.command(Commands.dev))
    .description('Start a Fuel node and run build + deploy on every file change')
    .addOption(pathOption)
    .action(withConfig(command, Commands.dev, dev));

  (command = program.command(Commands.build))
    .description('Build Sway programs and generate Typescript for them')
    .addOption(pathOption)
    .option(
      '-d, --deploy',
      'Deploy contracts after build (auto-starts a `fuel-core` node if needed)'
    )
    .action(withConfig(command, Commands.build, build));

  (command = program.command(Commands.deploy))
    .description('Deploy contracts to the Fuel network')
    .addOption(pathOption)
    .action(withConfig(command, Commands.deploy, deploy));

  /**
   * Routing external commands from sub-packages' CLIs
   */

  // Typegen
  configureTypegenCliOptions(
    program.command('typegen').description(`Generate Typescript from Sway ABI JSON files`)
  );

  // Versions
  program
    .command('versions')
    .description('Check for version incompatibilities')
    .action(runVersions);

  /**
   * Binary wrappers
   */

  program.command('core', 'Wrapper around Fuel Core binary', {
    executableFile: findBinPath('fuels-core', __dirname),
  });

  program.command('forc', 'Wrapper around Forc binary', {
    executableFile: findBinPath('fuels-forc', __dirname),
  });

  return program;
};
