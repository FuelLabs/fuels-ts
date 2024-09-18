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
  const iterations = isDevnet ? 1 : 10;

  const setupTestEnvironment = async () => {
    if (isDevnet) {
      const { networkUrl } = DEVNET_CONFIG;
      provider = await Provider.create(networkUrl);
      wallet = new WalletUnlocked(process.env.DEVNET_WALLET_PVT_KEY as string, provider);
    } else {
      const launched = await launchTestNode();
      cleanup = launched.cleanup;
      provider = launched.provider;
      wallet = launched.wallets[1];
    }

    receiver1 = Wallet.generate({ provider });
    receiver2 = Wallet.generate({ provider });
    receiver3 = Wallet.generate({ provider });
  };

  beforeAll(setupTestEnvironment);

  afterAll(() => {
    if (!isDevnet && cleanup) {
      cleanup();
    }
  });

  const runBenchmark = (name: string, benchmarkFn: () => Promise<void>) => {
    bench(isDevnet ? name : `${name} (x${iterations} times)`, async () => {
      for (let i = 0; i < iterations; i++) {
        await benchmarkFn();
      }
    });
  };

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

  runBenchmark('should successfully transfer a single asset between wallets', transfer);

  runBenchmark('should successfully conduct a custom transfer between wallets', customTransfer);

  runBenchmark('should successfully perform a batch transfer', async () => {
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

    const tx = await wallet.batchTransfer(transferParams);
    const { isStatusSuccess } = await tx.waitForResult();
    expect(isStatusSuccess).toBeTruthy();
  });

  runBenchmark('should successfully withdraw to the base layer', async () => {
    const txParams = {
      witnessLimit: 800,
      maxFee: 100_000,
    };
    const pendingTx = await wallet.withdrawToBaseLayer(receiver1.address, 500, txParams);
    const { transaction } = await pendingTx.waitForResult();
    expect(transaction).toBeDefined();
  });
});
