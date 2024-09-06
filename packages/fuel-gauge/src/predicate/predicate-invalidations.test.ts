import { ErrorCode, FuelError, Predicate, Wallet } from 'fuels';
import { expectToThrowFuelError, launchTestNode } from 'fuels/test-utils';

import { PredicateMainArgsStruct } from '../../test/typegen';
import type { Validation } from '../types/predicate';

import { fundPredicate } from './utils/predicate';

/**
 * @group node
 * @group browser
 */
describe('Predicate', () => {
  describe('Invalidations', () => {
    it('throws if sender does not have enough resources for tx and gas', async () => {
      using launched = await launchTestNode();
      const {
        provider,
        wallets: [wallet],
      } = launched;

      const predicate = new Predicate<[Validation]>({
        abi: PredicateMainArgsStruct.abi,
        bytecode: PredicateMainArgsStruct.bytecode,
        provider,
      });

      await fundPredicate(wallet, predicate, 1000);

      const receiver = Wallet.generate({ provider });

      await expectToThrowFuelError(
        async () =>
          predicate.transfer(
            receiver.address,
            await predicate.getBalance(),
            provider.getBaseAssetId(),
            {
              gasLimit: 100_000_000,
            }
          ),
        new FuelError(
          ErrorCode.NOT_ENOUGH_FUNDS,
          `The account(s) sending the transaction don't have enough funds to cover the transaction.`
        )
      );
    });

    it('throws if the passed gas limit is too low', async () => {
      using launched = await launchTestNode();
      const {
        provider,
        wallets: [wallet],
      } = launched;

      const predicate = new Predicate<[Validation]>({
        abi: PredicateMainArgsStruct.abi,
        bytecode: PredicateMainArgsStruct.bytecode,
        provider,
      });

      await fundPredicate(wallet, predicate, 1000);

      const receiver = Wallet.generate({ provider });

      // fuel-client we should change with the proper error message
      await expect(
        predicate.transfer(receiver.address, 1000, provider.getBaseAssetId(), {
          gasLimit: 0,
        })
      ).rejects.toThrow(/Gas limit '0' is lower than the required:./i);
    });
  });
});
