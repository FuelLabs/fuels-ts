import { concat } from '@ethersproject/bytes';

import { WORD_SIZE } from '../constants';

import type { TypesOfCoder } from './abstract-coder';
import Coder from './abstract-coder';
import U64Coder from './u64';

const VEC_PROPERTY_SPACE = 3; // ptr + cap + length

type InputValueOf<TCoder extends Coder> = Array<TypesOfCoder<TCoder>['Input']>;
type DecodedValueOf<TCoder extends Coder> = Array<TypesOfCoder<TCoder>['Decoded']>;

export default class VecCoder<TCoder extends Coder> extends Coder<
  InputValueOf<TCoder>,
  DecodedValueOf<TCoder>
> {
  coder: TCoder;

  constructor(coder: TCoder) {
    super('struct', `struct Vec`, 0);
    this.coder = coder;
  }

  static getBaseOffset(): number {
    return VEC_PROPERTY_SPACE * WORD_SIZE;
  }

  getEncodedVectorData(value: InputValueOf<TCoder>): Uint8Array {
    if (!Array.isArray(value)) {
      this.throwError('expected array value', value);
    }

    const encodedValues = Array.from(value).map((v) => this.coder.encode(v));
    return concat(encodedValues);
  }

  encode(value: InputValueOf<TCoder>): Uint8Array {
    if (!Array.isArray(value)) {
      this.throwError('expected array value', value);
    }

    const parts: Uint8Array[] = [];
    // pointer (ptr)
    const pointer = this.offset || 0;
    parts.push(new U64Coder().encode(pointer));
    // capacity (cap)
    parts.push(new U64Coder().encode(value.length));
    // length (len)
    parts.push(new U64Coder().encode(value.length));

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [DecodedValueOf<TCoder>, number] {
    this.throwError('unexpected Vec decode', 'not implemented');
    return [undefined as unknown as DecodedValueOf<TCoder>, offset];
  }
}
