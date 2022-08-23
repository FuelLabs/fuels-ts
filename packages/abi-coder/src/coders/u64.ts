import { zeroPad } from '@ethersproject/bytes';
import { toHex, toArray } from '@fuel-ts/math';

import Coder from './abstract-coder';

export default class U64Coder extends Coder<string, string> {
  constructor() {
    super('u64', 'u64', 8);
  }

  encode(value: string): Uint8Array {
    let bytes;

    try {
      bytes = toArray(value);
    } catch (error) {
      this.throwError(`Invalid ${this.type}`, value);
    }

    if (bytes.length > 8) {
      this.throwError(`Invalid ${this.type}. Too many bytes.`, value);
    }

    return zeroPad(bytes, 8);
  }

  decode(data: Uint8Array, offset: number): [string, number] {
    let bytes = data.slice(offset, offset + 8);
    bytes = bytes.slice(0, 8);

    // const [num, nextOffset] = this.#decodeBigInt(data, offset);
    return [toHex(bytes), offset + 8];
  }
}
