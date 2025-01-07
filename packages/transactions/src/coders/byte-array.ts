import { Coder } from '@fuel-ts/abi-coder';
import type { BytesLike } from '@fuel-ts/utils';
import { concat, hexlify, arrayify } from '@fuel-ts/utils';

export class ByteArrayCoder extends Coder<BytesLike, string> {
  length: number;
  #paddingLength: number;

  constructor(length: number) {
    const paddingLength = (8 - (length % 8)) % 8;
    const encodedLength = length + paddingLength;
    super(
      'ByteArray',
      // While this might sound like a [u8; N] coder it's actually not.
      // A [u8; N] coder would pad every u8 to 8 bytes which would
      // make every u8 have the same size as a u64.
      // We are packing four u8s into u64s here, avoiding this padding.
      `[u64; ${encodedLength / 4}]`,
      encodedLength
    );
    this.length = length;
    this.#paddingLength = paddingLength;
  }

  encode(value: BytesLike): Uint8Array {
    const parts: Uint8Array[] = [];

    const data = arrayify(value);
    parts.push(data);
    // Write padding
    if (this.#paddingLength) {
      parts.push(new Uint8Array(this.#paddingLength));
    }

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [string, number] {
    let decoded;
    let o = offset;

    [decoded, o] = [hexlify(data.slice(o, o + this.length)), o + this.length];
    const value = decoded;
    // Read padding
    if (this.#paddingLength) {
      [decoded, o] = [null, o + this.#paddingLength];
    }

    return [value, o];
  }
}
