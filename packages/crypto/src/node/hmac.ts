import { arrayify, hexlify } from '@fuel-ts/utils';
import { createHmac } from 'crypto';

export function computeHmac(
  algorithm: 'sha256' | 'sha512',
  _key: Uint8Array,
  _data: Uint8Array
): string {
  const key = arrayify(_key, 'key');
  const data = arrayify(_data, 'data');
  return hexlify(createHmac(algorithm, key).update(data).digest());
}
