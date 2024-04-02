import { ErrorCode, FuelError } from '@fuel-ts/errors';

import type { JsonAbi, JsonAbiArgument, JsonAbiType } from '../types/JsonAbi';

export const findFunctionByName = (abi: JsonAbi, name: string) => {
  const fn = abi.functions.find((f) => f.name === name);
  if (!fn) {
    throw new FuelError(ErrorCode.FUNCTION_NOT_FOUND, `Function with name '${name}' doesn't exist in the ABI`);
  }
  return fn;
};

export const findTypeById = (abi: JsonAbi, typeId: number): JsonAbiType => {
  const type = abi.types.find((t) => t.typeId === typeId);
  if (!type) {
    throw new FuelError(ErrorCode.TYPE_NOT_FOUND, `Type with typeId '${typeId}' doesn't exist in the ABI.`);
  }
  return type;
};

export const findNonEmptyInputs = (
  abi: JsonAbi,
  inputs: readonly JsonAbiArgument[]
): JsonAbiArgument[] => inputs.filter((input) => findTypeById(abi, input.type).type !== '()');
