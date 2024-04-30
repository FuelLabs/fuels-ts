import type { InputValue, Provider, WalletLocked, WalletUnlocked } from 'fuels';
import { Predicate } from 'fuels';

import { FuelGaugeProjectsEnum, getFuelGaugeForcProject } from '../../test/fixtures';

import { setupWallets, assertBalances, fundPredicate } from './utils/predicate';

/**
 * @group node
 */
describe('Predicate', () => {
  const { binHexlified: predicateBytesTrue } = getFuelGaugeForcProject(
    FuelGaugeProjectsEnum.PREDICATE_TRUE
  );

  const { binHexlified: predicateBytesFalse } = getFuelGaugeForcProject(
    FuelGaugeProjectsEnum.PREDICATE_FALSE
  );

  describe('Evaluations', () => {
    let predicate: Predicate<InputValue[]>;
    let wallet: WalletUnlocked;
    let receiver: WalletLocked;
    let provider: Provider;
    let baseAssetId: string;

    beforeEach(async () => {
      [wallet, receiver] = await setupWallets();
      provider = wallet.provider;
      baseAssetId = provider.getBaseAssetId();
    });

    it('calls a no argument predicate and returns true', async () => {
      const amountToReceiver = 50;
      const initialReceiverBalance = await receiver.getBalance();

      predicate = new Predicate({
        bytecode: predicateBytesTrue,
        provider,
      });

      const tx = await predicate.transfer(receiver.address, amountToReceiver, baseAssetId, {
        gasLimit: 1000,
      });

      const { isStatusSuccess } = await tx.waitForResult();
      await assertBalances(receiver, initialReceiverBalance, amountToReceiver);

      expect(isStatusSuccess).toBeTruthy();
    });

    it('calls a no argument predicate and returns false', async () => {
      const amountToPredicate = 200_000;
      const amountToReceiver = 50;

      predicate = new Predicate({
        bytecode: predicateBytesFalse,
        provider,
      });

      await fundPredicate(wallet, predicate, amountToPredicate);

      await expect(
        predicate.transfer(receiver.address, amountToReceiver, baseAssetId, {
          gasLimit: 1000,
        })
      ).rejects.toThrow('PredicateVerificationFailed');
    });
  });
});
