import { getRandomB256, WalletUnlocked, FuelError } from 'fuels';
import { expectToThrowFuelError, launchTestNode } from 'fuels/test-utils';

import { PredicateTrue, PredicateWithConfigurable } from '../../test/typegen';

import { fundPredicate, assertBalance } from './utils/predicate';

/**
 * @group node
 * @group browser
 */
describe('Predicate', () => {
  describe('Configurables', () => {
    const amountToPredicate = 300_000;

    const defaultValues = {
      FEE: 10,
      ADDRESS: '0x38966262edb5997574be45f94c665aedb41a1663f5b0528e765f355086eebf96',
    };

    it('calls a predicate with configurables using default values', async () => {
      using launched = await launchTestNode();

      const {
        provider,
        wallets: [wallet],
      } = launched;

      const predicate = new PredicateWithConfigurable({
        provider: wallet.provider,
        data: [defaultValues.FEE, defaultValues.ADDRESS], // set predicate input data to be the same as default configurable value
      });

      const amountToTransfer = 200;

      await fundPredicate(wallet, predicate, amountToPredicate);

      // create destination wallet
      const destination = WalletUnlocked.generate({
        provider: wallet.provider,
      });

      await assertBalance(destination, 0, await provider.getBaseAssetId());

      const tx = await predicate.transfer(
        destination.address,
        amountToTransfer,
        await provider.getBaseAssetId(),
        {
          gasLimit: 1000,
        }
      );

      await tx.waitForResult();

      await assertBalance(destination, amountToTransfer, await provider.getBaseAssetId());
    });

    it('calls a predicate with configurables where first param is equal', async () => {
      using launched = await launchTestNode();

      const {
        provider,
        wallets: [wallet],
      } = launched;

      const configurableConstants = { FEE: 35 };

      expect(configurableConstants.FEE).not.toEqual(defaultValues.FEE);
      const predicate = new PredicateWithConfigurable({
        provider,
        data: [configurableConstants.FEE, defaultValues.ADDRESS],
        configurableConstants,
      });

      const amountToTransfer = 300;

      const destination = WalletUnlocked.generate({
        provider: wallet.provider,
      });

      await assertBalance(destination, 0, await provider.getBaseAssetId());

      // transfer funds to predicate
      await fundPredicate(wallet, predicate, amountToPredicate);

      // executing predicate transfer
      const tx = await predicate.transfer(
        destination.address,
        amountToTransfer,
        await provider.getBaseAssetId(),
        {
          gasLimit: 1000,
        }
      );

      await tx.waitForResult();

      await assertBalance(destination, amountToTransfer, await provider.getBaseAssetId());
    });

    it('calls a predicate with configurables where second param is equal', async () => {
      using launched = await launchTestNode();

      const {
        provider,
        wallets: [wallet],
      } = launched;

      const configurableConstants = { ADDRESS: getRandomB256() };

      expect(configurableConstants.ADDRESS).not.toEqual(defaultValues.ADDRESS);
      const predicate = new PredicateWithConfigurable({
        provider,
        data: [defaultValues.FEE, configurableConstants.ADDRESS],
        configurableConstants,
      });

      const amountToTransfer = 300;

      const destination = WalletUnlocked.generate({
        provider: wallet.provider,
      });

      await assertBalance(destination, 0, await provider.getBaseAssetId());

      // transfer funds to predicate
      await fundPredicate(wallet, predicate, amountToPredicate);

      // executing predicate transfer
      const tx = await predicate.transfer(
        destination.address,
        amountToTransfer,
        await provider.getBaseAssetId(),
        {
          gasLimit: 1000,
        }
      );

      await tx.waitForResult();

      await assertBalance(destination, amountToTransfer, await provider.getBaseAssetId());
    });

    it('calls a predicate with configurables where both params are equal', async () => {
      using launched = await launchTestNode();

      const {
        provider,
        wallets: [wallet],
      } = launched;

      const configurableConstants = {
        FEE: 90,
        ADDRESS: getRandomB256(),
      };

      expect(configurableConstants.FEE).not.toEqual(defaultValues.FEE);
      expect(configurableConstants.ADDRESS).not.toEqual(defaultValues.ADDRESS);
      const predicate = new PredicateWithConfigurable({
        provider,
        data: [configurableConstants.FEE, configurableConstants.ADDRESS],
        configurableConstants,
      });

      const amountToTransfer = 300;

      const destination = WalletUnlocked.generate({
        provider: wallet.provider,
      });

      await assertBalance(destination, 0, await provider.getBaseAssetId());

      await fundPredicate(wallet, predicate, amountToPredicate);

      const tx = await predicate.transfer(
        destination.address,
        amountToTransfer,
        await provider.getBaseAssetId(),
        {
          gasLimit: 1000,
        }
      );

      await tx.waitForResult();

      await assertBalance(destination, amountToTransfer, await provider.getBaseAssetId());
    });

    it('calls a predicate with partial configurables being set', async () => {
      using launched = await launchTestNode();

      const {
        provider,
        wallets: [wallet],
      } = launched;

      const configurableConstants = {
        ADDRESS: getRandomB256(),
      };

      const amountToTransfer = 300;

      const predicate = new PredicateWithConfigurable({
        provider,
        data: [defaultValues.FEE, configurableConstants.ADDRESS],
        configurableConstants,
      });

      const destination = WalletUnlocked.generate({
        provider: wallet.provider,
      });

      await assertBalance(destination, 0, await provider.getBaseAssetId());

      await fundPredicate(wallet, predicate, amountToPredicate);

      const tx = await predicate.transfer(
        destination.address,
        amountToTransfer,
        await provider.getBaseAssetId(),
        {
          gasLimit: 1000,
        }
      );

      await tx.waitForResult();

      await assertBalance(destination, amountToTransfer, await provider.getBaseAssetId());
    });

    it('throws when configurable data is not set', async () => {
      using launched = await launchTestNode();

      const {
        provider,
        wallets: [wallet],
      } = launched;

      const predicate = new PredicateWithConfigurable({
        provider,
      });

      const destination = WalletUnlocked.generate({
        provider: wallet.provider,
      });

      await fundPredicate(wallet, predicate, amountToPredicate);

      await expect(
        predicate.transfer(destination.address, 300, await provider.getBaseAssetId(), {
          gasLimit: 1000,
        })
      ).rejects.toThrow(/PredicateVerificationFailed/);
    });

    it('throws when setting configurable but predicate has none', async () => {
      using launched = await launchTestNode();

      const { provider } = launched;

      await expectToThrowFuelError(
        () =>
          new PredicateTrue({
            provider,
            // @ts-expect-error testing invalid configurable
            configurableConstants: {
              constant: 'NADA',
            },
          }),
        new FuelError(
          FuelError.CODES.INVALID_CONFIGURABLE_CONSTANTS,
          'Error setting configurable constants: Predicate has no configurable constants to be set.'
        )
      );
    });

    it('throws when setting invalid configurable', async () => {
      using launched = await launchTestNode();

      const { provider } = launched;

      await expectToThrowFuelError(
        () =>
          new PredicateWithConfigurable({
            provider,
            configurableConstants: {
              // @ts-expect-error testing invalid configurable
              NOPE: 'NADA',
            },
          }),
        new FuelError(
          FuelError.CODES.INVALID_CONFIGURABLE_CONSTANTS,
          `Error setting configurable constants: No configurable constant named 'NOPE' found in the Predicate.`
        )
      );
    });
  });
});
