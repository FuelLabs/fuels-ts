import { ErrorCode, FuelError } from '@fuel-ts/errors';

import type { ResolvedAbiType } from '../ResolvedAbiType';
import type { JsonAbiOld, JsonAbiArgument, JsonAbiType } from '../types/JsonAbi';
import type { AbiFunction, JsonAbi } from '../types/JsonAbiNew';

import { ENCODING_V1, VOID_TYPE, type EncodingVersion } from './constants';

/**
 * Asserts that the encoding version is supported by the ABI coder.
 *
 * @param encoding - the encoding version to check
 * @returns the encoding version
 * @throws FuelError if the encoding version is not supported
 */
export const getEncodingVersion = (encoding?: string): EncodingVersion => {
  switch (encoding) {
    case undefined:
    case ENCODING_V1:
      return ENCODING_V1;

    default:
      throw new FuelError(
        ErrorCode.UNSUPPORTED_ENCODING_VERSION,
        `Encoding version '${encoding}' is unsupported.`
      );
  }
};

/**
 * Find a function by name in the ABI.
 *
 * @param abi - the JsonAbi object
 * @param name - the name of the function to find
 * @returns the JsonAbi function object
 */
export const findFunctionByName = (abi: JsonAbi, name: string): AbiFunction => {
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
export const findTypeById = (abi: JsonAbiOld, typeId: number): JsonAbiType => {
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
 * Find all non-void inputs in a list of inputs.
 * i.e. all inputs that are not of the type '()'.
 *
 * @param abi - the JsonAbi object
 * @param inputs - the list of inputs to filter
 * @returns the list of non-void inputs
 */
export const findNonVoidInputs = (
  abi: JsonAbiOld,
  inputs: readonly JsonAbiArgument[]
): JsonAbiArgument[] => inputs.filter((input) => findTypeById(abi, input.type).type !== VOID_TYPE);

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
  const bufferTypeArgument = bufferComponent?.originalTypeArguments?.[0];
  if (!bufferComponent || !bufferTypeArgument) {
    throw new FuelError(
      ErrorCode.INVALID_COMPONENT,
      `The Vec type provided is missing or has a malformed 'buf' component.`
    );
  }
  return bufferTypeArgument;
};
