import { concat } from '@fuel-ts/utils';
import type { RequireExactlyOne } from 'type-fest';

import type { AbiTypeComponent } from '../../../parser';
import type { Coder, GetCoderFn, GetCoderParams, TypesOfCoder } from '../../abi-coder-types';

import { u64 } from './fixed';

/**
 * `enum` coder
 */
export type EnumEncodeValue<TCoders extends Record<string, Coder>> = RequireExactlyOne<{
  [P in keyof TCoders]: TypesOfCoder<TCoders[P]>['Input'];
}>;
export type EnumDecodeValue<TCoders extends Record<string, Coder>> = RequireExactlyOne<{
  [P in keyof TCoders]: TypesOfCoder<TCoders[P]>['Decoded'];
}>;

export const enumCoder = <TCoders extends Record<string, Coder>>(opts: { coders: TCoders }) => ({
  type: 'enum',
  encodedLength: (data: Uint8Array) => {
    const caseIndex = u64.decode(data).toNumber();
    const caseKey = Object.keys(opts.coders)[caseIndex];
    const valueCoder = opts.coders[caseKey];
    return u64.encodedLength(data) + valueCoder.encodedLength(data);
  },
  encode: (value: EnumEncodeValue<TCoders>): Uint8Array => {
    // Obtain the case key and index
    const [caseKey] = Object.keys(value);
    const caseIndex = Object.keys(opts.coders).indexOf(caseKey);

    // Encode the case value
    const valueCoder = opts.coders[caseKey];
    const encodedValue = valueCoder.encode(value[caseKey]);

    return concat([u64.encode(caseIndex), encodedValue]);
  },
  decode: (data: Uint8Array): EnumDecodeValue<TCoders> => {
    // Decode the case index
    const caseBytesLength = u64.encodedLength(data);
    const caseBytes = data.slice(0, caseBytesLength);
    const caseIndex = u64.decode(caseBytes).toNumber();
    const caseKey = Object.keys(opts.coders)[caseIndex];

    // Decode the case value
    const caseValueCoder = opts.coders[caseKey];
    const caseValueBytes = data.slice(caseBytesLength, data.length);
    const caseValue = caseValueCoder.decode(caseValueBytes);
    return { [caseKey]: caseValue } as EnumDecodeValue<TCoders>;
  },
});

enumCoder.fromAbi = ({ type: { components } }: GetCoderParams, getCoder: GetCoderFn) => {
  if (!components) {
    throw new Error(`The provided Enum type is missing an item of 'components'.`);
  }

  const coders = components.reduce((obj, component: AbiTypeComponent) => {
    const o: Record<string, Coder> = obj;

    o[component.name] = getCoder(component);
    return o;
  }, {});

  return enumCoder({ coders });
};
