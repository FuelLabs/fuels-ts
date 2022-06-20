import { concat } from '@ethersproject/bytes';
import type { RequireExactlyOne } from 'type-fest';

import type { TypesOfCoder } from './abstract-coder';
import Coder from './abstract-coder';
import NumberCoder from './number';

type InputValueOf<TCoders extends Record<string, Coder>> = RequireExactlyOne<{
  [P in keyof TCoders]: TypesOfCoder<TCoders[P]>['Input'];
}>;
type DecodedValueOf<TCoders extends Record<string, Coder>> = RequireExactlyOne<{
  [P in keyof TCoders]: TypesOfCoder<TCoders[P]>['Decoded'];
}>;

export default class EnumCoder<TCoders extends Record<string, Coder>> extends Coder<
  InputValueOf<TCoders>,
  DecodedValueOf<TCoders>
> {
  name: string;
  coders: TCoders;
  #caseIndexCoder: NumberCoder<'u64'>;
  #encodedValueSize: number;

  constructor(name: string, coders: TCoders) {
    const caseIndexCoder = new NumberCoder('u64');
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

  encode(value: InputValueOf<TCoders>): Uint8Array {
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

  decode(data: Uint8Array, offset: number): [DecodedValueOf<TCoders>, number] {
    let newOffset = offset;

    let decoded;
    [decoded, newOffset] = new NumberCoder('u64').decode(data, newOffset);
    const caseIndex = decoded;
    const caseKey = Object.keys(this.coders)[Number(caseIndex)];
    if (!caseKey) {
      throw new Error(`Invalid caseIndex "${caseIndex}". Valid cases: ${Object.keys(this.coders)}`);
    }
    const valueCoder = this.coders[caseKey];
    const padding = this.#encodedValueSize - valueCoder.encodedLength;
    newOffset += padding;
    [decoded, newOffset] = valueCoder.decode(data, newOffset);

    return [{ [caseKey]: decoded } as DecodedValueOf<TCoders>, newOffset];
  }
}
