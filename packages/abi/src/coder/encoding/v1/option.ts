import { FuelError } from '@fuel-ts/errors';

import type { AbiTypeComponent } from '../../../parser';
import { OPTION_TYPE } from '../encoding-constants';
import type { Coder, GetCoderFn, GetCoderParams, Option } from '../encoding-types';

import { enumCoder } from './enum';
import type { EnumDecodeValue, EnumEncodeValue } from './enum';

type SwayOption<T> = { None: [] } | { Some: T };

export type OptionEncodeValue<TCoders extends Record<string, Coder>> =
  | EnumEncodeValue<TCoders>['Some']
  | undefined;

export type OptionDecodeValue<TCoders extends Record<string, Coder>> =
  EnumDecodeValue<TCoders>[keyof TCoders];

export const option = <TCoders extends Record<string, Coder>>(
  coders: TCoders
): Coder<OptionEncodeValue<TCoders>, OptionDecodeValue<TCoders>> => {
  const valueCoder = enumCoder(coders, OPTION_TYPE);
  return {
    type: OPTION_TYPE,
    encode: (value: Option<unknown>): Uint8Array => {
      const input: SwayOption<unknown> = value === undefined ? { None: [] } : { Some: value };
      try {
        return valueCoder.encode(input as unknown as EnumEncodeValue<TCoders>);
      } catch (error) {
        throw new FuelError(
          FuelError.CODES.ENCODE_ERROR,
          `Invalid ${OPTION_TYPE} value - malformed value.`,
          { value }
        );
      }
    },
    decode: (data: Uint8Array, initialOffset = 0): [OptionDecodeValue<TCoders>, number] => {
      const [decoded, offset] = valueCoder.decode(data, initialOffset);
      const optionValue = decoded && 'Some' in decoded ? decoded.Some : undefined;
      return [optionValue as OptionDecodeValue<TCoders>, offset];
    },
  };
};

option.fromAbi = ({ type: { swayType, components } }: GetCoderParams, getCoder: GetCoderFn) => {
  if (!components) {
    throw new FuelError(
      FuelError.CODES.CODER_NOT_FOUND,
      `The provided ${OPTION_TYPE} type is missing ABI components.`,
      { swayType, components }
    );
  }

  const coders = components.reduce((obj, component: AbiTypeComponent) => {
    const o: Record<string, Coder> = obj;

    o[component.name] = getCoder(component);
    return o;
  }, {});

  return option(coders);
};
