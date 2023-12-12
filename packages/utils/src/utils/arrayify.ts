import { FuelError, ErrorCode } from '@fuel-ts/errors';
import type { BytesLike } from 'ethers';

/**
 * Converts a bytes-like value to a `Uint8Array`.
 *
 * @param value - the value to convert to a Uint8Array
 * @returns the Uint8Array
 */
export const arrayify = (value: BytesLike): Uint8Array => {
  // Return buffers as a new byte array
  if (value instanceof Uint8Array) {
    return new Uint8Array(value);
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

  throw new FuelError(ErrorCode.PARSE_FAILED, 'invalid BytesLike value');
};
