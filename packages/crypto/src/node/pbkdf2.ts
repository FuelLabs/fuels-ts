import type { BytesLike } from '@fuel-ts/utils';
import { arrayify, hexlify } from '@fuel-ts/utils';
import { pbkdf2Sync } from 'crypto';

export function pbkdf2(
  _password: BytesLike,
  _salt: BytesLike,
  iterations: number,
  keylen: number,
  algo: 'sha256' | 'sha512'
): string {
  const password = arrayify(_password, 'password');
  const salt = arrayify(_salt, 'salt');
  return hexlify(pbkdf2Sync(password, salt, iterations, keylen, algo));
}
