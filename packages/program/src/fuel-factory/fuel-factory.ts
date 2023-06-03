import type { JsonFlatAbi } from '@fuel-ts/abi-coder';
import type { AbstractAddress } from '@fuel-ts/interfaces';
import type { Provider } from '@fuel-ts/providers';
import type { Account } from '@fuel-ts/wallet';

import Contract from '../contract';
import type { Filter, TupleToUnion } from '../utils';

import { complexAbi } from './abis/complexAbi';
import { counterContractAbi } from './abis/counterContractAbi';

interface NamedAbi<ProgramName extends string> {
  programName: ProgramName;
}

interface NamedJsonFlatAbi extends NamedAbi<string>, JsonFlatAbi {}

type TAbis<T extends NamedJsonFlatAbi[]> = TupleToUnion<T>;

export class FuelFactory<TAbisArray extends NamedJsonFlatAbi[] = NamedJsonFlatAbi[]> {
  #abis: TAbisArray;

  constructor(...abis: TAbisArray) {
    this.#abis = abis;
  }

  programs<ProgramName extends TAbis<TAbisArray>['programName']>(programName: ProgramName) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const abi = this.#abis.find((a) => a.programName === programName)!;

    return {
      connect: (id: string | AbstractAddress, accountOrProvider: Account | Provider) =>
        new Contract<Filter<TAbis<TAbisArray>, NamedAbi<ProgramName>>>(id, abi, accountOrProvider),
    };
  }
}

const factory = new FuelFactory(
  {
    programName: 'counterContract',
    ...counterContractAbi,
  } as const,
  {
    programName: 'veryComplexContract',
    ...complexAbi,
  } as const
);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const counterContract = factory.programs('counterContract').connect('asdwe', {});

const asdf = counterContract.functions.increment();
const testStruct = counterContract.functions.structTest({ myStruct: { prop1: 123, prop2: 'a' } });

const testGenericStructDepth1 = counterContract.functions.incrementBy({
  struc: {
    myFirstType: 22,
    mySecondType: '',
    myNonGeneric: 123,
  },
});

const testEnum = counterContract.functions.testEnum({
  enm: 'Blue',
});

const testEnumStruct = counterContract.functions.testEnumStruct({
  enm: { amount: 2, id: 1, price: 4 },
});

const testEnumOfEnums = counterContract.functions.testEnumOfEnums({
  enm: 'Completed',
});

const testKnownVector = counterContract.functions.vectorTest({
  myVector: [{ amount: 1, myBoolean: false, myVector: [123] }],
});

const genericVectorStructTest = counterContract.functions.genericVectorStructTest({
  myVector: [{ myFirstType: 12, myNonGeneric: 4, mySecondType: { prop1: 2, prop2: 'dd' } }],
});

const testNestedStruct = counterContract.functions.testNestedStruct({
  myStruct: {
    nonStruct: 1,
    theStruct: { myFirstType: 12, myNonGeneric: 23, mySecondType: 12 },
  },
});

const testTuple = counterContract.functions.testTuple({
  tpl: [1, ['asd', { prop1: 2, prop2: '23' }]],
});

const testTupleGeneric = counterContract.functions.testTupleGeneric({
  tpl: [1, ['asd', { prop1: 3, prop2: 'asd' }], 2],
});

const testRegularArray = counterContract.functions.regularArray({ arr: [1, 2, 3, 4, 5] });

const testGenericArray = counterContract.functions.genericArray({
  arr: [
    {
      myFirstType: 'asd',
      myNonGeneric: 123,
      mySecondType: [{ cap: 23, ptr: 'SHOULD NEVER COME TO HERE' }],
    },
    {
      myFirstType: 'asd',
      myNonGeneric: 123,
      mySecondType: [{ cap: 23, ptr: 'SHOULD NEVER COME TO HERE' }],
    },
    {
      myFirstType: 'asd',
      myNonGeneric: 123,
      mySecondType: [{ cap: 23, ptr: 'SHOULD NEVER COME TO HERE' }],
    },
    {
      myFirstType: 'asd',
      myNonGeneric: 123,
      mySecondType: [{ cap: 23, ptr: 'SHOULD NEVER COME TO HERE' }],
    },
    {
      myFirstType: 'asd',
      myNonGeneric: 123,
      mySecondType: [{ cap: 23, ptr: 'SHOULD NEVER COME TO HERE' }],
    },
  ],
});
const testCount = counterContract.functions.count();

counterContract.functions.count();

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const veryComplexContract = factory.programs('veryComplexContract').connect();

const multiParams = veryComplexContract.functions.multi_params({
  x: {
    propD1: [
      {
        propE1: { propA1: 1 },
        propE2: { propB1: { propA1: 2 }, propB2: 4 },
        propE3: {
          propE1: { propA1: 4 },
          propE2: { propB1: { propA1: 1 }, propB2: 4 },
          propE3: { propA1: 2 },
        },
      },
    ],
    propD2: 3,
    propD3: {
      propE1: { propA1: 1 },
      propE2: { propB1: { propA1: 32 }, propB2: 23 },
      propE3: {
        propE1: { propA1: 2 },
        propE2: { propB1: { propA1: 2 }, propB2: 2 },
        propE3: { propA1: 3 },
      },
    },
  },
});

const singleParams = veryComplexContract.functions.single_params({
  x: {
    propA1: 2,
  },
  y: { propB1: { propA1: 1 }, propB2: 1 },
  z: {
    propC1: { propA1: 4 },
    propC2: [
      { propB1: { propA1: 1 }, propB2: 4 },
      { propB1: { propA1: 2 }, propB2: 4 },
      { propB1: { propA1: 2 }, propB2: 4 },
    ],
    propC3: {
      propD1: [
        {
          propE1: { propA1: 1 },
          propE2: { propB1: { propA1: 1 }, propB2: 2 },
          propE3: {
            propE1: { propA1: 2 },
            propE2: { propB1: { propA1: 4 }, propB2: 23 },
            propE3: { propA1: 2 },
          },
        },
      ],
      propD2: 123,
      propD3: {
        propE1: { propA1: 2 },
        propE2: { propB1: { propA1: 3 }, propB2: 2 },
        propE3: {
          propE1: { propA1: 2 },
          propE2: { propB1: { propA1: 3 }, propB2: 2 },
          propE3: { propA1: 23 },
        },
      },
    },
    propC4: [
      {
        propD1: [
          {
            propE1: { propA1: 1 },
            propE2: { propB1: { propA1: 2 }, propB2: 2 },
            propE3: {
              propE1: { propA1: 2 },
              propE2: { propB1: { propA1: 2 }, propB2: 2 },
              propE3: { propA1: 2 },
            },
          },
        ],
        propD2: 2,
        propD3: {
          propE1: { propA1: 2 },
          propE2: { propB1: { propA1: 3 }, propB2: 2 },
          propE3: {
            propE1: { propA1: 2 },
            propE2: { propB1: { propA1: 3 }, propB2: 2 },
            propE3: { propA1: 23 },
          },
        },
      },
    ],
    propC5: [
      {
        propD1: [
          {
            propE1: { propA1: 2 },
            propE2: { propB1: { propA1: 2 }, propB2: 2 },
            propE3: {
              propE1: { propA1: 1 },
              propE2: { propB1: { propA1: 1 }, propB2: 4 },
              propE3: { propA1: 4 },
            },
          },
        ],
        propD2: 2,
        propD3: {
          propE1: { propA1: 2 },
          propE2: { propB1: { propA1: 3 }, propB2: 2 },
          propE3: {
            propE1: { propA1: 2 },
            propE2: { propB1: { propA1: 2 }, propB2: 2 },
            propE3: { propA1: 23 },
          },
        },
      },
    ],
  },
});
