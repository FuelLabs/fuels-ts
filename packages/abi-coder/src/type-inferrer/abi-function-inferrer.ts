import type { JsonAbi, JsonAbiFunction, JsonAbiArgument } from '../json-abi';

import type { InferAbiType } from './abi-type-inferrer';
import type { TupleToUnion } from './type-utilities';

/**
 * This is the entry point for inferring functions in an ABI.
 * You provide it an ABI via the first generic type parameter,
 * and it returns a record of \{function_name: object_with_inferred_function_inputs_and_output \}
 */
export type InferAbiFunctions<
  TAbi extends JsonAbi,
  Fns extends JsonAbiFunction = TupleToUnion<TAbi['functions']>
> = {
  /**
   * This conditional Fns extends \{ readonly name: Name \} is necessary so that the type system knows
   * which actual function it's working with, as Fn is a discriminated union of all functions ( F1 | F2 | F3 | ... | Fn ).
   * If it weren't for this conditional, the type system would iterate over all functions for each function name,
   * and each function would accept ALL the possible inputs that ALL functions take in
   */
  readonly [Name in Fns['name']]: Fns extends { readonly name: Name }
    ? InferAbiFunction<Fns, TAbi['types']>
    : never;
};

/**
 * This type is inferring the inputs and output of a specific ABI function.
 */
type InferAbiFunction<
  Fn extends JsonAbiFunction,
  Types extends JsonAbi['types'],
  FnInputs extends JsonAbiArgument = TupleToUnion<Fn['inputs']>,
  /**
   * If the function has no arguments, then inputting anything shouldn't be allowed, thus never is inferred.
   * If it has arguments, then infer their types, which results in a record of \{ input_name: inferred_input_type \} form.
   */
  TInput = Fn['inputs']['length'] extends 0
    ? never
    : {
        [InputName in FnInputs['name']]: FnInputs extends { readonly name: InputName }
          ? InferAbiType<Types, FnInputs>
          : never;
      },
  /**
   * Unlike inputs, the output is only one type, not an array of types.
   * If the type of output is (), return void because () is an empty type; otherwise, return the inferred type.
   */
  TOutput = Types[Fn['output']['type']]['type'] extends '()'
    ? void
    : InferAbiType<Types, Fn['output']>
> = {
  /**
   * TInput and TOutput are already calculated above and can be assigned here directly.
   */
  input: TInput;
  output: TOutput;
};
