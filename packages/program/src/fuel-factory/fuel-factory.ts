import type { Filter, JsonFlatAbi, TupleToUnion } from '@fuel-ts/abi-coder';
import type { AbstractAddress } from '@fuel-ts/interfaces';
import type { Provider } from '@fuel-ts/providers';
import type { Account } from '@fuel-ts/wallet';

import Contract from '../contract';

interface FactoryInput {
  readonly name: string;
  readonly type: 'contract' | 'predicate' | 'script';
  readonly abi: JsonFlatAbi;
}
export class FuelFactory<const FactoryInputArr extends readonly FactoryInput[]> {
  #inputs: FactoryInputArr;

  constructor(...inputs: FactoryInputArr) {
    this.#inputs = inputs;
  }

  programs<ProgramName extends TupleToUnion<FactoryInputArr>['name']>(name: ProgramName) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { abi } = this.#inputs.find((a) => a.name === name)!;

    return {
      connect: (id: string | AbstractAddress, accountOrProvider: Account | Provider) =>
        new Contract<Filter<TupleToUnion<FactoryInputArr>, { name: ProgramName }>['abi']>(
          id,
          abi,
          accountOrProvider
        ),
    };
  }
}
