import fs, { cp } from 'fs/promises';
import { join } from 'path';

import { runScaffoldCli } from '../src/cli';

const possibleProgramsToInclude = [
  { contract: true, predicate: false, script: false },
  { contract: false, predicate: true, script: false },
  { contract: false, predicate: false, script: true },
  { contract: true, predicate: true, script: false },
  { contract: true, predicate: false, script: true },
  { contract: false, predicate: true, script: true },
  { contract: true, predicate: true, script: true },
];

beforeAll(async () => {
  // move the templates folder from the root of the project to the root of the create-fuels package temporarily.
  // this is needed because of the way the create-fuels package is setup.
  // it expects the templates folder to be in the root of the create-fuels package. we move it there in the prepublishOnly script
  await cp(join(__dirname, '../../../templates'), join(__dirname, '../templates'), {
    recursive: true,
  });
});

afterAll(async () => {
  // cleanup - delete the test project and the templates folder
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
    let originalTemplateFiles = await fs.readdir(join(__dirname, '../templates/nextjs'));

    // Remove the gitignore and env files from the originalTemplateFiles array
    const filesToRemove = ['gitignore', 'env'];
    originalTemplateFiles = originalTemplateFiles.filter((file) => !filesToRemove.includes(file));

    const testProjectFiles = await fs.readdir('test-project');

    expect(originalTemplateFiles).toEqual(testProjectFiles);

    await fs.rm('test-project', { recursive: true });
  }
);

test('create-fuels throws if the project directory already exists', async () => {
  await fs.mkdir('test-project');

  await expect(
    runScaffoldCli('test-project', 'pnpm', false, {
      contract: true,
      predicate: true,
      script: true,
    })
  ).rejects.toThrow();

  await fs.rm('test-project', { recursive: true });
});

test('create-fuels throws if no programs are chosen to be included', async () => {
  await expect(
    runScaffoldCli('test-project', 'pnpm', false, {
      contract: false,
      predicate: false,
      script: false,
    })
  ).rejects.toThrow();
});
