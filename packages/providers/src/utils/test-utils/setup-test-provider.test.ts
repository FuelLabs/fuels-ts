import { safeExec } from '@fuel-ts/errors/test-utils';
import type { AbstractAddress } from '@fuel-ts/interfaces';

import { Provider } from '../..';

import { setupTestProvider } from './setup-test-provider';

describe('launchTestProvider', () => {
  it('kills the node after going out of scope', async () => {
    let url = '';
    // eslint-disable-next-line no-lone-blocks
    {
      await using p = await setupTestProvider();
      url = p.url;
      await p.getBlockNumber();
    }

    const { error } = await safeExec(async () => {
      const p = await Provider.create(url);
      await p.getBlockNumber();
    });

    expect(error).toMatchObject({
      code: 'ECONNREFUSED',
    });
  });

  it('can partially extend the default node configs', async () => {
    const coin = {
      owner: '0x94ffcc53b892684acefaebc8a3d4a595e528a8cf664eeb3ef36f1020b0809d0d',
      amount: '0xffffffffffffffff',
      asset_id: '0x0000000000000000000000000000000000000000000000000000000000000000',
    };
    await using provider = await setupTestProvider({
      nodeOptions: {
        chainConfig: {
          initial_state: {
            coins: [coin],
          },
        },
      },
    });

    const coins = await provider.getCoins({ toB256: () => coin.owner } as AbstractAddress);

    expect(coins[0].assetId).toEqual(coin.asset_id);
    expect(coins[0].amount.toHex()).toEqual(coin.amount);
    expect(coins[0].owner.toB256()).toEqual(coin.owner);
  });
});
