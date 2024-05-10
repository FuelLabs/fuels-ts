import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { BytesLike } from '@fuel-ts/interfaces';
import { arrayify, hexlify } from '@fuel-ts/utils';
import { pbkdf2Sync } from 'crypto';

let locked = false;

const PBKDF2 = (
  password: Uint8Array,
  salt: Uint8Array,
  iterations: number,
  keylen: number,
  algo: 'sha256' | 'sha512'
): BytesLike => pbkdf2Sync(password, salt, iterations, keylen, algo);

let pBkdf2 = PBKDF2;

export function pbkdf2(
  _password: BytesLike,
  _salt: BytesLike,
  iterations: number,
  keylen: number,
  algo: 'sha256' | 'sha512'
): string {
  const password = arrayify(_password, 'password');
  const salt = arrayify(_salt, 'salt');
  return hexlify(pBkdf2(password, salt, iterations, keylen, algo));
}
pbkdf2._ = PBKDF2;
pbkdf2.lock = (): void => {
  locked = true;
};
pbkdf2.register = (
  func: (
    password: Uint8Array,
    salt: Uint8Array,
    iterations: number,
    keylen: number,
    algo: 'sha256' | 'sha512'
  ) => BytesLike
) => {
  if (locked) {
    throw new FuelError(ErrorCode.HASHER_LOCKED, 'pbkdf2 is locked');
  }
  pBkdf2 = func;
};
Object.freeze(pbkdf2);
