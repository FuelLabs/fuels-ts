import { concatBytes } from '@fuel-ts/utils';

import { STRUCT_TYPE } from '../encoding-constants';
import type { Coder, TypesOfCoder } from '../encoding-types';
import { assertObjectKeysAllPresent } from '../validation';

/**
 * `struct` coder
 */
export type StructEncodeValue<TCoders extends Record<string, Coder>> = {
  [P in keyof TCoders]: TypesOfCoder<TCoders[P]>['Input'];
};
export type StructDecodeData<TCoders extends Record<string, Coder>> = {
  [P in keyof TCoders]: TypesOfCoder<TCoders[P]>['Decoded'];
};
export type StructCoder<TCoders extends Record<string, Coder> = Record<string, Coder>> = Coder<
  StructEncodeValue<TCoders>,
  StructDecodeData<TCoders>
>;

export const struct = <TCoders extends Record<string, Coder>>(
  coders: TCoders
): StructCoder<TCoders> => ({
  type: STRUCT_TYPE,
  encode: (value: StructEncodeValue<TCoders>): Uint8Array => {
    assertObjectKeysAllPresent(value, coders, STRUCT_TYPE);

    // Encode each value
    const encodedValues = Object.entries(coders).map(([key, coder]) => coder.encode(value[key]));

    return concatBytes(encodedValues);
  },
  decode: (data: Uint8Array, initialOffset = 0): [StructDecodeData<TCoders>, number] => {
    let offset = initialOffset;
    let decoded;

    const decodedValue = Object.entries(coders).reduce((acc, [caseKey, fieldCoder]) => {
      [decoded, offset] = fieldCoder.decode(data, offset);
      acc[caseKey as keyof StructDecodeData<TCoders>] = decoded;
      return acc;
    }, {} as StructDecodeData<TCoders>);
    return [decodedValue, offset];
  },
});
