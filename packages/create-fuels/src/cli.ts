/* eslint-disable no-console */
import chalk from 'chalk';
import { execSync } from 'child_process';
import { Command } from 'commander';
import { existsSync } from 'fs';
import { cp, mkdir } from 'fs/promises';
import { join } from 'path';
import prompts from 'prompts';

import packageJson from '../package.json';

const log = (...data: unknown[]) => {
  process.stdout.write(`${data.join(' ')}\n`);
};

export const runScaffoldCli = async (
  explicitProjectPath?: string,
  explicitPackageManger?: string,
  shouldInstallDeps = true
) => {
  let projectPath = explicitProjectPath || '';
  let packageManager = explicitPackageManger || '';
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

  if (existsSync(projectPath)) {
    // throw and exit
    chalk.red(`A folder already exists at ${projectPath}. Please choose a different project name.`);
    process.exit(1);
  }

  if (!projectPath) {
    console.log(
      '\nPlease specify the project directory:\n' +
        `  ${chalk.cyan(program.name())} ${chalk.green('<project-directory>')}\n`
    );
    process.exit(1);
  }

  if (!explicitPackageManger) {
    const packageManagerInput = await prompts({
      type: 'select',
      name: 'packageManager',
      message: 'Select a package manager',
      choices: [
        { title: 'pnpm', value: 'pnpm' },
        { title: 'npm', value: 'npm' },
      ],
      initial: 0,
    });
    packageManager = packageManagerInput.packageManager;
  }

  await mkdir(projectPath);

  await cp(join(__dirname, '../templates/nextjs'), projectPath, { recursive: true });

  if (shouldInstallDeps) {
    process.chdir(projectPath);
    execSync(`${packageManager} install`, { stdio: 'inherit' });
  }

  log();
  log();
  log(chalk.green(`⚡️ Success! Created a a fullstack Fuel dapp at ${projectPath}`));
  log();
  log();
  log('To get started:');
  log();
  log(`- cd into the project directory: cd ${projectPath}`);
  log(
    `- Start a local Fuel dev server: ${packageManager} ${
      packageManager === 'npm' ? 'run ' : ''
    }fuels:dev`
  );
  log(`- Run the frontend: ${packageManager} ${packageManager === 'npm' ? 'run ' : ''}dev`);
  log();
  log();
  log('-> TS SDK docs: https://docs.fuel.network/docs/fuels-ts/');
  log('-> Sway docs: https://docs.fuel.network/docs/sway/');
  log('-> If you have any questions, check the Fuel forum: https://forum.fuel.network/');
  log();
  log();
};
