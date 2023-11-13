import { existsSync, readFileSync } from 'fs';

import { resetDiskAndMocks } from '../utils/resetDiskAndMocks';
import {
  bootstrapProject,
  resetConfigAndMocks,
  runBuild,
  runDeploy,
  runInit,
} from '../utils/runCommands';

/**
 * @group node
 */
describe(
  'deploy',
  () => {
    const paths = bootstrapProject(__filename);

    afterEach(() => {
      resetConfigAndMocks(paths.fuelsConfigPath);
    });

    afterAll(() => {
      resetDiskAndMocks(paths.root);
    });

    it('should run `deploy` command', async () => {
      await runInit({
        root: paths.root,
        workspace: paths.workspaceDir,
        output: paths.outputDir,
      });

      await runBuild({ root: paths.root });
      await runDeploy({ root: paths.root });

      expect(existsSync(paths.contractsJsonPath)).toBeTruthy();

      const fuelsContents = JSON.parse(readFileSync(paths.contractsJsonPath, 'utf-8'));
      expect(fuelsContents.barFoo).toMatch(/0x/);
      expect(fuelsContents.fooBar).toMatch(/0x/);
    });
  },
  { timeout: 10000 }
);
