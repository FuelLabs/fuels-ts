import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { BytesLike } from '@fuel-ts/interfaces';

import { getBytes } from './getBytes';
import { hexlify } from './hexlify';
/**
 *  Returns a DataHexString by slicing data from the start
 *  offset to the end offset.
 *
 */
export function dataSlice(data: BytesLike, start?: number, end?: number): string {
  const bytes = getBytes(data);
  if (end != null && end > bytes.length) {
    throw new FuelError(ErrorCode.BUFFER_OVERRUN, 'cannot slice beyond data bounds');
  }
  return hexlify(bytes.slice(start == null ? 0 : start, end == null ? bytes.length : end));
}
