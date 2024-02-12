import { ErrorCode, FuelError } from '@fuel-ts/errors';

import { ResolvedAbiType } from '../../ResolvedAbiType';
import {
  B256_CODER_TYPE,
  B512_CODER_TYPE,
  BOOL_CODER_TYPE,
  BYTES_CODER_TYPE,
  OPTION_CODER_TYPE,
  RAW_PTR_CODER_TYPE,
  RAW_SLICE_CODER_TYPE,
  STD_STRING_CODER_TYPE,
  STR_CODER_TYPE,
  U16_CODER_TYPE,
  U32_CODER_TYPE,
  U64_CODER_TYPE,
  U8_CODER_TYPE,
  VEC_CODER_TYPE,
  arrayRegEx,
  enumRegEx,
  stringRegEx,
  structRegEx,
  tupleRegEx,
} from '../../utils/constants';
import { findOrThrow } from '../../utils/utilities';
import type { Coder } from '../coders/v0/AbstractCoder';
import { ArrayCoder } from '../coders/v0/ArrayCoder';
import { OptionCoder } from '../coders/v0/OptionCoder';
import { ByteCoder } from '../coders/v1/ByteCoder';
import { DynamicLengthCoder } from '../coders/v1/DynamicLengthCoder';
import { EnumCoder } from '../coders/v1/EnumCoder';
import { LiteralCoder } from '../coders/v1/LiteralCoder';
import { RawSliceCoder } from '../coders/v1/RawSliceCoder';
import { StringCoder } from '../coders/v1/StringCoder';
import { StructCoder } from '../coders/v1/StructCoder';
import { TupleCoder } from '../coders/v1/TupleCoder';
import { VecCoder } from '../coders/v1/VecCoder';
import type { TGetCoderFn } from '../types/IGetCoder';
import type { TEncodingOptions } from '../types/TEncodingOptions';

import { getCoders } from './utils/getCoders';

/**
 * Retrieves coders that adhere to the v1 spec.
 *
 * @param resolvedAbiType - the resolved type to return a coder for.
 * @param options - options to be utilized during the encoding process.
 * @returns the coder for a given type.
 */
export const getCoder: TGetCoderFn = (
  resolvedAbiType: ResolvedAbiType,
  _options?: TEncodingOptions
): Coder => {
  switch (resolvedAbiType.type) {
    case U8_CODER_TYPE:
    case U16_CODER_TYPE:
    case U32_CODER_TYPE:
    case BOOL_CODER_TYPE:
    case U64_CODER_TYPE:
    case RAW_PTR_CODER_TYPE:
    case B256_CODER_TYPE:
    case B512_CODER_TYPE:
      return new LiteralCoder(resolvedAbiType.type);
    case RAW_SLICE_CODER_TYPE:
      return new RawSliceCoder();
    case BYTES_CODER_TYPE:
    case STD_STRING_CODER_TYPE:
      return new DynamicLengthCoder(resolvedAbiType.type);
    default:
      break;
  }

  const stringMatch = stringRegEx.exec(resolvedAbiType.type)?.groups;
  if (stringMatch) {
    const length = parseInt(stringMatch.length, 10);

    return new StringCoder(length);
  }

  // ABI types underneath MUST have components by definition

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const components = resolvedAbiType.components!;

  const arrayMatch = arrayRegEx.exec(resolvedAbiType.type)?.groups;
  if (arrayMatch) {
    const length = parseInt(arrayMatch.length, 10);
    const arg = components[0];
    if (!arg) {
      throw new FuelError(
        ErrorCode.INVALID_COMPONENT,
        `The provided Array type is missing an item of 'component'.`
      );
    }

    const arrayElementCoder = getCoder(arg, { isSmallBytes: true });
    return new ArrayCoder(arrayElementCoder, length);
  }

  if (resolvedAbiType.type === VEC_CODER_TYPE) {
    const arg = findOrThrow(components, (c) => c.name === 'buf').originalTypeArguments?.[0];
    if (!arg) {
      throw new FuelError(
        ErrorCode.INVALID_COMPONENT,
        `The provided Vec type is missing the 'type argument'.`
      );
    }
    const argType = new ResolvedAbiType(resolvedAbiType.abi, arg);

    const itemCoder = getCoder(argType, { isSmallBytes: true });
    return new VecCoder(itemCoder);
  }

  const structMatch = structRegEx.exec(resolvedAbiType.type)?.groups;
  if (structMatch) {
    const coders = getCoders(components, { isRightPadded: true, getCoder });
    return new StructCoder(structMatch.name, coders);
  }

  const enumMatch = enumRegEx.exec(resolvedAbiType.type)?.groups;
  if (enumMatch) {
    const coders = getCoders(components, { getCoder });

    const isOptionEnum = resolvedAbiType.type === OPTION_CODER_TYPE;
    if (isOptionEnum) {
      return new OptionCoder(enumMatch.name, coders);
    }
    return new EnumCoder(enumMatch.name, coders);
  }

  const tupleMatch = tupleRegEx.exec(resolvedAbiType.type)?.groups;
  if (tupleMatch) {
    const coders = components.map((component) => getCoder(component, { isRightPadded: true }));
    return new TupleCoder(coders);
  }

  if (resolvedAbiType.type === STR_CODER_TYPE) {
    throw new FuelError(
      ErrorCode.INVALID_DATA,
      'String slices can not be decoded from logs. Convert the slice to `str[N]` with `__to_str_array`'
    );
  }

  throw new FuelError(
    ErrorCode.CODER_NOT_FOUND,
    `Coder not found: ${JSON.stringify(resolvedAbiType)}.`
  );
};
