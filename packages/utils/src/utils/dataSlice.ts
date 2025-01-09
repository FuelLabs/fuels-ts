import { ErrorCode, FuelError } from '@fuel-ts/errors';

import { arrayify } from './arrayify';
import type { BytesLike } from './arrayify';
import { hexlify } from './hexlify';

/**
 *  Returns a hex string by slicing data from the start offset to the end offset.
 *
 * @param data - the data to be sliced.
 * @param start - the start offset (default: 0).
 * @param end - the end offset (default: length of data).
 * @returns - a sliced hex string from start to end.
 */
export function dataSlice(data: BytesLike, start?: number, end?: number): string {
  const bytes = arrayify(data);
  if (end != null && end > bytes.length) {
    throw new FuelError(ErrorCode.INVALID_DATA, 'cannot slice beyond data bounds');
  }
  return hexlify(bytes.slice(start == null ? 0 : start, end == null ? bytes.length : end));
}
