import { versions } from '@fuel-ts/versions';
import toml from '@iarna/toml';
import chalk from 'chalk';
import { execSync } from 'child_process';
import type { Command } from 'commander';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { cp, mkdir, rename } from 'fs/promises';
import ora from 'ora';
import { join } from 'path';

import { tryInstallFuelUp } from './lib';
import { getPackageManager } from './lib/getPackageManager';
import { getPackageVersion } from './lib/getPackageVersion';
import type { ProgramOptions } from './lib/setupProgram';
import { promptForProjectPath } from './prompts';
import { error, log } from './utils/logger';

export { setupProgram } from './lib/setupProgram';

const processWorkspaceToml = (fileContents: string) => {
  const parsed = toml.parse(fileContents) as {
    workspace: {
      members: ('predicate' | 'contract' | 'script')[];
    };
  };

  return toml.stringify(parsed);
};

function writeEnvFile(envFilePath: string) {
  let newFileContents = '';

  newFileContents += `\nNEXT_PUBLIC_FUEL_NODE_PORT=4000`;
  newFileContents += `\nNEXT_PUBLIC_DAPP_ENVIRONMENT=local`;

  writeFileSync(envFilePath, newFileContents);
}

export const runScaffoldCli = async ({
  program,
  templateName = 'nextjs',
  args = process.argv,
}: {
  program: Command;
  args: string[];
  templateName: string;
}) => {
  program.parse(args);

  let projectPath = program.args[0] ?? (await promptForProjectPath());

  const opts = program.opts<ProgramOptions>();
  const verboseEnabled = opts.verbose ?? false;
  const packageManager = getPackageManager(opts);

  if (!process.env.VITEST) {
    await tryInstallFuelUp(verboseEnabled);
  }

  while (existsSync(projectPath)) {
    error(`A folder already exists at ${projectPath}. Please choose a different project name.`);

    // Exit the program if we are testing to prevent hanging
    if (process.env.VITEST) {
      throw new Error();
    }

    projectPath = await promptForProjectPath();
  }

  while (!projectPath) {
    error('Please specify a project directory.');

    // Exit the program if we are testing to prevent hanging
    if (process.env.VITEST) {
      throw new Error();
    }

    projectPath = await promptForProjectPath();
  }

  const fileCopySpinner = ora({
    text: 'Copying template files..',
    color: 'green',
  }).start();

  await mkdir(projectPath);

  const templateDir = join(__dirname, '..', 'templates', templateName);
  await cp(templateDir, projectPath, {
    recursive: true,
    filter: (filename) => !filename.includes('CHANGELOG.md'),
  });
  await rename(join(projectPath, 'gitignore'), join(projectPath, '.gitignore'));
  await rename(join(projectPath, 'env'), join(projectPath, '.env.local'));
  writeEnvFile(join(projectPath, '.env.local'));

  const forcTomlPath = join(projectPath, 'sway-programs', 'Forc.toml');
  const forcTomlContents = readFileSync(forcTomlPath, 'utf-8');
  const newForcTomlContents = processWorkspaceToml(forcTomlContents);
  writeFileSync(forcTomlPath, newForcTomlContents);

  // Rewrite the package.json file
  // Note: `pnpm run xprebuild` -> rewritten to -> `pnpm run prebuild` (on prePublish script)
  const packageJsonPath = join(projectPath, 'package.json');
  const packageJsonContents = readFileSync(packageJsonPath, 'utf-8');
  const fuelsVersion = getPackageVersion(args);
  const newPackageJsonContents = packageJsonContents
    .replace(`pnpm run prebuild`, packageManager.run('prebuild'))
    .replace(`"fuels": "${versions.FUELS}"`, `"fuels": "${fuelsVersion}"`);

  writeFileSync(packageJsonPath, newPackageJsonContents);

  // Rewrite the README.md file
  const readmePath = join(projectPath, 'README.md');
  const readmeContents = readFileSync(readmePath, 'utf-8');
  const newReadmeContents = readmeContents
    .replace('npm run fuels:dev', packageManager.run('fuels:dev'))
    .replace('npm run dev', packageManager.run('dev'));
  writeFileSync(readmePath, newReadmeContents);

  fileCopySpinner.succeed('Copied template files!');

  if (opts.install) {
    const installDepsSpinner = ora({
      text: 'Installing dependencies..',
      color: 'green',
    }).start();

    process.chdir(projectPath);
    execSync(packageManager.install, { stdio: verboseEnabled ? 'inherit' : 'pipe' });

    installDepsSpinner.succeed('Installed dependencies!');
  }

  log();
  log();
  log(chalk.green(`⚡️ Success! Created a fullstack Fuel dapp at ${projectPath}`));
  log();
  log();
  log('To get started:');
  log();
  log(`- cd into the project directory: cd ${projectPath}`);
  log(`- Start a local Fuel dev server: ${packageManager.run('fuels:dev')}`);
  log(`- Run the frontend: ${packageManager.run('dev')}`);
  log();
  log();
  log('-> TS SDK docs: https://docs.fuel.network/docs/fuels-ts/');
  log('-> Sway docs: https://docs.fuel.network/docs/sway/');
  log('-> If you have any questions, check the Fuel forum: https://forum.fuel.network/');
  log();
  log();
};
