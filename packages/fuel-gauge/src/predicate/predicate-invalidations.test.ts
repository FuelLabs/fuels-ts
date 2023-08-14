import type { BN, Provider, WalletLocked, WalletUnlocked } from 'fuels';
import { BaseAssetId, Predicate } from 'fuels';

import predicateBytesMainArgsStruct from '../../fixtures/forc-projects/predicate-main-args-struct';
import predicateAbiMainArgsStruct from '../../fixtures/forc-projects/predicate-main-args-struct/out/debug/predicate-main-args-struct-abi.json';
import type { Validation } from '../types/predicate';

import { fundPredicate, setupWallets } from './utils/predicate';

describe('Predicate', () => {
  describe('Invalidations', () => {
    let predicate: Predicate<[Validation]>;
    let predicateBalance: BN;
    let wallet: WalletUnlocked;
    let receiver: WalletLocked;
    let provider: Provider;

    const validation: Validation = {
      has_account: true,
      total_complete: 100,
    };

    beforeAll(async () => {
      [wallet, receiver] = await setupWallets();
      const amountToPredicate = 100;
      const chainId = await wallet.provider.getChainId();
      provider = wallet.provider;
      predicate = new Predicate<[Validation]>(
        predicateBytesMainArgsStruct,
        chainId,
        provider,
        predicateAbiMainArgsStruct
      );

      predicateBalance = await fundPredicate(wallet, predicate, amountToPredicate);
    });

    it('throws if sender does not have enough resources for tx and gas', async () => {
      await expect(
        predicate.setData(validation).transfer(receiver.address, predicateBalance)
      ).rejects.toThrow(/not enough coins to fit the target/i);
    });

    it('throws if the passed gas limit is too low', async () => {
      // TODO: When gas is to low the return error is Invalid transaction, once is fixed on the
      // fuel-client we should change with the proper error message
      await expect(
        predicate.setData(validation).transfer(receiver.address, 50, BaseAssetId, {
          gasLimit: 1,
        })
      ).rejects.toThrow(/Invalid transaction/i);
    });
  });
});
