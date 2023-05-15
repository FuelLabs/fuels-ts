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

  decode(_data: Uint8Array, _offset: number): [DecodedValueOf<TCoder>, number] {
    const ptr = data.slice(0, 8);
    const cap = data.slice(8, 16);
    const len = data.slice(16, 24);
    // the SDK knows that the return type from the contract is a Vec and knows it element type.
    console.log('coder', this.coder);
    console.log('data', data);
    console.log('ptr', ptr);
    console.log('cap', cap);
    console.log('len', len);
    console.log('offset', offset);
    this.throwError('unexpected Vec decode', 'not implemented');
  }
}
