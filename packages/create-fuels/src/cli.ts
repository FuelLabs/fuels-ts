/* eslint-disable no-console */
import chalk from 'chalk';
import { Command } from 'commander';
import { cp, mkdir } from 'fs/promises';
import { join } from 'path';

import packageJson from '../package.json';

export const runScaffoldCli = async () => {
  let projectPath = '';
  new Command(packageJson.name)
    .version(packageJson.version)
    .arguments('<project-name>') // TODO: add support for multiple templates
    .usage(`${chalk.green('<project-name>')} [options]`)
    .showHelpAfterError(true)
    .action((name) => {
      projectPath = name;
    })
    .parse(process.argv);

  await mkdir(projectPath);

  await cp(join(__dirname, '../templates/nextjs'), projectPath, { recursive: true });

  console.log();
  console.log();
  console.log(chalk.green(`⚡️ Success! Created a a fullstack Fuel dapp at ${projectPath}`));
  console.log();
  console.log();
  console.log('To get started:');
  console.log();
  console.log(`- cd into the project directory: cd ${projectPath}`);
  console.log(`- Install the dependencies: pnpm install`);
  console.log('- Start a local Fuel dev server: pnpx fuels dev`');
  console.log('- Run the frontend by running pnpm run dev');
  console.log();
  console.log();
  console.log('-> TS SDK docs: https://fuellabs.github.io/fuels-ts/');
  console.log('-> Sway docs: https://fuellabs.github.io/sway/');
  console.log('-> If you have any questions, check the Fuel forum: https://forum.fuel.network/');
  console.log();
  console.log();
};
