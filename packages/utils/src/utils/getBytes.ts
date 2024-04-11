import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { BytesLike } from '@fuel-ts/interfaces';

export function getBytes(value: BytesLike, name?: string, copy?: boolean): Uint8Array {
  if (value instanceof Uint8Array) {
    if (copy) {
      return new Uint8Array(value);
    }
    return value;
  }

  if (typeof value === 'string' && value.match(/^0x([0-9a-f][0-9a-f])*$/i)) {
    const result = new Uint8Array((value.length - 2) / 2);
    let offset = 2;
    for (let i = 0; i < result.length; i++) {
      result[i] = parseInt(value.substring(offset, offset + 2), 16);
      offset += 2;
    }
    return result;
  }

  throw new FuelError(ErrorCode.INVALID_DATA, `invalid data - ${name || ''}`);
}
