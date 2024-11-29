import { Predicate, Provider, TransactionResponse, WalletUnlocked } from '@fuel-ts/account';
import { launchTestNode } from 'fuels/test-utils';
import { PredicateWithConfigurable } from '../../test/typegen';
import { processPredicateData } from './utils/predicate/processPredicateData';
import {
  PredicateWithConfigurableConfigurables,
  PredicateWithConfigurableInputs,
} from '../../test/typegen/predicates/PredicateWithConfigurable';
import { fundPredicate, assertBalance } from './utils/predicate';
import { getRandomB256 } from 'fuels';

/**
 * @group node
 * @group browser
 * @group unit
 */
describe('Predicate.fromInstance', () => {
  const amountToPredicate = 300_000;

  const defaultValues = {
    FEE: 10,
    ADDRESS: '0x38966262edb5997574be45f94c665aedb41a1663f5b0528e765f355086eebf96',
  };

  describe('Basic Instance Operations', () => {
    it('creates new predicate instance from existing one with default values', async () => {
      using launched = await launchTestNode();

      const provider = launched.provider;
      const basePredicate = new PredicateWithConfigurable({
        provider,
        data: [defaultValues.FEE, defaultValues.ADDRESS],
        configurableConstants: defaultValues,
      });

      const newPredicate: PredicateWithConfigurable = Predicate.fromInstance(basePredicate).build();

      expect(newPredicate.predicateData).toEqual(basePredicate.predicateData);
      expect(newPredicate.interface).toEqual(basePredicate.interface);
      expect(newPredicate.provider).toEqual(basePredicate.provider);
      expect(newPredicate.bytes).toEqual(
        processPredicateData(basePredicate.initialBytecode, basePredicate.interface.jsonAbi, {})
          .predicateBytes
      );
    });

    it('creates new predicate instance with custom data', async () => {
      using launched = await launchTestNode();

      const provider = launched.provider;
      const basePredicate = new PredicateWithConfigurable({
        provider,
        data: [defaultValues.FEE, defaultValues.ADDRESS],
        configurableConstants: defaultValues,
      });

      const data: PredicateWithConfigurableInputs = [
        13,
        '0x48966232edb5997574be45f94c665aedb41a1663f5b0528e765f355086eebf96',
      ];
      const newPredicate: PredicateWithConfigurable = Predicate.fromInstance(basePredicate)
        .withData(data)
        .build();

      expect(newPredicate.predicateData).toEqual(data);
      expect(newPredicate.interface).toEqual(basePredicate.interface);
      expect(newPredicate.provider).toEqual(basePredicate.provider);
      expect(newPredicate.bytes).toEqual(
        processPredicateData(basePredicate.initialBytecode, basePredicate.interface.jsonAbi, {})
          .predicateBytes
      );
    });

    it('creates new predicate instance with configurable constants', async () => {
      using launched = await launchTestNode();

      const provider = launched.provider;
      const basePredicate = new PredicateWithConfigurable({
        provider,
        data: [defaultValues.FEE, defaultValues.ADDRESS],
        configurableConstants: defaultValues,
      });

      const configurableConstants: PredicateWithConfigurableConfigurables = {
        FEE: 13,
        ADDRESS: '0x48966232edb5997574be45f94c665aedb41a1663f5b0528e765f355086eebf96',
      };
      const newPredicate: PredicateWithConfigurable = Predicate.fromInstance(basePredicate)
        .withConfigurableConstants(configurableConstants)
        .build();

      expect(newPredicate.predicateData).toEqual(basePredicate.predicateData);
      expect(newPredicate.interface).toEqual(basePredicate.interface);
      expect(newPredicate.provider).toEqual(basePredicate.provider);
      expect(newPredicate.bytes).toEqual(
        processPredicateData(
          basePredicate.initialBytecode,
          basePredicate.interface.jsonAbi,
          configurableConstants
        ).predicateBytes
      );
    });

    it('supports chaining withData and withConfigurableConstants', async () => {
      using launched = await launchTestNode();

      const provider = launched.provider;
      const basePredicate = new PredicateWithConfigurable({
        provider,
        data: [defaultValues.FEE, defaultValues.ADDRESS],
        configurableConstants: defaultValues,
      });

      const data: PredicateWithConfigurableInputs = [
        13,
        '0x48966232edb5997574be45f94c665aedb41a1663f5b0528e765f355086eebf96',
      ];
      const configurableConstants: PredicateWithConfigurableConfigurables = {
        FEE: 13,
        ADDRESS: '0x48966232edb5997574be45f94c665aedb41a1663f5b0528e765f355086eebf96',
      };
      const newPredicate: PredicateWithConfigurable = Predicate.fromInstance(basePredicate)
        .withData(data)
        .withConfigurableConstants(configurableConstants)
        .build();

      expect(newPredicate.predicateData).toEqual(data);
      expect(newPredicate.interface).toEqual(basePredicate.interface);
      expect(newPredicate.provider).toEqual(basePredicate.provider);
      expect(newPredicate.bytes).toEqual(
        processPredicateData(
          basePredicate.initialBytecode,
          basePredicate.interface.jsonAbi,
          configurableConstants
        ).predicateBytes
      );
    });

    it('can create multiple different instances from same source, same bytecode', async () => {
      using launched = await launchTestNode();

      const provider = launched.provider;
      const basePredicate = new PredicateWithConfigurable({
        provider,
        data: [defaultValues.FEE, defaultValues.ADDRESS],
        configurableConstants: defaultValues,
      });

      const newPredicate1 = Predicate.fromInstance(basePredicate).build();
      const newPredicate2 = Predicate.fromInstance(basePredicate).build();

      expect(newPredicate1.bytes).toEqual(newPredicate2.bytes);
    });

    it('can create multiple different instances from same source, different bytecode', async () => {
      using launched = await launchTestNode();

      const provider = launched.provider;
      const basePredicate = new PredicateWithConfigurable({
        provider,
        data: [defaultValues.FEE, defaultValues.ADDRESS],
        configurableConstants: defaultValues,
      });

      const configurableConstants: PredicateWithConfigurableConfigurables = {
        FEE: 13,
        ADDRESS: '0x38966262edb5997574be45f94c665aedb41a1663f5b0528e765f355086eebf96',
      };
      const newPredicate1 = Predicate.fromInstance(basePredicate).build();
      const newPredicate2 = Predicate.fromInstance(basePredicate)
        .withConfigurableConstants(configurableConstants)
        .build();

      expect(newPredicate1.bytes).not.toEqual(newPredicate2.bytes);
    });

    it('does not modify original instance', async () => {
      using launched = await launchTestNode();

      const provider = launched.provider;
      const basePredicate = new PredicateWithConfigurable({
        provider,
        data: [defaultValues.FEE, defaultValues.ADDRESS],
        configurableConstants: defaultValues,
      });

      const bytes = basePredicate.bytes;
      Predicate.fromInstance(basePredicate).build();

      expect(basePredicate.bytes).toEqual(bytes);
    });
  });

  describe('End-to-End Scenarios', () => {
    it('can transfer funds using duplicated predicate with same data and configurable constants', async () => {
      using launched = await launchTestNode();

      const {
        provider,
        wallets: [wallet],
      } = launched;

      const basePredicate = new PredicateWithConfigurable({
        provider: wallet.provider,
        data: [defaultValues.FEE, defaultValues.ADDRESS],
        configurableConstants: defaultValues,
      });

      const predicate = Predicate.fromInstance(basePredicate).build();

      const amountToTransfer = 200;

      await fundPredicate(wallet, predicate, amountToPredicate);

      const destination = WalletUnlocked.generate({
        provider: wallet.provider,
      });

      await assertBalance(destination, 0, provider.getBaseAssetId());

      const tx = await predicate.transfer(
        destination.address,
        amountToTransfer,
        provider.getBaseAssetId(),
        {
          gasLimit: 1000,
        }
      );

      await tx.waitForResult();

      await assertBalance(destination, amountToTransfer, provider.getBaseAssetId());
    });

    it('can transfer funds using duplicated predicate with different data and same configurable constants', async () => {
      using launched = await launchTestNode();

      const {
        provider,
        wallets: [wallet],
      } = launched;

      const basePredicate = new PredicateWithConfigurable({
        provider: wallet.provider,
        data: [13, '0x48966232edb5997574be45f94c665aedb41a1663f5b0528e765f355086eebf96'],
        configurableConstants: defaultValues,
      });

      const predicate = Predicate.fromInstance(basePredicate)
        .withData([defaultValues.FEE, defaultValues.ADDRESS])
        .build();

      const amountToTransfer = 200;

      await fundPredicate(wallet, predicate, amountToPredicate);

      const destination = WalletUnlocked.generate({
        provider: wallet.provider,
      });

      await assertBalance(destination, 0, provider.getBaseAssetId());

      const tx = await predicate.transfer(
        destination.address,
        amountToTransfer,
        provider.getBaseAssetId(),
        {
          gasLimit: 1000,
        }
      );

      await tx.waitForResult();

      await assertBalance(destination, amountToTransfer, provider.getBaseAssetId());
    });

    it('can transfer funds using duplicated predicate with same data and different configurable constants', async () => {
      using launched = await launchTestNode();

      const {
        provider,
        wallets: [wallet],
      } = launched;

      const basePredicate = new PredicateWithConfigurable({
        provider: wallet.provider,
        data: [defaultValues.FEE, defaultValues.ADDRESS],
        configurableConstants: {
          FEE: 13,
          ADDRESS: '0x48966232edb5997574be45f94c665aedb41a1663f5b0528e765f355086eebf96',
        },
      });

      const predicate = Predicate.fromInstance(basePredicate)
        .withConfigurableConstants(defaultValues)
        .build();

      const amountToTransfer = 200;

      await fundPredicate(wallet, predicate, amountToPredicate);

      const destination = WalletUnlocked.generate({
        provider: wallet.provider,
      });

      await assertBalance(destination, 0, provider.getBaseAssetId());

      const tx = await predicate.transfer(
        destination.address,
        amountToTransfer,
        provider.getBaseAssetId(),
        {
          gasLimit: 1000,
        }
      );

      await tx.waitForResult();

      await assertBalance(destination, amountToTransfer, provider.getBaseAssetId());
    });

    it('can transfer funds using duplicated predicate with different data and configurable constants', async () => {
      using launched = await launchTestNode();

      const {
        provider,
        wallets: [wallet],
      } = launched;

      const basePredicate = new PredicateWithConfigurable({
        provider: wallet.provider,
        data: [13, '0x48966232edb5997574be45f94c665aedb41a1663f5b0528e765f355086eebf96'],
        configurableConstants: {
          FEE: 15,
          ADDRESS: '0x38966262edb5997574be45f94c665aedb41a1663f5b0528e765f355086eebf96',
        },
      });

      const predicate = Predicate.fromInstance(basePredicate)
        .withData([defaultValues.FEE, defaultValues.ADDRESS])
        .withConfigurableConstants(defaultValues)
        .build();

      const amountToTransfer = 200;

      await fundPredicate(wallet, predicate, amountToPredicate);

      const destination = WalletUnlocked.generate({
        provider: wallet.provider,
      });

      await assertBalance(destination, 0, provider.getBaseAssetId());

      const tx = await predicate.transfer(
        destination.address,
        amountToTransfer,
        provider.getBaseAssetId(),
        {
          gasLimit: 1000,
        }
      );

      await tx.waitForResult();

      await assertBalance(destination, amountToTransfer, provider.getBaseAssetId());
    });

    it('can reuse same factory to create multiple working predicates', async () => {
      using launched = await launchTestNode();

      const {
        provider,
        wallets: [wallet],
      } = launched;

      const basePredicate = new PredicateWithConfigurable({
        provider: wallet.provider,
        data: [13, '0x48966232edb5997574be45f94c665aedb41a1663f5b0528e765f355086eebf96'],
        configurableConstants: {
          FEE: 15,
          ADDRESS: '0x38966262edb5997574be45f94c665aedb41a1663f5b0528e765f355086eebf96',
        },
      });

      const factory = Predicate.fromInstance(basePredicate);

      const predicate1 = factory
        .withConfigurableConstants(defaultValues)
        .withData([defaultValues.FEE, defaultValues.ADDRESS])
        .build();

      const configurableConstants2 = {
        FEE: 20,
        ADDRESS: getRandomB256(),
      };

      const predicate2 = factory
        .withConfigurableConstants(configurableConstants2)
        .withData([configurableConstants2.FEE, configurableConstants2.ADDRESS])
        .build();

      const configurableConstants3 = {
        FEE: 30,
        ADDRESS: getRandomB256(),
      };

      const predicate3 = factory
        .withConfigurableConstants(configurableConstants3)
        .withData([configurableConstants3.FEE, configurableConstants3.ADDRESS])
        .build();

      const amountToTransfer = 200;
      const destination = WalletUnlocked.generate({ provider: wallet.provider });

      for (const predicate of [predicate1, predicate2, predicate3]) {
        await fundPredicate(wallet, predicate, amountToPredicate);

        const tx = await predicate.transfer(
          destination.address,
          amountToTransfer,
          provider.getBaseAssetId(),
          { gasLimit: 1000 }
        );

        await tx.waitForResult();
      }

      await assertBalance(destination, amountToTransfer * 3, provider.getBaseAssetId());
    });
  });
});
