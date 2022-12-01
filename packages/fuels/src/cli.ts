import { versions, runVersions } from '@fuel-ts/versions';
import { Command } from 'commander';

export async function run() {
  const program = new Command();

  program.name('fuels');
  program.version(versions.FUELS);

  program
    .command('versions')
    .description('Checks for version incompatibilities')
    .action(() => {
      runVersions();
    });

  // program
  //   .command('typegen')
  //   .description('Generate typings from Sway ABI JSON files')
  //   .action(() => {
  //     runTypegen();
  //   });

  program.parse();
}
