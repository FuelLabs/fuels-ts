import { FuelError } from '@fuel-ts/errors';
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
import { doesTemplateExist } from './lib/doesTemplateExist';
import { getPackageManager } from './lib/getPackageManager';
import { getPackageVersion } from './lib/getPackageVersion';
import { defaultTemplate, templates } from './lib/setupProgram';
import type { Template, ProgramOptions } from './lib/setupProgram';
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

const writeEnvFile = (rootDirPath: string) => {
  const envFilePath = join(rootDirPath, 'env');
  const envFileContents = readFileSync(envFilePath, 'utf-8');
  const newEnvFilePath = join(rootDirPath, '.env.local');

  writeFileSync(newEnvFilePath, envFileContents);
};

export const runScaffoldCli = async ({
  program,
  args = process.argv,
}: {
  program: Command;
  args: string[];
}) => {
  program.parse(args);
  const opts = program.opts<ProgramOptions>();

  const templateOfChoice = (opts.template ?? defaultTemplate) as Template;

  if (!doesTemplateExist(templateOfChoice)) {
    error(`Template '${templateOfChoice}' does not exist.`);
    log();
    log('Available templates:');
    for (const template of templates) {
      log(`  - ${template}`);
    }
    process.exit(1);
  }

  let projectPath = program.args[0] ?? (await promptForProjectPath());

  const verboseEnabled = opts.verbose ?? false;
  const packageManager = getPackageManager();

  if (!process.env.VITEST) {
    await tryInstallFuelUp(verboseEnabled);
  }

  while (existsSync(projectPath)) {
    error(`A folder already exists at ${projectPath}. Please choose a different project name.`);

    // Exit the program if we are testing to prevent hanging
    if (process.env.VITEST) {
      throw new FuelError(
        FuelError.CODES.UNKNOWN,
        'An error occurred due to the environmental variable `VITEST` was detected.'
      );
    }

    projectPath = await promptForProjectPath();
  }

  while (!projectPath) {
    error('Please specify a project directory.');

    // Exit the program if we are testing to prevent hanging
    if (process.env.VITEST) {
      throw new FuelError(
        FuelError.CODES.UNKNOWN,
        'An error occurred due to the environmental variable `VITEST` was detected.'
      );
    }

    projectPath = await promptForProjectPath();
  }

  const fileCopySpinner = ora({
    text: 'Copying template files..',
    color: 'green',
  }).start();

  await mkdir(projectPath);

  const templateDir = join(__dirname, '..', 'templates', templateOfChoice);
  await cp(templateDir, projectPath, {
    recursive: true,
    filter: (filename) => !filename.includes('CHANGELOG.md'),
  });
  await rename(join(projectPath, 'gitignore'), join(projectPath, '.gitignore'));
  writeEnvFile(projectPath);
  await rename(join(projectPath, 'env'), join(projectPath, '.env.local'));

  const forcTomlPath = join(projectPath, 'sway-programs', 'Forc.toml');
  const forcTomlContents = readFileSync(forcTomlPath, 'utf-8');
  const newForcTomlContents = processWorkspaceToml(forcTomlContents);
  writeFileSync(forcTomlPath, newForcTomlContents);

  // Rewrite the package.json file
  // Note: `pnpm run xprebuild` -> rewritten to -> `pnpm run prebuild` (on prePublish script)
  const packageJsonPath = join(projectPath, 'package.json');
  const packageJsonContents = readFileSync(packageJsonPath, 'utf-8');
  const fuelsVersion = getPackageVersion(args);
  let newPackageJsonContents = packageJsonContents
    .replace(`pnpm run prebuild`, packageManager.run('prebuild'))
    .replace(`"fuels": "${versions.FUELS}"`, `"fuels": "${fuelsVersion}"`);

  // TODO: remove once upgraded to `graphql-request@v7`
  // https://github.com/FuelLabs/fuels-ts/issues/3546
  if (packageManager.name === 'pnpm') {
    let newPackageJsonObject = JSON.parse(newPackageJsonContents);
    newPackageJsonObject = {
      ...newPackageJsonObject,
      overrides: undefined,
      pnpm: {
        overrides: newPackageJsonObject.overrides,
      },
    };
    newPackageJsonContents = JSON.stringify(newPackageJsonObject, null, 2);
  }

  writeFileSync(packageJsonPath, newPackageJsonContents);

  // Rewrite the README.md file
  const readmePath = join(projectPath, 'README.md');
  const readmeContents = readFileSync(readmePath, 'utf-8');
  const newReadmeContents = readmeContents
    .replace('npm run fuels:dev', packageManager.run('fuels:dev'))
    .replace('npm run dev', packageManager.run('dev'));
  writeFileSync(readmePath, newReadmeContents);

  fileCopySpinner.succeed('Copied template files!');

  // Remove typegen files from gitignore
  const gitignorePath = join(projectPath, '.gitignore');
  const gitignoreContents = readFileSync(gitignorePath, 'utf-8');
  const newGitIgnoreContents = gitignoreContents.replace(/^(src\/sway-api\/.+)$/gm, '# $1');
  writeFileSync(gitignorePath, newGitIgnoreContents);

  if (opts.install) {
    const installDepsSpinner = ora({
      text: 'Installing dependencies..',
      color: 'green',
    }).start();
    process.chdir(projectPath);
    execSync(packageManager.install, { stdio: verboseEnabled ? 'inherit' : 'pipe' });
    installDepsSpinner.succeed('Installed dependencies!');

    // Generate typegen files
    execSync(packageManager.run('prebuild'), { stdio: verboseEnabled ? 'inherit' : 'pipe' });
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
