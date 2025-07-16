import { ErrorCode } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';
import { bn } from '@fuel-ts/math';
import { randomInt } from 'crypto';

import type { CoinQuantity, Provider } from '..';
import { Account, Fuel, ScriptTransactionRequest } from '..';
import { MockConnector } from '../../test/fixtures/mocked-connector';
import { PredicateMultiArgs } from '../../test/fixtures/predicate-multi-args';
import { setupTestProviderAndWallets, TestAssetId } from '../test-utils';
import type { WalletUnlocked } from '../wallet';
import { Wallet } from '../wallet';

import { consolidateCoins, getAllCoins } from './consolidate-coins';

const seedWallet = async (opts: {
  adminWallet: WalletUnlocked;
  wallet: Account;
  coins: CoinQuantity[];
}) => {
  const { adminWallet, wallet, coins } = opts;
  const maxOutputs = 253;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const request = new ScriptTransactionRequest({
      scriptData: '0x',
    });

    while (request.outputs.length < maxOutputs) {
      const coin = coins.shift();
      if (!coin) {
        break;
      }
      request.addCoinOutput(wallet.address, coin.amount, coin.assetId);
    }

    await request.estimateAndFund(adminWallet);
    const transfer = await adminWallet.sendTransaction(request);
    await transfer.waitForResult();

    if (coins.length === 0) {
      break;
    }
  }
};

/**
 * @group node
 * @group browser
 */
describe('Consolidate coins', { timeout: 10_000 }, () => {
  const MIN_COINS = 500;
  const MAX_COINS = 1000;

  const setupTest = async (opts: {
    account: ({ provider }: { provider: Provider }) => Account;
    coins: (opts: { baseAssetId: string; nonBaseAssetId: string }) => CoinQuantity[];
  }) => {
    const { account, coins } = opts;
    const launched = await setupTestProviderAndWallets({
      nodeOptions: { args: ['--starting-gas-price', '2500'] },
    });
    const {
      provider,
      wallets: [adminWallet],
    } = launched;

    const chain = await provider.getChain();
    const maxInputs = chain.consensusParameters.txParameters.maxInputs;
    const baseAssetId = await provider.getBaseAssetId();
    const nonBaseAssetId = TestAssetId.A.value;

    const accountToSeed = account({ provider });

    await seedWallet({
      adminWallet,
      wallet: accountToSeed,
      coins: coins({ baseAssetId, nonBaseAssetId }),
    });

    return {
      provider,
      account: accountToSeed,
      baseAssetId,
      nonBaseAssetId,
      maxInputs: maxInputs.toNumber(),
      [Symbol.dispose]: () => launched.cleanup(),
    };
  };

  const happyAccounts: Record<string, (opts: { provider: Provider }) => Account> = {
    // Simple Wallet
    'wallet-unlocked': Wallet.generate,
    // Valid predicate with multi args
    'predicate-multi-args': (opts) =>
      new PredicateMultiArgs({ provider: opts.provider, data: [12, 31] }),
    // Simple Fuel Connector
    'fuel-connector': (opts) => {
      const wallet = Wallet.generate({ provider: opts.provider });
      const mockConnector = new MockConnector({ wallets: [wallet] });
      const fuel = new Fuel({
        connectors: [mockConnector],
      });
      return new Account(wallet.address, opts.provider, fuel);
    },
    // Predicate Fuel Connector
  };

  const unhappyAccounts: Record<string, (opts: { provider: Provider }) => Account> = {
    // Locked wallet
    'wallet-locked': (opts) => Wallet.generate({ provider: opts.provider }).lock(),
    // Invalid predicate with multi args
    'predicate-multi-args-invalid': (opts) =>
      new PredicateMultiArgs({ provider: opts.provider, data: [12, 12] }),
  };

  describe.each(Object.entries(happyAccounts))(
    '[Simple manual consolidations: %s]',
    (_, account) => {
      it('Should consolidate base assets', async () => {
        using launched = await setupTest({
          account,
          coins: ({ baseAssetId }) => [
            ...Array.from({ length: randomInt(MIN_COINS, MAX_COINS) }, () => ({
              assetId: baseAssetId,
              amount: bn(1),
            })),
            ...Array.from({ length: 1 }, () => ({ assetId: baseAssetId, amount: bn(1_000_000) })),
          ],
        });

        const { account: accountToConsolidate, baseAssetId, maxInputs } = launched;

        // Given we have more than the max inputs, we should consolidate
        const { coins: beforeConsolidation } = await getAllCoins(accountToConsolidate, baseAssetId);
        expect(beforeConsolidation.length).toBeGreaterThan(maxInputs);

        // When we consolidate
        const { submitAll } = await consolidateCoins({
          account: accountToConsolidate,
          assetId: baseAssetId,
        });
        const { txResponses } = await submitAll();

        // Then we should be successful
        expect(txResponses.length).toBeGreaterThan(0);
        // Then we should have less than the max inputs
        const { coins: afterConsolidation } = await getAllCoins(accountToConsolidate, baseAssetId);
        expect(afterConsolidation.length).toBeLessThan(maxInputs);
      });

      it('Should consolidate non-base assets', async () => {
        using launched = await setupTest({
          account,
          coins: ({ nonBaseAssetId, baseAssetId }) => [
            ...Array.from({ length: randomInt(MIN_COINS, MAX_COINS) }, () => ({
              assetId: nonBaseAssetId,
              amount: bn(1),
            })),
            ...Array.from({ length: 1 }, () => ({ assetId: baseAssetId, amount: bn(1_000_000) })),
          ],
        });
        const { account: accountToConsolidate, nonBaseAssetId, maxInputs } = launched;

        // Given we have more than the max inputs, we should consolidate
        const { coins: beforeConsolidation } = await getAllCoins(
          accountToConsolidate,
          nonBaseAssetId
        );
        expect(beforeConsolidation.length).toBeGreaterThan(maxInputs);

        // When we consolidate
        const { submitAll } = await consolidateCoins({
          account: accountToConsolidate,
          assetId: nonBaseAssetId,
        });
        const { txResponses } = await submitAll();

        // Then we should be successful
        expect(txResponses.length).toBeGreaterThan(0);
        // Then we should have less than the max inputs
        const { coins: afterConsolidation } = await getAllCoins(
          accountToConsolidate,
          nonBaseAssetId
        );
        expect(afterConsolidation.length).toBeLessThan(maxInputs);
      });

      it('Should throw if the account has insufficient funds', async () => {
        using launched = await setupTest({
          account,
          coins: ({ baseAssetId }) => [
            // Only dust coins
            ...Array.from({ length: randomInt(MIN_COINS, MAX_COINS) }, () => ({
              assetId: baseAssetId,
              amount: bn(1),
            })),
          ],
        });
        const { account: accountToConsolidate, baseAssetId } = launched;

        const { submitAll } = await consolidateCoins({
          account: accountToConsolidate,
          assetId: baseAssetId,
        });

        await expectToThrowFuelError(() => submitAll(), { code: ErrorCode.FUNDS_TOO_LOW });
      });
    }
  );

  describe.each(Object.entries(unhappyAccounts))('[Failure cases: %s]', (_, account) => {
    it('Should throw if unable to consolidate base assets', async () => {
      using launched = await setupTest({
        account,
        coins: ({ baseAssetId }) => [
          ...Array.from({ length: randomInt(MIN_COINS, MAX_COINS) }, () => ({
            assetId: baseAssetId,
            amount: bn(100),
          })),
          ...Array.from({ length: 1 }, () => ({
            assetId: baseAssetId,
            amount: bn(1_000_000),
          })),
        ],
      });
      const { account: accountToConsolidate, baseAssetId } = launched;

      const { submitAll } = await consolidateCoins({
        account: accountToConsolidate,
        assetId: baseAssetId,
      });

      const call = () => submitAll();
      await expect(call).rejects.toThrowError(/InputInvalidSignature|PredicateReturnedNonOne/);
    });

    it('Should throw error if unable to consolidate non-base assets', async () => {
      using launched = await setupTest({
        account,
        coins: ({ nonBaseAssetId, baseAssetId }) => [
          ...Array.from({ length: randomInt(MIN_COINS, MAX_COINS) }, () => ({
            assetId: nonBaseAssetId,
            amount: bn(100),
          })),
          ...Array.from({ length: 1 }, () => ({
            assetId: baseAssetId,
            amount: bn(1_000_000),
          })),
        ],
      });
      const { account: accountToConsolidate, nonBaseAssetId } = launched;

      const { submitAll } = await consolidateCoins({
        account: accountToConsolidate,
        assetId: nonBaseAssetId,
      });

      const call = () => submitAll();
      await expect(call).rejects.toThrowError(/InputInvalidSignature|PredicateReturnedNonOne/);
    });
  });
});
