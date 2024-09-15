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

export const enumCoder = <TCoders extends Record<string, Coder>>(opts: { coders: TCoders }) => {
  const encodedLength = Object.values(opts.coders).reduce(
    (min, coder) => Math.min(min, coder.encodedLength),
    0
  );
  return {
    encodedLength,
    encode: (value: EnumEncodeValue<TCoders>): Uint8Array => {
      const caseKey = Object.keys(value)[0];
      const valueCoder = opts.coders[caseKey];
      const encodedValue = valueCoder.encode(value[caseKey]);
      const caseIndex = Object.keys(opts.coders).indexOf(caseKey);

      const padding = new Uint8Array(encodedLength - valueCoder.encodedLength);
      return concat([u64.encode(caseIndex), padding, encodedValue]);
    },
    decode: (data: Uint8Array): EnumDecodeValue<TCoders> => {
      const caseIndex = u64.decode(data).toNumber();
      const caseKey = Object.keys(opts.coders)[caseIndex];
      const valueCoder = opts.coders[caseKey];
      const decoded = valueCoder.decode(data);
      return { [caseKey]: decoded } as EnumDecodeValue<TCoders>;
    },
  };
};

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
