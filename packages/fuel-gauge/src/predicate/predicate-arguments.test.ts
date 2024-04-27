import type { WalletLocked, WalletUnlocked, BigNumberish } from 'fuels';
import { Provider, FUEL_NETWORK_URL, toHex, Predicate } from 'fuels';

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
    let baseAssetId: string;
    const amountToReceiver = 50;
    const amountToPredicate = 4000;

    beforeAll(async () => {
      provider = await Provider.create(FUEL_NETWORK_URL);
      baseAssetId = provider.getBaseAssetId();
    });

    beforeEach(async () => {
      [wallet, receiver] = await setupWallets();
      provider = wallet.provider;
    });

    it('calls a predicate with valid address data and returns true', async () => {
      const predicate = new Predicate<[string]>({
        bytecode: predicateBytesAddress,
        abi: predicateAbiMainArgsAddress,
        provider,
        inputData: ['0xef86afa9696cf0dc6385e2c407a6e159a1103cefb7e2ae0636fb33d3cb2a9e4a'],
      });

      await fundPredicate(wallet, predicate, amountToPredicate);
      const initialReceiverBalance = await receiver.getBalance();

      const tx = await predicate.transfer(receiver.address, amountToReceiver, baseAssetId, {
        gasLimit: 1000,
      });
      const { isStatusSuccess } = await tx.waitForResult();

      await assertBalances(receiver, initialReceiverBalance, amountToReceiver);
      expect(isStatusSuccess).toBeTruthy();
    });

    it('calls a predicate with invalid address data and returns false', async () => {
      const predicate = new Predicate<[string]>({
        bytecode: predicateBytesAddress,
        abi: predicateAbiMainArgsAddress,
        provider,
        inputData: ['0xbadbadbadbadbadbadbadbadbadbadbadbadbadbadbadbadbadbadbadbadbada'],
      });
      await fundPredicate(wallet, predicate, amountToPredicate);
      const initialReceiverBalance = await receiver.getBalance();

      expect(initialReceiverBalance.toHex()).toEqual(toHex(0));

      await expect(
        predicate.transfer(receiver.address, 50, baseAssetId, { gasLimit: 1000 })
      ).rejects.toThrow(/PredicateVerificationFailed/);
    });

    it('calls a predicate with valid u32 data and returns true', async () => {
      const predicate = new Predicate<[number]>({
        bytecode: predicateBytesMainArgsU32,
        abi: predicateAbiMainArgsU32,
        provider,
        inputData: [1078],
      });

      await fundPredicate(wallet, predicate, amountToPredicate);
      const initialReceiverBalance = await receiver.getBalance();

      const tx = await predicate.transfer(receiver.address, amountToReceiver, baseAssetId, {
        gasLimit: 1000,
      });
      const { isStatusSuccess } = await tx.waitForResult();

      await assertBalances(receiver, initialReceiverBalance, amountToReceiver);
      expect(isStatusSuccess).toBeTruthy();
    });

    it('calls a predicate with invalid u32 data and returns false', async () => {
      const predicate = new Predicate<[number]>({
        bytecode: predicateBytesMainArgsU32,
        abi: predicateAbiMainArgsU32,
        provider,
        inputData: [100],
      });

      await fundPredicate(wallet, predicate, amountToPredicate);
      const initialReceiverBalance = await receiver.getBalance();

      expect(initialReceiverBalance.toHex()).toEqual(toHex(0));

      await expect(
        predicate.transfer(receiver.address, amountToPredicate, baseAssetId, {
          gasLimit: 1000,
        })
      ).rejects.toThrow(/PredicateVerificationFailed/);
    });

    it('calls a predicate with a valid struct argument and returns true', async () => {
      const predicateInstanceForBalance = new Predicate<[Validation]>({
        bytecode: predicateBytesMainArgsStruct,
        abi: predicateAbiMainArgsStruct,
        provider,
        inputData: [{ has_account: true, total_complete: 100 }],
      });
      await fundPredicate(wallet, predicateInstanceForBalance, amountToPredicate);
      const initialReceiverBalance = await receiver.getBalance();

      // #region predicate-struct-arg
      const predicate = new Predicate<[Validation]>({
        bytecode: predicateBytesMainArgsStruct,
        abi: predicateAbiMainArgsStruct,
        provider,
        inputData: [{ has_account: true, total_complete: 100 }],
      });
      const tx = await predicate.transfer(receiver.address, amountToReceiver, baseAssetId, {
        gasLimit: 1000,
      });
      const { isStatusSuccess } = await tx.waitForResult();
      // #endregion predicate-struct-arg

      await assertBalances(receiver, initialReceiverBalance, amountToReceiver);
      expect(isStatusSuccess).toBeTruthy();
    });

    it('calls a predicate with an invalid main struct argument and returns false', async () => {
      const predicate = new Predicate<[Validation]>({
        bytecode: predicateBytesMainArgsStruct,
        abi: predicateAbiMainArgsStruct,
        provider,
        inputData: [
          {
            has_account: false,
            total_complete: 0,
          },
        ],
      });

      await fundPredicate(wallet, predicate, amountToPredicate);

      await expect(
        predicate.transfer(receiver.address, 50, baseAssetId, { gasLimit: 1000 })
      ).rejects.toThrow(/PredicateVerificationFailed/);
    });

    it('can call a Coin predicate which returns true with valid predicate data [main args vector]', async () => {
      const predicate = new Predicate<[BigNumberish[]]>({
        bytecode: predicateBytesMainArgsVector,
        abi: predicateAbiMainArgsVector,
        provider,
        inputData: [[42]],
      });

      await fundPredicate(wallet, predicate, amountToPredicate);
      const initialReceiverBalance = await receiver.getBalance();

      const tx = await predicate.transfer(receiver.address, amountToReceiver, baseAssetId, {
        gasLimit: 1000,
      });
      const { isStatusSuccess } = await tx.waitForResult();

      await assertBalances(receiver, initialReceiverBalance, amountToReceiver);
      expect(isStatusSuccess).toBeTruthy();
    });

    it('calls a predicate with valid multiple arguments and returns true', async () => {
      const predicateForBalance = new Predicate({
        bytecode: predicateBytesMulti,
        abi: predicateAbiMulti,
        provider,
        inputData: [20, 30],
      });

      await fundPredicate(wallet, predicateForBalance, amountToPredicate);
      const initialReceiverBalance = await receiver.getBalance();

      // #region predicate-multi-args
      const predicate = new Predicate({
        bytecode: predicateBytesMulti,
        abi: predicateAbiMulti,
        provider,
        inputData: [20, 30],
      });
      const tx = await predicate.transfer(receiver.address, amountToReceiver, baseAssetId, {
        gasLimit: 1000,
      });
      const { isStatusSuccess } = await tx.waitForResult();
      // #endregion predicate-multi-args

      await assertBalances(receiver, initialReceiverBalance, amountToReceiver);
      expect(isStatusSuccess).toBeTruthy();
    });

    it('calls a predicate with valid multiple arguments and returns true - using setData', async () => {
      const predicate = new Predicate({
        bytecode: predicateBytesMulti,
        abi: predicateAbiMulti,
        provider,
        inputData: [20, 30],
      });

      await fundPredicate(wallet, predicate, amountToPredicate);
      const initialReceiverBalance = await receiver.getBalance();

      const tx = await predicate.transfer(receiver.address, amountToReceiver, baseAssetId, {
        gasLimit: 1000,
      });
      const { isStatusSuccess } = await tx.waitForResult();

      await assertBalances(receiver, initialReceiverBalance, amountToReceiver);
      expect(isStatusSuccess).toBeTruthy();
    });

    it('calls a predicate with invalid multiple arguments and throws error', async () => {
      const predicate = new Predicate({
        bytecode: predicateBytesMulti,
        abi: predicateAbiMulti,
        provider,
        inputData: [20, 20],
      });

      await fundPredicate(wallet, predicate, amountToPredicate);

      await expect(
        predicate.transfer(receiver.address, 50, baseAssetId, { gasLimit: 1000 })
      ).rejects.toThrow(/PredicateVerificationFailed/);
    });
  });
});
