import type { BytesLike } from '@fuel-ts/interfaces';
import { arrayify } from '@fuel-ts/utils';
import { ripemd160 as noble_ripemd160 } from '@noble/hashes/ripemd160';

export function ripemd160(_data: BytesLike): Uint8Array {
  const data = arrayify(_data, 'data');
  return noble_ripemd160(data);
}
