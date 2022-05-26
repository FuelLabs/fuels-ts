import type { BytesLike } from '@ethersproject/bytes';
import { arrayify, concat, hexlify } from '@ethersproject/bytes';
import { Coder } from '@fuel-ts/abi-coder';

const padToBytes = 8;

export class ByteArrayCoder extends Coder<BytesLike, string> {
  length: number;

  constructor(length: number) {
    super(
      'ByteArray',
      // While this might sound like a [u8; N] coder it's actually not.
      // A [u8; N] coder would pad every u8 to 8 bytes which would
      // make every u8 have the same size as a u64.
      // We are packing four u8s into u64s here, avoiding this padding.
      `[u64; ${length + padToBytes - (length % padToBytes)}]`
    );
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
