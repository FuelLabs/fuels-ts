import { generateTestWallet } from '@fuel-ts/wallet/test-utils';
import type { BN } from 'fuels';
import {
  type Contract,
  bn,
  Predicate,
  Wallet,
  Address,
  BaseAssetId,
  Provider,
  FUEL_NETWORK_URL,
} from 'fuels';

import predicateRawSlice from '../fixtures/forc-projects/predicate-raw-slice';
import predicateRawSliceAbi from '../fixtures/forc-projects/predicate-raw-slice/out/debug/predicate-raw-slice-abi.json';

import { getSetupContract } from './utils';

type SomeEnum = {
  First?: boolean;
  Second?: number[];
};

type Wrapper = {
  inner: number[][];
  inner_enum: SomeEnum;
};

const setupContract = getSetupContract('raw-slice');
let contractInstance: Contract;
beforeAll(async () => {
  contractInstance = await setupContract();
});

describe('Raw Slice Tests', () => {
  it('should test raw slice output', async () => {
    const INPUT = 10;

    const { value } = await contractInstance.functions.return_raw_slice(INPUT).call<BN[]>();

    expect(value.map((v: BN) => v.toNumber())).toStrictEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it('should test raw slice input', async () => {
    const INPUT = [40, 41, 42];

    await contractInstance.functions.accept_raw_slice(INPUT).call<number[]>();

    expect(true).toBeTruthy();
  });

  it('should test raw slice input [nested]', async () => {
    const slice = [40, 41, 42];
    const INPUT = {
      inner: [slice, slice],
      inner_enum: { Second: slice },
    };

    await contractInstance.functions.accept_nested_raw_slice(INPUT).call<number[]>();

    expect(true).toBeTruthy();
  });

  it('should test raw slice input [predicate-raw slice]', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);

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
});
