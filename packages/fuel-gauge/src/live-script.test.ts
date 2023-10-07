import type { BigNumberish } from 'fuels';
import { Provider, FUEL_NETWORK_URL, WalletUnlocked } from 'fuels';

import { getScript } from './utils';

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
  VecInAStructInAVec // VEC_IN_A_VEC_IN_A_STRUCT_IN_A_VEC
];

describe('Live Script Test', () => {
  it('can use script against live Fuel Node', async () => {
    if (!process.env.FUEL_NETWORK_GENESIS_KEY) {
      // eslint-disable-next-line no-console
      console.log('Skipping live Fuel Node test');
      return;
    }

    const provider = await Provider.create(FUEL_NETWORK_URL);
    const wallet = new WalletUnlocked(process.env.FUEL_NETWORK_GENESIS_KEY, provider);
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
      .txParams({
        gasPrice: 1,
      })
      .call();

    expect(value.toString()).toBe('1');
  });
});
