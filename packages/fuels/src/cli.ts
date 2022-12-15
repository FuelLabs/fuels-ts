// import { configureCliOptions as routeTypeGen } from '@fuel-ts/abi-typegen/cli';
// import { versions } from '@fuel-ts/versions';
// import { run as runVersions } from '@fuel-ts/versions/cli';
// import { Command } from 'commander';

// export function run(argv: string[]) {
//   const program = new Command();

//   program.name('fuels');
//   program.version(versions.FUELS);

//   // routing `versions` sub-command
//   program
//     .command('versions')
//     .description('check for version incompatibilities')
//     .action(runVersions);

//   // routing `typegen` sub-command
//   const typegen = program
//     .command('typegen')
//     .description(`generate typescript from contract abi json files`);

//   routeTypeGen(typegen);

//   // vroom vroom
//   program.parse(argv);
// }
