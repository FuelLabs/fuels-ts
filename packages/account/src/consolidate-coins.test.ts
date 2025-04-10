import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';
import type { SnapshotConfigs } from '@fuel-ts/utils';

import type { WalletsConfigOptions } from './test-utils';
import { setupTestProviderAndWallets } from './test-utils';
import { Wallet } from './wallet';

/**
 * @group node
 * @group browser
 */
describe('consolidate-coins', () => {
  let cleanup: () => void;

  afterEach(() => {
    cleanup?.();
  });

  const setupTest = async (
    params: {
      maxInputs?: number;
      coinsPerAsset?: number;
      amountPerCoin?: number;
      count?: number;
      feeParams?: Partial<
        SnapshotConfigs['chainConfig']['consensus_parameters']['V2']['fee_params']['V1']
      >;
    } = {}
  ) => {
    const { maxInputs, coinsPerAsset, amountPerCoin, count, feeParams } = params;
    let nodeOptions = {};
    let walletsConfig: Partial<WalletsConfigOptions> = {};

    if (maxInputs) {
      nodeOptions = {
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

  describe('base asset', () => {
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
      const { provider, wallets } = await setupTest({ maxInputs, coinsPerAsset: totalCoins });
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
        amountPerCoin: 1300,
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
      });

      const [wallet] = wallets;

      const baseAssetId = await provider.getBaseAssetId();

      const { txResponses, errors } = await wallet.consolidateCoins({ assetId: baseAssetId });

      expect(txResponses.length).toBe(1);
      expect(errors.length).toBe(1);
      expect(errors[0].code).toBe(ErrorCode.FUNDS_TOO_LOW);
      expect(errors[0].message).toMatch(
        /InsufficientFeeAmount { expected: (\d+), provided: (\d+) }/
      );
    });

    it('should ensure account has coins to consolidate', async () => {
      using launched = await setupTestProviderAndWallets();
      const { provider } = launched;

      const baseAssetId = await provider.getBaseAssetId();

      const wallet = Wallet.generate({ provider });

      const error = new FuelError(ErrorCode.NO_COINS_TO_CONSOLIDATE, 'No coins to consolidate.');

      await expectToThrowFuelError(() => wallet.consolidateCoins({ assetId: baseAssetId }), error);
    });
  });
});
