import { TestNodeLauncher, WalletConfig } from '@fuel-ts/test-utils';
import { BaseAssetId, Predicate } from 'fuels';

import predicateBytesFalse from '../../fixtures/forc-projects/predicate-false';
import predicateBytesTrue from '../../fixtures/forc-projects/predicate-true';

import { assertBalances, fundPredicate } from './utils/predicate';

/**
 * @group node
 */
describe('Predicate', () => {
  describe('Evaluations', () => {
    const walletConfig = new WalletConfig({ wallets: 2 });
    beforeAll(async (ctx) => {
      await TestNodeLauncher.prepareCache(ctx.tasks.length, {
        walletConfig,
      });

      return () => TestNodeLauncher.killCachedNodes();
    });

    it('calls a no argument predicate and returns true', async () => {
      await using launched = await TestNodeLauncher.launch({ walletConfig });
      const {
        wallets: [wallet, receiver],
        provider,
      } = launched;
      const { minGasPrice: gasPrice } = provider.getGasConfig();

      const amountToPredicate = 100_000;
      const amountToReceiver = 50;
      const initialReceiverBalance = await receiver.getBalance();

      const predicate = new Predicate(predicateBytesTrue, provider);

      const initialPredicateBalance = await fundPredicate(wallet, predicate, amountToPredicate);

      const tx = await predicate.transfer(receiver.address, amountToReceiver, BaseAssetId, {
        gasPrice,
      });
      await tx.waitForResult();

      await assertBalances(
        predicate,
        receiver,
        initialPredicateBalance,
        initialReceiverBalance,
        amountToPredicate,
        amountToReceiver
      );
    });

    it('calls a no argument predicate and returns false', async () => {
      await using launched = await TestNodeLauncher.launch({ walletConfig });
      const {
        wallets: [wallet, receiver],
        provider,
      } = launched;

      const amountToPredicate = 100;
      const amountToReceiver = 50;

      const predicate = new Predicate(predicateBytesFalse, provider);

      await fundPredicate(wallet, predicate, amountToPredicate);

      await expect(predicate.transfer(receiver.address, amountToReceiver)).rejects.toThrow(
        'Invalid transaction'
      );
    });
  });
});
