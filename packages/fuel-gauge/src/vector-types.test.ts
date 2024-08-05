import { bn, Predicate, Wallet, Address } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { VectorTypesScriptAbi__factory } from '../test/typegen';
import { VectorTypesContractAbi__factory } from '../test/typegen/contracts';
import VectorTypesContractAbiHex from '../test/typegen/contracts/VectorTypesContractAbi.hex';
import { PredicateVectorTypesAbi__factory } from '../test/typegen/predicates';

import { launchTestContract } from './utils';

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

/**
 * @group node
 * @group browser
 */
describe('Vector Types Validation', () => {
  it('can use supported vector types [vector-types-contract]', async () => {
    using contractInstance = await launchTestContract({
      deployer: VectorTypesContractAbi__factory,
      bytecode: VectorTypesContractAbiHex,
    });

    const { waitForResult } = await contractInstance.functions
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

    const { value } = await waitForResult();

    expect(value).toBe(true);
  });

  it('can use supported vector types [vector-types-script]', async () => {
    using launched = await launchTestNode();
    const {
      wallets: [wallet],
    } = launched;

    const scriptInstance = VectorTypesScriptAbi__factory.createInstance(wallet);

    const { waitForResult } = await scriptInstance.functions
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

    const { value } = await waitForResult();

    expect(value).toBe(true);
  });

  it('can use supported vector types [predicate-vector-types]', async () => {
    using launched = await launchTestNode();

    const {
      provider,
      wallets: [wallet],
    } = launched;

    const receiver = Wallet.fromAddress(Address.fromRandom(), wallet.provider);
    const amountToPredicate = 300_000;
    const amountToReceiver = 50;
    const predicate = new Predicate<MainArgs>({
      bytecode: PredicateVectorTypesAbi__factory.bin,
      provider: wallet.provider,
      abi: PredicateVectorTypesAbi__factory.abi,
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
    const setupTx = await wallet.transfer(
      predicate.address,
      amountToPredicate,
      provider.getBaseAssetId(),
      {
        gasLimit: 10_000,
      }
    );
    await setupTx.waitForResult();

    const initialReceiverBalance = await receiver.getBalance();

    const tx = await predicate.transfer(
      receiver.address,
      amountToReceiver,
      provider.getBaseAssetId(),
      {
        gasLimit: 10_000,
      }
    );
    const { isStatusSuccess } = await tx.waitForResult();

    // Check the balance of the receiver
    const finalReceiverBalance = await receiver.getBalance();
    expect(bn(initialReceiverBalance).add(amountToReceiver).toHex()).toEqual(
      finalReceiverBalance.toHex()
    );
    expect(isStatusSuccess).toBeTruthy();
  });
});
