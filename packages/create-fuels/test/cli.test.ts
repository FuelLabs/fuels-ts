import fs, { cp } from 'fs/promises';
import { join } from 'path';

import { runScaffoldCli, setupProgram } from '../src/cli';

const possibleProgramsToInclude = [
  { contract: true, predicate: false, script: false },
  { contract: false, predicate: true, script: false },
  { contract: false, predicate: false, script: true },
  { contract: true, predicate: true, script: false },
  { contract: true, predicate: false, script: true },
  { contract: false, predicate: true, script: true },
  { contract: true, predicate: true, script: true },
];

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
    await runScaffoldCli('test-project', 'pnpm', false, programsToInclude);

    // check if the template was extracted to the test-project directory.
    // compare the templates/nextjs folder with the test-project folder recursively
    let originalTemplateFiles = (await fs.readdir(join(__dirname, '../templates/nextjs'))).concat(
      '.env.local'
    );

    // Remove the gitignore and env files from the originalTemplateFiles array
    const filesToRemove = ['gitignore', 'env'];
    originalTemplateFiles = originalTemplateFiles.filter((file) => !filesToRemove.includes(file));

    const testProjectFiles = await fs.readdir('test-project');

    expect(originalTemplateFiles.sort()).toEqual(testProjectFiles.sort());

    await fs.rm('test-project', { recursive: true });
  }
);

test('create-fuels throws if the project directory already exists', async () => {
  await fs.mkdir('test-project-2');

  await expect(
    runScaffoldCli('test-project-2', 'pnpm', false, {
      contract: true,
      predicate: true,
      script: true,
    })
  ).rejects.toThrow();

  await fs.rm('test-project-2', { recursive: true });
});

test('create-fuels throws if no programs are chosen to be included', async () => {
  await expect(
    runScaffoldCli('test-project-3', 'pnpm', false, {
      contract: false,
      predicate: false,
      script: false,
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
