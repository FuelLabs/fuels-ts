import type { Filter, JsonFlatAbi, TupleToUnion } from '@fuel-ts/abi-coder';
import type { AbstractAddress } from '@fuel-ts/interfaces';
import type { Provider } from '@fuel-ts/providers';
import type { Account } from '@fuel-ts/wallet';

import Contract from '../contract';

interface NamedAbi<ProgramName extends string> {
  programName: ProgramName;
}

interface NamedJsonFlatAbi extends NamedAbi<string>, JsonFlatAbi {}

export class FuelFactory<TAbisArray extends NamedJsonFlatAbi[]> {
  #abis: TAbisArray;

  constructor(...abis: TAbisArray) {
    this.#abis = abis;
  }

  programs<ProgramName extends TupleToUnion<TAbisArray>['programName']>(programName: ProgramName) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const abi = this.#abis.find((a) => a.programName === programName)!;

    return {
      connect: (id: string | AbstractAddress, accountOrProvider: Account | Provider) =>
        new Contract<Filter<TupleToUnion<TAbisArray>, NamedAbi<ProgramName>>>(
          id,
          abi,
          accountOrProvider
        ),
    };
  }
}
