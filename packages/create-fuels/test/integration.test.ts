import { safeExec } from '@fuel-ts/errors/test-utils';
import { execSync } from 'child_process';

import type { ProjectPaths } from './utils/bootstrapProject';
import { bootstrapProject, resetFilesystem } from './utils/bootstrapProject';
import { generateArgs } from './utils/generateArgs';
import {
  filterForcBuildFiles,
  filterOriginalTemplateFiles,
  getAllFiles,
} from './utils/templateFiles';

const fuelsVersion = process.env.PUBLISHED_NPM_VERSION;
const programsToInclude = { contract: true, predicate: true, script: true };

/**
 * @group integration
 */
describe('CLI - Integration', () => {
  const paths: ProjectPaths = bootstrapProject(__filename);
  const args = generateArgs(programsToInclude, paths.root).join(' ');

  afterEach(() => {
    resetFilesystem(paths.root);
  });

  it(
    'should perform `pnpm create fuels`',
    async () => {
      const command = `pnpm create fuels${fuelsVersion} ${args}`;
      console.log(command);
      let expectedTemplateFiles = await getAllFiles(paths.sourceTemplate);
      expectedTemplateFiles = filterOriginalTemplateFiles(
        expectedTemplateFiles,
        programsToInclude
      ).filter(filterForcBuildFiles);
      console.log('ExpectedSourceTemplate', JSON.stringify(expectedTemplateFiles))


      const { error: createFuelsError } = await safeExec(() => execSync(command, { stdio: 'inherit' }));
      expect(createFuelsError).toBeUndefined();

      const actualTemplateFiles = await getAllFiles(paths.root);
      console.log('Actual', JSON.stringify(actualTemplateFiles))
      expect(actualTemplateFiles.sort()).toEqual(expectedTemplateFiles.sort());
    },
    { timeout: 30000 }
  );
});
