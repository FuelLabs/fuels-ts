import type { JsonFlatAbi } from '@fuel-ts/abi-coder';
import type { AbstractAddress } from '@fuel-ts/interfaces';
import type { Provider } from '@fuel-ts/providers';
import type { Account } from '@fuel-ts/wallet';

import Contract from '../contract';
import type { Filter, TupleToUnion } from '../utils';

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

const factory = new FuelFactory({
  programName: 'counterContract',
  ...counterContractAbi,
} as const);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const counterContract = factory.programs('counterContract').connect('asdwe', {});

const asdf = counterContract.functions.increment();
const testStruct = counterContract.functions.structTest({ myStruct: { prop1: 123, prop2: 'a' } });

const testGenericStructDepth1 = counterContract.functions.incrementBy({
  struc: {
    myFirstType: 123,
    mySecondType: 'aa',
    myNonGeneric: 123,
  },
});

const testCount = counterContract.functions.count();

// @ts-expect-error functions with no inputs shouldn't be able to take any input
counterContract.functions.count({} as never);
