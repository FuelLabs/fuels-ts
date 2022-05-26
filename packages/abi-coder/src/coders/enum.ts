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

  constructor(name: string, coders: TCoders) {
    super('enum', `enum ${name}`);
    this.name = name;
    this.coders = coders;
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
    return concat([new NumberCoder('u64').encode(caseIndex), encodedValue]);
  }

  decode(data: Uint8Array, offset: number): [DecodedValueOf<TCoders>, number] {
    let newOffset = offset;

    let decoded;
    [decoded, newOffset] = new NumberCoder('u64').decode(data, newOffset);
    const caseIndex = decoded;
    const caseKey = Object.keys(this.coders)[Number(caseIndex)];
    const valueCoder = this.coders[caseKey];
    [decoded, newOffset] = valueCoder.decode(data, newOffset);

    return [{ [caseKey]: decoded } as DecodedValueOf<TCoders>, newOffset];
  }
}
