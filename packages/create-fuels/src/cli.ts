/* eslint-disable no-console */
import chalk from 'chalk';
import { Command } from 'commander';
import { cp, mkdir } from 'fs/promises';
import { join } from 'path';
import prompts from 'prompts';

import packageJson from '../package.json';

export const runScaffoldCli = async () => {
  let projectPath = '';
  const program = new Command(packageJson.name).version(packageJson.version).parse(process.argv);

  const res = await prompts({
    type: 'text',
    name: 'projectName',
    message: 'What is the name of your project?',
    initial: 'my-fuel-project',
  });

  projectPath = res.projectName;

  if (!projectPath) {
    console.log(
      '\nPlease specify the project directory:\n' +
        `  ${chalk.cyan(program.name())} ${chalk.green('<project-directory>')}\n`
    );
    process.exit(1);
  }

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
