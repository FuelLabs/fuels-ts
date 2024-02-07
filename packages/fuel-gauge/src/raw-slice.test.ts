import { generateTestWallet } from '@fuel-ts/account/test-utils';
import { bn, Predicate, Wallet, Address, BaseAssetId, Provider, FUEL_NETWORK_URL } from 'fuels';
import type { BN, Contract } from 'fuels';

import { FuelGaugeProjectsEnum, getFuelGaugeForcProject } from '../test/fixtures';

import { getScript, getSetupContract } from './utils';

type SomeEnum = {
  First?: boolean;
  Second?: number[];
};

type Wrapper = {
  inner: number[][];
  inner_enum: SomeEnum;
};

const setup = async (balance = 500_000) => {
  const provider = await Provider.create(FUEL_NETWORK_URL);

  // Create wallet
  const wallet = await generateTestWallet(provider, [[balance, BaseAssetId]]);

  return wallet;
};

const setupContract = getSetupContract('raw-slice');
let contractInstance: Contract;
let gasPrice: BN;
beforeAll(async () => {
  contractInstance = await setupContract();
  ({ minGasPrice: gasPrice } = contractInstance.provider.getGasConfig());
});

/**
 * @group node
 */
describe('Raw Slice Tests', () => {
  it('should test raw slice output', async () => {
    const INPUT = 10;

    const { value } = await contractInstance.functions
      .return_raw_slice(INPUT)
      .txParams({ gasPrice, gasLimit: 10_000 })
      .call();

    expect(value).toStrictEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it('should test raw slice input', async () => {
    const INPUT = [40, 41, 42];

    const { value } = await contractInstance.functions
      .accept_raw_slice(INPUT)
      .txParams({ gasPrice, gasLimit: 10_000 })
      .call<number[]>();

    expect(value).toBeUndefined();
  });

  it('should test raw slice input [nested]', async () => {
    const slice = [40, 41, 42];
    const INPUT = {
      inner: [slice, slice],
      inner_enum: { Second: slice },
    };

    const { value } = await contractInstance.functions
      .accept_nested_raw_slice(INPUT)
      .txParams({ gasPrice, gasLimit: 10_000 })
      .call<number[]>();

    expect(value).toBeUndefined();
  });

  it('should test raw slice input [predicate-raw-slice]', async () => {
    const wallet = await setup();
    const receiver = Wallet.fromAddress(Address.fromRandom(), wallet.provider);
    const amountToPredicate = 300_000;
    const amountToReceiver = 50;
    type MainArgs = [Wrapper];

    const { binHexlified: predicateRawSlice, abiContents: predicateRawSliceAbi } =
      getFuelGaugeForcProject(FuelGaugeProjectsEnum.PREDICATE_RAW_SLICE);

    const predicate = new Predicate<MainArgs>(
      predicateRawSlice,
      wallet.provider,
      predicateRawSliceAbi
    );

    // setup predicate
    const setupTx = await wallet.transfer(predicate.address, amountToPredicate, BaseAssetId, {
      gasPrice,
      gasLimit: 10_000,
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
      .transfer(receiver.address, amountToReceiver, BaseAssetId, { gasPrice, gasLimit: 10_000 });
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
    const wallet = await setup();
    type MainArgs = [number, Wrapper];
    const scriptInstance = getScript<MainArgs, void>('script-raw-slice', wallet);

    const bytes = [40, 41, 42];
    const INPUT: Wrapper = {
      inner: [bytes, bytes],
      inner_enum: { Second: bytes },
    };

    const { value } = await scriptInstance.functions
      .main(1, INPUT)
      .txParams({ gasPrice, gasLimit: 10_000 })
      .call<BN[]>();
    expect(value).toStrictEqual([1, 2, 3]);
  });
});
