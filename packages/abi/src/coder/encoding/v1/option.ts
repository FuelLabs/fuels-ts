import { OPTION_TYPE } from '../encoding-constants';
import type { Coder, Option } from '../encoding-types';
import { assertDecode, assertEncode, errors } from '../validation';

import { enumCoder } from './enum';
import type { EnumDecodeValue, EnumEncodeValue } from './enum';

type SwayOption<T> = 'None' | { Some: T };

export type OptionEncodeValue<TCoders extends Record<string, Coder>> =
  | EnumEncodeValue<TCoders>['Some']
  | undefined;
export type OptionDecodeData<TCoders extends Record<string, Coder>> =
  EnumDecodeValue<TCoders>[keyof TCoders];
export type OptionCoder<TCoders extends Record<string, Coder>> = Coder<
  OptionEncodeValue<TCoders>,
  OptionDecodeData<TCoders>
>;

export const option = <TCoders extends Record<string, Coder>>(
  coders: TCoders
): OptionCoder<TCoders> => {
  const valueCoder = enumCoder(coders, OPTION_TYPE);
  return {
    type: OPTION_TYPE,
    encode: (value: Option<unknown>): Uint8Array => {
      const input: SwayOption<unknown> = value === undefined ? 'None' : { Some: value };
      return assertEncode(
        valueCoder.encode,
        input as unknown as EnumEncodeValue<TCoders>,
        errors.invalidValue(OPTION_TYPE, input)
      );
    },
    decode: (data: Uint8Array, initialOffset = 0): [OptionDecodeData<TCoders>, number] => {
      const [decoded, offset] = assertDecode(
        valueCoder.decode,
        data,
        initialOffset,
        errors.malformedBytes(OPTION_TYPE, data)
      );
      const optionValue = typeof decoded === 'string' ? undefined : decoded.Some;
      return [optionValue as OptionDecodeData<TCoders>, offset];
    },
  };
};
