import { safeExec } from '@fuel-ts/errors/test-utils';
import { Provider } from '@fuel-ts/providers';
import { WalletConfig } from '@fuel-ts/wallet/test-utils';
import { join } from 'path';

import { TestNodeLauncher } from './fuel-node-launcher';

const simpleContractPath = join(__dirname, '../../test/fixtures/simple-contract');

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

  test('a contract can be deployed', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [{ contractDir: simpleContractPath }],
    });

    const {
      contracts: [contract],
    } = launched;

    const response = await contract.functions.test_function().call();
    expect(response.value).toBe(true);
  });

  test('multiple contracts can be deployed', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [
        { contractDir: simpleContractPath },
        { contractDir: simpleContractPath },
        { contractDir: simpleContractPath },
      ],
    });

    const {
      contracts: [contract1, contract2, contract3],
    } = launched;

    expect((await contract1.functions.test_function().call()).value).toBe(true);
    expect((await contract2.functions.test_function().call()).value).toBe(true);
    expect((await contract3.functions.test_function().call()).value).toBe(true);
  });

  test('multiple contracts can be deployed with different wallets', async () => {
    await using launched = await TestNodeLauncher.launch({
      walletConfig: new WalletConfig({ numWallets: 2 }),
      deployContracts: [
        { contractDir: simpleContractPath },
        { contractDir: simpleContractPath, walletIndex: 1 },
      ],
    });

    const {
      contracts: [contract1, contract2],
      wallets: [wallet1, wallet2],
    } = launched;

    expect(contract1.account).toEqual(wallet1);
    expect(contract2.account).toEqual(wallet2);
  });
});
