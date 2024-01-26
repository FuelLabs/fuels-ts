import type { WalletLocked, WalletUnlocked, BigNumberish, BN } from 'fuels';
import { Provider, FUEL_NETWORK_URL, toHex, toNumber, Predicate, BaseAssetId } from 'fuels';

import { FuelGaugeProjectsEnum, getFuelGaugeForcProject } from '../../test/fixtures';
import type { Validation } from '../types/predicate';

import { setupWallets, assertBalances, fundPredicate } from './utils/predicate';

/**
 * @group node
 */
describe('Predicate', () => {
  const { binHexlified: predicateBytesAddress, abiContents: predicateAbiMainArgsAddress } =
    getFuelGaugeForcProject(FuelGaugeProjectsEnum.PREDICATE_ADDRESS);

  const { binHexlified: predicateBytesMainArgsStruct, abiContents: predicateAbiMainArgsStruct } =
    getFuelGaugeForcProject(FuelGaugeProjectsEnum.PREDICATE_MAIN_ARGS_STRUCT);

  const { binHexlified: predicateBytesMainArgsVector, abiContents: predicateAbiMainArgsVector } =
    getFuelGaugeForcProject(FuelGaugeProjectsEnum.PREDICATE_MAIN_ARGS_VECTOR);

  const { binHexlified: predicateBytesMulti, abiContents: predicateAbiMulti } =
    getFuelGaugeForcProject(FuelGaugeProjectsEnum.PREDICATE_MULTI_ARGS);

  const { binHexlified: predicateBytesMainArgsU32, abiContents: predicateAbiMainArgsU32 } =
    getFuelGaugeForcProject(FuelGaugeProjectsEnum.PREDICATE_U32);

  describe('Arguments', () => {
    let wallet: WalletUnlocked;
    let receiver: WalletLocked;
    let provider: Provider;
    let gasPrice: BN;
    const amountToReceiver = 50;
    const amountToPredicate = 400_000;

    beforeAll(async () => {
      provider = await Provider.create(FUEL_NETWORK_URL);
      gasPrice = provider.getGasConfig().minGasPrice;
    });

    beforeEach(async () => {
      [wallet, receiver] = await setupWallets();
      provider = wallet.provider;
    });

    it('calls a predicate with valid address data and returns true', async () => {
      const predicate = new Predicate<[string]>(
        predicateBytesAddress,
        provider,
        predicateAbiMainArgsAddress
      );

      const initialPredicateBalance = await fundPredicate(wallet, predicate, amountToPredicate);
      const initialReceiverBalance = await receiver.getBalance();

      const tx = await predicate
        .setData('0xef86afa9696cf0dc6385e2c407a6e159a1103cefb7e2ae0636fb33d3cb2a9e4a')
        .transfer(receiver.address, amountToReceiver, BaseAssetId, { gasPrice, gasLimit: 10_000 });
      await tx.waitForResult();

      await assertBalances(
        predicate,
        receiver,
        initialPredicateBalance,
        initialReceiverBalance,
        amountToPredicate,
        amountToReceiver
      );
    });

    it('calls a predicate with invalid address data and returns false', async () => {
      const predicate = new Predicate<[string]>(
        predicateBytesAddress,
        provider,
        predicateAbiMainArgsAddress
      );

      const initialPredicateBalance = await fundPredicate(wallet, predicate, amountToPredicate);
      const initialReceiverBalance = await receiver.getBalance();

      // Check there are UTXO locked with the predicate hash
      expect(initialPredicateBalance.gte(amountToPredicate));
      expect(initialReceiverBalance.toHex()).toEqual(toHex(0));

      predicate.setData('0xbadbadbadbadbadbadbadbadbadbadbadbadbadbadbadbadbadbadbadbadbada');

      await expect(
        predicate.transfer(receiver.address, 50, BaseAssetId, { gasPrice: 1, gasLimit: 1000 })
      ).rejects.toThrow(/PredicateVerificationFailed/);
    });

    it('calls a predicate with valid u32 data and returns true', async () => {
      const predicate = new Predicate<[number]>(
        predicateBytesMainArgsU32,
        provider,
        predicateAbiMainArgsU32
      );

      const initialPredicateBalance = await fundPredicate(wallet, predicate, amountToPredicate);
      const initialReceiverBalance = await receiver.getBalance();

      const tx = await predicate
        .setData(1078)
        .transfer(receiver.address, amountToReceiver, BaseAssetId, { gasPrice, gasLimit: 10_000 });
      await tx.waitForResult();

      await assertBalances(
        predicate,
        receiver,
        initialPredicateBalance,
        initialReceiverBalance,
        amountToPredicate,
        amountToReceiver
      );
    });

    it('calls a predicate with invalid u32 data and returns false', async () => {
      const predicate = new Predicate<[number]>(
        predicateBytesMainArgsU32,
        provider,
        predicateAbiMainArgsU32
      );

      const initialPredicateBalance = await fundPredicate(wallet, predicate, amountToPredicate);
      const initialReceiverBalance = await receiver.getBalance();

      // Check there are UTXO locked with the predicate hash
      expect(toNumber(initialPredicateBalance)).toBeGreaterThanOrEqual(amountToPredicate);
      expect(initialReceiverBalance.toHex()).toEqual(toHex(0));

      await expect(
        predicate.setData(100).transfer(receiver.address, amountToPredicate, BaseAssetId, {
          gasPrice,
          gasLimit: 10_000,
        })
      ).rejects.toThrow(/PredicateVerificationFailed/);
    });

    it('calls a predicate with a valid struct argument and returns true', async () => {
      const predicate = new Predicate<[Validation]>(
        predicateBytesMainArgsStruct,
        provider,
        predicateAbiMainArgsStruct
      );

      const initialPredicateBalance = await fundPredicate(wallet, predicate, amountToPredicate);
      const initialReceiverBalance = await receiver.getBalance();

      // #region predicate-struct-arg
      // #context const predicate = new Predicate(bytecode, chainId, abi);
      const tx = await predicate
        .setData({
          has_account: true,
          total_complete: 100,
        })
        .transfer(receiver.address, amountToReceiver, BaseAssetId, { gasPrice, gasLimit: 10_000 });
      await tx.waitForResult();
      // #endregion predicate-struct-arg

      await assertBalances(
        predicate,
        receiver,
        initialPredicateBalance,
        initialReceiverBalance,
        amountToPredicate,
        amountToReceiver
      );
    });

    it('calls a predicate with an invalid main struct argument and returns false', async () => {
      const predicate = new Predicate<[Validation]>(
        predicateBytesMainArgsStruct,
        provider,
        predicateAbiMainArgsStruct
      );

      const initialPredicateBalance = await fundPredicate(wallet, predicate, amountToPredicate);

      // Check there are UTXO locked with the predicate hash
      expect(toNumber(initialPredicateBalance)).toBeGreaterThanOrEqual(amountToPredicate);

      await expect(
        predicate
          .setData({
            has_account: false,
            total_complete: 0,
          })
          .transfer(receiver.address, 50, BaseAssetId, { gasPrice, gasLimit: 10_000 })
      ).rejects.toThrow(/PredicateVerificationFailed/);
    });

    it('can call a Coin predicate which returns true with valid predicate data [main args vector]', async () => {
      const predicate = new Predicate<[BigNumberish[]]>(
        predicateBytesMainArgsVector,
        provider,
        predicateAbiMainArgsVector
      );

      const initialPredicateBalance = await fundPredicate(wallet, predicate, amountToPredicate);
      const initialReceiverBalance = await receiver.getBalance();

      const tx = await predicate
        .setData([42])
        .transfer(receiver.address, amountToReceiver, BaseAssetId, { gasPrice, gasLimit: 10_000 });
      await tx.waitForResult();

      await assertBalances(
        predicate,
        receiver,
        initialPredicateBalance,
        initialReceiverBalance,
        amountToPredicate,
        amountToReceiver
      );
    });

    it('calls a predicate with valid multiple arguments and returns true', async () => {
      const predicate = new Predicate(predicateBytesMulti, provider, predicateAbiMulti);

      const initialPredicateBalance = await fundPredicate(wallet, predicate, amountToPredicate);
      const initialReceiverBalance = await receiver.getBalance();

      // #region predicate-multi-args
      // #context const predicate = new Predicate(bytecode, chainId, abi);
      predicate.setData(20, 30);
      const tx = await predicate.transfer(receiver.address, amountToReceiver, BaseAssetId, {
        gasPrice,
        gasLimit: 10_000,
      });
      await tx.waitForResult();
      // #endregion predicate-multi-args

      await assertBalances(
        predicate,
        receiver,
        initialPredicateBalance,
        initialReceiverBalance,
        amountToPredicate,
        amountToReceiver
      );
    });

    it('calls a predicate with invalid multiple arguments and returns false', async () => {
      const predicate = new Predicate(predicateBytesMulti, provider, predicateAbiMulti);

      const initialPredicateBalance = await fundPredicate(wallet, predicate, amountToPredicate);

      // Check the UTXOs locked with the predicate hash
      expect(toNumber(initialPredicateBalance)).toBeGreaterThanOrEqual(amountToPredicate);

      await expect(
        predicate
          .setData(20, 20)
          .transfer(receiver.address, 50, BaseAssetId, { gasPrice, gasLimit: 10_000 })
      ).rejects.toThrow(/PredicateVerificationFailed/);
    });
  });
});
