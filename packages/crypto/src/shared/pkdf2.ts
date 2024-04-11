import type { BytesLike } from '@fuel-ts/interfaces';
import { pbkdf2Sync } from 'crypto';

export function pbkdf2(
  password: Uint8Array,
  salt: Uint8Array,
  iterations: number,
  keylen: number,
  algo: 'sha256' | 'sha512'
): BytesLike {
  return pbkdf2Sync(password, salt, iterations, keylen, algo);
}
