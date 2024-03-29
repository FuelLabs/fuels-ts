import type { BN, Provider, WalletLocked, WalletUnlocked } from 'fuels';
import { BaseAssetId, Predicate } from 'fuels';

import { FuelGaugeProjectsEnum, getFuelGaugeForcProject } from '../../test/fixtures';
import type { Validation } from '../types/predicate';

import { fundPredicate, setupWallets } from './utils/predicate';

/**
 * @group node
 */
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
      const amountToPredicate = 10_000;
      provider = wallet.provider;
      predicate = new Predicate<[Validation]>({
        bytecode: predicateBytesMainArgsStruct,
        abi: predicateAbiMainArgsStruct,
        provider,
        inputData: [validation],
      });

      predicateBalance = await fundPredicate(wallet, predicate, amountToPredicate);
    });

    it('throws if sender does not have enough resources for tx and gas', async () => {
      await expect(
        predicate.transfer(receiver.address, predicateBalance, BaseAssetId, {
          gasLimit: 100_000_000,
        })
      ).rejects.toThrow(/not enough coins to fit the target/i);
    });

    it('throws if the passed gas limit is too low', async () => {
      // fuel-client we should change with the proper error message
      await expect(
        predicate.transfer(receiver.address, 1000, BaseAssetId, {
          gasLimit: 0,
        })
      ).rejects.toThrow(/Gas limit '0' is lower than the required:./i);
    });
  });
});
