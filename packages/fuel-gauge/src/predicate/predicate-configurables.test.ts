import { generateTestWallet } from '@fuel-ts/account/test-utils';
import type { CoinQuantityLike } from 'fuels';
import {
  getRandomB256,
  BaseAssetId,
  Provider,
  WalletUnlocked,
  Predicate,
  FUEL_NETWORK_URL,
} from 'fuels';

import { FuelGaugeProjectsEnum, getFuelGaugeForcProject } from '../../test/fixtures';

import { fundPredicate, assertBalance } from './utils/predicate';

/**
 * @group node
 */
describe('Predicate', () => {
  const { binHexlified: predicateBytesTrue, abiContents: predicateAbiTrue } =
    getFuelGaugeForcProject(FuelGaugeProjectsEnum.PREDICATE_TRUE);

  const { binHexlified: predicateBytesConfigurable, abiContents: predicateAbiConfigurable } =
    getFuelGaugeForcProject(FuelGaugeProjectsEnum.PREDICATE_WITH_CONFIGURABLE);

  describe('Configurables', () => {
    let wallet: WalletUnlocked;
    const amountToPredicate = 500_000;

    const defaultValues = {
      FEE: 10,
      ADDRESS: '0x38966262edb5997574be45f94c665aedb41a1663f5b0528e765f355086eebf96',
    };

    beforeEach(async () => {
      const provider = await Provider.create(FUEL_NETWORK_URL);

      const quantities: CoinQuantityLike[] = [
        {
          amount: 1_000_000,
          assetId: BaseAssetId,
        },
      ];

      wallet = await generateTestWallet(provider, quantities);
    });

    it('calls a predicate with configurables using default values', async () => {
      const predicate = new Predicate({
        bytecode: predicateBytesConfigurable,
        abi: predicateAbiConfigurable,
        provider: wallet.provider,
        inputData: [defaultValues.FEE, defaultValues.ADDRESS], // set predicate input data to be the same as default configurable value
      });

      const amountToTransfer = 200;

      await fundPredicate(wallet, predicate, amountToPredicate);

      // create destination wallet
      const destination = WalletUnlocked.generate({
        provider: wallet.provider,
      });

      await assertBalance(destination, 0, BaseAssetId);

      const tx = await predicate.transfer(destination.address, amountToTransfer, BaseAssetId, {
        gasLimit: 10_000,
      });

      await tx.waitForResult();

      await assertBalance(destination, amountToTransfer, BaseAssetId);
    });

    it('calls a predicate with configurables where first param is equal', async () => {
      const configurableConstants = { FEE: 35 };

      expect(configurableConstants.FEE).not.toEqual(defaultValues.FEE);
      const predicate = new Predicate({
        bytecode: predicateBytesConfigurable,
        abi: predicateAbiConfigurable,
        provider: wallet.provider,
        inputData: [configurableConstants.FEE, defaultValues.ADDRESS],
        configurableConstants,
      });

      const amountToTransfer = 300;

      const destination = WalletUnlocked.generate({
        provider: wallet.provider,
      });

      await assertBalance(destination, 0, BaseAssetId);

      // transfer funds to predicate
      await fundPredicate(wallet, predicate, amountToPredicate);

      // executing predicate transfer
      const tx = await predicate.transfer(destination.address, amountToTransfer, BaseAssetId, {
        gasLimit: 10_000,
      });

      await tx.waitForResult();

      await assertBalance(destination, amountToTransfer, BaseAssetId);
    });

    it('calls a predicate with configurables where second param is equal', async () => {
      const configurableConstants = { ADDRESS: getRandomB256() };

      expect(configurableConstants.ADDRESS).not.toEqual(defaultValues.ADDRESS);
      const predicate = new Predicate({
        bytecode: predicateBytesConfigurable,
        abi: predicateAbiConfigurable,
        provider: wallet.provider,
        inputData: [defaultValues.FEE, configurableConstants.ADDRESS],
        configurableConstants,
      });

      const amountToTransfer = 300;

      const destination = WalletUnlocked.generate({
        provider: wallet.provider,
      });

      await assertBalance(destination, 0, BaseAssetId);

      // transfer funds to predicate
      await fundPredicate(wallet, predicate, amountToPredicate);

      // executing predicate transfer
      const tx = await predicate.transfer(destination.address, amountToTransfer, BaseAssetId, {
        gasLimit: 10_000,
      });

      await tx.waitForResult();

      await assertBalance(destination, amountToTransfer, BaseAssetId);
    });

    it('calls a predicate with configurables where both params are equal', async () => {
      const configurableConstants = {
        FEE: 90,
        ADDRESS: getRandomB256(),
      };

      expect(configurableConstants.FEE).not.toEqual(defaultValues.FEE);
      expect(configurableConstants.ADDRESS).not.toEqual(defaultValues.ADDRESS);
      const predicate = new Predicate({
        bytecode: predicateBytesConfigurable,
        abi: predicateAbiConfigurable,
        provider: wallet.provider,
        inputData: [configurableConstants.FEE, configurableConstants.ADDRESS],
        configurableConstants,
      });

      const amountToTransfer = 300;

      const destination = WalletUnlocked.generate({
        provider: wallet.provider,
      });

      await assertBalance(destination, 0, BaseAssetId);

      await fundPredicate(wallet, predicate, amountToPredicate);

      const tx = await predicate.transfer(destination.address, amountToTransfer, BaseAssetId, {
        gasLimit: 10_000,
      });

      await tx.waitForResult();

      await assertBalance(destination, amountToTransfer, BaseAssetId);
    });

    it('throws when configurable data is not set', async () => {
      const predicate = new Predicate({
        bytecode: predicateBytesConfigurable,
        abi: predicateAbiConfigurable,
        provider: wallet.provider,
      });

      const destination = WalletUnlocked.generate({
        provider: wallet.provider,
      });

      await expect(
        predicate.transfer(destination.address, 300, BaseAssetId, { gasLimit: 10_000 })
      ).rejects.toThrow(/PredicateVerificationFailed/);
    });

    it('throws when setting configurable but predicate has none', () => {
      expect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const predicate = new Predicate({
          bytecode: predicateBytesTrue,
          abi: predicateAbiTrue,
          provider: wallet.provider,
          inputData: ['NADA'],
          configurableConstants: {
            constant: 'NADA',
          },
        });
      }).toThrow('Predicate has no configurable constants to be set');
    });

    it('throws when setting invalid configurable', () => {
      const errMsg = `Error setting configurable constants: No configurable constant named 'NOPE' found in the Predicate.`;

      expect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const predicate = new Predicate({
          bytecode: predicateBytesConfigurable,
          abi: predicateAbiConfigurable,
          provider: wallet.provider,
          inputData: ['NADA'],
          configurableConstants: {
            NOPE: 'NADA',
          },
        });
      }).toThrow(errMsg);
    });

    it('throws when setting a configurable with no ABI', () => {
      const errMsg = `Error setting configurable constants: Cannot validate configurable constants because the Predicate was instantiated without a JSON ABI.`;

      expect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const predicate = new Predicate({
          bytecode: predicateBytesConfigurable,
          provider: wallet.provider,
          inputData: ['NADA'],
          configurableConstants: {
            NOPE: 'NADA',
          },
        });
      }).toThrow(errMsg);
    });
  });
});
