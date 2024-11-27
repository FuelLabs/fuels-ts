import { concat } from '@fuel-ts/utils';

import { ARRAY_REGEX } from '../../../matchers/sway-type-matchers';
import type { AbiTypeComponent } from '../../../parser';
import type { Coder, GetCoderFn, GetCoderParams, TypesOfCoder } from '../../abi-coder-types';

/**
 * `array` coder
 */
type ArrayEncodeValue<TCoder extends Coder = Coder> = Array<TypesOfCoder<TCoder>['Input']>;
type ArrayDecodeValue<TCoder extends Coder = Coder> = Array<TypesOfCoder<TCoder>['Decoded']>;

export const arrayCoder = <TCoder extends Coder>(opts: {
  coder: TCoder;
  size: number;
}): Coder<ArrayEncodeValue<TCoder>, ArrayDecodeValue<TCoder>> => {
  const { coder, size } = opts;
  return {
    type: `array`,
    encodedLength: (data: Uint8Array) => coder.encodedLength(data) * size,
    encode: (value: ArrayEncodeValue<TCoder>): Uint8Array =>
      concat(value.map((v) => coder.encode(v))),
    decode: (data: Uint8Array): ArrayDecodeValue<TCoder> => {
      let offset = 0;
      const elementEncodedLength = coder.encodedLength(data);
      const decodedValue = Array(size)
        .fill(0)
        .map(() => {
          const newOffset = offset + elementEncodedLength;
          const dataValue = data.slice(offset, newOffset);
          const decoded = coder.decode(dataValue);
          offset = newOffset;
          return decoded;
        });

      return decodedValue;
    },
  };
};

arrayCoder.fromAbi = ({ type: { swayType, components } }: GetCoderParams, getCoder: GetCoderFn) => {
  // @TODO change ARRAY_REGEX.length to size (size of the array seems better terminology)
  const arrayMatch = ARRAY_REGEX.exec(swayType)?.groups;
  if (!arrayMatch) {
    throw new Error(`Unable to parse array length for "${swayType}".`);
  }

  const arraySize = parseInt(arrayMatch.length, 10);
  const arrayElement: AbiTypeComponent | undefined = components?.[0];
  if (!arrayElement) {
    throw new Error(`The provided Array type is missing an item of 'component'.`);
  }

  const arrayElementCoder = getCoder(arrayElement);
  return arrayCoder({
    coder: arrayElementCoder,
    size: arraySize,
  });
};
