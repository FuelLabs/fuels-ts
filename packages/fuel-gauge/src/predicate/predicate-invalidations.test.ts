import type { BN, Provider, WalletLocked, WalletUnlocked } from 'fuels';
import { BaseAssetId, Predicate } from 'fuels';

import { FuelGaugeProjectsEnum, getFuelGaugeForcProject } from '../../test/fixtures';
import type { Validation } from '../types/predicate';

import { fundPredicate, setupWallets } from './utils/predicate';

describe('Predicate', () => {
  const { binHexlified: predicateBytesMainArgsStruct, abiContents: predicateAbiMainArgsStruct } =
    getFuelGaugeForcProject(FuelGaugeProjectsEnum.PREDICATE_MAIN_ARGS_STRUCT);

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
      provider = wallet.provider;
      predicate = new Predicate<[Validation]>(
        predicateBytesMainArgsStruct,
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
      ).rejects.toThrow(/Gas price '0' is lower than the required: '1'./i);
    });
  });
});
