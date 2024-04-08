import toml from '@iarna/toml';
import chalk from 'chalk';
import { execSync } from 'child_process';
import { Command } from 'commander';
import { existsSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { cp, mkdir, rename } from 'fs/promises';
import ora from 'ora';
import { join } from 'path';
import prompts from 'prompts';

import packageJson from '../package.json';

const log = (...data: unknown[]) => {
  process.stdout.write(`${data.join(' ')}\n`);
};

export type ProgramsToInclude = {
  contract: boolean;
  predicate: boolean;
  script: boolean;
};

const processWorkspaceToml = (fileContents: string, programsToInclude: ProgramsToInclude) => {
  const parsed = toml.parse(fileContents) as {
    workspace: {
      members: ('predicate' | 'contract' | 'script')[];
    };
  };

  parsed.workspace.members = parsed.workspace.members.filter((m) => programsToInclude[m]);

  return toml.stringify(parsed);
};

async function promptForProjectPath() {
  const res = await prompts(
    {
      type: 'text',
      name: 'projectName',
      message: 'What is the name of your project?',
      initial: 'my-fuel-project',
    },
    { onCancel: () => process.exit(0) }
  );

  return res.projectName as string;
}

async function promptForPackageManager() {
  const packageManagerInput = await prompts(
    {
      type: 'select',
      name: 'packageManager',
      message: 'Select a package manager',
      choices: [
        { title: 'pnpm', value: 'pnpm' },
        { title: 'npm', value: 'npm' },
      ],
      initial: 0,
    },
    { onCancel: () => process.exit(0) }
  );
  return packageManagerInput.packageManager as string;
}

async function promptForProgramsToInclude({
  forceDisablePrompts = false,
}: {
  forceDisablePrompts?: boolean;
}) {
  if (forceDisablePrompts) {
    return {
      contract: false,
      predicate: false,
      script: false,
    };
  }
  const programsToIncludeInput = await prompts(
    {
      type: 'multiselect',
      name: 'programsToInclude',
      message: 'Which Sway programs do you want?',
      choices: [
        { title: 'Contract', value: 'contract', selected: true },
        { title: 'Predicate', value: 'predicate', selected: true },
        { title: 'Script', value: 'script', selected: true },
      ],
      instructions: false,
    },
    { onCancel: () => process.exit(0) }
  );
  return {
    contract: programsToIncludeInput.programsToInclude.includes('contract'),
    predicate: programsToIncludeInput.programsToInclude.includes('predicate'),
    script: programsToIncludeInput.programsToInclude.includes('script'),
  };
}

function writeEnvFile(envFilePath: string, programsToInclude: ProgramsToInclude) {
  /*
   * Should be like:
   * NEXT_PUBLIC_HAS_CONTRACT=true
   * NEXT_PUBLIC_HAS_PREDICATE=false
   * NEXT_PUBLIC_HAS_SCRIPT=true
   */
  let newFileContents = Object.entries(programsToInclude)
    .map(([program, include]) => `NEXT_PUBLIC_HAS_${program.toUpperCase()}=${include}`)
    .join('\n');

  newFileContents += `\nNEXT_PUBLIC_FUEL_NODE_PORT=4000`;
  writeFileSync(envFilePath, newFileContents);
}

export const setupProgram = () => {
  const program = new Command(packageJson.name)
    .version(packageJson.version)
    .arguments('[projectDirectory]')
    .option('-c, --contract', 'Include contract program')
    .option('-p, --predicate', 'Include predicate program')
    .option('-s, --script', 'Include script program')
    .option('--pnpm', 'Use pnpm as the package manager')
    .option('--npm', 'Use npm as the package manager')
    .option('--verbose', 'Enable verbose logging')
    .addHelpCommand()
    .showHelpAfterError(true);
  return program;
};

export const runScaffoldCli = async ({
  program,
  args = process.argv,
  shouldInstallDeps = false,
  forceDisablePrompts = false,
}: {
  program: Command;
  args: string[];
  shouldInstallDeps?: boolean;
  forceDisablePrompts?: boolean;
}) => {
  program.parse(args);

  let projectPath = program.args[0] ?? (await promptForProjectPath());
  const verboseEnabled = program.opts().verbose ?? false;

  while (existsSync(projectPath)) {
    log(
      chalk.red(
        `A folder already exists at ${projectPath}. Please choose a different project name.`
      )
    );

    // Exit the program if we are testing to prevent hanging
    if (process.env.VITEST) {
      throw new Error();
    }

    projectPath = await promptForProjectPath();
  }

  while (!projectPath) {
    log(chalk.red('Please specify a project directory.'));

    // Exit the program if we are testing to prevent hanging
    if (process.env.VITEST) {
      throw new Error();
    }

    projectPath = await promptForProjectPath();
  }

  const cliPackageManagerChoices = {
    pnpm: program.opts().pnpm,
    npm: program.opts().npm,
  };

  const cliChosenPackageManager = Object.entries(cliPackageManagerChoices).find(([, v]) => v)?.[0];

  let packageManager = cliChosenPackageManager ?? (await promptForPackageManager());

  if (!packageManager) {
    packageManager = 'pnpm';
  }

  const cliProgramsToInclude = {
    contract: program.opts().contract,
    predicate: program.opts().predicate,
    script: program.opts().script,
  };
  const hasAnyCliProgramsToInclude = Object.values(cliProgramsToInclude).some((v) => v);

  let programsToInclude: ProgramsToInclude;
  if (hasAnyCliProgramsToInclude) {
    programsToInclude = cliProgramsToInclude;
  } else {
    programsToInclude = await promptForProgramsToInclude({
      forceDisablePrompts,
    });
  }

  while (!programsToInclude.contract && !programsToInclude.predicate && !programsToInclude.script) {
    log(chalk.red('You must include at least one Sway program.'));

    // Exit the program if we are testing to prevent hanging
    if (process.env.VITEST) {
      throw new Error();
    }

    programsToInclude = await promptForProgramsToInclude({
      forceDisablePrompts,
    });
  }

  const fileCopySpinner = ora({
    text: 'Copying template files..',
    color: 'green',
  }).start();

  await mkdir(projectPath);

  await cp(join(__dirname, '../templates/nextjs'), projectPath, {
    recursive: true,
    filter: (filename) => !filename.includes('CHANGELOG.md'),
  });
  await rename(join(projectPath, 'gitignore'), join(projectPath, '.gitignore'));
  await rename(join(projectPath, 'env'), join(projectPath, '.env.local'));
  writeEnvFile(join(projectPath, '.env.local'), programsToInclude);

  // delete the programs that are not to be included
  if (!programsToInclude.contract) {
    rmSync(join(projectPath, 'sway-programs/contract'), { recursive: true });
  }
  if (!programsToInclude.predicate) {
    rmSync(join(projectPath, 'sway-programs/predicate'), { recursive: true });
    rmSync(join(projectPath, 'src/pages/predicate.tsx'), { recursive: true });
  }
  if (!programsToInclude.script) {
    rmSync(join(projectPath, 'sway-programs/script'), { recursive: true });
    rmSync(join(projectPath, 'src/pages/script.tsx'), { recursive: true });
  }

  // remove the programs that are not included from the Forc.toml members field and rewrite the file
  const forcTomlPath = join(projectPath, 'sway-programs', 'Forc.toml');
  const forcTomlContents = readFileSync(forcTomlPath, 'utf-8');
  const newForcTomlContents = processWorkspaceToml(forcTomlContents, programsToInclude);
  writeFileSync(forcTomlPath, newForcTomlContents);

  fileCopySpinner.succeed('Copied template files!');

  const installDepsSpinner = ora({
    text: 'Installing dependencies..',
    color: 'green',
  }).start();

  if (shouldInstallDeps) {
    process.chdir(projectPath);
    execSync(`${packageManager} install`, { stdio: verboseEnabled ? 'inherit' : 'pipe' });
  }

  installDepsSpinner.succeed('Installed dependencies!');

  log();
  log();
  log(chalk.green(`⚡️ Success! Created a fullstack Fuel dapp at ${projectPath}`));
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
