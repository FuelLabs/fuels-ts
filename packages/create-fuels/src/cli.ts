/* eslint-disable no-console */
import chalk from 'chalk';
import { Command } from 'commander';
import { cp, mkdir } from 'fs/promises';
import { join } from 'path';
import prompts from 'prompts';

import packageJson from '../package.json';

const log = (...data: unknown[]) => {
  process.stdout.write(`${data.join(' ')}\n`);
};

export const runScaffoldCli = async (explicitProjectPath?: string) => {
  let projectPath = explicitProjectPath || '';
  const program = new Command(packageJson.name).version(packageJson.version);

  if (!explicitProjectPath) {
    const res = await prompts({
      type: 'text',
      name: 'projectName',
      message: 'What is the name of your project?',
      initial: 'my-fuel-project',
    });

    projectPath = res.projectName;
  }

  if (!projectPath) {
    console.log(
      '\nPlease specify the project directory:\n' +
        `  ${chalk.cyan(program.name())} ${chalk.green('<project-directory>')}\n`
    );
    process.exit(1);
  }

  await mkdir(projectPath);

  await cp(join(__dirname, '../templates/nextjs'), projectPath, { recursive: true });

  log();
  log();
  log(chalk.green(`⚡️ Success! Created a a fullstack Fuel dapp at ${projectPath}`));
  log();
  log();
  log('To get started:');
  log();
  log(`- cd into the project directory: cd ${projectPath}`);
  log(`- Install the dependencies: pnpm install`);
  log(`- Start a local Fuel dev server: pnpx fuels dev`);
  log(`- Run the frontend by running pnpm run dev`);
  log();
  log();
  log('-> TS SDK docs: https://fuellabs.github.io/fuels-ts/');
  log('-> Sway docs: https://fuellabs.github.io/sway/');
  log('-> If you have any questions, check the Fuel forum: https://forum.fuel.network/');
  log();
  log();
};
