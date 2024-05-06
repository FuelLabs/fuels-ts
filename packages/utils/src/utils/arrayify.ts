import { FuelError, ErrorCode } from '@fuel-ts/errors';
import type { BytesLike } from '@fuel-ts/interfaces';

/**
 * Get a typed Uint8Array from a BytesLike object.
 *
 * @param value - the BytesLike data.
 * @param name - a display name for the error result.
 * @param copy - create a copy of the original data (if applicable).
 * @returns - a typed Uint8Array.
 */
export const arrayify = (value: BytesLike, name?: string, copy: boolean = true): Uint8Array => {
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
};
