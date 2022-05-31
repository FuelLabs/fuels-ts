import { concat } from '@ethersproject/bytes';
import { toUtf8Bytes, toUtf8String } from '@ethersproject/strings';

import Coder from './abstract-coder';

export default class StringCoder<TLength extends number = number> extends Coder<string, string> {
  length: TLength;

  constructor(length: TLength) {
    super('string', `str[${length}]`);
    this.length = length;
  }

  encode(value: string): Uint8Array {
    let pad = (8 - this.length) % 8;
    pad = pad < 0 ? pad + 8 : pad;
    const str = toUtf8Bytes(value.slice(0, this.length));
    return concat([str, new Uint8Array(pad)]);
  }

  decode(data: Uint8Array, offset: number): [string, number] {
    let pad = (8 - this.length) % 8;
    pad = pad < 0 ? pad + 8 : pad;

    const bytes = data.slice(offset, offset + this.length);
    const value = toUtf8String(bytes);
    return [value, offset + this.length + pad];
  }
}
