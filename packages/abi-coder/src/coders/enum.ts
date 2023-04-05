import { concat } from '@ethersproject/bytes';
import { toNumber } from '@fuel-ts/math';
import type { RequireExactlyOne } from 'type-fest';

import type { TypesOfCoder } from './abstract-coder';
import Coder from './abstract-coder';
import U64Coder from './u64';

export type InputValueOf<TCoders extends Record<string, Coder>> = RequireExactlyOne<{
  [P in keyof TCoders]: TypesOfCoder<TCoders[P]>['Input'];
}>;
export type DecodedValueOf<TCoders extends Record<string, Coder>> = RequireExactlyOne<{
  [P in keyof TCoders]: TypesOfCoder<TCoders[P]>['Decoded'];
}>;

export default class EnumCoder<TCoders extends Record<string, Coder>> extends Coder<
  InputValueOf<TCoders>,
  DecodedValueOf<TCoders>
> {
  name: string;
  coders: TCoders;
  #caseIndexCoder: U64Coder;
  #encodedValueSize: number;

  constructor(name: string, coders: TCoders) {
    const caseIndexCoder = new U64Coder();
    const encodedValueSize = Object.values(coders).reduce(
      (max, coder) => Math.max(max, coder.encodedLength),
      0
    );
    super('enum', `enum ${name}`, caseIndexCoder.encodedLength + encodedValueSize);
    this.name = name;
    this.coders = coders;
    this.#caseIndexCoder = caseIndexCoder;
    this.#encodedValueSize = encodedValueSize;
  }

  #encodeNativeEnum(value: number): Uint8Array {
    const valueCoder = Object.values(this.coders)[value];
    const encodedValue = valueCoder.encode([]);

    const padding = new Uint8Array(this.#encodedValueSize - valueCoder.encodedLength);
    return concat([this.#caseIndexCoder.encode(value), padding, encodedValue]);
  }

  encode(value: InputValueOf<TCoders>): Uint8Array {
    if (typeof value === 'number') {
      return this.#encodeNativeEnum(value);
    }

    const [caseKey, ...empty] = Object.keys(value);
    if (!caseKey) {
      throw new Error('A field for the case must be provided');
    }
    if (empty.length !== 0) {
      throw new Error('Only one field must be provided');
    }
    const valueCoder = this.coders[caseKey];
    const caseIndex = Object.keys(this.coders).indexOf(caseKey);
    const encodedValue = valueCoder.encode(value[caseKey]);

    const padding = new Uint8Array(this.#encodedValueSize - valueCoder.encodedLength);
    return concat([this.#caseIndexCoder.encode(caseIndex), padding, encodedValue]);
  }

  #decodeNativeEnum(caseIndex: number, newOffset: number): [DecodedValueOf<TCoders>, number] {
    return [caseIndex as unknown as DecodedValueOf<TCoders>, newOffset];
  }

  decode(data: Uint8Array, offset: number): [DecodedValueOf<TCoders>, number] {
    let newOffset = offset;

    let decoded;
    [decoded, newOffset] = new U64Coder().decode(data, newOffset);
    const caseIndex = toNumber(decoded);
    const caseKey = Object.keys(this.coders)[caseIndex];
    if (!caseKey) {
      throw new Error(`Invalid caseIndex "${caseIndex}". Valid cases: ${Object.keys(this.coders)}`);
    }

    const valueCoder = this.coders[caseKey];
    const padding = this.#encodedValueSize - valueCoder.encodedLength;
    newOffset += padding;
    [decoded, newOffset] = valueCoder.decode(data, newOffset);

    if (
      Object.values(this.coders).every(
        // @ts-expect-error complicated types
        ({ type, coders }) => type === '()' && JSON.stringify(coders) === JSON.stringify([])
      )
    ) {
      return this.#decodeNativeEnum(caseIndex, newOffset);
    }

    return [{ [caseKey]: decoded } as DecodedValueOf<TCoders>, newOffset];
  }
}
