import fs, { cp } from 'fs/promises';
import { glob } from 'glob';
import { join } from 'path';

import type { ProgramsToInclude } from '../src/cli';
import { runScaffoldCli, setupProgram } from '../src/cli';

const getAllFiles = async (pathToDir: string) => {
  const files = await glob(`${pathToDir}/**/*`, {
    ignore: ['**/node_modules/**', '**/.next/**', '**/sway-api/**'],
  });
  const filesWithoutPrefix = files.map((file) => file.replace(pathToDir, ''));
  return filesWithoutPrefix;
};

const possibleProgramsToInclude: ProgramsToInclude[] = [
  { contract: true, predicate: false, script: false },
  { contract: false, predicate: true, script: false },
  { contract: false, predicate: false, script: true },
  { contract: true, predicate: true, script: false },
  { contract: true, predicate: false, script: true },
  { contract: false, predicate: true, script: true },
  { contract: true, predicate: true, script: true },
];

const defaultFlags = ['--pnpm'];

const generateArgs = (programsToInclude: ProgramsToInclude, projectName?: string) => {
  const args = ['', ''];
  if (projectName) {
    args.push(projectName);
  }
  if (programsToInclude.contract) {
    args.push('-c');
  }
  if (programsToInclude.predicate) {
    args.push('-p');
  }
  if (programsToInclude.script) {
    args.push('-s');
  }
  args.push(...defaultFlags);
  return args;
};

const filterOriginalTemplateFiles = (files: string[], programsToInclude: ProgramsToInclude) => {
  let newFiles = [...files];

  newFiles = newFiles.filter((file) => {
    if (!programsToInclude.contract && file.includes('contract')) {
      return false;
    }
    if (!programsToInclude.predicate && file.includes('predicate')) {
      return false;
    }
    if (!programsToInclude.script && file.includes('script')) {
      return false;
    }
    if (['/gitignore', '/env'].includes(file)) {
      return false;
    }
    return true;
  });

  return newFiles;
};

beforeEach(async () => {
  // move the templates folder from the root of the project to the root of the create-fuels package temporarily.
  // this is needed because of the way the create-fuels package is setup.
  // it expects the templates folder to be in the root of the create-fuels package. we move it there in the prepublishOnly script
  await cp(join(__dirname, '../../../templates'), join(__dirname, '../templates'), {
    recursive: true,
  });
});

afterEach(async () => {
  await fs.rm(join(__dirname, '../templates'), { recursive: true });
});

/**
 * @group node
 */
test.each(possibleProgramsToInclude)(
  'create-fuels extracts the template to the specified directory',
  async (programsToInclude) => {
    // const programsToInclude: ProgramsToInclude = {
    //   contract: true,
    //   predicate: false,
    //   script: false,
    // };
    const args = generateArgs(programsToInclude, 'test-project');
    const program = setupProgram();
    program.parse(args);

    await runScaffoldCli({
      program,
      args,
      shouldInstallDeps: false,
    });

    // check if the template was extracted to the test-project directory.
    // compare the templates/nextjs folder with the test-project folder recursively
    let originalTemplateFiles = await getAllFiles(join(__dirname, '../templates/nextjs'));
    originalTemplateFiles = filterOriginalTemplateFiles(originalTemplateFiles, programsToInclude);

    const testProjectFiles = await getAllFiles('test-project');

    expect(originalTemplateFiles.sort()).toEqual(testProjectFiles.sort());

    await fs.rm('test-project', { recursive: true });
  }
);

test('create-fuels throws if the project directory already exists', async () => {
  await fs.mkdir('test-project-2');

  const args = generateArgs(
    {
      contract: true,
      predicate: true,
      script: true,
    },
    'test-project-2'
  );
  const program = setupProgram();
  program.parse(args);

  await expect(
    runScaffoldCli({
      program,
      args,
      shouldInstallDeps: false,
    })
  ).rejects.toThrow();

  await fs.rm('test-project-2', { recursive: true });
});

test('create-fuels throws if no programs are chosen to be included', async () => {
  const args = generateArgs(
    {
      contract: false,
      predicate: false,
      script: false,
    },
    'test-project-3'
  );
  const program = setupProgram();
  program.parse(args);

  await expect(
    runScaffoldCli({
      program,
      args,
      shouldInstallDeps: false,
      forceDisablePrompts: true,
    })
  ).rejects.toThrow();
});

test('setupProgram takes in args properly', () => {
  const program = setupProgram();
  program.parse(['', '', 'test-project-name', '-c', '-p', '-s', '--pnpm', '--npm']);
  expect(program.args[0]).toBe('test-project-name');
  expect(program.opts().contract).toBe(true);
  expect(program.opts().predicate).toBe(true);
  expect(program.opts().script).toBe(true);
  expect(program.opts().pnpm).toBe(true);
  expect(program.opts().npm).toBe(true);
});

test('setupProgram takes in combined args properly', () => {
  const program = setupProgram();
  program.parse(['', '', '-cps']);
  expect(program.opts().contract).toBe(true);
  expect(program.opts().predicate).toBe(true);
  expect(program.opts().script).toBe(true);
});

test('setupProgram - no args', () => {
  const program = setupProgram();
  program.parse([]);
  expect(program.opts().contract).toBe(undefined);
  expect(program.opts().predicate).toBe(undefined);
  expect(program.opts().script).toBe(undefined);
});
