import { Provider } from '@fuel-ts/providers';
import path from 'path';
import { cwd } from 'process';

import { WalletUnlocked } from '../wallets';

import { launchNodeAndGetWallets } from './launchNode';

describe('launchNode', () => {
  test('launchNodeAndGetWallets - empty config', async () => {
    const { stop, provider, wallets } = await launchNodeAndGetWallets();
    expect(provider).toBeInstanceOf(Provider);
    expect(wallets.length).toBe(10);
    wallets.forEach((wallet) => {
      expect(wallet).toBeInstanceOf(WalletUnlocked);
    });
    stop();
  });

  test('launchNodeAndGetWallets - custom config', async () => {
    // #region launchNode-custom-config
    const chainConfigPath = path.join(cwd(), '.fuel-core/configs/chainConfig.json');

    const { stop, provider } = await launchNodeAndGetWallets({
      launchNodeOptions: {
        chainConfigPath,
        args: ['--poa-instant', 'true'],
      },
    });

    const {
      consensusParameters: { gasPerByte },
    } = provider.getChain();

    expect(gasPerByte.toNumber()).toEqual(4);

    stop();
    // #endregion launchNode-custom-config
  });

  test('launchNodeAndGetWallets - custom walletCount', async () => {
    const { stop, wallets } = await launchNodeAndGetWallets({
      walletCount: 5,
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
      const { stop, provider, wallets } = await launchNodeAndGetWallets();
      expect(provider).toBeInstanceOf(Provider);
      expect(wallets.length).toBe(10);
      wallets.forEach((wallet) => {
        expect(wallet).toBeInstanceOf(WalletUnlocked);
      });

      expect(process.env.GENESIS_SECRET).toBeDefined();
      expect(process.env.GENESIS_SECRET).not.toEqual(GENESIS_SECRET);
      expect(process.env.GENESIS_SECRET).toHaveLength(66);
      stop();
    });
  });
});
