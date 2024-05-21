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

  it('should perform `pnpm create fuels`', async () => {
    let expectedTemplateFiles = await getAllFiles(paths.sourceTemplate);
    expectedTemplateFiles = filterOriginalTemplateFiles(
      expectedTemplateFiles,
      programsToInclude
    ).filter(filterForcBuildFiles);

    const { error: createFuelsError } = await safeExec(() =>
      execSync(`pnpm create fuels@${fuelsVersion} ${args}`, { stdio: 'inherit' })
    );
    expect(createFuelsError).toBeUndefined();

    const actualTemplateFiles = await getAllFiles(paths.root);
    expect(actualTemplateFiles.sort()).toEqual(expectedTemplateFiles.sort());
  });
});
