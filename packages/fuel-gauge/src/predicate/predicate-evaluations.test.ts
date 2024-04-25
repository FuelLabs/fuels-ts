import type { BN, InputValue, Provider, WalletLocked, WalletUnlocked } from 'fuels';
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
    let gasPrice: BN;
    let baseAssetId: string;

    beforeEach(async () => {
      [wallet, receiver] = await setupWallets();
      provider = wallet.provider;
      gasPrice = provider.getGasConfig().minGasPrice;
      baseAssetId = provider.getBaseAssetId();
    });

    it('calls a no argument predicate and returns true', async () => {
      const amountToPredicate = 200_000;
      const amountToReceiver = 50;
      const initialReceiverBalance = await receiver.getBalance();

      predicate = new Predicate({
        bytecode: predicateBytesTrue,
        provider,
      });

      const initialPredicateBalance = await fundPredicate(wallet, predicate, amountToPredicate);

      const tx = await predicate.transfer(receiver.address, amountToReceiver, baseAssetId, {
        gasPrice,
        gasLimit: 10_000,
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
      const amountToPredicate = 200_000;
      const amountToReceiver = 50;

      predicate = new Predicate({
        bytecode: predicateBytesFalse,
        provider,
      });

      await fundPredicate(wallet, predicate, amountToPredicate);

      await expect(
        predicate.transfer(receiver.address, amountToReceiver, baseAssetId, {
          gasPrice,
          gasLimit: 10_000,
        })
      ).rejects.toThrow('PredicateVerificationFailed');
    });
  });
});
