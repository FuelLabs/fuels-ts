import { FuelError, ErrorCode } from '@fuel-ts/errors';
import type { BytesLike } from '@fuel-ts/interfaces';
import { arrayify, hexlify } from '@fuel-ts/utils';
import { createHmac } from 'crypto';

let locked = false;

const COMPUTEHMAC = (
  algorithm: 'sha256' | 'sha512',
  key: Uint8Array,
  data: Uint8Array
): BytesLike => createHmac(algorithm, key).update(data).digest();

let computeHMAC = COMPUTEHMAC;

export function computeHmac(
  algorithm: 'sha256' | 'sha512',
  _key: Uint8Array,
  _data: Uint8Array
): string {
  const key = arrayify(_key, 'key');
  const data = arrayify(_data, 'data');
  return hexlify(computeHMAC(algorithm, key, data));
}
computeHmac._ = COMPUTEHMAC;
computeHmac.lock = () => {
  locked = true;
};
computeHmac.register = (
  func: (algorithm: 'sha256' | 'sha512', key: Uint8Array, data: Uint8Array) => BytesLike
) => {
  if (locked) {
    throw new FuelError(ErrorCode.HASHER_LOCKED, 'computeHmac is locked');
  }
  computeHMAC = func;
};
Object.freeze(computeHmac);
