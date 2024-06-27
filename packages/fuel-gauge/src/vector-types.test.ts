import type { BigNumberish } from 'fuels';
import { bn, Predicate, Wallet, Address, Provider, FUEL_NETWORK_URL } from 'fuels';
import { generateTestWallet } from 'fuels/test-utils';

import { FuelGaugeProjectsEnum, getFuelGaugeForcProject } from '../test/fixtures';

import { getScript, getSetupContract } from './utils';

const U32_VEC = [0, 1, 2];
const VEC_IN_VEC = [
  [0, 1, 2],
  [0, 1, 2],
];
const STRUCT_IN_VEC = [{ a: 0 }, { a: 1 }];
const VEC_IN_STRUCT = { a: [0, 1, 2] };
const ARRAY_IN_VEC = [
  [0, 1],
  [0, 1],
];
const VEC_IN_ARRAY = [
  [0, 1, 2],
  [0, 1, 2],
];
const VEC_IN_ENUM = { a: [0, 1, 2] };
const ENUM_IN_VEC = [{ a: 0 }, { a: 1 }];
const TUPLE_IN_VEC = [
  [0, 0],
  [1, 1],
];
const VEC_IN_TUPLE = [
  [0, 1, 2],
  [0, 1, 2],
];
const VEC_IN_A_VEC_IN_A_STRUCT_IN_A_VEC = [
  {
    a: [
      [0, 1, 2],
      [3, 4, 5],
    ],
  },
  {
    a: [
      [6, 7, 8],
      [9, 10, 11],
    ],
  },
];

type SomeStruct = {
  a: number;
};

type SomeStructWithVec = {
  a: number[];
};

type VecInAStructInAVec = {
  a: number[][];
}[];

type TwoDimensionArray = number[][];

// these Type shapes are here to get the TypeScript inference, they aren't 100% accurate
type MainArgs = [
  number[], // U32_VEC
  TwoDimensionArray, // VEC_IN_VEC
  SomeStruct[], // STRUCT_IN_VEC
  SomeStructWithVec, // VEC_IN_STRUCT
  TwoDimensionArray, // ARRAY_IN_VEC
  TwoDimensionArray, // VEC_IN_ARRAY
  SomeStructWithVec, // VEC_IN_ENUM
  SomeStruct[], // ENUM_IN_VEC
  TwoDimensionArray, // TUPLE_IN_VEC
  TwoDimensionArray, // VEC_IN_TUPLE
  VecInAStructInAVec, // VEC_IN_A_VEC_IN_A_STRUCT_IN_A_VEC
];

const setup = async (balance = 500_000) => {
  const provider = await Provider.create(FUEL_NETWORK_URL);
  const baseAssetId = provider.getBaseAssetId();

  // Create wallet
  const wallet = await generateTestWallet(provider, [[balance, baseAssetId]]);

  return wallet;
};

/**
 * @group node
 */
describe('Vector Types Validation', () => {
  let baseAssetId: string;
  const { binHexlified: predicateVectorTypes, abiContents: predicateVectorTypesAbi } =
    getFuelGaugeForcProject(FuelGaugeProjectsEnum.PREDICATE_VECTOR_TYPES);

  beforeAll(async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    baseAssetId = provider.getBaseAssetId();
  });

  it('can use supported vector types [vector-types-contract]', async () => {
    const setupContract = getSetupContract('vector-types-contract');
    const contractInstance = await setupContract();

    const { value } = await contractInstance.functions
      .test_all(
        U32_VEC,
        VEC_IN_VEC,
        STRUCT_IN_VEC,
        VEC_IN_STRUCT,
        ARRAY_IN_VEC,
        VEC_IN_ARRAY,
        VEC_IN_ENUM,
        ENUM_IN_VEC,
        TUPLE_IN_VEC,
        VEC_IN_TUPLE,
        VEC_IN_A_VEC_IN_A_STRUCT_IN_A_VEC
      )
      .call();
    expect(value).toBe(true);
  });

  it('can use supported vector types [vector-types-script]', async () => {
    const wallet = await setup();
    const scriptInstance = getScript<MainArgs, BigNumberish>('vector-types-script', wallet);

    const { value } = await scriptInstance.functions
      .main(
        U32_VEC,
        VEC_IN_VEC,
        STRUCT_IN_VEC,
        VEC_IN_STRUCT,
        ARRAY_IN_VEC,
        VEC_IN_ARRAY,
        VEC_IN_ENUM,
        ENUM_IN_VEC,
        TUPLE_IN_VEC,
        VEC_IN_TUPLE,
        VEC_IN_A_VEC_IN_A_STRUCT_IN_A_VEC
      )
      .call();

    expect(value).toBe(true);
  });

  it('can use supported vector types [predicate-vector-types]', async () => {
    const wallet = await setup();
    const receiver = Wallet.fromAddress(Address.fromRandom(), wallet.provider);
    const amountToPredicate = 300_000;
    const amountToReceiver = 50;
    const predicate = new Predicate<MainArgs>({
      bytecode: predicateVectorTypes,
      provider: wallet.provider,
      abi: predicateVectorTypesAbi,
      inputData: [
        U32_VEC,
        VEC_IN_VEC,
        STRUCT_IN_VEC,
        VEC_IN_STRUCT,
        ARRAY_IN_VEC,
        VEC_IN_ARRAY,
        VEC_IN_ENUM,
        ENUM_IN_VEC,
        TUPLE_IN_VEC,
        VEC_IN_TUPLE,
        VEC_IN_A_VEC_IN_A_STRUCT_IN_A_VEC,
      ],
    });

    // setup predicate
    const setupTx = await wallet.transfer(predicate.address, amountToPredicate, baseAssetId, {
      gasLimit: 10_000,
    });
    await setupTx.waitForResult();

    const initialReceiverBalance = await receiver.getBalance();

    const tx = await predicate.transfer(receiver.address, amountToReceiver, baseAssetId, {
      gasLimit: 10_000,
    });
    const { isStatusSuccess } = await tx.waitForResult();

    // Check the balance of the receiver
    const finalReceiverBalance = await receiver.getBalance();
    expect(bn(initialReceiverBalance).add(amountToReceiver).toHex()).toEqual(
      finalReceiverBalance.toHex()
    );
    expect(isStatusSuccess).toBeTruthy();
  });
});
