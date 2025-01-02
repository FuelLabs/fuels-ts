import { Address, Wallet } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { PredicateTrue, PredicateFalse } from '../../test/typegen/predicates';

import { assertBalances, fundAccount } from './utils/predicate';

/**
 * @group node
 * @group browser
 */
describe('Predicate', () => {
  describe('Evaluations', () => {
    it('calls a no argument predicate and returns true', async () => {
      using launched = await launchTestNode();

      const {
        wallets: [wallet],
        provider,
      } = launched;

      const receiver = Wallet.generate({ provider });
      const initialReceiverBalance = await receiver.getBalance();

      const predicate = new PredicateTrue({ provider });

      await fundAccount(wallet, predicate, 200_000);

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

      const predicate = new PredicateFalse({ provider });

      await fundAccount(wallet, predicate, 200_000);

      await expect(
        predicate.transfer(receiver.address, 50, provider.getBaseAssetId(), {
          gasLimit: 1000,
        })
      ).rejects.toThrow('PredicateVerificationFailed');
    });
  });
});
