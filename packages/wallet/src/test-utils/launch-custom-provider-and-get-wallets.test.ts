import { BaseAssetId } from '@fuel-ts/address/configs';
import { safeExec } from '@fuel-ts/errors/test-utils';
import { sleep, Provider } from '@fuel-ts/providers';

import { launchCustomProviderAndGetWallets } from './launch-custom-provider-and-get-wallets';

describe('launchCustomProviderAndGetWallets', () => {
  it('kills the node after going out of scope', async () => {
    let url = '';

    {
      using providerAndWallets = await launchCustomProviderAndGetWallets();
      const { provider } = providerAndWallets;
      url = provider.url;
      await provider.getBlockNumber();
    }

    // wait for OS to kill node
    await sleep(1000);

    const { error } = await safeExec(async () => {
      const p = await Provider.create(url);
      await p.getBlockNumber();
    });

    const ipAndPort = url.replace('http://', '').replace('/graphql', '');
    const [ip, port] = ipAndPort.split(':');

    const expectedError = {
      message: 'fetch failed',
      cause: {
        syscall: 'connect',
        errno: -111,
        code: 'ECONNREFUSED',
        address: ip,
        port: parseInt(port, 10),
      },
    };

    expect(error).toMatchObject(expectedError);
  });

  it('default: one wallet, one coin (BaseAssetId), 10000 amount', async () => {
    using providerAndWallets = await launchCustomProviderAndGetWallets();
    const { wallets } = providerAndWallets;

    expect(wallets.length).toBe(1);

    const wallet = wallets[0];

    const balances = await wallet.getBalances();

    expect(balances.length).toBe(1);

    const balance = balances[0];

    expect(balance.assetId).toBe(BaseAssetId);
    expect(balance.amount).toBe(10000);
  });
});
