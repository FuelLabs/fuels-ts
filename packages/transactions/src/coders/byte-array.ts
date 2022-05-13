import type { BytesLike } from '@ethersproject/bytes';
import { arrayify, concat, hexlify } from '@ethersproject/bytes';
import { Coder } from '@fuel-ts/abi-coder';

const padToBytes = 8;

export class ByteArrayCoder extends Coder {
  length: number;

  constructor(localName: string, length: number) {
    super('ByteArray', 'ByteArray', localName);
    this.length = length;
  }

  encode(value: BytesLike): Uint8Array {
    const parts: Uint8Array[] = [];

    const data = arrayify(value);
    parts.push(data);
    // Write padding
    const pad = padToBytes - (this.length % padToBytes);
    if (pad % padToBytes) {
      parts.push(new Uint8Array(pad).fill(0));
    }

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [string, number] {
    let decoded;
    let o = offset;

    [decoded, o] = [hexlify(data.slice(o, o + this.length)), o + this.length];
    const value = decoded;
    // Read padding
    const pad = padToBytes - (this.length % padToBytes);
    if (pad % padToBytes) {
      [decoded, o] = [null, o + pad];
    }

    return [value, o];
  }
}
