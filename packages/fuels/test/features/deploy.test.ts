import { Contract } from '@fuel-ts/program';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

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

  afterEach(() => {
    resetConfigAndMocks(paths.fuelsConfigPath);
    resetDiskAndMocks(paths.root);
  });

  it('should run `deploy` command', async () => {
    using launched = await launchTestNode();

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

    const firstFuelsContents = JSON.parse(readFileSync(paths.contractsJsonPath, 'utf-8'));
    expect(firstFuelsContents.barFoo).toMatch(/0x/);
    expect(firstFuelsContents.fooBar).toMatch(/0x/);
  });

  it.only('should run `deploy` command [with proxy redeploy]', async () => {
    using launched = await launchTestNode({
      nodeOptions: {
        port: '4000',
      },
    });

    const {
      wallets: [wallet],
    } = launched;

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

    const firstFuelsContents = JSON.parse(readFileSync(paths.contractsJsonPath, 'utf-8'));
    expect(firstFuelsContents.barFoo).toMatch(/0x/);
    expect(firstFuelsContents.fooBar).toMatch(/0x/);
    expect(firstFuelsContents.upgradable).toMatch(/0x/);

    await runDeploy({ root: paths.root });

    const secondFuelsContents = JSON.parse(readFileSync(paths.contractsJsonPath, 'utf-8'));

    expect(firstFuelsContents.upgradable).toEqual(secondFuelsContents.upgradable);

    const proxyContractAddress = secondFuelsContents.upgradable;
    const abi = JSON.parse(
      readFileSync(
        join(paths.upgradableContractPath, 'out', 'debug', 'upgradable-abi.json'),
        'utf-8'
      )
    );

    const proxyContract = new Contract(proxyContractAddress, abi, wallet);
    const { waitForResult } = await proxyContract.functions.test_function().call();
    const { value } = await waitForResult();
    expect(value).toBe(true);
  });
});
