import { concat } from '@ethersproject/bytes';
import { toUtf8Bytes, toUtf8String } from '@ethersproject/strings';

import Coder from './abstract-coder';

export default class StringCoder<TLength extends number = number> extends Coder<string, string> {
  length: TLength;
  #paddingLength: number;

  constructor(length: TLength) {
    let paddingLength = (8 - length) % 8;
    paddingLength = paddingLength < 0 ? paddingLength + 8 : paddingLength;
    super('string', `str[${length}]`, length + paddingLength);
    this.length = length;
    this.#paddingLength = paddingLength;
  }

  encode(value: string): Uint8Array {
    if (this.length !== value.length) {
      this.throwError('Value length mismatch during encode', value);
    }

    const encoded = toUtf8Bytes(value);
    const padding = new Uint8Array(this.#paddingLength);
    return concat([encoded, padding]);
  }

  decode(data: Uint8Array, offset: number): [string, number] {
    const bytes = data.slice(offset, offset + this.length);
    const value = toUtf8String(bytes);

    const padding = this.#paddingLength;
    return [value, offset + this.length + padding];
  }
}
