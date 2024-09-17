/* eslint-disable import/no-extraneous-dependencies */

import type { TransferParams } from 'fuels';
import { Wallet, Provider, WalletUnlocked } from 'fuels';
import { launchTestNode, TestAssetId } from 'fuels/test-utils';
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

  if (process.env.DEVNET_WALLET_PVT_KEY !== undefined) {
    beforeAll(async () => {
      const { networkUrl } = DEVNET_CONFIG;
      provider = await Provider.create(networkUrl);
      wallet = new WalletUnlocked(process.env.DEVNET_WALLET_PVT_KEY as string, provider);
      console.log('instantiated wallet', wallet.address.toString());
      receiver1 = Wallet.generate({ provider });
      console.log('instantiated receiver1', receiver1.address.toString());
      receiver2 = Wallet.generate({ provider });
      console.log('instantiated receiver2', receiver2.address.toString());
      receiver3 = Wallet.generate({ provider });
      console.log('instantiated receiver3', receiver3.address.toString());
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

  bench('should successfully transfer a single asset between wallets 10 times', async () => {
    for (let i = 0; i < 10; i++) {
      await transfer();
    }
  });

  bench('should successfully conduct a custom transfer between wallets 10 times', async () => {
    for (let i = 0; i < 10; i++) {
      await customTransfer();
    }
  });

  bench('should successfully perform a batch transfer 10 times', async () => {
    for (let i = 0; i < 10; i++) {
      const amountToTransfer1 = 989;
      const amountToTransfer2 = 699;
      const amountToTransfer3 = 122;

      const transferParams: TransferParams[] = [
        {
          destination: receiver1.address,
          amount: amountToTransfer1,
          assetId: provider.getBaseAssetId(),
        },
        { destination: receiver2.address, amount: amountToTransfer2, assetId: TestAssetId.A.value },
        { destination: receiver3.address, amount: amountToTransfer3, assetId: TestAssetId.B.value },
      ];

      const tx = await wallet.batchTransfer(transferParams);

      const { isStatusSuccess } = await tx.waitForResult();

      expect(isStatusSuccess).toBeTruthy();
    }
  });

  bench('should successfully withdraw to the base layer 10 times', async () => {
    for (let i = 0; i < 10; i++) {
      const txParams = {
        witnessLimit: 800,
        maxFee: 100_000,
      };

      const pendingTx = await wallet.withdrawToBaseLayer(receiver1.address, 500, txParams);
      const { transaction } = await pendingTx.waitForResult();

      expect(transaction).toBeDefined();
    }
  });
});
