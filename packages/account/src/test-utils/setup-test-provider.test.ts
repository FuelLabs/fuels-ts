import { ErrorCode } from '@fuel-ts/errors';
import { expectToThrowFuelError, safeExec } from '@fuel-ts/errors/test-utils';
import type { AbstractAddress } from '@fuel-ts/interfaces';
import { urlIsLive } from '@fuel-ts/utils/test-utils';

import { Provider, sleepUntilTrue } from '../providers';

import * as launchNodeMod from './launchNode';
import type { LaunchNodeResult } from './launchNode';
import { setupTestProvider } from './setup-test-provider';

/**
 * @group node
 */
describe('launchTestProvider', () => {
  it('kills the node after going out of scope', async () => {
    let url = '';
    // eslint-disable-next-line no-lone-blocks
    {
      using p = await setupTestProvider();
      url = p.url;
      await p.getBlockNumber();
    }

    await sleepUntilTrue(async () => !(await urlIsLive(url)));

    const { error } = await safeExec(async () => {
      const p = await Provider.create(url);
      await p.getBlockNumber();
    });

    expect(error).toMatchObject({
      message: 'fetch failed',
    });
  });

  test('kills the node if error happens post-launch', async () => {
    const launchNodeSpy = vi.spyOn(launchNodeMod, 'launchNode');

    await expectToThrowFuelError(
      async () => {
        await setupTestProvider({ providerOptions: { cacheUtxo: -500 } });
      },
      { code: ErrorCode.INVALID_TTL }
    );
    expect(launchNodeSpy).toHaveBeenCalled();
    const { url } = launchNodeSpy.mock.results[0].value as Awaited<LaunchNodeResult>;
    await sleepUntilTrue(async () => !(await urlIsLive(url)));
    expect(await urlIsLive(url)).toBe(false);
  });

  it('can partially extend the default node configs', async () => {
    const coin = {
      owner: '0x94ffcc53b892684acefaebc8a3d4a595e528a8cf664eeb3ef36f1020b0809d0d',
      amount: '0xffffffffffffffff',
      asset_id: '0x0000000000000000000000000000000000000000000000000000000000000000',
    };
    using provider = await setupTestProvider({
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
