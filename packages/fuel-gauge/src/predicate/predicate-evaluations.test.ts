import type { InputValue, Provider, WalletLocked, WalletUnlocked } from 'fuels';
import { Address, Predicate, Wallet } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

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
    it('calls a no argument predicate and returns true', async () => {
      using launched = await launchTestNode();

      const {
        wallets: [wallet],
        provider,
      } = launched;

      const receiver = Wallet.fromAddress(Address.fromRandom(), provider);
      const initialReceiverBalance = await receiver.getBalance();

      const predicate = new Predicate({
        bytecode: predicateBytesTrue,
        provider,
      });

      await fundPredicate(wallet, predicate, 200_000);

      const amountToReceiver = 50;

      const tx = await predicate.transfer(
        receiver.address,
        amountToReceiver,
        provider.getBaseAssetId(),
        {
          gasLimit: 1000,
        }
      );

      const { isStatusSuccess } = await tx.waitForResult();
      await assertBalances(receiver, initialReceiverBalance, amountToReceiver);

      expect(isStatusSuccess).toBeTruthy();
    });

    it('calls a no argument predicate and returns false', async () => {
      using launched = await launchTestNode();

      const {
        wallets: [wallet],
        provider,
      } = launched;

      const receiver = Wallet.fromAddress(Address.fromRandom(), provider);

      const predicate = new Predicate({
        bytecode: predicateBytesTrue,
        provider,
      });

      await fundPredicate(wallet, predicate, 200_000);

      await expect(
        predicate.transfer(receiver.address, 50, provider.getBaseAssetId(), {
          gasLimit: 1000,
        })
      ).rejects.toThrow('PredicateVerificationFailed');
    });
  });
});
