/* eslint-disable import/prefer-default-export */
import type { BigNumberish } from '@ethersproject/bignumber';
import { BigNumber } from '@ethersproject/bignumber';
import type { BytesLike } from '@ethersproject/bytes';
import { arrayify, concat, hexlify } from '@ethersproject/bytes';
import { Coder } from '@fuel-ts/abi-coder';

const padToBytes = 8;

export class ByteArrayCoder extends Coder {
  length: BigNumber;

  constructor(localName: string, length: BigNumberish) {
    super('ByteArray', 'ByteArray', localName);
    this.length = BigNumber.from(length);
  }

  encode(value: BytesLike): Uint8Array {
    const parts: Uint8Array[] = [];

    const data = arrayify(value);
    parts.push(data);
    // Write padding
    const pad = padToBytes - (this.length.toNumber() % padToBytes);
    if (pad % padToBytes) {
      parts.push(new Uint8Array(pad).fill(0));
    }

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [string, number] {
    let decoded;
    let o = offset;

    [decoded, o] = [hexlify(data.slice(o, o + this.length.toNumber())), o + this.length.toNumber()];
    const value = decoded;
    // Read padding
    const pad = padToBytes - (this.length.toNumber() % padToBytes);
    if (pad % padToBytes) {
      [decoded, o] = [null, o + pad];
    }

    return [value, o];
  }
}
