import { setupTestProvider, generateTestWallet } from '@fuel-ts/wallet/test-utils';
import { bn, Predicate, Wallet, Address, BaseAssetId } from 'fuels';
import type { BN, Provider } from 'fuels';

import predicateRawSlice from '../fixtures/forc-projects/predicate-raw-slice';
import predicateRawSliceAbi from '../fixtures/forc-projects/predicate-raw-slice/out/debug/predicate-raw-slice-abi.json';

import { getScript, getSetupContract } from './utils';

type SomeEnum = {
  First?: boolean;
  Second?: number[];
};

type Wrapper = {
  inner: number[][];
  inner_enum: SomeEnum;
};

const setup = async (provider: Provider, balance = 5_000) => {
  // Create wallet
  const wallet = await generateTestWallet(provider, [[balance, BaseAssetId]]);

  return wallet;
};

const setupContract = getSetupContract('raw-slice');

describe('Raw Slice Tests', () => {
  it('should test raw slice output', async () => {
    using provider = await setupTestProvider();
    const contractInstance = await setupContract(provider);

    const INPUT = 10;

    const { value } = await contractInstance.functions.return_raw_slice(INPUT).call<BN[]>();

    expect(value.map((v: BN) => v.toNumber())).toStrictEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it('should test raw slice input', async () => {
    using provider = await setupTestProvider();
    const contractInstance = await setupContract(provider);
    const INPUT = [40, 41, 42];

    const { value } = await contractInstance.functions.accept_raw_slice(INPUT).call<number[]>();

    expect(value).toBeUndefined();
  });

  it('should test raw slice input [nested]', async () => {
    using provider = await setupTestProvider();
    const contractInstance = await setupContract(provider);
    const slice = [40, 41, 42];
    const INPUT = {
      inner: [slice, slice],
      inner_enum: { Second: slice },
    };

    const { value } = await contractInstance.functions
      .accept_nested_raw_slice(INPUT)
      .call<number[]>();

    expect(value).toBeUndefined();
  });

  it('should test raw slice input [predicate-raw slice]', async () => {
    using provider = await setupTestProvider();

    // Create wallet
    const wallet = await generateTestWallet(provider, [[5_000, BaseAssetId]]);
    const receiver = Wallet.fromAddress(Address.fromRandom(), wallet.provider);
    const amountToPredicate = 100;
    const amountToReceiver = 50;
    type MainArgs = [Wrapper];
    const predicate = new Predicate<MainArgs>(
      predicateRawSlice,
      wallet.provider,
      predicateRawSliceAbi
    );

    // setup predicate
    const setupTx = await wallet.transfer(predicate.address, amountToPredicate, BaseAssetId);
    await setupTx.waitForResult();

    const initialPredicateBalance = await predicate.getBalance();
    const initialReceiverBalance = await receiver.getBalance();
    const bytes = [40, 41, 42];
    const INPUT: Wrapper = {
      inner: [bytes, bytes],
      inner_enum: { Second: bytes },
    };
    const tx = await predicate.setData(INPUT).transfer(receiver.address, amountToReceiver);
    await tx.waitForResult();

    // Check the balance of the receiver
    const finalReceiverBalance = await receiver.getBalance();
    expect(bn(initialReceiverBalance).add(amountToReceiver).toHex()).toEqual(
      finalReceiverBalance.toHex()
    );

    // Check we spent the entire predicate hash input
    const finalPredicateBalance = await predicate.getBalance();
    expect(finalPredicateBalance.lte(initialPredicateBalance)).toBeTruthy();
  });

  it('should test bytes input [script-raw-slice]', async () => {
    using provider = await setupTestProvider();
    const wallet = await setup(provider);
    type MainArgs = [number, Wrapper];
    const scriptInstance = getScript<MainArgs, void>('script-raw-slice', wallet);

    const bytes = [40, 41, 42];
    const INPUT: Wrapper = {
      inner: [bytes, bytes],
      inner_enum: { Second: bytes },
    };

    const { value } = await scriptInstance.functions.main(1, INPUT).call<BN[]>();
    expect(value.map((v: BN) => v.toNumber())).toStrictEqual([1, 2, 3]);
  });
});
