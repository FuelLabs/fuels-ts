import type { AbiTypeComponent } from '../../../parser';
import type { Coder, GetCoderFn, GetCoderParams, Option } from '../../abi-coder-types';

import { enumCoder } from './enum';
import type { EnumDecodeValue, EnumEncodeValue } from './enum';

type SwayOption<T> = { None: [] } | { Some: T };

export const option = <TCoders extends Record<string, Coder>>(opts: { coders: TCoders }) => {
  const valueCoder = enumCoder({ ...opts, type: 'option' });
  return {
    type: 'option',
    encodedLength: (data: Uint8Array) => valueCoder.encodedLength(data),
    encode: (value: Option<unknown>): Uint8Array => {
      const input: SwayOption<unknown> = value !== undefined ? { Some: value } : { None: [] };
      return valueCoder.encode(input as unknown as EnumEncodeValue<TCoders>);
    },
    decode: (data: Uint8Array): EnumDecodeValue<TCoders> => {
      const decoded = valueCoder.decode(data);
      const optionValue = decoded && 'Some' in decoded ? decoded.Some : undefined;
      return optionValue as EnumDecodeValue<TCoders>;
    },
  };
};

option.fromAbi = ({ type: { components } }: GetCoderParams, getCoder: GetCoderFn) => {
  if (!components) {
    throw new Error(`The provided Enum type is missing an item of 'components'.`);
  }

  const coders = components.reduce((obj, component: AbiTypeComponent) => {
    const o: Record<string, Coder> = obj;

    o[component.name] = getCoder(component);
    return o;
  }, {});

  return option({ coders });
};
