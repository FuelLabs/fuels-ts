import { concat } from '@fuel-ts/utils';
import type { RequireExactlyOne } from 'type-fest';

import { ENUM_TYPE, VOID_TYPE } from '../encoding-constants';
import type { Coder, TypesOfCoder } from '../encoding-types';
import { errors } from '../validation';

import { u64 } from './fixed';

export type EnumEncodeValue<TCoders extends Record<string, Coder>> = RequireExactlyOne<{
  [P in keyof TCoders]: TypesOfCoder<TCoders[P]>['Input'];
}>;
export type EnumDecodeValue<TCoders extends Record<string, Coder>> = RequireExactlyOne<{
  [P in keyof TCoders]: TypesOfCoder<TCoders[P]>['Decoded'];
}>;
export type EnumCoder<TCoders extends Record<string, Coder> = Record<string, Coder>> = Coder<
  EnumEncodeValue<TCoders>,
  EnumDecodeValue<TCoders>
>;

const isNativeCoder = (coder: Coder) => coder.type === VOID_TYPE;
const extractCaseKeysFromValue = <TCoders extends Record<string, Coder>>(
  value: EnumEncodeValue<TCoders>
): string[] => (typeof value === 'string' ? [value] : Object.keys(value));
const extractCaseValueFromValue = <TCoders extends Record<string, Coder>>(
  value: EnumEncodeValue<TCoders>
) => (typeof value === 'string' ? undefined : Object.values(value)[0]);
const extractCaseIndexFromData = (data: Uint8Array, initialOffset: number) => {
  const [decoded, offset] = u64.decode(data, initialOffset);
  return [decoded.toNumber(), offset];
};

const createCaseValueCoder = <TCoder extends Coder>(key: string, index: number, coder: TCoder) => {
  const isNative = isNativeCoder(coder);
  return {
    type: ENUM_TYPE,
    encode: (value: TypesOfCoder<TCoder>['Input']): Uint8Array => {
      const encodedIndex = u64.encode(index);
      const encodedValue = coder.encode(value);
      return concat([encodedIndex, encodedValue]);
    },
    decode: (data: Uint8Array, initialOffset = 0): [TypesOfCoder<TCoder>['Decoded'], number] => {
      const [decoded, offset] = coder.decode(data, initialOffset);
      return [isNative ? key : { [key]: decoded }, offset];
    },
  };
};

export const enumCoder = <TCoders extends Record<string, Coder>>(
  initialCoders: TCoders,
  type: string = ENUM_TYPE
) => {
  const coders = Object.fromEntries(
    Object.entries(initialCoders).map(([key, coder], index) => [
      key,
      createCaseValueCoder(key, index, coder),
    ])
  );
  const validKeys = Object.keys(coders);

  return {
    type,
    encode: (value: EnumEncodeValue<TCoders>) => {
      const [caseKey, ...shouldBeEmpty] = extractCaseKeysFromValue(value);
      if (!caseKey) {
        throw errors.invalidEnumValueCaseKeyMissing(type, value, validKeys);
      }
      if (!validKeys.includes(caseKey)) {
        throw errors.invalidEnumValueCaseKey(type, value, caseKey, validKeys);
      }
      if (shouldBeEmpty.length > 0) {
        throw errors.invalidEnumValueMultipleCaseKeys(type, value, validKeys);
      }
      const caseValue = extractCaseValueFromValue(value);
      return coders[caseKey].encode(caseValue);
    },
    decode: (data: Uint8Array, initialOffset = 0): [EnumDecodeValue<TCoders>, number] => {
      if (data.length < initialOffset + 8) {
        throw errors.invalidEnumDataCaseKey(type, validKeys);
      }
      const [caseIndex, indexOffset] = extractCaseIndexFromData(data, initialOffset);
      if (caseIndex < 0 || caseIndex >= validKeys.length) {
        throw errors.invalidEnumDataCaseKey(type, validKeys);
      }
      const caseKey = validKeys[caseIndex];
      const [decoded, offset] = coders[caseKey].decode(data, indexOffset);
      return [decoded as EnumDecodeValue<TCoders>, offset];
    },
  };
};
