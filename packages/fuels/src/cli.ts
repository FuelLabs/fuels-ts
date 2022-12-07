import { versions, runVersions } from '@fuel-ts/versions';
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
