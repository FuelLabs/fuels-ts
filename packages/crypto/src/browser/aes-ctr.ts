import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { arrayify } from '@fuel-ts/utils';

import type { CryptoApi, Keystore } from '../types';

import { bufferFromString } from './bufferFromString';
import { pbkdf2 } from './pbkdf2';
import { randomBytes } from './randomBytes';
import { stringFromBuffer } from './stringFromBuffer';

const ALGORITHM = 'AES-CTR';

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
    data: stringFromBuffer(new Uint8Array(encBuffer)),
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
    throw new FuelError(ErrorCode.INVALID_CREDENTIALS, 'Invalid credentials.');
  }
};
