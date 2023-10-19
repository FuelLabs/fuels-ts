import { getForcProject } from '@fuel-ts/utils/test-utils';
import { generateTestWallet } from '@fuel-ts/wallet/test-utils';
import type { BN, BigNumberish, JsonAbi, WalletUnlocked } from 'fuels';
import { toNumber, BaseAssetId, Script, Provider, Predicate, FUEL_NETWORK_URL } from 'fuels';
import { join } from 'path';

import type { Validation } from '../types/predicate';

import { fundPredicate } from './utils/predicate';

describe('Predicate', () => {
  const { binHexlified: scriptBytes, abiContents: scriptAbi } = getForcProject<JsonAbi>(
    join(__dirname, '../../fixtures/forc-projects/script-main-args')
  );
  const { binHexlified: predicateBytesStruct } = getForcProject<JsonAbi>(
    join(__dirname, '../../fixtures/forc-projects/predicate-struct')
  );
  const { abiContents: predicateAbiMainArgsStruct } = getForcProject<JsonAbi>(
    join(__dirname, '../../fixtures/forc-projects/predicate-main-args-struct')
  );
  describe('With script', () => {
    let wallet: WalletUnlocked;
    let receiver: WalletUnlocked;
    let provider: Provider;
    let gasPrice: BN;

    beforeEach(async () => {
      provider = await Provider.create(FUEL_NETWORK_URL);
      wallet = await generateTestWallet(provider, [[5_000_000, BaseAssetId]]);
      receiver = await generateTestWallet(provider);
      gasPrice = provider.getGasConfig().minGasPrice;
    });

    it.skip('calls a predicate and uses proceeds for a script call', async () => {
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
      const amountToReceiver = 500_000;
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

      await tx.waitForResult();

      const finalReceiverBalance = toNumber(await receiver.getBalance());

      // calling the script with the receiver account (with resources)
      await expect(
        scriptInstance.functions.main(scriptInput).txParams({ gasPrice }).call()
      ).resolves.toBeTruthy();

      const remainingPredicateBalance = toNumber(await predicate.getBalance());

      expect(toNumber(initialReceiverBalance)).toBe(0);
      expect(initialReceiverBalance + amountToReceiver).toEqual(finalReceiverBalance);

      expect(remainingPredicateBalance).toEqual(
        amountToPredicate + initialPredicateBalance - amountToReceiver
      );
    });
  });
});
