import { concat } from '@ethersproject/bytes';

import type { DecodedValue, Values } from './abstract-coder';
import Coder from './abstract-coder';

export default class ArrayCoder extends Coder {
  coder: Coder;

  length: number;

  constructor(coder: Coder, length: number, localName: string) {
    super('array', 'array', localName);
    this.coder = coder;
    this.length = length;
  }

  // TODO: Explict set any to be a type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  encode(value: Array<Values>): any {
    if (!Array.isArray(value)) {
      this.throwError('expected array value', value);
    }

    if (this.length !== value.length) {
      this.throwError('Types/values length mismatch', value);
    }

    return concat(Array.from(value).map((v) => this.coder.encode(v)));
  }

  decode(data: Uint8Array, offset: number): [DecodedValue, number] {
    const values = [];
    let newOffset = offset;
    for (let i = 0; i < this.length; i += 1) {
      const [value, tempOffset] = this.coder.decode(data, newOffset);
      newOffset = tempOffset;
      values.push(value);
    }

    return [values, newOffset];
  }
}
