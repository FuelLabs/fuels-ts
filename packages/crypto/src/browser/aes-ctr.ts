import { arrayify } from '@ethersproject/bytes';
import { pbkdf2 } from '@ethersproject/pbkdf2';

import type { CryptoApi, Encoding, Keystore } from '../types';

import { btoa } from './crypto';
import { randomBytes } from './randomBytes';

const ALGORITHM = 'AES-CTR';

export const bufferFromString: CryptoApi['bufferFromString'] = (
  string: string,
  encoding: Encoding = 'base64'
): Uint8Array => {
  switch (encoding) {
    case 'utf-8': {
      return new TextEncoder().encode(string);
    }

    case 'base64': {
      const binaryString = atob(string);
      const len = binaryString.length;
      const bytes = new Uint8Array(len).map((_, i) => binaryString.charCodeAt(i));

      return bytes;
    }

    case 'hex':
    default: {
      const bufferLength = string.length / 2;

      const buffer = new Uint8Array(bufferLength).map((_, i) => {
        const startIndex = i * 2;
        const byteValue = parseInt(string.substring(startIndex, startIndex + 2), 16);
        return byteValue;
      });

      return buffer;
    }
  }
};

export const stringFromBuffer: CryptoApi['stringFromBuffer'] = (
  buffer: Uint8Array,
  _encoding: 'utf-8' | 'base64' = 'base64'
): string => btoa(String.fromCharCode.apply(null, new Uint8Array(buffer) as unknown as number[]));

/**
 * Generate a pbkdf2 key from a password and random salt
 */
export const keyFromPassword: CryptoApi['keyFromPassword'] = (
  password: string,
  saltBuffer: Uint8Array
): Uint8Array => {
  const passBuffer = bufferFromString(String(password).normalize('NFKC'), 'utf-8');
  const key = pbkdf2(passBuffer, saltBuffer, 100000, 32, 'sha256');

  return arrayify(key);
};

/**
 * Encrypts a data object that can be any serializable value using
 * a provided password.
 *
 * @returns Promise<Keystore> object
 */
export const encrypt: CryptoApi['encrypt'] = async <T>(
  password: string,
  data: T
): Promise<Keystore> => {
  const iv = randomBytes(16);
  const salt = randomBytes(32);
  const secret = keyFromPassword(password, salt);
  const dataString = JSON.stringify(data);
  const dataBuffer = bufferFromString(dataString, 'utf-8');
  const alg = {
    name: ALGORITHM,
    counter: iv,
    length: 64,
  };
  const key = await crypto.subtle.importKey('raw', secret, alg, false, ['encrypt']);
  const encBuffer = await crypto.subtle.encrypt(alg, key, dataBuffer);

  return {
    data: stringFromBuffer(encBuffer),
    iv: stringFromBuffer(iv),
    salt: stringFromBuffer(salt),
  };
};

/**
 * Given a password and a keystore object, decrypts the text and returns
 * the resulting value
 */
export const decrypt: CryptoApi['decrypt'] = async <T>(
  password: string,
  keystore: Keystore
): Promise<T> => {
  const iv = bufferFromString(keystore.iv);
  const salt = bufferFromString(keystore.salt);
  const secret = keyFromPassword(password, salt);
  const encryptedText = bufferFromString(keystore.data);

  const alg = {
    name: ALGORITHM,
    counter: iv,
    length: 64,
  };
  const key = await crypto.subtle.importKey('raw', secret, alg, false, ['decrypt']);

  const ptBuffer = await crypto.subtle.decrypt(alg, key, encryptedText);
  const decryptedData = new TextDecoder().decode(ptBuffer);

  try {
    return JSON.parse(decryptedData);
  } catch {
    throw new Error('Invalid credentials');
  }
};
