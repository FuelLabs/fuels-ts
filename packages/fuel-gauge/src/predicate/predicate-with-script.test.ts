import type { BigNumberish } from 'fuels';
import { toNumber, Script, Predicate, Wallet, FuelError, ErrorCode } from 'fuels';
import { expectToThrowFuelError, launchTestNode } from 'fuels/test-utils';

import { PredicateMainArgsStruct, ScriptMainArgs } from '../../test/typegen';
import type { Validation } from '../types/predicate';

import { fundAccount } from './utils/predicate';

/**
 * @group node
 * @group browser
 */
describe('Predicate', () => {
  describe('With script', () => {
    it('calls a predicate and uses proceeds for a script call', async () => {
      using launched = await launchTestNode();
      const {
        provider,
        wallets: [wallet],
      } = launched;

      const receiver = Wallet.generate({ provider });

      const initialReceiverBalance = toNumber(await receiver.getBalance());
      const scriptInstance = new Script<BigNumberish[], BigNumberish>(
        ScriptMainArgs.bytecode,
        ScriptMainArgs.abi,
        wallet
      );

      // calling the script with the receiver account (no resources)
      const scriptInput = 1;
      scriptInstance.account = receiver;

      await expectToThrowFuelError(
        () => scriptInstance.functions.main(scriptInput).call(),
        new FuelError(
          ErrorCode.NOT_ENOUGH_FUNDS,
          `The account(s) sending the transaction don't have enough funds to cover the transaction.`
        )
      );

      // setup predicate
      const amountToPredicate = 900_000;
      const amountToReceiver = 100_000;
      const predicate = new Predicate<[Validation]>({
        provider,
        abi: PredicateMainArgsStruct.abi,
        bytecode: PredicateMainArgsStruct.bytecode,
        data: [
          {
            has_account: true,
            total_complete: 100,
          },
        ],
      });

      await fundAccount(wallet, predicate, amountToPredicate);

      // executing predicate to transfer resources to receiver
      const tx = await predicate.transfer(
        receiver.address,
        amountToReceiver,
        await provider.getBaseAssetId(),
        {
          gasLimit: 1000,
        }
      );

      const { isStatusSuccess } = await tx.waitForResult();
      expect(isStatusSuccess).toBeTruthy();

      const { waitForResult } = await scriptInstance.functions.main(scriptInput).call();
      const res = await waitForResult();

      expect(res.transactionResult.isStatusSuccess).toBeTruthy();

      const receiverFinalBalance = await receiver.getBalance();

      expect(toNumber(initialReceiverBalance)).toBe(0);
      expect(receiverFinalBalance.gt(initialReceiverBalance)).toBeTruthy();
    });
  });
});
