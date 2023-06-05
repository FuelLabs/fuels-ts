import type { Filter, JsonFlatAbi, TupleToUnion } from '@fuel-ts/abi-coder';
import type { AbstractAddress } from '@fuel-ts/interfaces';
import type { Provider } from '@fuel-ts/providers';
import type { Account } from '@fuel-ts/wallet';

import Contract from '../contract';

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
const testStruct = counterContract.functions.structTest({ myStruct: { prop1: 1, prop2: 'a' } });

const testGenericStructDepth1 = counterContract.functions.incrementBy({
  struc: { myFirstType: 1, myNonGeneric: 2, mySecondType: '' },
});

const testEnum = counterContract.functions.testEnum({
  enm: 'Blue',
});

const testGenericEnum = counterContract.functions.testGenericEnum({ enumStruct: { bam: '123' } });

const testEnumStruct = counterContract.functions.testEnumStruct({
  enm: { amount: 2, id: 1, price: 4 },
});

const testEnumOfEnums = counterContract.functions.testEnumOfEnums({
  enm: 'Completed',
});

const complexFunction = counterContract.functions.complex_function({
  arg1: [['', '', ''], true, ''],
  arg2: { bim: 2, bam: true },
});
const testKnownVector = counterContract.functions.vectorTest({
  myVector: [{ amount: 1, myBoolean: false, myVector: [] }],
});

const genericVectorStructTest = counterContract.functions.genericVectorStructTest({
  myVector: [{ myFirstType: { prop1: 32, prop2: '' }, myNonGeneric: 2, mySecondType: [123] }],
});

const testNestedStruct = counterContract.functions.testNestedStruct({
  myStruct: {
    nonStruct: 123,
    theStruct: {
      myFirstType: 2,
      myNonGeneric: 124,
      mySecondType: 55,
    },
  },
});

const testDeeplyNestedGenericStruct = counterContract.functions.testDeeplyNestedGenericStruct({
  NestedGenericStruct: {
    nonStruct: 2,
    theStruct: {
      myFirstType: 1,
      myNonGeneric: 3,
      mySecondType: {
        myFirstType: 2,
        myNonGeneric: 5,
        mySecondType: {
          myFirstType: 2,
          myNonGeneric: 4,
          mySecondType: {
            prop1: 4,
            prop2: 'asdwe',
          },
        },
      },
    },
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
      myFirstType: 'strrrringg',
      myNonGeneric: 1,
      mySecondType: [123],
    },
    {
      myFirstType: 'asd',
      myNonGeneric: 123,
      mySecondType: [123333],
    },
    {
      myFirstType: 'asd',
      myNonGeneric: 123,
      mySecondType: [123333],
    },
    {
      myFirstType: 'asd',
      myNonGeneric: 123,
      mySecondType: [123333],
    },
    {
      myFirstType: 'asd',
      myNonGeneric: 123,
      mySecondType: [123333],
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
          propE3: 12,
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
        propE3: {
          propE1: { propA1: 2 },
          propE2: { propB1: { propA1: 2 }, propB2: 4 },
          propE3: {
            propF1: 2,
            propF2: [{ propG1: 24 }],
          },
        },
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
            propE3: 45,
          },
        },
      ],
      propD2: 123,
      propD3: {
        propE1: { propA1: 1 },
        propE2: { propB1: { propA1: 2 }, propB2: 1 },
        propE3: {
          propE1: { propA1: 1 },
          propE2: { propB1: { propA1: 2 }, propB2: 1 },
          propE3: {
            propE1: { propA1: 1 },
            propE2: { propB1: { propA1: 2 }, propB2: 1 },
            propE3: {
              propF1: 12,
              propF2: 'as',
            },
          },
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
              propE3: 34,
            },
          },
        ],
        propD2: 12,
        propD3: {
          propE1: { propA1: 4 },
          propE2: { propB1: { propA1: 123 }, propB2: 33 },
          propE3: {
            propE1: { propA1: 33 },
            propE2: { propB1: { propA1: 1 }, propB2: 3 },
            propE3: {
              propE1: { propA1: 2 },
              propE2: { propB1: { propA1: 11 }, propB2: 12 },
              propE3: { propF1: 12, propF2: false },
            },
          },
        },
      },
    ],
    propC5: [
      {
        propD1: [
          {
            propE1: { propA1: 1 },
            propE2: { propB1: { propA1: 2 }, propB2: 2 },
            propE3: {
              propE1: { propA1: 2 },
              propE2: { propB1: { propA1: 2 }, propB2: 2 },
              propE3: 34,
            },
          },
        ],
        propD2: 12,
        propD3: {
          propE1: { propA1: 4 },
          propE2: { propB1: { propA1: 123 }, propB2: 33 },
          propE3: {
            propE1: { propA1: 33 },
            propE2: { propB1: { propA1: 1 }, propB2: 3 },
            propE3: {
              // @ts-expect-error This guards against bugs that allow inputting anything
              propE1: { propA1: 'should fail' },
              propE2: { propB1: { propA1: 11 }, propB2: 12 },
              propE3: { propF1: 12, propF2: [{ propG1: 12 }] },
            },
          },
        },
      },
    ],
  },
});
