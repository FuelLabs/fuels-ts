import type { BN, InputValue, Provider, WalletLocked, WalletUnlocked } from 'fuels';
import { BaseAssetId, Predicate } from 'fuels';

import { FuelGaugeProjectsEnum, getFuelGaugeForcProject } from '../../test/fixtures';

import { setupWallets, fundPredicate } from './utils/predicate';

/**
 * @group node
 */
describe('Predicate', () => {
  const { binHexlified, abiContents } = getFuelGaugeForcProject(
    FuelGaugeProjectsEnum.PREDICATE_INPUT_DATA
  );

  describe('Input Data', () => {
    let predicate: Predicate<InputValue[]>;
    let wallet: WalletUnlocked;
    let receiver: WalletLocked;
    let provider: Provider;
    let gasPrice: BN;

    beforeEach(async () => {
      [wallet, receiver] = await setupWallets();
      provider = wallet.provider;
      gasPrice = provider.getGasConfig().minGasPrice;
    });

    it('throws invalid transaction when input_predicate_data is required for predicate validation', async () => {
      const amountToPredicate = 200_000;
      const amountToReceiver = 50;
      predicate = new Predicate({
        bytecode: binHexlified,
        abi: abiContents,
        provider,
        inputData: [true],
      });

      await fundPredicate(wallet, predicate, amountToPredicate);

      await expect(
        predicate.transfer(receiver.address, amountToReceiver, BaseAssetId, {
          gasPrice,
          gasLimit: 10_000,
        })
      ).rejects.toThrow(/PredicateVerificationFailed/i);
    });
  });
});
