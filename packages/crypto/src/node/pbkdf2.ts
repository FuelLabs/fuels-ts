import type { BytesLike } from '@fuel-ts/interfaces';
import { getBytes, hexlify } from '@fuel-ts/utils';
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
  const password = getBytes(_password, 'password');
  const salt = getBytes(_salt, 'salt');
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
    throw new Error('pbkdf2 is locked');
  }
  pBkdf2 = func;
};
Object.freeze(pbkdf2);
