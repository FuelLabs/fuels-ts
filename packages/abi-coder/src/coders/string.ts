import { concat } from '@ethersproject/bytes';
import { toUtf8Bytes, toUtf8String } from '@ethersproject/strings';

import Coder from './abstract-coder';

export default class StringCoder extends Coder {
  length: number;

  constructor(localName: string, length: number) {
    super('string', 'string', localName);
    this.length = length;
  }

  encode(value: string): Uint8Array {
    let pad = (8 - this.length) % 8;
    pad = pad < 0 ? pad + 8 : pad;

    return concat([toUtf8Bytes(value.slice(0, this.length)), new Uint8Array(pad)]);
  }

  decode(data: Uint8Array, offset: number): [string, number] {
    let pad = (8 - this.length) % 8;
    pad = pad < 0 ? pad + 8 : pad;

    const bytes = data.slice(offset, offset + this.length);
    const value = toUtf8String(bytes);
    return [value, offset + this.length + pad];
  }
}
