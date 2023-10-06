import { setupTestProvider } from '@fuel-ts/wallet/test-utils';
import type { WalletUnlocked } from 'fuels';
import { BaseAssetId, Predicate } from 'fuels';

import predicateBytesMainArgsStruct from '../../fixtures/forc-projects/predicate-main-args-struct';
import predicateAbiMainArgsStruct from '../../fixtures/forc-projects/predicate-main-args-struct/out/debug/predicate-main-args-struct-abi.json';
import type { Validation } from '../types/predicate';

import { fundPredicate, setupWallets } from './utils/predicate';

describe('Predicate', () => {
  describe('Invalidations', () => {
    const amountToPredicate = 100;

    const validation: Validation = {
      has_account: true,
      total_complete: 100,
    };

    const setup = async (wallet: WalletUnlocked) => {
      const provider = wallet.provider;
      const predicate = new Predicate<[Validation]>(
        predicateBytesMainArgsStruct,
        provider,
        predicateAbiMainArgsStruct
      );

      const predicateBalance = await fundPredicate(wallet, predicate, amountToPredicate);

      return { predicate, predicateBalance };
    };

    it('throws if sender does not have enough resources for tx and gas', async () => {
      using provider = await setupTestProvider();
      const [wallet, receiver] = await setupWallets(provider);

      const { predicate, predicateBalance } = await setup(wallet);
      await expect(
        predicate.setData(validation).transfer(receiver.address, predicateBalance)
      ).rejects.toThrow(/not enough coins to fit the target/i);
    });

    it('throws if the passed gas limit is too low', async () => {
      using provider = await setupTestProvider();
      const [wallet, receiver] = await setupWallets(provider);

      const { predicate } = await setup(wallet);

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
