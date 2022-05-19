import { arrayify } from '@ethersproject/bytes';
import { pbkdf2 } from '@ethersproject/pbkdf2';

import { strategy } from './universal-crypto';

export interface Keystore {
  data: string;
  iv: string;
  salt: string;
}

export function bufferFromString(
  string: string,
  encoding: 'utf-8' | 'base64' = 'base64'
): Uint8Array {
  if (strategy === 'Node') {
    return Buffer.from(string, encoding);
  }
  if (encoding === 'utf-8') {
    return new TextEncoder().encode(string);
  }

  return new Uint8Array(
    atob(string)
      .split('')
      .map((c) => c.charCodeAt(0))
  );
}

export function stringFromBuffer(
  buffer: Uint8Array,
  encoding: 'utf-8' | 'base64' = 'base64'
): string {
  if (strategy === 'Node') {
    return Buffer.from(buffer).toString(encoding);
  }

  return btoa(String.fromCharCode.apply(null, new Uint8Array(buffer) as unknown as number[]));
}

/**
 * Generate a pbkdf2 key from a password and random salt
 */
export function keyFromPassword(password: string, saltBuffer: Uint8Array): Uint8Array {
  const passBuffer = bufferFromString(String(password).normalize('NFKC'), 'utf-8');
  const key = pbkdf2(passBuffer, saltBuffer, 100000, 32, 'sha256');

  return arrayify(key);
}
