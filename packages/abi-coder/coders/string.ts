/* eslint-disable class-methods-use-this */
import { toUtf8Bytes, toUtf8String } from '@ethersproject/strings';
import { concat } from '@ethersproject/bytes';
import Coder from './abstract-coder';

export default class StringCoder extends Coder {
  constructor(localName: string) {
    super('string', 'string', localName);
  }

  encode(value: string, length: number): Uint8Array {
    let pad = (8 - length) % 8;
    pad = pad < 0 ? pad + 8 : pad;

    return concat([toUtf8Bytes(value.slice(0, length)), new Uint8Array(pad)]);
  }

  decode(data: Uint8Array, offset: number, length: number): [string, number] {
    let pad = (8 - length) % 8;
    pad = pad < 0 ? pad + 8 : pad;

    const bytes = data.slice(offset, offset + length);
    const value = toUtf8String(bytes);
    return [value, offset + length + pad];
  }
}
