import { concat } from '@fuel-ts/utils';
import type { RequireExactlyOne } from 'type-fest';

import type { AbiTypeComponent } from '../../../parser';
import type {
  AbstractCoder,
  Coder,
  GetCoderFn,
  GetCoderParams,
  TypesOfCoder,
} from '../../abi-coder-types';

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

export const CASE_KEY_WORD_LENGTH = 8;

export const enumCoder = <TCoders extends Record<string, AbstractCoder>>(opts: {
  coders: TCoders;
  type?: string;
}) => {
  const isNativeValue = (value: EnumEncodeValue<TCoders>) => typeof value === 'string';
  const isNativeCoder = (coder: Coder) => opts.type !== 'option' && coder.type === 'void';

  return {
    type: opts.type ?? 'enum',
    encodedLength: (data: Uint8Array) => {
      // Get the index for the case
      const caseIndexBytes = data.slice(0, CASE_KEY_WORD_LENGTH);
      const caseIndex = u64.decode(caseIndexBytes).toNumber();

      // Get the coder for the case
      const caseCoder = Object.values(opts.coders)[caseIndex];
      const caseValueBytes = data.slice(CASE_KEY_WORD_LENGTH);
      const caseValueLength = caseCoder.encodedLength(caseValueBytes);
      return CASE_KEY_WORD_LENGTH + caseValueLength;
    },
    encode: (value: EnumEncodeValue<TCoders>): Uint8Array => {
      if (isNativeValue(value)) {
        if (!opts.coders[value]) {
          throw new Error("Unable to encode native enum as coder can't be found");
        }

        const valueCoder = opts.coders[value];
        const encodedValue = valueCoder.encode([]);
        const caseIndex = Object.keys(opts.coders).indexOf(value);

        // @TODO investigate issue with the EnumCoder.
        // const padding = new Uint8Array(this.#encodedValueSize - valueCoder.encodedLength);
        // return concat([u64.encode(caseIndex), padding, encodedValue]);

        return concat([u64.encode(caseIndex), encodedValue]);
      }

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

      if (isNativeCoder(caseValueCoder)) {
        return caseKey as unknown as EnumDecodeValue<TCoders>;
      }

      return { [caseKey]: caseValue } as EnumDecodeValue<TCoders>;
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
