import { TestNodeLauncher } from '@fuel-ts/test-utils';
import { expectToBeInRange } from '@fuel-ts/utils/test-utils';
import { WalletConfig } from '@fuel-ts/wallet/test-utils';
import { readFileSync } from 'fs';
import type { BigNumberish } from 'fuels';
import { WalletUnlocked, toNumber, BaseAssetId, Script, Predicate } from 'fuels';
import { join } from 'path';

import predicateAbiMainArgsStruct from '../../fixtures/forc-projects/predicate-main-args-struct/out/debug/predicate-main-args-struct-abi.json';
import predicateBytesStruct from '../../fixtures/forc-projects/predicate-struct';
import scriptAbi from '../../fixtures/forc-projects/script-main-args/out/debug/script-main-args-abi.json';
import type { Validation } from '../types/predicate';

import { fundPredicate } from './utils/predicate';

const scriptBytes = readFileSync(
  join(__dirname, '../../fixtures/forc-projects/script-main-args/out/debug/script-main-args.bin')
);

/**
 * @group node
 */
describe('Predicate', () => {
  describe('With script', () => {
    it('calls a predicate and uses proceeds for a script call', async () => {
      await using launched = await TestNodeLauncher.launch();
      const {
        wallets: [wallet],
        provider,
      } = launched;
      const { minGasPrice: gasPrice } = provider.getGasConfig();

      const receiver = WalletUnlocked.generate({ provider });
      const initialReceiverBalance = toNumber(await receiver.getBalance());
      const scriptInstance = new Script<BigNumberish[], BigNumberish>(
        scriptBytes,
        scriptAbi,
        wallet
      );

      // calling the script with the receiver account (no resources)
      const scriptInput = 1;
      scriptInstance.account = receiver;
      await expect(
        scriptInstance.functions.main(scriptInput).txParams({ gasPrice }).call()
      ).rejects.toThrow(/not enough coins to fit the target/);

      // setup predicate
      const amountToPredicate = 500_000;
      const amountToReceiver = 110_000;
      const predicate = new Predicate<[Validation]>(
        predicateBytesStruct,
        provider,
        predicateAbiMainArgsStruct
      );
      const initialPredicateBalance = toNumber(await predicate.getBalance());

      await fundPredicate(wallet, predicate, amountToPredicate);

      expect(toNumber(await predicate.getBalance())).toEqual(
        initialPredicateBalance + amountToPredicate
      );

      // executing predicate to transfer resources to receiver
      const tx = await predicate
        .setData({
          has_account: true,
          total_complete: 100,
        })
        .transfer(receiver.address, amountToReceiver, BaseAssetId, { gasPrice });

      const { fee: predicateTxFee } = await tx.waitForResult();

      const {
        transactionResult: { fee: receiverTxFee },
      } = await scriptInstance.functions.main(scriptInput).txParams({ gasPrice }).call();

      const finalReceiverBalance = toNumber(await receiver.getBalance());

      const remainingPredicateBalance = toNumber(await predicate.getBalance());

      const expectedReceiverBalance =
        initialReceiverBalance + amountToReceiver - receiverTxFee.toNumber();

      expect(toNumber(initialReceiverBalance)).toBe(0);

      expectToBeInRange({
        value: finalReceiverBalance,
        min: expectedReceiverBalance - 1,
        max: expectedReceiverBalance + 1,
      });

      const predicateExpectedBalance =
        amountToPredicate + initialPredicateBalance - amountToReceiver - predicateTxFee.toNumber();

      expectToBeInRange({
        value: remainingPredicateBalance,
        min: predicateExpectedBalance - 1,
        max: predicateExpectedBalance + 1,
      });
    });
  });
});
