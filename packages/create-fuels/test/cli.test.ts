import fs, { cp } from 'fs/promises';
import { join } from 'path';

import { runScaffoldCli } from '../src/cli';

/**
 * @group node
 */
test('create-fuels extracts the template to the specified directory', async () => {
  // move the templates folder from the root of the project to the root of the create-fuels package temporarily.
  // this is needed because of the way the create-fuels package is setup.
  // it expects the templates folder to be in the root of the create-fuels package. we move it there in the prepublishOnly script
  await cp(join(__dirname, '../../../templates'), join(__dirname, '../templates'), {
    recursive: true,
  });

  await runScaffoldCli('test-project', 'pnpm', false);

  // check if the template was extracted to the test-project directory.
  // compare the templates/nextjs folder with the test-project folder recursively
  const originalTemplateFiles = await fs.readdir(join(__dirname, '../templates/nextjs'));

  // remove the gitignore file from the array because it is not copied to the test-project folder
  const gitIgnoreIndex = originalTemplateFiles.indexOf('gitignore');
  if (gitIgnoreIndex > -1) {
    originalTemplateFiles.splice(gitIgnoreIndex, 1);
  }

  const testProjectFiles = await fs.readdir('test-project');

  expect(originalTemplateFiles).toEqual(testProjectFiles);

  // cleanup - delete the test project and the templates folder
  await fs.rm(join(__dirname, '../templates'), { recursive: true });
  await fs.rm('test-project', { recursive: true });
});
