import { versions } from '@fuel-ts/versions';
import { run as runVersions } from '@fuel-ts/versions/dist/cli';
import { Command } from 'commander';

export function run(argv: string[]) {
  const program = new Command();

  program.name('fuels');
  program.version(versions.FUELS);

  program
    .command('versions')
    .description('checks for version incompatibilities')
    .action(runVersions);

  program.parse(argv);
}
