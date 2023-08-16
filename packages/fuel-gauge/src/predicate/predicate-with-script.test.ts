import { generateTestWallet } from '@fuel-ts/wallet/test-utils';
import { readFileSync } from 'fs';
import type { BigNumberish, WalletUnlocked } from 'fuels';
import { toNumber, BaseAssetId, Script, Provider, Predicate, FUEL_NETWORK_URL } from 'fuels';
import { join } from 'path';

import predicateAbiMainArgsStruct from '../../fixtures/forc-projects/predicate-main-args-struct/out/debug/predicate-main-args-struct-abi.json';
import predicateBytesStruct from '../../fixtures/forc-projects/predicate-struct';
import scriptAbi from '../../fixtures/forc-projects/script-main-args/out/debug/script-main-args-abi.json';
import type { Validation } from '../types/predicate';

import { fundPredicate } from './utils/predicate';

const scriptBytes = readFileSync(
  join(__dirname, '../../fixtures/forc-projects/script-main-args/out/debug/script-main-args.bin')
);

describe('Predicate', () => {
  describe('With script', () => {
    let wallet: WalletUnlocked;
    let receiver: WalletUnlocked;
    let provider: Provider;

    beforeEach(async () => {
      provider = await Provider.connect(FUEL_NETWORK_URL);
      wallet = await generateTestWallet(provider, [[5_000_000, BaseAssetId]]);
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
      const amountToPredicate = 100;
      const amountToReceiver = 50;
      const chainId = await wallet.provider.getChainId();
      const predicate = new Predicate<[Validation]>(
        predicateBytesStruct,
        chainId,
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
        .transfer(receiver.address, amountToReceiver);

      await tx.waitForResult();

      const finalReceiverBalance = toNumber(await receiver.getBalance());

      // calling the script with the receiver account (with resources)
      await expect(scriptInstance.functions.main(scriptInput).call()).resolves.toBeTruthy();

      const remainingPredicateBalance = toNumber(await predicate.getBalance());

      expect(toNumber(initialReceiverBalance)).toBe(0);
      expect(initialReceiverBalance + amountToReceiver).toEqual(finalReceiverBalance);

      expect(remainingPredicateBalance).toEqual(
        amountToPredicate + initialPredicateBalance - amountToReceiver
      );
    });
  });
});
