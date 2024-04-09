import { ErrorCode, FuelError } from '@fuel-ts/errors';

import type { ResolvedAbiType } from '../ResolvedAbiType';
import type { JsonAbi, JsonAbiArgument, JsonAbiFunction, JsonAbiType } from '../types/JsonAbi';

/**
 * Find a function by name in the ABI.
 *
 * @param abi - the JsonAbi object
 * @param name - the name of the function to find
 * @returns the JsonAbi function object
 */
export const findFunctionByName = (abi: JsonAbi, name: string): JsonAbiFunction => {
  const fn = abi.functions.find((f) => f.name === name);
  if (!fn) {
    throw new FuelError(
      ErrorCode.FUNCTION_NOT_FOUND,
      `Function with name '${name}' doesn't exist in the ABI`
    );
  }
  return fn;
};

/**
 * Find a type by its typeId in the ABI.
 *
 * @param abi - the JsonAbi object
 * @param typeId - the typeId of the type to find
 * @returns the JsonAbi type object
 */
export const findTypeById = (abi: JsonAbi, typeId: number): JsonAbiType => {
  const type = abi.types.find((t) => t.typeId === typeId);
  if (!type) {
    throw new FuelError(
      ErrorCode.TYPE_NOT_FOUND,
      `Type with typeId '${typeId}' doesn't exist in the ABI.`
    );
  }
  return type;
};

/**
 * Find all non-empty inputs in a list of inputs.
 * i.e. all inputs that are not of the type '()'.
 *
 * @param abi - the JsonAbi object
 * @param inputs - the list of inputs to filter
 * @returns the list of non-empty inputs
 */
export const findNonEmptyInputs = (
  abi: JsonAbi,
  inputs: readonly JsonAbiArgument[]
): JsonAbiArgument[] => inputs.filter((input) => findTypeById(abi, input.type).type !== '()');

/**
 * Find the vector buffer argument in a list of components.
 *
 * @param components - the list of components to search
 * @returns the vector buffer argument
 */
export const findVectorBufferArgument = (
  components: readonly ResolvedAbiType[]
): JsonAbiArgument => {
  const bufferComponent = components.find((c) => c.name === 'buf');
if (!bufferComponent || !bufferComponent.originalTypeArguments?.[0]) {
 throw new FuelError(
      ErrorCode.INVALID_COMPONENT,
      `The provided Vec type is missing the 'buf' component.`
    );
  }
  return arg;
};
