import type { InputValue, WalletLocked, WalletUnlocked } from 'fuels';
import { Predicate } from 'fuels';

import predicateBytesFalse from '../../fixtures/forc-projects/predicate-false';
import predicateBytesTrue from '../../fixtures/forc-projects/predicate-true';

import { setupWallets, assertBalances, fundPredicate } from './utils/predicate';

describe('Predicate', () => {
  describe('Evaluations', () => {
    let predicate: Predicate<InputValue[]>;
    let wallet: WalletUnlocked;
    let receiver: WalletLocked;
    let chainId: number;

    beforeEach(async () => {
      [wallet, receiver] = await setupWallets();
      chainId = await wallet.provider.getChainId();
    });

    it('calls a no argument predicate and returns true', async () => {
      const amountToPredicate = 100;
      const amountToReceiver = 50;
      const initialReceiverBalance = await receiver.getBalance();

      predicate = new Predicate(predicateBytesTrue, chainId);

      const initialPredicateBalance = await fundPredicate(wallet, predicate, amountToPredicate);

      const tx = await predicate.transfer(receiver.address, amountToReceiver);
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

      predicate = new Predicate(predicateBytesFalse, chainId);

      await fundPredicate(wallet, predicate, amountToPredicate);

      await expect(predicate.transfer(receiver.address, amountToReceiver)).rejects.toThrow(
        'Invalid transaction'
      );
    });
  });
});
