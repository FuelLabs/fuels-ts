import { FuelError } from '@fuel-ts/errors';
import { concat } from '@fuel-ts/utils';

import { ARRAY_REGEX } from '../../../matchers/sway-type-matchers';
import type { AbiTypeComponent } from '../../../parser';
import { MAX_BYTES } from '../../constants';
import { ARRAY_TYPE } from '../encoding-constants';
import type { GetCoderFn, GetCoderParams, Coder, TypesOfCoder } from '../encoding-types';

/**
 * `array` coder
 */
export type ArrayEncodeValue<TCoder extends Coder = Coder> = Array<TypesOfCoder<TCoder>['Input']>;
export type ArrayDecodeValue<TCoder extends Coder = Coder> = Array<TypesOfCoder<TCoder>['Decoded']>;

export const arrayCoder = <TCoder extends Coder>(
  coder: TCoder,
  size: number
): Coder<ArrayEncodeValue<TCoder>, ArrayDecodeValue<TCoder>> => ({
  type: ARRAY_TYPE,
  encode: (value: ArrayEncodeValue<TCoder>): Uint8Array => {
    if (!Array.isArray(value)) {
      throw new FuelError(
        FuelError.CODES.ENCODE_ERROR,
        `Invalid ${ARRAY_TYPE} value - expected array value.`,
        { value }
      );
    }

    if (value.length !== size) {
      throw new FuelError(
        FuelError.CODES.ENCODE_ERROR,
        `Invalid ${ARRAY_TYPE} value - expected array of length ${size}.`,
        { value, expectedLength: size }
      );
    }

    const encodedValues = value.map((elementValue) => coder.encode(elementValue));
    return concat(encodedValues);
  },
  decode: (data: Uint8Array, initialOffset: number = 0): [ArrayDecodeValue<TCoder>, number] => {
    if (data.length > MAX_BYTES) {
      throw new FuelError(
        FuelError.CODES.DECODE_ERROR,
        `Invalid ${ARRAY_TYPE} data - exceeds maximum bytes.`,
        {
          data,
          length: data.length,
          maxLength: MAX_BYTES,
        }
      );
    }

    let decoded;
    let offset = initialOffset;

    const decodedValue = Array(size)
      .fill(0)
      .map(() => {
        [decoded, offset] = coder.decode(data, offset);
        return decoded;
      });
    return [decodedValue as ArrayDecodeValue<TCoder>, offset];
  },
});

arrayCoder.fromAbi = ({ type: { swayType, components } }: GetCoderParams, getCoder: GetCoderFn) => {
  // @TODO change ARRAY_REGEX.length to size (size of the array seems better terminology)
  const arrayMatch = ARRAY_REGEX.exec(swayType)?.groups;
  if (!arrayMatch) {
    throw new FuelError(
      FuelError.CODES.CODER_NOT_FOUND,
      `The provided ${ARRAY_TYPE} type is missing ABI components.`,
      { swayType, components }
    );
  }

  const arraySize = parseInt(arrayMatch.length, 10);
  const arrayElement: AbiTypeComponent | undefined = components?.[0];
  if (!arrayElement) {
    throw new FuelError(
      FuelError.CODES.CODER_NOT_FOUND,
      `The provided ${ARRAY_TYPE} type is missing a ABI component.`
    );
  }

  const arrayElementCoder = getCoder(arrayElement);
  return arrayCoder(arrayElementCoder, arraySize);
};
