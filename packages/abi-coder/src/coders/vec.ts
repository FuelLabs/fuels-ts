import { concat } from '@ethersproject/bytes';

import type { TypesOfCoder } from './abstract-coder';
import Coder from './abstract-coder';
import NumberCoder from './number';

const OFFSET = 14440;
const WORD_SIZE = 8;
const POINTER_START = 3; // ptr + cap + length

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

  encode(value: InputValueOf<TCoder>): any {
    if (!Array.isArray(value)) {
      this.throwError('expected array value', value);
    }

    const parts: Uint8Array[] = [];
    // pointer (ptr)
    parts.push(new NumberCoder('u64').encode(OFFSET + POINTER_START * WORD_SIZE));
    // capacity (cap)
    parts.push(new NumberCoder('u64').encode(value.length + 1));
    // length (len)
    parts.push(new NumberCoder('u64').encode(value.length));
    // data
    parts.push(concat(Array.from(value).map((v) => this.coder.encode(v))));

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [DecodedValueOf<TCoder>, number] {
    this.throwError('unexpected Vec decode', 'not implemented');
    return [undefined as unknown as DecodedValueOf<TCoder>, offset];
  }
}
