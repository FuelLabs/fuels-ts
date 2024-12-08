import { FuelError } from '@fuel-ts/errors';
import { concat } from '@fuel-ts/utils';
import type { RequireExactlyOne } from 'type-fest';

import type { AbiTypeComponent } from '../../../parser';
import { ENUM_TYPE, OPTION_TYPE, VOID_TYPE } from '../encoding-constants';
import type { GetCoderFn, GetCoderParams, Coder, TypesOfCoder } from '../encoding-types';

import { u64 } from './fixed';

export type EnumEncodeValue<TCoders extends Record<string, Coder>> = RequireExactlyOne<{
  [P in keyof TCoders]: TypesOfCoder<TCoders[P]>['Input'];
}>;
export type EnumDecodeValue<TCoders extends Record<string, Coder>> = RequireExactlyOne<{
  [P in keyof TCoders]: TypesOfCoder<TCoders[P]>['Decoded'];
}>;

export const CASE_KEY_WORD_LENGTH = 8;

const createCaseKeyCoder = (type: string, validKeys: string[]): Coder<string, string> => ({
  type,
  encode: u64.encode,
  decode: (data: Uint8Array, initialOffset: number = 0) => {
    try {
      const [caseKeyBn, caseValueOffset] = u64.decode(data, initialOffset);
      const caseIndex = caseKeyBn.toNumber();
      const caseKey = validKeys[caseIndex];
      if (!caseKey) {
        throw new FuelError(
          FuelError.CODES.DECODE_ERROR,
          `Invalid ${type} data - invalid case key.`
        );
      }
      return [caseKey, caseValueOffset];
    } catch (error) {
      throw new FuelError(
        FuelError.CODES.DECODE_ERROR,
        `Invalid ${type} data - invalid case key.`,
        {
          data,
          validKeys,
        }
      );
    }
  },
});

export const enumCoder = <TCoders extends Record<string, Coder>>(
  coders: TCoders,
  type: string = ENUM_TYPE
) => {
  const isNativeValue = (value: EnumEncodeValue<TCoders>) => typeof value === 'string';
  const isNativeCoder = (coder: Coder) => type !== OPTION_TYPE && coder.type === VOID_TYPE;
  const validKeys = Object.keys(coders);
  const caseKeyCoder = createCaseKeyCoder(type, validKeys);

  return {
    type,
    encode: (value: EnumEncodeValue<TCoders>): Uint8Array => {
      if (isNativeValue(value)) {
        const valueCoder = coders[value];
        if (!coders[value]) {
          throw new Error("Unable to encode native enum as coder can't be found");
        }

        const encodedValue = valueCoder.encode([]);
        const caseIndex = validKeys.indexOf(value);
        return concat([u64.encode(caseIndex), encodedValue]);
      }

      // Obtain the case key and index
      const [caseKey, ...empty] = Object.keys(value);
      if (!caseKey) {
        throw new FuelError(
          FuelError.CODES.ENCODE_ERROR,
          `Invalid ${type} value - a valid case key must be provided.`,
          { value, validKeys }
        );
      }
      if (empty.length !== 0) {
        throw new FuelError(
          FuelError.CODES.ENCODE_ERROR,
          `Invalid ${type} value - only one field must be provided.`,
          {
            value,
            validKeys,
          }
        );
      }
      const caseIndex = validKeys.indexOf(caseKey);
      if (caseIndex === -1) {
        throw new FuelError(
          FuelError.CODES.ENCODE_ERROR,
          `Invalid ${type} value - invalid case key "${caseKey}".`,
          { value, validKeys }
        );
      }

      // Encode the case value
      const valueCoder = coders[caseKey];

      const encodedValue = valueCoder.encode(value[caseKey]);
      return concat([u64.encode(caseIndex), encodedValue]);
    },
    decode: (data: Uint8Array, initialOffset = 0): [EnumDecodeValue<TCoders>, number] => {
      const [caseKey, caseValueOffset] = caseKeyCoder.decode(data, initialOffset);

      // Decode the case value
      const caseValueCoder = coders[caseKey];
      const [caseValue, dataOffset] = caseValueCoder.decode(data, caseValueOffset);

      if (isNativeCoder(caseValueCoder)) {
        return [caseKey as unknown as EnumDecodeValue<TCoders>, dataOffset];
      }

      return [{ [caseKey]: caseValue } as EnumDecodeValue<TCoders>, dataOffset];
    },
  };
};

enumCoder.fromAbi = ({ type: { swayType, components } }: GetCoderParams, getCoder: GetCoderFn) => {
  if (!components) {
    throw new FuelError(
      FuelError.CODES.CODER_NOT_FOUND,
      `The provided ${ENUM_TYPE} type is missing ABI components.`,
      { swayType, components }
    );
  }

  const coders = components.reduce((obj, component: AbiTypeComponent) => {
    const o: Record<string, Coder> = obj;

    o[component.name] = getCoder(component);
    return o;
  }, {});

  return enumCoder(coders);
};
