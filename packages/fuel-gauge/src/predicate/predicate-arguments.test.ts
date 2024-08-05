import { toHex, Wallet } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import {
  PredicateAddressAbi__factory,
  PredicateMainArgsStructAbi__factory,
  PredicateMainArgsVectorAbi__factory,
  PredicateMultiArgsAbi__factory,
  PredicateU32Abi__factory,
} from '../../test/typegen';

import { fundPredicate, assertBalances } from './utils/predicate';

/**
 * @group node
 * @group browser
 */
describe('Predicate', () => {
  describe('Arguments', () => {
    const amountToReceiver = 50;
    const amountToPredicate = 900_000;

    it('calls a predicate with valid address data and returns true', async () => {
      using launched = await launchTestNode();

      const {
        provider,
        wallets: [fundingWallet],
      } = launched;

      const predicate = PredicateAddressAbi__factory.createInstance(provider, [
        '0xef86afa9696cf0dc6385e2c407a6e159a1103cefb7e2ae0636fb33d3cb2a9e4a',
      ]);

      // transfer funds to predicate
      await fundPredicate(fundingWallet, predicate, amountToPredicate, 3);

      const receiver = Wallet.generate({ provider });
      const initialReceiverBalance = await receiver.getBalance();

      const tx = await predicate.transfer(
        receiver.address,
        amountToReceiver,
        provider.getBaseAssetId(),
        {
          gasLimit: 1000,
        }
      );
      const { isStatusSuccess } = await tx.waitForResult();

      await assertBalances(receiver, initialReceiverBalance, amountToReceiver);
      expect(isStatusSuccess).toBeTruthy();
    });

    it('calls a predicate with invalid address data and throws error', async () => {
      using launched = await launchTestNode();

      const {
        provider,
        wallets: [fundingWallet],
      } = launched;

      const predicate = PredicateAddressAbi__factory.createInstance(provider, [
        '0xbadbadbadbadbadbadbadbadbadbadbadbadbadbadbadbadbadbadbadbada',
      ]);

      // fund predicate
      await fundPredicate(fundingWallet, predicate, amountToPredicate);

      const receiver = Wallet.generate({ provider });

      await expect(
        predicate.transfer(receiver.address, 50, provider.getBaseAssetId(), { gasLimit: 1000 })
      ).rejects.toThrow(/Invalid b256/);
    });

    it('calls a predicate with valid u32 data and returns true', async () => {
      using launched = await launchTestNode();

      const {
        provider,
        wallets: [fundingWallet],
      } = launched;

      const predicate = PredicateU32Abi__factory.createInstance(provider, [1078]);

      const receiver = Wallet.generate({ provider });

      const initialReceiverBalance = await receiver.getBalance();

      // fund predicate
      await fundPredicate(fundingWallet, predicate, amountToPredicate);

      const tx = await predicate.transfer(
        receiver.address,
        amountToReceiver,
        provider.getBaseAssetId(),
        {
          gasLimit: 1000,
        }
      );
      const { isStatusSuccess } = await tx.waitForResult();

      await assertBalances(receiver, initialReceiverBalance, amountToReceiver);
      expect(isStatusSuccess).toBeTruthy();
    });

    it('calls a predicate with invalid u32 data and returns false', async () => {
      using launched = await launchTestNode();

      const {
        provider,
        wallets: [fundingWallet],
      } = launched;

      const predicate = PredicateU32Abi__factory.createInstance(provider, [100]);

      // fund predicate
      await fundPredicate(fundingWallet, predicate, 90_000_00, 3);

      const receiver = Wallet.generate({ provider });
      const initialReceiverBalance = await receiver.getBalance();

      expect(initialReceiverBalance.toHex()).toEqual(toHex(0));

      await expect(
        predicate.transfer(receiver.address, amountToPredicate, provider.getBaseAssetId(), {
          gasLimit: 1000,
        })
      ).rejects.toThrow(/PredicateVerificationFailed/);
    });

    it('calls a predicate with a valid struct argument and returns true', async () => {
      using launched = await launchTestNode();

      const {
        provider,
        wallets: [fundingWallet],
      } = launched;

      const predicateInstanceForBalance = PredicateMainArgsStructAbi__factory.createInstance(
        provider,
        [{ has_account: true, total_complete: 100 }]
      );

      const receiver = Wallet.generate({ provider });
      const initialReceiverBalance = await receiver.getBalance();

      // fund the predicate
      const fundTx = await fundingWallet.transfer(
        predicateInstanceForBalance.address,
        100_000_000,
        provider.getBaseAssetId()
      );
      await fundTx.waitForResult();

      // #region predicate-struct-arg
      const predicate = PredicateMainArgsStructAbi__factory.createInstance(provider, [
        { has_account: true, total_complete: 100 },
      ]);

      const tx = await predicate.transfer(
        receiver.address,
        amountToReceiver,
        provider.getBaseAssetId(),
        {
          gasLimit: 1000,
        }
      );
      const { isStatusSuccess } = await tx.waitForResult();
      // #endregion predicate-struct-arg

      await assertBalances(receiver, initialReceiverBalance, amountToReceiver);
      expect(isStatusSuccess).toBeTruthy();
    });

    it('calls a predicate with an invalid main struct argument and returns false', async () => {
      using launched = await launchTestNode();

      const {
        provider,
        wallets: [fundingWallet],
      } = launched;

      const predicate = PredicateMainArgsStructAbi__factory.createInstance(provider, [
        { has_account: false, total_complete: 0 },
      ]);

      const receiver = Wallet.generate({ provider });

      // fund predicate
      await fundPredicate(fundingWallet, predicate, amountToPredicate);

      await expect(
        predicate.transfer(receiver.address, 50, provider.getBaseAssetId(), { gasLimit: 1000 })
      ).rejects.toThrow(/PredicateVerificationFailed/);
    });

    it('can call a Coin predicate which returns true with valid predicate data [main args vector]', async () => {
      using launched = await launchTestNode();

      const {
        provider,
        wallets: [fundingWallet],
      } = launched;

      const predicate = PredicateMainArgsVectorAbi__factory.createInstance(provider, [[42]]);

      const receiver = Wallet.generate({ provider });
      const initialReceiverBalance = await receiver.getBalance();

      // fund predicate
      await fundPredicate(fundingWallet, predicate, amountToPredicate);

      const tx = await predicate.transfer(
        receiver.address,
        amountToReceiver,
        provider.getBaseAssetId(),
        {
          gasLimit: 1000,
        }
      );
      const { isStatusSuccess } = await tx.waitForResult();

      await assertBalances(receiver, initialReceiverBalance, amountToReceiver);
      expect(isStatusSuccess).toBeTruthy();
    });

    it('calls a predicate with valid multiple arguments and returns true', async () => {
      using launched = await launchTestNode();

      const {
        provider,
        wallets: [fundingWallet],
      } = launched;

      const receiver = Wallet.generate({ provider });
      const initialReceiverBalance = await receiver.getBalance();

      // #region predicate-multi-args
      const predicate = PredicateMultiArgsAbi__factory.createInstance(provider, [20, 30]);

      // fund the predicate
      await fundPredicate(fundingWallet, predicate, amountToPredicate);

      const tx = await predicate.transfer(
        receiver.address,
        amountToReceiver,
        provider.getBaseAssetId(),
        {
          gasLimit: 1000,
        }
      );
      const { isStatusSuccess } = await tx.waitForResult();
      // #endregion predicate-multi-args

      await assertBalances(receiver, initialReceiverBalance, amountToReceiver);
      expect(isStatusSuccess).toBeTruthy();
    });

    it('calls a predicate with valid multiple arguments and returns true - using setData', async () => {
      using launched = await launchTestNode();

      const {
        provider,
        wallets: [fundingWallet],
      } = launched;

      const receiver = Wallet.generate({ provider });
      const initialReceiverBalance = await receiver.getBalance();

      const predicate = PredicateMultiArgsAbi__factory.createInstance(provider, [20, 30]);

      // fund predicate
      await fundPredicate(fundingWallet, predicate, amountToPredicate);

      const tx = await predicate.transfer(
        receiver.address,
        amountToReceiver,
        provider.getBaseAssetId(),
        {
          gasLimit: 1000,
        }
      );
      const { isStatusSuccess } = await tx.waitForResult();

      await assertBalances(receiver, initialReceiverBalance, amountToReceiver);
      expect(isStatusSuccess).toBeTruthy();
    });

    it('calls a predicate with invalid multiple arguments and throws error', async () => {
      using launched = await launchTestNode();

      const {
        provider,
        wallets: [fundingWallet],
      } = launched;

      const predicate = PredicateMultiArgsAbi__factory.createInstance(provider, [20, 20]);

      // fund predicate
      await fundPredicate(fundingWallet, predicate, amountToPredicate);

      const receiver = Wallet.generate({ provider });

      await expect(
        predicate.transfer(receiver.address, 50, provider.getBaseAssetId(), { gasLimit: 1000 })
      ).rejects.toThrow(/PredicateVerificationFailed/);
    });
  });
});
