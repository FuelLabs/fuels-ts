import { existsSync, readFileSync } from 'fs';

import { launchTestNode } from '../../src/test-utils';
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
describe('deploy', { timeout: 180000 }, () => {
  const paths = bootstrapProject(__filename);

  afterAll(() => {
    resetConfigAndMocks(paths.fuelsConfigPath);
    resetDiskAndMocks(paths.root);
  });

  it('should run `deploy` command', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    using launched = await launchTestNode({
      nodeOptions: { port: '4000' },
    });

    await runInit({
      root: paths.root,
      workspace: paths.workspaceDir,
      output: paths.outputDir,
      forcPath: paths.forcPath,
      fuelCorePath: paths.fuelCorePath,
    });

    await runBuild({ root: paths.root });
    await runDeploy({ root: paths.root });

    expect(existsSync(paths.contractsJsonPath)).toBeTruthy();

    const fuelsContents = JSON.parse(readFileSync(paths.contractsJsonPath, 'utf-8'));
    expect(fuelsContents.barFoo).toMatch(/0x/);
    expect(fuelsContents.fooBar).toMatch(/0x/);
  });
});
