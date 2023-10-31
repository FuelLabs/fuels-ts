import { TestNodeLauncher } from '@fuel-ts/test-utils';
import { bn, Predicate, Wallet, Address, BaseAssetId } from 'fuels';
import type { BN } from 'fuels';

import predicateRawSlice from '../fixtures/forc-projects/predicate-raw-slice';
import predicateRawSliceAbi from '../fixtures/forc-projects/predicate-raw-slice/out/debug/predicate-raw-slice-abi.json';

import { getProgramDir, getScript } from './utils';

type SomeEnum = {
  First?: boolean;
  Second?: number[];
};

type Wrapper = {
  inner: number[][];
  inner_enum: SomeEnum;
};

const contractDir = getProgramDir('raw-slice');

/**
 * @group node
 */
describe('Raw Slice Tests', () => {
  beforeAll(async (ctx) => {
    await TestNodeLauncher.prepareCache(ctx.tasks.length);

    return () => TestNodeLauncher.killCachedNodes();
  });
  it('should test raw slice output', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [contractDir],
    });
    const {
      contracts: [contractInstance],
    } = launched;

    const { minGasPrice: gasPrice } = contractInstance.provider.getGasConfig();

    const INPUT = 10;

    const { value } = await contractInstance.functions
      .return_raw_slice(INPUT)
      .txParams({ gasPrice })
      .call<BN[]>();

    expect(value.map((v: BN) => v.toNumber())).toStrictEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it('should test raw slice input', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [contractDir],
    });
    const {
      contracts: [contractInstance],
    } = launched;

    const { minGasPrice: gasPrice } = contractInstance.provider.getGasConfig();

    const INPUT = [40, 41, 42];

    const { value } = await contractInstance.functions
      .accept_raw_slice(INPUT)
      .txParams({ gasPrice })
      .call<number[]>();

    expect(value).toBeUndefined();
  });

  it('should test raw slice input [nested]', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [contractDir],
    });
    const {
      contracts: [contractInstance],
    } = launched;

    const { minGasPrice: gasPrice } = contractInstance.provider.getGasConfig();

    const slice = [40, 41, 42];
    const INPUT = {
      inner: [slice, slice],
      inner_enum: { Second: slice },
    };

    const { value } = await contractInstance.functions
      .accept_nested_raw_slice(INPUT)
      .txParams({ gasPrice })
      .call<number[]>();

    expect(value).toBeUndefined();
  });

  it('should test raw slice input [predicate-raw-slice]', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [contractDir],
    });
    const {
      contracts: [contractInstance],
      wallets: [wallet],
    } = launched;

    const { minGasPrice: gasPrice } = contractInstance.provider.getGasConfig();

    const receiver = Wallet.fromAddress(Address.fromRandom(), wallet.provider);
    const amountToPredicate = 300_000;
    const amountToReceiver = 50;
    type MainArgs = [Wrapper];
    const predicate = new Predicate<MainArgs>(
      predicateRawSlice,
      wallet.provider,
      predicateRawSliceAbi
    );

    // setup predicate
    const setupTx = await wallet.transfer(predicate.address, amountToPredicate, BaseAssetId, {
      gasPrice,
    });
    await setupTx.waitForResult();

    const initialPredicateBalance = await predicate.getBalance();
    const initialReceiverBalance = await receiver.getBalance();
    const bytes = [40, 41, 42];
    const INPUT: Wrapper = {
      inner: [bytes, bytes],
      inner_enum: { Second: bytes },
    };
    const tx = await predicate
      .setData(INPUT)
      .transfer(receiver.address, amountToReceiver, BaseAssetId, { gasPrice });
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

  // see https://github.com/FuelLabs/fuels-ts/issues/1344
  it.skip('should test raw slice input [script-raw-slice]', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [contractDir],
    });
    const {
      contracts: [contractInstance],
      wallets: [wallet],
    } = launched;

    const { minGasPrice: gasPrice } = contractInstance.provider.getGasConfig();

    type MainArgs = [number, Wrapper];
    const scriptInstance = getScript<MainArgs, void>('script-raw-slice', wallet);

    const bytes = [40, 41, 42];
    const INPUT: Wrapper = {
      inner: [bytes, bytes],
      inner_enum: { Second: bytes },
    };

    const { value } = await scriptInstance.functions
      .main(1, INPUT)
      .txParams({ gasPrice })
      .call<BN[]>();
    expect(value.map((v: BN) => v.toNumber())).toStrictEqual([1, 2, 3]);
  });
});
