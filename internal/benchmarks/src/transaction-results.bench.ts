/* eslint-disable import/no-extraneous-dependencies */

import type { TransferParams } from 'fuels';
import { Wallet, Provider, WalletUnlocked } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';
import { bench } from 'vitest';

import { DEVNET_CONFIG } from './config';

/**
 * @group node
 * @group browser
 */
describe('Transaction Submission Benchmarks', () => {
  let provider: Provider;
  let wallet: WalletUnlocked;
  let receiver1: WalletUnlocked;
  let receiver2: WalletUnlocked;
  let receiver3: WalletUnlocked;
  let cleanup: () => void;

  const isDevnet = process.env.DEVNET_WALLET_PVT_KEY !== undefined;

  if (isDevnet) {
    beforeAll(async () => {
      const { networkUrl } = DEVNET_CONFIG;
      provider = await Provider.create(networkUrl);
      wallet = new WalletUnlocked(process.env.DEVNET_WALLET_PVT_KEY as string, provider);

      receiver1 = Wallet.generate({ provider });
      receiver2 = Wallet.generate({ provider });
      receiver3 = Wallet.generate({ provider });
    });
  } else {
    beforeEach(async () => {
      const launched = await launchTestNode();

      cleanup = launched.cleanup;
      provider = launched.provider;
      wallet = launched.wallets[1];
      receiver1 = Wallet.generate({ provider });
      receiver2 = Wallet.generate({ provider });
      receiver3 = Wallet.generate({ provider });
    });

    afterEach(() => {
      cleanup();
    });
  }

  const transfer = async () => {
    const tx = await wallet.transfer(receiver1.address, 100, provider.getBaseAssetId());

    const { isStatusSuccess } = await tx.waitForResult();

    expect(isStatusSuccess).toBeTruthy();
  };

  const customTransfer = async () => {
    const txParams = {
      tip: 4,
      witnessLimit: 800,
      maxFee: 70_000,
    };

    const pendingTx = await wallet.transfer(
      receiver1.address,
      500,
      provider.getBaseAssetId(),
      txParams
    );

    const { transaction } = await pendingTx.waitForResult();

    expect(transaction).toBeDefined();
  };

  bench(
    isDevnet
      ? 'should successfully transfer a single asset between wallets'
      : 'should successfully transfer a single asset between wallets 10 times',
    async () => {
      if (isDevnet) {
        await transfer();
      } else {
        for (let i = 0; i < 10; i++) {
          await transfer();
        }
      }
    }
  );

  bench(
    isDevnet
      ? 'should successfully conduct a custom transfer between wallets'
      : 'should successfully conduct a custom transfer between wallets 10 times',
    async () => {
      if (isDevnet) {
        await customTransfer();
      } else {
        for (let i = 0; i < 10; i++) {
          await customTransfer();
        }
      }
    }
  );

  bench('should successfully perform a batch transfer', async () => {
    const amountToTransfer1 = 989;
    const amountToTransfer2 = 699;
    const amountToTransfer3 = 122;

    const transferParams: TransferParams[] = [
      {
        destination: receiver1.address,
        amount: amountToTransfer1,
        assetId: provider.getBaseAssetId(),
      },
      {
        destination: receiver2.address,
        amount: amountToTransfer2,
        assetId: provider.getBaseAssetId(),
      },
      {
        destination: receiver3.address,
        amount: amountToTransfer3,
        assetId: provider.getBaseAssetId(),
      },
    ];

    if (isDevnet) {
      const tx = await wallet.batchTransfer(transferParams);

      const { isStatusSuccess } = await tx.waitForResult();

      expect(isStatusSuccess).toBeTruthy();
    } else {
      for (let i = 0; i < 10; i++) {
        const tx = await wallet.batchTransfer(transferParams);

        const { isStatusSuccess } = await tx.waitForResult();

        expect(isStatusSuccess).toBeTruthy();
      }
    }
  });

  bench(
    isDevnet
      ? 'should successfully withdraw to the base layer'
      : 'should successfully withdraw to the base layer 10 times',
    async () => {
      const txParams = {
        witnessLimit: 800,
        maxFee: 100_000,
      };

      if (isDevnet) {
        const pendingTx = await wallet.withdrawToBaseLayer(receiver1.address, 500, txParams);
        const { transaction } = await pendingTx.waitForResult();

        expect(transaction).toBeDefined();
      } else {
        for (let i = 0; i < 10; i++) {
          const pendingTx = await wallet.withdrawToBaseLayer(receiver1.address, 500, txParams);
          const { transaction } = await pendingTx.waitForResult();

          expect(transaction).toBeDefined();
        }
      }
    }
  );
});
