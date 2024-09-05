/* eslint-disable import/no-extraneous-dependencies */

import { Wallet } from 'fuels';
import type { TransferParams } from 'fuels';
import { launchTestNode, TestAssetId } from 'fuels/test-utils';
import { bench } from 'vitest';

/**
 * @group node
 */
describe('Transaction Submission Benchmarks', () => {
  bench('should successfully transfer a single asset between wallets', async () => {
    using launched = await launchTestNode();

    const {
      provider,
      wallets: [walletA],
    } = launched;

    const receiver = Wallet.generate({ provider });

    const tx = await walletA.transfer(receiver.address, 100, provider.getBaseAssetId());

    const { isStatusSuccess } = await tx.waitForResult();

    expect(isStatusSuccess).toBeTruthy();
  });

  bench('should successfully conduct a custom transfer between wallets', async () => {
    using launched = await launchTestNode();

    const {
      provider,
      wallets: [wallet],
    } = launched;

    const receiver = Wallet.generate({ provider });

    const txParams = {
      tip: 4,
      witnessLimit: 800,
      maxFee: 70_000,
    };

    const pendingTx = await wallet.transfer(
      receiver.address,
      500,
      provider.getBaseAssetId(),
      txParams
    );

    const { transaction } = await pendingTx.waitForResult();

    expect(transaction).toBeDefined();
  });

  bench('should successfully perform a batch transfer', async () => {
    using launched = await launchTestNode();

    const {
      provider,
      wallets: [wallet],
    } = launched;

    const receiver1 = Wallet.generate({ provider });
    const receiver2 = Wallet.generate({ provider });
    const receiver3 = Wallet.generate({ provider });

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
  });

  bench('should successfully withdraw to the base layer', async () => {
    using launched = await launchTestNode();

    const {
      provider,
      wallets: [wallet],
    } = launched;

    const receiver = Wallet.generate({ provider });

    const txParams = {
      witnessLimit: 800,
      maxFee: 100_000,
    };

    const pendingTx = await wallet.withdrawToBaseLayer(receiver.address, 500, txParams);
    const { transaction } = await pendingTx.waitForResult();

    expect(transaction).toBeDefined();
  });
});
