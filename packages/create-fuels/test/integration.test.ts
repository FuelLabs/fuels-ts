import { safeExec } from '@fuel-ts/errors/test-utils';
import { execSync } from 'child_process';
import { readFileSync } from 'fs';

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

const PUBLISHED_NPM_TAG = process.env.PUBLISHED_NPM_TAG ?? 'next';
const packageManagerCreateCommands: [PackageManager, string][] = [
  ['pnpm', 'pnpm --ignore-workspace create fuels'],
  ['bun', 'bunx --bun create-fuels'],
  ['npm', 'npm create fuels'],
];

/**
 * @group integration
 */
describe('`create fuels` package integrity', () => {
  let paths: ProjectPaths;
  let shouldSkip = false;

  beforeAll(() => {
    if (!PUBLISHED_NPM_TAG) {
      log('Skipping live `create fuels` test');
      shouldSkip = true;
    }
  });

  beforeEach(() => {
    paths = bootstrapProject(__filename);
  });

  afterEach(() => {
    resetFilesystem(paths.projectRoot);
  });

  it.each(packageManagerCreateCommands)(
    `should perform 'create fuels' using '%s'`,
    async (packageManager, createCommand) => {
      if (shouldSkip) {
        return;
      }
      const expectedPackageJsonInstall = new RegExp(
        `"fuels": "[0-9]+.[0-9]+.[0-9]+-${PUBLISHED_NPM_TAG}-[0-9]+"`
      );

      const args = generateArgs({ projectName: paths.projectRoot, packageManager }).join(' ');
      const expectedTemplateFiles = await getAllFiles(paths.templateSource).then((files) =>
        filterOriginalTemplateFiles(files).filter(filterForcBuildFiles)
      );

      const { error: createFuelsError } = await safeExec(() =>
        execSync(`${createCommand}@${PUBLISHED_NPM_TAG} ${args}`, {
          stdio: 'inherit',
        })
      );

      expect(createFuelsError).toBeUndefined();
      const actualTemplateFiles = await getAllFiles(paths.projectRoot);
      expect(actualTemplateFiles.sort()).toEqual(expectedTemplateFiles.sort());
      const packageJson = readFileSync(paths.projectPackageJson, 'utf-8');
      expect(packageJson).toEqual(expect.stringMatching(expectedPackageJsonInstall));
    },
    { timeout: 30000 }
  );
});
