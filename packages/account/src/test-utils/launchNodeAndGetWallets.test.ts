import path from 'path';
import { cwd } from 'process';

import { Provider } from '../providers';
import { WalletUnlocked } from '../wallet';

import { launchNodeAndGetWallets } from './launchNode';

/**
 * @group node
 */
describe('launchNode', () => {
  test('launchNodeAndGetWallets - empty config', async () => {
    const { stop, provider, wallets } = await launchNodeAndGetWallets({
      providerOptions: {
        resourceCacheTTL: 1,
      },
      launchNodeOptions: {
        loggingEnabled: false,
      },
    });
    expect(provider).toBeInstanceOf(Provider);
    expect(wallets.length).toBe(10);
    wallets.forEach((wallet) => {
      expect(wallet).toBeInstanceOf(WalletUnlocked);
    });
    stop();
  }, 10000);

  test('launchNodeAndGetWallets - custom config', async () => {
    const snapshotDir = path.join(cwd(), '.fuel-core/configs');

    const { stop, provider } = await launchNodeAndGetWallets({
      providerOptions: {
        resourceCacheTTL: 1,
      },
      launchNodeOptions: {
        args: ['--snapshot', snapshotDir],
        loggingEnabled: false,
      },
    });

    const {
      consensusParameters: {
        feeParameters: { gasPerByte },
      },
    } = provider.getChain();

    const expectedGasPerByte = 63;

    expect(gasPerByte.toNumber()).toEqual(expectedGasPerByte);

    stop();
  });

  test('launchNodeAndGetWallets - custom walletCount', async () => {
    const { stop, wallets } = await launchNodeAndGetWallets({
      walletCount: 5,
      providerOptions: {
        resourceCacheTTL: 1,
      },
      launchNodeOptions: {
        loggingEnabled: false,
      },
    });
    expect(wallets.length).toBe(5);
    wallets.forEach((wallet) => {
      expect(wallet).toBeInstanceOf(WalletUnlocked);
    });
    stop();
  });

  describe('without a GENESIS_SECRET', () => {
    let GENESIS_SECRET: string | undefined;

    beforeAll(() => {
      GENESIS_SECRET = process.env.GENESIS_SECRET;
      delete process.env.GENESIS_SECRET;
    });

    afterAll(() => {
      process.env.GENESIS_SECRET = GENESIS_SECRET;
    });

    test('launchNodeAndGetWallets - empty config', async () => {
      const { stop, provider, wallets } = await launchNodeAndGetWallets({
        providerOptions: {
          resourceCacheTTL: 1,
        },
        launchNodeOptions: {
          loggingEnabled: false,
        },
      });

      expect(provider).toBeInstanceOf(Provider);
      expect(wallets.length).toBe(10);

      wallets.forEach((wallet) => {
        expect(wallet).toBeInstanceOf(WalletUnlocked);
      });

      expect(process.env.GENESIS_SECRET).toBeDefined();
      expect(process.env.GENESIS_SECRET).not.toEqual(GENESIS_SECRET);
      expect(process.env.GENESIS_SECRET).toHaveLength(66);

      stop();
    }, 10000);
  });
});
