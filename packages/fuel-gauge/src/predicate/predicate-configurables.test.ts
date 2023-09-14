import { generateTestWallet } from '@fuel-ts/wallet/test-utils';
import type { CoinQuantityLike } from 'fuels';
import { getRandomB256, BaseAssetId, Provider, WalletUnlocked, Predicate } from 'fuels';

import predicateBytesTrue from '../../fixtures/forc-projects/predicate-true';
import predicateAbiTrue from '../../fixtures/forc-projects/predicate-true/out/debug/predicate-true-abi.json';
import predicateBytesConfigurable from '../../fixtures/forc-projects/predicate-with-configurable';
import predicateAbiConfigurable from '../../fixtures/forc-projects/predicate-with-configurable/out/debug/predicate-with-configurable-abi.json';

import { fundPredicate, assertBalance } from './utils/predicate';

describe('Predicate', () => {
  describe('Configurables', () => {
    let wallet: WalletUnlocked;
    let chainId: number;

    const defaultValues = {
      FEE: 10,
      ADDRESS: '0x38966262edb5997574be45f94c665aedb41a1663f5b0528e765f355086eebf96',
    };

    beforeEach(async () => {
      const provider = await Provider.connect('http://127.0.0.1:4000/graphql');

      const quantities: CoinQuantityLike[] = [
        {
          amount: 1_000_000,
          assetId: BaseAssetId,
        },
      ];

      wallet = await generateTestWallet(provider, quantities);

      chainId = await wallet.provider.getChainId();
    });

    it('calls a predicate with configurables using default values', async () => {
      const predicate = new Predicate(
        predicateBytesConfigurable,
        chainId,
        wallet.provider,
        predicateAbiConfigurable
      );

      const amountToTransfer = 200;

      await fundPredicate(wallet, predicate, 5000);

      // create destination wallet
      const destination = WalletUnlocked.generate({
        provider: wallet.provider,
      });

      await assertBalance(destination, 0, BaseAssetId);

      // set predicate input data to be the same as default configurable value
      predicate.setData(defaultValues.FEE, defaultValues.ADDRESS);

      const tx = await predicate.transfer(destination.address, amountToTransfer);

      await tx.waitForResult();

      await assertBalance(destination, amountToTransfer, BaseAssetId);
    });

    it('calls a predicate with configurables where first param is equal', async () => {
      const configurableConstants = { FEE: 35 };

      expect(configurableConstants.FEE).not.toEqual(defaultValues.FEE);
      const predicate = new Predicate(
        predicateBytesConfigurable,
        chainId,
        wallet.provider,
        predicateAbiConfigurable,
        configurableConstants
      );

      const amountToTransfer = 300;

      const destination = WalletUnlocked.generate({
        provider: wallet.provider,
      });

      await assertBalance(destination, 0, BaseAssetId);

      // transfer funds to predicate
      await fundPredicate(wallet, predicate, 5000);

      predicate.setData(configurableConstants.FEE, defaultValues.ADDRESS);

      // executing predicate transfer
      const tx = await predicate.transfer(destination.address, amountToTransfer);

      await tx.waitForResult();

      await assertBalance(destination, amountToTransfer, BaseAssetId);
    });

    it('calls a predicate with configurables where second param is equal', async () => {
      const configurableConstants = { ADDRESS: getRandomB256() };

      expect(configurableConstants.ADDRESS).not.toEqual(defaultValues.ADDRESS);
      const predicate = new Predicate(
        predicateBytesConfigurable,
        chainId,
        wallet.provider,
        predicateAbiConfigurable,
        configurableConstants
      );

      const amountToTransfer = 300;

      const destination = WalletUnlocked.generate({
        provider: wallet.provider,
      });

      await assertBalance(destination, 0, BaseAssetId);

      // transfer funds to predicate
      await fundPredicate(wallet, predicate, 5000);

      predicate.setData(defaultValues.FEE, configurableConstants.ADDRESS);

      // executing predicate transfer
      const tx = await predicate.transfer(destination.address, amountToTransfer);

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
      const predicate = new Predicate(
        predicateBytesConfigurable,
        chainId,
        wallet.provider,
        predicateAbiConfigurable,
        configurableConstants
      );

      const amountToTransfer = 300;

      const destination = WalletUnlocked.generate({
        provider: wallet.provider,
      });

      await assertBalance(destination, 0, BaseAssetId);

      await fundPredicate(wallet, predicate, 5000);

      predicate.setData(configurableConstants.FEE, configurableConstants.ADDRESS);

      const tx = await predicate.transfer(destination.address, amountToTransfer);

      await tx.waitForResult();

      await assertBalance(destination, amountToTransfer, BaseAssetId);
    });

    it('throws when configurable data is not set', async () => {
      const predicate = new Predicate(
        predicateBytesConfigurable,
        chainId,
        wallet.provider,
        predicateAbiConfigurable
      );

      const destination = WalletUnlocked.generate({
        provider: wallet.provider,
      });

      await expect(predicate.transfer(destination.address, 300)).rejects.toThrow(
        'Invalid transaction'
      );
    });

    it('throws when setting configurable but predicate has none', () => {
      expect(() => {
        const predicate = new Predicate(
          predicateBytesTrue,
          chainId,
          wallet.provider,
          predicateAbiTrue,
          {
            constant: 'NADA',
          }
        );

        predicate.setData('NADA');
      }).toThrow('Predicate has no configurable constants to be set');
    });

    it('throws when setting invalid configurable', () => {
      const errMsg = `Error setting configurable constants: No configurable constant named 'NOPE' found in the Predicate.`;

      expect(() => {
        const predicate = new Predicate(
          predicateBytesConfigurable,
          chainId,
          wallet.provider,
          predicateAbiConfigurable,
          {
            NOPE: 'NADA',
          }
        );

        predicate.setData('NADA');
      }).toThrow(errMsg);
    });

    it('throws when setting a configurable with no ABI', () => {
      const errMsg = `Error setting configurable constants: Cannot validate configurable constants because the Predicate was instantiated without a JSON ABI.`;

      expect(() => {
        const predicate = new Predicate(
          predicateBytesConfigurable,
          chainId,
          wallet.provider,
          undefined,
          {
            NOPE: 'NADA',
          }
        );

        predicate.setData('NADA');
      }).toThrow(errMsg);
    });
  });
});
