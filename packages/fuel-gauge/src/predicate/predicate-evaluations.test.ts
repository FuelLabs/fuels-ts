import { getForcProject } from '@fuel-ts/utils/test-utils';
import type { BN, InputValue, JsonAbi, Provider, WalletLocked, WalletUnlocked } from 'fuels';
import { BaseAssetId, Predicate } from 'fuels';
import { join } from 'path';

import { setupWallets, assertBalances, fundPredicate } from './utils/predicate';

describe('Predicate', () => {
  const { binHexlified: predicateBytesFalse } = getForcProject<JsonAbi>(
    join(__dirname, '../../fixtures/forc-projects/predicate-false')
  );
  const { binHexlified: predicateBytesTrue } = getForcProject<JsonAbi>(
    join(__dirname, '../../fixtures/forc-projects/predicate-true')
  );

  describe('Evaluations', () => {
    let predicate: Predicate<InputValue[]>;
    let wallet: WalletUnlocked;
    let receiver: WalletLocked;
    let provider: Provider;
    let gasPrice: BN;

    beforeEach(async () => {
      [wallet, receiver] = await setupWallets();
      provider = wallet.provider;
      gasPrice = provider.getGasConfig().minGasPrice;
    });

    it('calls a no argument predicate and returns true', async () => {
      const amountToPredicate = 100_000;
      const amountToReceiver = 50;
      const initialReceiverBalance = await receiver.getBalance();

      predicate = new Predicate(predicateBytesTrue, provider);

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
      const amountToPredicate = 100;
      const amountToReceiver = 50;

      predicate = new Predicate(predicateBytesFalse, provider);

      await fundPredicate(wallet, predicate, amountToPredicate);

      await expect(predicate.transfer(receiver.address, amountToReceiver)).rejects.toThrow(
        'Invalid transaction'
      );
    });
  });
});
