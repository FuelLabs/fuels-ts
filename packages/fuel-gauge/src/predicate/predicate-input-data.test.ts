import { Predicate, Wallet } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { PredicateInputDataAbi__factory } from '../../test/typegen';

import { fundPredicate } from './utils/predicate';

/**
 * @group node
 * @group browser
 */

describe('Predicate', () => {
  describe('Input Data', () => {
    it('throws invalid transaction when input_predicate_data is required for predicate validation', async () => {
      using launched = await launchTestNode();
      const {
        provider,
        wallets: [wallet],
      } = launched;

      const amountToPredicate = 200_000;
      const amountToReceiver = 50;

      const predicate = new Predicate({
        bytecode: PredicateInputDataAbi__factory.bin,
        abi: PredicateInputDataAbi__factory.abi,
        provider,
        inputData: [true],
      });

      await fundPredicate(wallet, predicate, amountToPredicate);

      const receiver = Wallet.generate({ provider });

      await expect(
        predicate.transfer(receiver.address, amountToReceiver, provider.getBaseAssetId(), {
          gasLimit: 1000,
        })
      ).rejects.toThrow(/PredicateVerificationFailed/i);
    });
  });
});
