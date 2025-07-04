import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';
import type { BigNumberish } from '@fuel-ts/math';
import { type SnapshotConfigs } from '@fuel-ts/utils';
import type { PartialDeep } from 'type-fest';

import { type Account } from '.';
import type { Coin } from './providers';
import { ScriptTransactionRequest } from './providers';
import type { LaunchNodeOptions, WalletsConfigOptions } from './test-utils';
import { setupTestProviderAndWallets, TestAssetId } from './test-utils';
import type { WalletUnlocked } from './wallet';
import { Wallet } from './wallet';

/**
 * @group node
 * @group browser
 */
describe('consolidate-coins', () => {
  let cleanup: () => void;

  afterEach(() => {
    cleanup?.();
    vi.resetAllMocks();
  });

  const transferUTXOsToAccount = async (
    adminWallet: WalletUnlocked,
    params: Array<{
      utxoNum: number;
      assetId: string;
      amount: BigNumberish;
      recipient: Account;
    }>
  ) => {
    for (let i = 0; i < params.length; i++) {
      const maxOutputs = 253;
      const total = params[i].utxoNum;
      const rounds = Math.ceil(total / maxOutputs);
      let currentRound = 0;

      while (currentRound < rounds) {
        const toCreate = Math.min(maxOutputs, total - currentRound * maxOutputs);

        const request = new ScriptTransactionRequest({
          scriptData: '0x',
        });

        Array.from({ length: toCreate }).forEach((_) => {
          request.addCoinOutput(params[i].recipient.address, params[i].amount, params[i].assetId);
        });

        await request.estimateAndFund(adminWallet);

        const transfer = await adminWallet.sendTransaction(request);
        await transfer.waitForResult();

        currentRound += 1;
      }
    }
  };

  const fetchAllCoinsFromAccount = async (account: Account, assetId?: string) => {
    const allCoins: Coin[] = [];

    if (!assetId) {
      // eslint-disable-next-line no-param-reassign
      assetId = await account.provider.getBaseAssetId();
    }

    let hasNextPage = true;
    let endCursor: string | undefined | null = null;

    while (hasNextPage) {
      const { coins, pageInfo } = await account.getCoins(assetId, { after: endCursor });

      allCoins.push(...coins);

      hasNextPage = pageInfo.hasNextPage;

      if (hasNextPage) {
        endCursor = pageInfo.endCursor;
      }
    }

    return allCoins;
  };

  const setupTest = async (
    params: {
      maxInputs?: number;
      coinsPerAsset?: number;
      amountPerCoin?: number;
      count?: number;
      feeParams?: Partial<
        SnapshotConfigs['chainConfig']['consensus_parameters']['V2']['fee_params']['V1']
      >;
      startingGasPrice?: number;
    } = {}
  ) => {
    const { maxInputs, coinsPerAsset, amountPerCoin, count, feeParams, startingGasPrice } = params;
    let nodeOptions: PartialDeep<LaunchNodeOptions> = {};
    let walletsConfig: Partial<WalletsConfigOptions> = {};

    if (maxInputs) {
      nodeOptions = {
        args: startingGasPrice ? ['--starting-gas-price', startingGasPrice.toString() ?? '1'] : [],
        snapshotConfig: {
          chainConfig: {
            consensus_parameters: {
              V2: {
                tx_params: {
                  V1: {
                    max_inputs: maxInputs,
                  },
                },
                ...(feeParams && { fee_params: { V1: feeParams } }),
              },
            },
          },
        },
      };
    }

    if (coinsPerAsset || amountPerCoin) {
      walletsConfig = {
        ...(coinsPerAsset && { coinsPerAsset }),
        ...(amountPerCoin && { amountPerCoin }),
        ...(count && { count }),
      };
    }

    const launched = await setupTestProviderAndWallets({
      nodeOptions,
      walletsConfig,
    });
    const { provider, wallets } = launched;

    cleanup = launched.cleanup;

    return { provider, wallets };
  };

  it('should consolidate asset just fine [ACCOUNT HAS LESS THAN MAX INPUTS]', async () => {
    const maxInputs = 255;
    const totalCoins = maxInputs - 1; // Expected to be 1 consolidation tx
    const { provider, wallets } = await setupTest({ maxInputs, coinsPerAsset: totalCoins });
    const [wallet] = wallets;

    const baseAssetId = await provider.getBaseAssetId();

    let { coins } = await wallet.getCoins(baseAssetId);

    expect(coins.length).toBe(totalCoins);

    const { txResponses, errors } = await wallet.consolidateCoins({ assetId: baseAssetId });

    expect(txResponses.length).toBe(1);
    expect(errors.length).toBe(0);

    const tx = txResponses[0];

    expect(tx.isStatusSuccess).toBeTruthy();

    ({ coins } = await wallet.getCoins(baseAssetId));

    expect(coins.length).toBe(1);
  });

  it('should consolidate asset just fine [ACCOUNT HAS EXACTLY MAX INPUTS]', async () => {
    const maxInputs = 255;
    const totalCoins = maxInputs; // Expected to be 1 consolidation tx
    const { provider, wallets } = await setupTest({ maxInputs, coinsPerAsset: totalCoins });
    const [wallet] = wallets;

    const baseAssetId = await provider.getBaseAssetId();

    let { coins } = await wallet.getCoins(baseAssetId);

    expect(coins.length).toBe(totalCoins);

    const { txResponses, errors } = await wallet.consolidateCoins({ assetId: baseAssetId });

    expect(txResponses.length).toBe(1);
    expect(errors.length).toBe(0);

    const tx = txResponses[0];

    expect(tx.isStatusSuccess).toBeTruthy();

    ({ coins } = await wallet.getCoins(baseAssetId));

    expect(coins.length).toBe(1);
  });

  it('should consolidate asset just fine [ACCOUNT HAS MORE THAN MAX INPUTS]', async () => {
    const maxInputs = 5;
    const totalCoins = 12; // Expected to be 3 consolidation txs [5, 5, 2]
    const { provider, wallets } = await setupTest({
      maxInputs,
      coinsPerAsset: totalCoins,
      // TODO: revert after release of `fuel-core` version
      // When using built versions, the gas price starting value seems off.
      startingGasPrice: 1000
    });
    const [wallet] = wallets;

    const baseAssetId = await provider.getBaseAssetId();

    let { coins } = await wallet.getCoins(baseAssetId);

    expect(coins.length).toBe(totalCoins);

    const { txResponses, errors } = await wallet.consolidateCoins({ assetId: baseAssetId });

    expect(txResponses.length).toBe(3);
    expect(errors.length).toBe(0);

    for (const tx of txResponses) {
      expect(tx.isStatusSuccess).toBeTruthy();
    }

    ({ coins } = await wallet.getCoins(baseAssetId));

    // 3 consolidation txs, 3 coins
    expect(coins.length).toBe(3);
  });

  it('should NOT attempt to consolidate just one coin', async () => {
    const maxInputs = 255;
    const totalCoins = maxInputs + 1; // Only one remaining coin for the second consolidation tx
    const { provider, wallets } = await setupTest({ maxInputs, coinsPerAsset: totalCoins });
    const [wallet] = wallets;

    const baseAssetId = await provider.getBaseAssetId();

    let { coins } = await wallet.getCoins(baseAssetId);

    expect(coins.length).toBe(totalCoins);

    const { txResponses, errors } = await wallet.consolidateCoins({ assetId: baseAssetId });

    // Only one consolidation tx is expected
    expect(txResponses.length).toBe(1);
    expect(errors.length).toBe(0);

    for (const tx of txResponses) {
      expect(tx.isStatusSuccess).toBeTruthy();
    }

    ({ coins } = await wallet.getCoins(baseAssetId));

    // Only two coins are expected, the consolidated coin and the skipped one
    expect(coins.length).toBe(2);
  });

  it('should ensure fee error is thrown when insufficient funds', async () => {
    const maxInputs = 5;
    const { provider, wallets } = await setupTest({
      coinsPerAsset: maxInputs + 2,
      maxInputs,
      amountPerCoin: 700,
      /**
       * Warning: The fee values set here are working fine given the current values
       * set within the GasCosts chain config. However, any update to the GasCosts values
       * might result in this test failing.
       *
       * The Idea here is to test that the error is thrown when the fee is insufficient.
       * The test suite will fund the wallet with enough UTXOs to assemble 2 consolidation TXs.
       * However these UTXOs amount are not enough to cover only 1 consolidation TX.
       */
      feeParams: {
        gas_price_factor: 92000,
        gas_per_byte: 63,
      },
      // TODO: revert after release of `fuel-core` version
      // When using built versions, the gas price starting value seems off.
      startingGasPrice: 1000
    });

    const [wallet] = wallets;

    const baseAssetId = await provider.getBaseAssetId();

    const { txResponses, errors } = await wallet.consolidateCoins({ assetId: baseAssetId });

    expect(txResponses.length).toBe(1);
    expect(errors.length).toBe(1);
    expect(errors[0].code).toBe(ErrorCode.FUNDS_TOO_LOW);
    expect(errors[0].message).toMatch(/InsufficientFeeAmount { expected: (\d+), provided: (\d+) }/);
  });

  it('should ensure account has coins to consolidate', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;

    const baseAssetId = await provider.getBaseAssetId();

    const wallet = Wallet.generate({ provider });

    const error = new FuelError(ErrorCode.NO_COINS_TO_CONSOLIDATE, 'No coins to consolidate.');

    await expectToThrowFuelError(() => wallet.consolidateCoins({ assetId: baseAssetId }), error);
  });

  it('ensures it can consolidate only base asset coins', async () => {
    const {
      wallets: [wallet],
    } = await setupTest();

    await expectToThrowFuelError(() => wallet.consolidateCoins({ assetId: TestAssetId.A.value }), {
      code: ErrorCode.UNSUPPORTED_FEATURE,
    });
  });

  describe('assembleBaseAssetConsolidationTxs', () => {
    it('should ensures it can create many consolidation TXs [PARALLEL]', async () => {
      const maxInputs = 255;
      const {
        provider,
        wallets: [adminWallet],
      } = await setupTest({ maxInputs });

      const baseAssetId = await provider.getBaseAssetId();

      const wallet = Wallet.generate({ provider });

      // Will result in 10 consolidation TXs
      const utxoNum = Math.floor(maxInputs * 9.5);
      const totalConsolidationTxs = Math.ceil(utxoNum / maxInputs);

      await transferUTXOsToAccount(adminWallet, [
        { utxoNum, amount: 1000, assetId: baseAssetId, recipient: wallet },
      ]);

      const allCoins = await fetchAllCoinsFromAccount(wallet);

      expect(allCoins.length).toBe(utxoNum);
      expect(totalConsolidationTxs).toBeGreaterThan(0);

      const allSettled = vi.spyOn(Promise, 'allSettled');

      const { submitAll, txs } = await wallet.assembleBaseAssetConsolidationTxs({
        coins: allCoins,
      });

      expect(txs.length).toBe(10);

      await submitAll();

      const { coins } = await wallet.getCoins();

      // Account will end-up with 10 coins since 10 consolidation TXs were submitted
      expect(coins.length).toBe(totalConsolidationTxs);
      // AllSettled should have been called as we are using parallel mode
      expect(allSettled).toHaveBeenCalled();
    });

    it('should ensures it can create many consolidation TXs [SEQUENTIAL]', async () => {
      const maxInputs = 255;
      const {
        provider,
        wallets: [adminWallet],
      } = await setupTest({ maxInputs });

      const baseAssetId = await provider.getBaseAssetId();

      const wallet = Wallet.generate({ provider });

      // Will result in 3 consolidation TXs
      const utxoNum = Math.floor(maxInputs * 2.5);
      const totalConsolidationTxs = Math.ceil(utxoNum / maxInputs);

      await transferUTXOsToAccount(adminWallet, [
        { utxoNum, amount: 1000, assetId: baseAssetId, recipient: wallet },
      ]);

      const allCoins = await fetchAllCoinsFromAccount(wallet);

      expect(allCoins.length).toBe(utxoNum);
      expect(totalConsolidationTxs).toBeGreaterThan(0);

      const allSettled = vi.spyOn(Promise, 'allSettled');

      const { submitAll, txs } = await wallet.assembleBaseAssetConsolidationTxs({
        coins: allCoins,
        mode: 'sequential',
      });

      expect(txs.length).toBe(3);

      await submitAll();

      const { coins } = await wallet.getCoins();

      // Account will end-up with 10 coins since 10 consolidation TXs were submitted
      expect(coins.length).toBe(totalConsolidationTxs);
      // AllSettled should not have been called as we are using sequential mode
      expect(allSettled).not.toHaveBeenCalled();
    });

    it('should ensure outputNum is considered when consolidating coins', async () => {
      const maxInputs = 255;
      const {
        provider,
        wallets: [adminWallet],
      } = await setupTest({ maxInputs });

      const baseAssetId = await provider.getBaseAssetId();

      const wallet = Wallet.generate({ provider });

      // Will result in 5 consolidation TXs
      const utxoNum = Math.floor(maxInputs * 4.2);
      const expectedTxsNum = 5;
      const totalConsolidationTxs = Math.ceil(utxoNum / maxInputs);

      await transferUTXOsToAccount(adminWallet, [
        { utxoNum, amount: 1000, assetId: baseAssetId, recipient: wallet },
      ]);

      const allCoins = await fetchAllCoinsFromAccount(wallet);

      expect(allCoins.length).toBe(utxoNum);
      expect(totalConsolidationTxs).toBeGreaterThan(0);

      const { submitAll, txs } = await wallet.assembleBaseAssetConsolidationTxs({
        coins: allCoins,
        outputNum: 4, // each consolidation will produce 4 new UTXOs each
      });

      expect(txs.length).toBe(expectedTxsNum);

      await submitAll();

      const { coins } = await wallet.getCoins();

      // Account will end-up with 10 coins since 10 consolidation TXs were submitted
      expect(coins.length).toBe(expectedTxsNum * 4);
    });

    it('should ensure all coins are from the same asset', async () => {
      const {
        provider,
        wallets: [wallet],
      } = await setupTest();

      const baseAssetId = await provider.getBaseAssetId();

      const { coins: baseAssetCoins } = await wallet.getCoins(baseAssetId);
      const { coins: otherCoins } = await wallet.getCoins(TestAssetId.A.value);

      baseAssetCoins.push(otherCoins[0]);

      await expectToThrowFuelError(
        () => wallet.assembleBaseAssetConsolidationTxs({ coins: baseAssetCoins }),
        new FuelError(
          ErrorCode.COINS_ASSET_ID_MISMATCH,
          'All coins to consolidate must be from the same asset id.'
        )
      );
    });
  });
});
