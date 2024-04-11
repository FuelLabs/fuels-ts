import type { BytesLike } from '@fuel-ts/interfaces';
import { createHmac } from 'crypto';

export function computeHmac(
  algorithm: 'sha256' | 'sha512',
  key: Uint8Array,
  data: Uint8Array
): BytesLike {
  return createHmac(algorithm, key).update(data).digest();
}
