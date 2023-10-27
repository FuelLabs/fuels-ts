import { FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError, safeExec } from '@fuel-ts/errors/test-utils';
import { Provider } from '@fuel-ts/providers';
import { WalletConfig } from '@fuel-ts/wallet/test-utils';
import * as walletTestUtils from '@fuel-ts/wallet/test-utils';
import { join } from 'path';

import { TestNodeLauncher } from './test-node-launcher';

const pathToContractRootDir = join(__dirname, '../../test/fixtures/simple-contract');

/**
 * @group node
 */
describe('TestNodeLauncher', () => {
  test('kills the node after going out of scope', async () => {
    let url = '';

    {
      await using launched = await TestNodeLauncher.launch();

      const { provider } = launched;

      url = provider.url;
      await provider.getBlockNumber();
    }

    const { error } = await safeExec(async () => {
      const p = await Provider.create(url);
      await p.getBlockNumber();
    });

    expect(error).toMatchObject({
      code: 'ECONNREFUSED',
    });
  });

  test('kills the node if error happens post-launch', async () => {
    const port = '9876';
    try {
      await TestNodeLauncher.launch({
        nodeOptions: { port },
        deployContracts: [{ contractDir: 'invalid path' }],
      });
    } catch (err) {
      expect(err).toBeDefined();

      const { error } = await safeExec(async () => {
        const url = `http://127.0.0.1:${port}/graphql`;
        const p = await Provider.create(url);
        await p.getBlockNumber();
      });

      expect(error).toMatchObject({
        code: 'ECONNREFUSED',
      });

      return;
    }

    // Should never reach here; using fail() gives a ReferenceError and would crash the whole program
    expect(false).toBe(true);
  });

  test('a contract can be deployed', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [{ contractDir: pathToContractRootDir }],
    });

    const {
      contracts: [contract],
    } = launched;

    const response = await contract.functions.test_function().call();
    expect(response.value).toBe(true);
  });

  test('a contract can be deployed by providing just the path', async () => {
    // #region TestNodeLauncher-deploy-contract
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [pathToContractRootDir],
    });

    const {
      contracts: [contract],
    } = launched;

    const response = await contract.functions.test_function().call();
    expect(response.value).toBe(true);
    // #endregion TestNodeLauncher-deploy-contract
  });

  test('multiple contracts can be deployed with different wallets', async () => {
    // #region TestNodeLauncher-multiple-contracts-and-wallets
    await using launched = await TestNodeLauncher.launch({
      walletConfig: new WalletConfig({ wallets: 2 }),
      deployContracts: [
        { contractDir: pathToContractRootDir },
        { contractDir: pathToContractRootDir, walletIndex: 1 },
      ],
    });

    const {
      contracts: [contract1, contract2],
      wallets: [wallet1, wallet2],
    } = launched;
    // #endregion TestNodeLauncher-multiple-contracts-and-wallets

    const contract1Response = (await contract1.functions.test_function().call()).value;
    const contract2Response = (await contract2.functions.test_function().call()).value;

    expect(contract1Response).toBe(true);
    expect(contract2Response).toBe(true);

    expect(contract1.account).toEqual(wallet1);
    expect(contract2.account).toEqual(wallet2);
  });

  test('throws on invalid walletIndex', async () => {
    await expectToThrowFuelError(
      async () => {
        await TestNodeLauncher.launch({
          deployContracts: [{ contractDir: pathToContractRootDir, walletIndex: 1 }],
        });
      },
      {
        code: FuelError.CODES.INVALID_INPUT_PARAMETERS,
        message: `Invalid walletIndex 1; wallets array contains 1 elements.`,
      }
    );
  });

  test("can launch multiple nodes and cache their info for 'launch' calls", async () => {
    await TestNodeLauncher.prepareCache(2);

    const spy = vi.spyOn(walletTestUtils, 'launchCustomProviderAndGetWallets');

    await using firstNode = await TestNodeLauncher.launch();
    await using secondNode = await TestNodeLauncher.launch();

    expect(spy).toBeCalledTimes(0);

    await using thirdNode = await TestNodeLauncher.launch();

    expect(spy).toBeCalledTimes(1);
  });

  test('launches a new node if the chainConfig is different from the cached one', async () => {
    await TestNodeLauncher.prepareCache(1, {
      nodeOptions: {
        chainConfig: {
          chain_name: 'X',
        },
      },
    });

    const spy = vi.spyOn(walletTestUtils, 'launchCustomProviderAndGetWallets');

    await using node = await TestNodeLauncher.launch({
      nodeOptions: {
        chainConfig: {
          chain_name: 'Y',
        },
      },
    });

    expect(spy).toBeCalledTimes(1);
  });

  // test('launches a new node if the providerOptions are different from the cached one', async () => {});
  // test('launches a new node if the nodeOptions are different from the cached one', async () => {});
});
