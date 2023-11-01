import { TestNodeLauncher } from '@fuel-ts/test-utils';
import { getRandomB256, BaseAssetId, WalletUnlocked, Predicate } from 'fuels';

import predicateBytesTrue from '../../fixtures/forc-projects/predicate-true';
import predicateAbiTrue from '../../fixtures/forc-projects/predicate-true/out/debug/predicate-true-abi.json';
import predicateBytesConfigurable from '../../fixtures/forc-projects/predicate-with-configurable';
import predicateAbiConfigurable from '../../fixtures/forc-projects/predicate-with-configurable/out/debug/predicate-with-configurable-abi.json';

import { fundPredicate, assertBalance } from './utils/predicate';

/**
 * @group node
 */
describe('Predicate', () => {
  describe('Configurables', () => {
    const amountToPredicate = 500_000;

    const defaultValues = {
      FEE: 10,
      ADDRESS: '0x38966262edb5997574be45f94c665aedb41a1663f5b0528e765f355086eebf96',
    };

    beforeAll(async (ctx) => {
      await TestNodeLauncher.prepareCache(ctx.tasks.length);
      return () => TestNodeLauncher.killCachedNodes();
    });

    it('calls a predicate with configurables using default values', async () => {
      await using launched = await TestNodeLauncher.launch();
      const {
        wallets: [wallet],
        provider,
      } = launched;
      const { minGasPrice: gasPrice } = provider.getGasConfig();

      const predicate = new Predicate(
        predicateBytesConfigurable,
        wallet.provider,
        predicateAbiConfigurable
      );

      const amountToTransfer = 200;

      await fundPredicate(wallet, predicate, amountToPredicate);

      // create destination wallet
      const destination = WalletUnlocked.generate({
        provider: wallet.provider,
      });

      await assertBalance(destination, 0, BaseAssetId);

      // set predicate input data to be the same as default configurable value
      predicate.setData(defaultValues.FEE, defaultValues.ADDRESS);

      const tx = await predicate.transfer(destination.address, amountToTransfer, BaseAssetId, {
        gasPrice,
      });

      await tx.waitForResult();

      await assertBalance(destination, amountToTransfer, BaseAssetId);
    });

    it('calls a predicate with configurables where first param is equal', async () => {
      await using launched = await TestNodeLauncher.launch();
      const {
        wallets: [wallet],
        provider,
      } = launched;
      const { minGasPrice: gasPrice } = provider.getGasConfig();

      const configurableConstants = { FEE: 35 };

      expect(configurableConstants.FEE).not.toEqual(defaultValues.FEE);
      const predicate = new Predicate(
        predicateBytesConfigurable,
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
      await fundPredicate(wallet, predicate, amountToPredicate);

      predicate.setData(configurableConstants.FEE, defaultValues.ADDRESS);

      // executing predicate transfer
      const tx = await predicate.transfer(destination.address, amountToTransfer, BaseAssetId, {
        gasPrice,
      });

      await tx.waitForResult();

      await assertBalance(destination, amountToTransfer, BaseAssetId);
    });

    it('calls a predicate with configurables where second param is equal', async () => {
      await using launched = await TestNodeLauncher.launch();
      const {
        wallets: [wallet],
        provider,
      } = launched;
      const { minGasPrice: gasPrice } = provider.getGasConfig();

      const configurableConstants = { ADDRESS: getRandomB256() };

      expect(configurableConstants.ADDRESS).not.toEqual(defaultValues.ADDRESS);
      const predicate = new Predicate(
        predicateBytesConfigurable,
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
      await fundPredicate(wallet, predicate, amountToPredicate);

      predicate.setData(defaultValues.FEE, configurableConstants.ADDRESS);

      // executing predicate transfer
      const tx = await predicate.transfer(destination.address, amountToTransfer, BaseAssetId, {
        gasPrice,
      });

      await tx.waitForResult();

      await assertBalance(destination, amountToTransfer, BaseAssetId);
    });

    it('calls a predicate with configurables where both params are equal', async () => {
      await using launched = await TestNodeLauncher.launch();
      const {
        wallets: [wallet],
        provider,
      } = launched;
      const { minGasPrice: gasPrice } = provider.getGasConfig();

      const configurableConstants = {
        FEE: 90,
        ADDRESS: getRandomB256(),
      };

      expect(configurableConstants.FEE).not.toEqual(defaultValues.FEE);
      expect(configurableConstants.ADDRESS).not.toEqual(defaultValues.ADDRESS);
      const predicate = new Predicate(
        predicateBytesConfigurable,
        provider,
        predicateAbiConfigurable,
        configurableConstants
      );

      const amountToTransfer = 300;

      const destination = WalletUnlocked.generate({
        provider,
      });

      await assertBalance(destination, 0, BaseAssetId);

      await fundPredicate(wallet, predicate, amountToPredicate);

      predicate.setData(configurableConstants.FEE, configurableConstants.ADDRESS);

      const tx = await predicate.transfer(destination.address, amountToTransfer, BaseAssetId, {
        gasPrice,
      });

      await tx.waitForResult();

      await assertBalance(destination, amountToTransfer, BaseAssetId);
    });

    it('throws when configurable data is not set', async () => {
      await using launched = await TestNodeLauncher.launch();
      const {
        provider,
        wallets: [wallet],
      } = launched;
      const predicate = new Predicate(
        predicateBytesConfigurable,
        provider,
        predicateAbiConfigurable
      );

      const destination = WalletUnlocked.generate({
        provider,
      });

      await fundPredicate(wallet, predicate, amountToPredicate);

      await expect(predicate.transfer(destination.address, 300)).rejects.toThrow(
        'Invalid transaction'
      );
    });

    it('throws when setting configurable but predicate has none', async () => {
      await using launched = await TestNodeLauncher.launch();
      const { provider } = launched;

      expect(() => {
        const predicate = new Predicate(predicateBytesTrue, provider, predicateAbiTrue, {
          constant: 'NADA',
        });

        predicate.setData('NADA');
      }).toThrow('Predicate has no configurable constants to be set');
    });

    it('throws when setting invalid configurable', async () => {
      await using launched = await TestNodeLauncher.launch();
      const { provider } = launched;

      const errMsg = `Error setting configurable constants: No configurable constant named 'NOPE' found in the Predicate.`;

      expect(() => {
        const predicate = new Predicate(
          predicateBytesConfigurable,
          provider,
          predicateAbiConfigurable,
          {
            NOPE: 'NADA',
          }
        );

        predicate.setData('NADA');
      }).toThrow(errMsg);
    });

    it('throws when setting a configurable with no ABI', async () => {
      await using launched = await TestNodeLauncher.launch();
      const {
        wallets: [wallet],
      } = launched;

      const errMsg = `Error setting configurable constants: Cannot validate configurable constants because the Predicate was instantiated without a JSON ABI.`;

      expect(() => {
        const predicate = new Predicate(predicateBytesConfigurable, wallet.provider, undefined, {
          NOPE: 'NADA',
        });

        predicate.setData('NADA');
      }).toThrow(errMsg);
    });
  });
});
