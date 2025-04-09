import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';
import type { InputCoin } from '@fuel-ts/transactions';
import { InputType } from '@fuel-ts/transactions';

import { ScriptTransactionRequest } from './providers';
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
    params: { maxInputs?: number; coinsPerAsset?: number; amountPerCoin?: number } = {}
  ) => {
    const { maxInputs, coinsPerAsset, amountPerCoin } = params;
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
      const { provider, wallets } = await setupTest({ maxInputs, coinsPerAsset: maxInputs - 1 });
      const [wallet] = wallets;

      const baseAssetId = await provider.getBaseAssetId();

      let { coins } = await wallet.getCoins(baseAssetId);

      expect(coins.length).toBeGreaterThan(1);
      expect(coins.length).toBe(maxInputs - 1);

      const tx = await wallet.consolidateCoins({ assetId: baseAssetId });
      const { isStatusSuccess } = await tx.waitForResult();

      expect(isStatusSuccess).toBeTruthy();

      ({ coins } = await wallet.getCoins(baseAssetId));

      expect(coins.length).toBe(1);
    });

    it('should consolidate asset just fine [ACCOUNT HAS MORE THAN MAX INPUTS]', async () => {
      const maxInputs = 255;
      const { provider, wallets } = await setupTest({ maxInputs, coinsPerAsset: maxInputs + 1 });
      const [wallet] = wallets;

      const baseAssetId = await provider.getBaseAssetId();

      let { coins } = await wallet.getCoins(baseAssetId);

      expect(coins.length).toBeGreaterThan(1);
      expect(coins.length).toBe(maxInputs + 1);

      const tx = await wallet.consolidateCoins({ assetId: baseAssetId });
      const { isStatusSuccess } = await tx.waitForResult();

      expect(isStatusSuccess).toBeTruthy();

      ({ coins } = await wallet.getCoins(baseAssetId));

      expect(coins.length).toBe(2);
    });

    it('should ensure consolidation is made with most valuable coins', async () => {
      const maxInputs = 100;
      const { provider, wallets } = await setupTest({ maxInputs });
      const [fundedWallet] = wallets;

      const baseAssetId = await provider.getBaseAssetId();
      const wallet = Wallet.generate({ provider });

      const minAmount = 1;
      const maxAmount = 1000;

      // Fund Wallet two times with different amounts
      for (let i = 0; i < 2; i++) {
        const request = new ScriptTransactionRequest({
          script: '0x',
        });

        Array.from({ length: maxInputs }).forEach((_, index) => {
          // Alternate between min and max amounts
          request.addCoinOutput(
            wallet.address,
            index % 2 === 0 ? minAmount : maxAmount,
            baseAssetId
          );
        });

        await request.estimateAndFund(fundedWallet);

        const tx = await fundedWallet.sendTransaction(request);
        await tx.waitForResult();
      }

      let { coins } = await wallet.getCoins(baseAssetId);
      expect(coins.length).toBe(maxInputs * 2);

      const hasMinAmount = coins.some((c) => c.amount.eq(minAmount));
      const hasMaxAmount = coins.some((c) => c.amount.eq(maxAmount));

      expect(hasMinAmount).toBeTruthy();
      expect(hasMaxAmount).toBeTruthy();

      const tx = await wallet.consolidateCoins({ assetId: baseAssetId });
      const { isStatusSuccess, transaction } = await tx.waitForResult();

      expect(isStatusSuccess).toBeTruthy();

      const coinInputs = transaction.inputs?.filter(
        (i) => i.type === InputType.Coin
      ) as InputCoin[];
      expect(coinInputs.length).toBe(maxInputs);

      // Ensures all used coins to consolidate have the highest amount
      coinInputs.forEach((input) => {
        expect(input.amount.eq(maxAmount)).toBeTruthy();
      });

      ({ coins } = await wallet.getCoins(baseAssetId));
      expect(coins.length).toBe(maxInputs + 1);
    });

    it('should ensure fee can be paid', async () => {
      const maxInputs = 255;
      const { provider, wallets } = await setupTest({
        amountPerCoin: 1,
        coinsPerAsset: maxInputs,
        maxInputs,
      });

      const [wallet] = wallets;

      const baseAssetId = await provider.getBaseAssetId();

      await expectToThrowFuelError(
        () => wallet.consolidateCoins({ assetId: baseAssetId }),
        new FuelError(
          ErrorCode.FUNDS_TOO_LOW,
          'Not enough funds to pay for the consolidation transaction'
        )
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
