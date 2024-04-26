import { generateTestWallet } from '@fuel-ts/account/test-utils';
import { expectToBeInRange } from '@fuel-ts/utils/test-utils';
import type { BigNumberish, WalletUnlocked } from 'fuels';
import { toNumber, Script, Provider, Predicate, FUEL_NETWORK_URL } from 'fuels';

import { FuelGaugeProjectsEnum, getFuelGaugeForcProject } from '../../test/fixtures';
import type { Validation } from '../types/predicate';

import { fundPredicate } from './utils/predicate';

/**
 * @group node
 */
describe('Predicate', () => {
  const { binHexlified: scriptBytes, abiContents: scriptAbi } = getFuelGaugeForcProject(
    FuelGaugeProjectsEnum.SCRIPT_MAIN_ARGS
  );

  const { binHexlified: predicateBytesStruct, abiContents: predicateAbiMainArgsStruct } =
    getFuelGaugeForcProject(FuelGaugeProjectsEnum.PREDICATE_MAIN_ARGS_STRUCT);

  describe('With script', () => {
    let wallet: WalletUnlocked;
    let receiver: WalletUnlocked;
    let provider: Provider;

    let baseAssetId: string;
    beforeAll(async () => {
      provider = await Provider.create(FUEL_NETWORK_URL);
      baseAssetId = provider.getBaseAssetId();
      wallet = await generateTestWallet(provider, [[10_000_000, baseAssetId]]);
      receiver = await generateTestWallet(provider);
    });

    it('calls a predicate and uses proceeds for a script call', async () => {
      const initialReceiverBalance = toNumber(await receiver.getBalance());
      const scriptInstance = new Script<BigNumberish[], BigNumberish>(
        scriptBytes,
        scriptAbi,
        wallet
      );

      // calling the script with the receiver account (no resources)
      const scriptInput = 1;
      scriptInstance.account = receiver;

      await expect(scriptInstance.functions.main(scriptInput).call()).rejects.toThrow(
        /not enough coins to fit the target/
      );

      // setup predicate
      const amountToPredicate = 10_000;
      const amountToReceiver = 2000;
      const predicate = new Predicate<[Validation]>({
        bytecode: predicateBytesStruct,
        provider,
        abi: predicateAbiMainArgsStruct,
        inputData: [
          {
            has_account: true,
            total_complete: 100,
          },
        ],
      });
      const initialPredicateBalance = toNumber(await predicate.getBalance());

      await fundPredicate(wallet, predicate, amountToPredicate);

      expect(toNumber(await predicate.getBalance())).toBeGreaterThan(initialPredicateBalance);

      // executing predicate to transfer resources to receiver
      const tx = await predicate.transfer(receiver.address, amountToReceiver, baseAssetId, {
        gasLimit: 1000,
      });

      const { fee: predicateTxFee } = await tx.waitForResult();

      const {
        transactionResult: { fee: receiverTxFee },
      } = await scriptInstance.functions.main(scriptInput).call();

      const finalReceiverBalance = toNumber(await receiver.getBalance());

      const remainingPredicateBalance = toNumber(await predicate.getBalance());

      const expectedReceiverBalance =
        initialReceiverBalance + amountToReceiver - receiverTxFee.toNumber();

      expect(toNumber(initialReceiverBalance)).toBe(0);

      expectToBeInRange({
        value: finalReceiverBalance,
        min: expectedReceiverBalance - 8,
        max: expectedReceiverBalance + 8,
      });

      const predicateExpectedBalance =
        amountToPredicate + initialPredicateBalance - amountToReceiver - predicateTxFee.toNumber();

      expectToBeInRange({
        value: remainingPredicateBalance,
        min: predicateExpectedBalance - 8,
        max: predicateExpectedBalance + 8,
      });
    });
  });
});
