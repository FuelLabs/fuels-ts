import { ErrorCode, FuelError } from '@fuel-ts/errors';

import type { AbiFunction, JsonAbi } from '../types/JsonAbi';

import { ENCODING_V1, type EncodingVersion } from './constants';

/**
 * Asserts that the encoding version is supported by the ABI coder.
 *
 * @param encoding - the encoding version to check
 * @returns the encoding version
 * @throws FuelError if the encoding version is not supported
 */
export const getEncodingVersion = (encoding: string): EncodingVersion => {
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
export const findFunctionByName = (abi: JsonAbi, name: string) => {
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
 * @param concreteTypeId - the typeId of the type to find
 * @returns the JsonAbi type object
 */
export const findTypeById = (abi: JsonAbi, concreteTypeId: string) => {
  const type = abi.concreteTypes.find((t) => t.concreteTypeId === concreteTypeId);
  if (!type) {
    throw new FuelError(
      ErrorCode.TYPE_NOT_FOUND,
      `Type with typeId '${concreteTypeId}' doesn't exist in the ABI.`
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
export const findNonEmptyInputs = (abi: JsonAbi, inputs: AbiFunction['inputs']) =>
  inputs.filter((input) => findTypeById(abi, input.concreteTypeId).type !== '()');
