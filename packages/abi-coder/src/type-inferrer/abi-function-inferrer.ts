import type { JsonAbi, JsonAbiFunction, JsonAbiArgument } from '../json-abi';

import type { InferAbiType } from './abi-type-inferrer';
import type { TupleToUnion } from './type-utilities';

export type InferAbiFunctions<
  TAbi extends JsonAbi,
  Fns extends JsonAbiFunction = TupleToUnion<TAbi['functions']>
> = {
  // This conditional Fn extends { readonly name: Name } is necessary so that the type system knows
  // which actual function it's working with, as Fn is a discriminated union of all inputs ( I1 | I2 | I3 | ... | In )
  // If it weren't for this conditional, then the type system would iterate over all functions for each function name
  readonly [Name in Fns['name']]: Fns extends { readonly name: Name }
    ? InferAbiFunction<Fns, TAbi['types']>
    : never;
};

type InferAbiFunction<
  Fn extends JsonAbiFunction,
  Types extends JsonAbi['types'],
  FnInputs extends JsonAbiArgument = TupleToUnion<Fn['inputs']>,
  TInput = Fn['inputs']['length'] extends 0
    ? never // If there are no inputs in the function, then inputting anything shouldn't be allowed, thus never
    : {
        // Map through all function arguments and infer their types, which results in an object of { input_name: inferred_input_type } form.
        [InputName in FnInputs['name']]: FnInputs extends { readonly name: InputName }
          ? InferAbiType<Types, FnInputs>
          : never;
      },
  // Unlike inputs, the output is only one type, not an array
  TOutput = Types[Fn['output']['type']]['type'] extends '()'
    ? void // () is an empty type, thus void
    : InferAbiType<Types, Fn['output']>
> = {
  input: TInput;
  output: TOutput;
};
