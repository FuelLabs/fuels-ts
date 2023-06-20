import type { Filter, JsonFlatAbi, TupleToUnion } from '@fuel-ts/abi-coder';
import type { AbstractAddress } from '@fuel-ts/interfaces';
import { Predicate } from '@fuel-ts/predicate';
import { Contract } from '@fuel-ts/program';
import type { Provider } from '@fuel-ts/providers';
import { Script } from '@fuel-ts/script';
import type { Account } from '@fuel-ts/wallet';

interface Input {
  readonly name: string;
  readonly program: {
    readonly abi: JsonFlatAbi;
  };
}
interface InputWithBin extends Input {
  readonly program: Input['program'] & {
    readonly bin: string;
  };
}

interface FuelFactoryInput {
  readonly contracts?: readonly Input[];
  readonly predicates?: readonly InputWithBin[];
  readonly scripts?: readonly InputWithBin[];
}

export class FuelFactory<const Inputs extends FuelFactoryInput> {
  #inputs: Inputs;

  constructor(inputs: Inputs) {
    this.#inputs = inputs;
  }

  contracts<Name extends TupleToUnion<Inputs['contracts']>['name']>(name: Name) {
    const {
      program: { abi },
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } = this.#inputs.contracts!.find((a) => a.name === name)!;

    return {
      connect: (id: string | AbstractAddress, accountOrProvider: Account | Provider) =>
        new Contract<Filter<TupleToUnion<Inputs['contracts']>, { name: Name }>['program']['abi']>(
          id,
          abi,
          accountOrProvider,
          true
        ),
    };
  }

  predicates<Name extends TupleToUnion<Inputs['predicates']>['name']>(name: Name) {
    const {
      program: { abi, bin },
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } = this.#inputs.predicates!.find((a) => a.name === name)!;

    return {
      createInstance: (chainId: number, provider?: Provider) =>
        new Predicate<
          [],
          Filter<TupleToUnion<Inputs['predicates']>, { name: Name }>['program']['abi']
        >(bin, chainId, abi, provider, undefined, true),
    };
  }

  scripts<Name extends TupleToUnion<Inputs['scripts']>['name']>(name: Name) {
    const {
      program: { abi, bin },
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } = this.#inputs.scripts!.find((a) => a.name === name)!;

    return {
      createInstance: (wallet: Account) =>
        new Script<
          [],
          unknown,
          Filter<TupleToUnion<Inputs['scripts']>, { name: Name }>['program']['abi']
        >(bin, abi, wallet, true),
    };
  }
}
