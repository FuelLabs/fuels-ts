import { safeExec } from '@fuel-ts/errors/test-utils';
import { Provider } from '@fuel-ts/providers';
import { WalletConfig } from '@fuel-ts/wallet/test-utils';
import { join } from 'path';

import { TestNodeLauncher } from './fuel-node-launcher';

const simpleContractPath = join(__dirname, '../../test/fixtures/simple-contract');

describe('TestNodeLauncher', () => {
  it('kills the node after going out of scope', async () => {
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

  it('can deploy a contract', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [{ contractDir: simpleContractPath }],
    });

    const {
      contracts: [contract],
    } = launched;

    const response = await contract.functions.test_function().call();
    expect(response.value).toBe(true);
  });

  it('can deploy a contract with a second wallet via indexes', async () => {
    await using launched = await TestNodeLauncher.launch({
      walletConfig: new WalletConfig({ numWallets: 2 }),
      deployContracts: [{ contractDir: simpleContractPath, walletIndex: 1 }],
    });

    const {
      contracts: [contract],
      wallets: [, wallet2],
    } = launched;

    expect(contract.account).toEqual(wallet2);
  });
});
