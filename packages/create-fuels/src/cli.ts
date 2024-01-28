/* eslint-disable no-console */
import toml from '@iarna/toml';
import chalk from 'chalk';
import { execSync } from 'child_process';
import { Command } from 'commander';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { cp, mkdir, rename } from 'fs/promises';
import { join } from 'path';
import prompts from 'prompts';

import packageJson from '../package.json';

const log = (...data: unknown[]) => {
  process.stdout.write(`${data.join(' ')}\n`);
};

type ProgramsToInclude = {
  contract: boolean;
  predicate: boolean;
  script: boolean;
};

const processWorkspaceToml = (fileContents: string, programsToInclude: ProgramsToInclude) => {
  const parsed = toml.parse(fileContents) as {
    workspace: {
      members: string[];
    };
  };

  parsed.workspace.members = parsed.workspace.members.filter((member) => {
    if (member === 'predicate' && !programsToInclude.predicate) {
      return false;
    }
    if (member === 'contract' && !programsToInclude.contract) {
      return false;
    }
    if (member === 'script' && !programsToInclude.script) {
      return false;
    }
    return true;
  });

  return toml.stringify(parsed);
};

export const runScaffoldCli = async (
  explicitProjectPath?: string,
  explicitPackageManger?: string,
  shouldInstallDeps = true,
  explicitProgramsToInclude?: ProgramsToInclude
) => {
  let projectPath = explicitProjectPath || '';
  let packageManager = explicitPackageManger || '';
  let programsToInclude: ProgramsToInclude = explicitProgramsToInclude || {
    contract: true,
    predicate: false,
    script: false,
  };

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

  if (!explicitProgramsToInclude) {
    const programsToIncludeInput = await prompts({
      type: 'multiselect',
      name: 'programsToInclude',
      message: 'Which Sway programs do you want?',
      choices: [
        { title: 'Contract', value: 'contract' },
        { title: 'Predicate', value: 'predicate' },
        { title: 'Script', value: 'script' },
      ],
    });
    programsToInclude = {
      contract: programsToIncludeInput.programsToInclude.includes('contract'),
      predicate: programsToIncludeInput.programsToInclude.includes('predicate'),
      script: programsToIncludeInput.programsToInclude.includes('script'),
    };
  }

  await mkdir(projectPath);

  await cp(join(__dirname, '../templates/nextjs'), projectPath, { recursive: true });
  await rename(join(projectPath, 'gitignore'), join(projectPath, '.gitignore'));

  // Process the programs to include

  // delete the programs that are not to be included
  if (!programsToInclude.contract) {
    execSync(`rm -rf ${join(projectPath, 'sway-programs/contract')}`);
  }
  if (!programsToInclude.predicate) {
    execSync(`rm -rf ${join(projectPath, 'sway-programs/predicate')}`);
  }
  if (!programsToInclude.script) {
    execSync(`rm -rf ${join(projectPath, 'sway-programs/script')}`);
  }

  // remove the programs that are not included from the Forc.toml members field. rewrite the file
  const forcTomlPath = join(projectPath, 'sway-programs', 'Forc.toml');
  const forcTomlContents = readFileSync(forcTomlPath, 'utf-8');
  const newForcTomlContents = processWorkspaceToml(forcTomlContents, programsToInclude);
  writeFileSync(forcTomlPath, newForcTomlContents);

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
