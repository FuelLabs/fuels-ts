import { Contract } from '@fuel-ts/program';
import { existsSync, readFileSync, writeFileSync } from 'fs';
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
  let paths = bootstrapProject(__filename);

  beforeEach(() => {
    resetConfigAndMocks(paths.fuelsConfigPath);
    resetDiskAndMocks(paths.root);
    paths = bootstrapProject(__filename);
  });

  afterEach(() => {
    resetDiskAndMocks(paths.root);
  });

  it('should run `deploy` command', async () => {
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
      privateKey: wallet.privateKey,
    });

    await runBuild({ root: paths.root });
    await runDeploy({ root: paths.root });

    expect(existsSync(paths.contractsJsonPath)).toBeTruthy();

    const firstFuelsContents = JSON.parse(readFileSync(paths.contractsJsonPath, 'utf-8'));
    expect(firstFuelsContents.barFoo).toMatch(/0x/);
    expect(firstFuelsContents.fooBar).toMatch(/0x/);
  });

  it('should run `deploy` command [using proxy + re-deploy]', async () => {
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
      privateKey: wallet.privateKey,
    });

    /**
     * 1) First deploy
     *  Validate if contract's json was written.
     */
    await runBuild({ root: paths.root });
    await runDeploy({ root: paths.root });

    expect(existsSync(paths.contractsJsonPath)).toBeTruthy();

    const firstFuelsContents = JSON.parse(readFileSync(paths.contractsJsonPath, 'utf-8'));
    expect(firstFuelsContents.barFoo).toMatch(/0x/);
    expect(firstFuelsContents.fooBar).toMatch(/0x/);
    expect(firstFuelsContents.upgradable).toMatch(/0x/);

    /**
     * a) Add helper
     *   For interacting with deployed contract
     */
    async function executeTargetContract() {
      const upgradableContractId = firstFuelsContents.upgradable;
      const upgradableAbi = JSON.parse(
        readFileSync(
          join(paths.upgradableContractPath, 'out', 'debug', 'upgradable-abi.json'),
          'utf-8'
        )
      );

      const targetContract = new Contract(upgradableContractId, upgradableAbi, wallet);
      const res = await targetContract.functions.test_function().call();
      const { value } = await res.waitForResult();

      const { value: getCountValue } = await targetContract.functions.get_value().get();
      expect(getCountValue).toBe(10);

      return value;
    }

    /**
     * b) Interact with target contract
     *   Calling `test_function` should return `true` for the first execution.
     */
    expect(await executeTargetContract()).toBe(true); // TRUE

    /**
     * c) Modify `main.sw` method before second deploy
     *   This will make the method return `false` instead of `true`.
     */
    const mainPath = join(paths.upgradableContractPath, 'src', 'main.sw');
    const mainContents = readFileSync(mainPath, 'utf-8');

    writeFileSync(mainPath, mainContents.replace(/true/, 'false'));

    /**
     * 2) Second deploy
     *   Validate if contract's json was written and is identical
     *   to the first run (IDs should not change).
     */
    await runBuild({ root: paths.root });
    await runDeploy({ root: paths.root });

    const secondFuelsContents = JSON.parse(readFileSync(paths.contractsJsonPath, 'utf-8'));

    expect(firstFuelsContents.upgradable).toEqual(secondFuelsContents.upgradable);

    /**
     * d) Interact with target contract
     *   Now, calling `test_function` should return `false` instead.
     */
    expect(await executeTargetContract()).toBe(false); // FALSE
  });

  it('should run `deploy` command [using proxy and chunking + re-deploy]', async () => {
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
      privateKey: wallet.privateKey,
    });

    /**
     * 1) First deploy
     *  Validate if contract's json was written.
     */
    await runBuild({ root: paths.root });
    await runDeploy({ root: paths.root });

    expect(existsSync(paths.contractsJsonPath)).toBeTruthy();

    const firstFuelsContents = JSON.parse(readFileSync(paths.contractsJsonPath, 'utf-8'));
    expect(firstFuelsContents.barFoo).toMatch(/0x/);
    expect(firstFuelsContents.fooBar).toMatch(/0x/);
    expect(firstFuelsContents.upgradable).toMatch(/0x/);

    /**
     * a) Add helper
     *   For interacting with deployed contract
     */
    async function executeTargetContract() {
      const upgradableChunkedContractId = firstFuelsContents.upgradableChunked;
      const upgradableChunkedAbi = JSON.parse(
        readFileSync(
          join(paths.upgradableChunkedContractPath, 'out', 'debug', 'upgradable-chunked-abi.json'),
          'utf-8'
        )
      );

      const targetContract = new Contract(
        upgradableChunkedContractId,
        upgradableChunkedAbi,
        wallet
      );

      const { value: getCountValue } = await targetContract.functions.get_value().get();
      expect(getCountValue).toBe(10);

      const res = await targetContract.functions.test_function().call();
      const { value } = await res.waitForResult();

      return value;
    }

    /**
     * b) Interact with target contract
     *   Calling `test_function` should return `true` for the first execution.
     */
    expect(await executeTargetContract()).toBe(true); // TRUE

    /**
     * c) Modify `main.sw` method before second deploy
     *   This will make the method return `false` instead of `true`.
     */
    const mainPath = join(paths.upgradableChunkedContractPath, 'src', 'main.sw');
    const mainContents = readFileSync(mainPath, 'utf-8');

    writeFileSync(mainPath, mainContents.replace(/true/, 'false'));

    /**
     * 2) Second deploy
     *   Validate if contract's json was written and is identical
     *   to the first run (IDs should not change).
     */
    await runBuild({ root: paths.root });
    await runDeploy({ root: paths.root });

    const secondFuelsContents = JSON.parse(readFileSync(paths.contractsJsonPath, 'utf-8'));

    expect(firstFuelsContents.upgradableChunked).toEqual(secondFuelsContents.upgradableChunked);

    /**
     * d) Interact with target contract
     *   Now, calling `test_function` should return `false` instead.
     */
    expect(await executeTargetContract()).toBe(false); // FALSE
  });
});
