import type { JsonAbi } from '@fuel-ts/abi-coder';
import type { Account } from '@fuel-ts/account';
import { Contract } from '@fuel-ts/program';
import { exec } from 'child_process';
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

beforeAll(async () => {
  // Kill any existing process at port 4000
  const killCommand = 'lsof -ti:4000 | xargs kill -9';

  try {
    await new Promise((resolve) => {
      exec(killCommand, () => {
        // Ignore errors since port may not be in use
        resolve(null);
      });
    });
  } catch (e) {
    // Ignore errors since port may not be in use
  }
});

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

  /**
   * Executes the target contract and returns the values of the functions for proxy deploys.
   */
  async function executeTargetContract(contractId: string, abi: JsonAbi, wallet: Account) {
    const targetContract = new Contract(contractId, abi, wallet);

    const { value: getCountValue } = await targetContract.functions.get_value().get();

    const res = await targetContract.functions.test_function().call();
    const { value: testFunctionValue } = await res.waitForResult();

    return { getCountValue, testFunctionValue };
  }

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

    const contractId = firstFuelsContents.upgradable;
    const abi = JSON.parse(
      readFileSync(
        join(paths.upgradableContractPath, 'out', 'debug', 'upgradable-abi.json'),
        'utf-8'
      )
    );

    /**
     * a) Interacting with the target contract
     *   Calling `test_function` should return `true` and `get_value`
     *   should return `10` for the first execution.
     */
    expect(await executeTargetContract(contractId, abi, wallet)).toStrictEqual({
      getCountValue: 10,
      testFunctionValue: true,
    });

    /**
     * b) Modify `main.sw` method before second deploy
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
     * c) Interact with target contract
     *   Now, calling `test_function` should return `false` instead,
     *   but `get_value` should still return `10`.
     */
    expect(await executeTargetContract(contractId, abi, wallet)).toStrictEqual({
      getCountValue: 10,
      testFunctionValue: false,
    });
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

    const contractId = firstFuelsContents.upgradableChunked;
    const abi = JSON.parse(
      readFileSync(
        join(paths.upgradableChunkedContractPath, 'out', 'debug', 'upgradable-chunked-abi.json'),
        'utf-8'
      )
    );

    /**
     * a) Interacting with the target contract
     *   Calling `test_function` should return `true` and `get_value`
     *   should return `10` for the first execution.
     */
    expect(await executeTargetContract(contractId, abi, wallet)).toStrictEqual({
      getCountValue: 10,
      testFunctionValue: true,
    });

    /**
     * b) Modify `main.sw` method before second deploy
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
     * c) Interact with target contract
     *   Now, calling `test_function` should return `false` instead,
     *   but `get_value` should still return `10`.
     */
    expect(await executeTargetContract(contractId, abi, wallet)).toStrictEqual({
      getCountValue: 10,
      testFunctionValue: false,
    });
  });
});
