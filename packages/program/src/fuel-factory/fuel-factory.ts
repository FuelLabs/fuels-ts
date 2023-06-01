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
    mySecondType: 'aa',
    myNonGeneric: 123,
  },
});

const testKnownVector = counterContract.functions.vectorTest({ myVector: [] });

const testNestedStruct = counterContract.functions.testNestedStruct({
  myStruct: {
    nonStruct: 1,
    theStruct: { myFirstType: 12, myNonGeneric: 23, mySecondType: 12 },
  },
});

const testCount = counterContract.functions.count();

// @ts-expect-error functions with no inputs shouldn't be able to take any input
counterContract.functions.count({} as never);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const veryComplexContract = factory.programs('veryComplexContract').connect();

const fn = veryComplexContract.functions.single_params({
  x: {
    propA1: 1,
  },
  y: { propB1: { propA1: 1 }, propB2: 1 },
  z: {
    propC1: { propA1: 4 },
    propC2: [{ propB1: { propA1: 1 }, propB2: 4 }],
    propC3: {
      propD1: [],
      propD2: 123,
      propD3: {
        propF1: 1,
        propF2: '123',
      },
    },
    propC4: [],
    propC5: [],
  },
});
