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

const PUBLISHED_FUEL_PACKAGE_NAME = process.env.PUBLISHED_FUEL_PACKAGE_NAME ?? 'fuels';
const PUBLISHED_NPM_TAG = process.env.PUBLISHED_NPM_TAG ?? 'next';

const packageManagerCreateCommands: [PackageManager, string][] = [
  ['pnpm', `pnpm --ignore-workspace create ${PUBLISHED_FUEL_PACKAGE_NAME}@${PUBLISHED_NPM_TAG}`],
  ['bun', `bun create ${PUBLISHED_FUEL_PACKAGE_NAME}@${PUBLISHED_NPM_TAG}`],
  ['npm', `npm create ${PUBLISHED_FUEL_PACKAGE_NAME}@${PUBLISHED_NPM_TAG}`],
];

/**
 * @group integration
 */
describe('`create fuels` package integrity', () => {
  let paths: ProjectPaths;
  let shouldSkip = false;

  beforeAll(() => {
    if (!PUBLISHED_NPM_TAG) {
      log(`Skipping live '${PUBLISHED_FUEL_PACKAGE_NAME}' test`);
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

      const args = generateArgs({ projectName: paths.projectRoot, packageManager }).join(' ');
      const expectedTemplateFiles = await getAllFiles(paths.templateSource).then((files) =>
        filterOriginalTemplateFiles(files).filter(filterForcBuildFiles)
      );

      const cmd = `${createCommand} ${args}`;
      log('cmd', cmd);
      const { error: createFuelsError } = await safeExec(() =>
        execSync(cmd, {
          stdio: 'inherit',
        })
      );

      expect(createFuelsError).toBeUndefined();
      const actualTemplateFiles = await getAllFiles(paths.projectRoot);
      expect(actualTemplateFiles.sort()).toEqual(expectedTemplateFiles.sort());
    },
    { timeout: 30000 }
  );
});
