import { safeExec } from '@fuel-ts/errors/test-utils';
import { execSync } from 'child_process';

import type { PackageManager } from '../src/lib/getPackageManager';

import type { ProjectPaths } from './utils/bootstrapProject';
import { bootstrapProject, resetFilesystem } from './utils/bootstrapProject';
import { generateArgs } from './utils/generateArgs';
import {
  filterForcBuildFiles,
  filterOriginalTemplateFiles,
  getAllFiles,
} from './utils/templateFiles';

const { log } = console;

const PUBLISHED_NPM_VERSION = process.env.PUBLISHED_NPM_VERSION;
const programsToInclude = { contract: true, predicate: true, script: true };
const packageManagerCreateCommands: [PackageManager, string, string[]][] = [
  ['pnpm', 'pnpm --ignore-workspace create fuels', []],
  ['bun', 'bunx --bun create-fuels', ['/bun.lockb']],
];

/**
 * @group e2e
 */
describe('`create fuels` package integrity', () => {
  let paths: ProjectPaths;
  let shouldSkip = false;

  beforeAll(() => {
    if (!PUBLISHED_NPM_VERSION) {
      log('Skipping live `create fuels` test');
      shouldSkip = true;
    }
  });

  beforeEach(() => {
    paths = bootstrapProject(__filename);
  });

  afterEach(() => {
    resetFilesystem(paths.root);
  });

  it.each(packageManagerCreateCommands)(
    `should perform 'create fuels' using '%s'`,
    async (packageManager, createCommand, additionalFiles) => {
      if (shouldSkip) {
        return;
      }

      const args = generateArgs(programsToInclude, paths.root, packageManager).join(' ');
      const expectedTemplateFiles = await getAllFiles(paths.sourceTemplate).then((files) =>
        filterOriginalTemplateFiles(files, programsToInclude)
          .filter(filterForcBuildFiles)
          .concat(additionalFiles)
      );

      const { error: createFuelsError } = await safeExec(() =>
        execSync(`${createCommand}@${PUBLISHED_NPM_VERSION} ${args}`, {
          stdio: 'inherit',
        })
      );

      const actualTemplateFiles = await getAllFiles(paths.root);
      expect(createFuelsError).toBeUndefined();
      expect(actualTemplateFiles.sort()).toEqual(expectedTemplateFiles.sort());
    },
    { timeout: 30000 }
  );
});
