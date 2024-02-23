import { FuelError, ErrorCode } from '@fuel-ts/errors';
import crypto from 'crypto';
import { getBytesCopy, pbkdf2 } from 'ethers';

import type { CryptoApi, Keystore } from '../types';

import { bufferFromString } from './bufferFromString';
import { randomBytes } from './randomBytes';
import { stringFromBuffer } from './stringFromBuffer';

const ALGORITHM = 'aes-256-ctr';

/**
 * Generate a pbkdf2 key from a password and random salt
 */
export const keyFromPassword: CryptoApi['keyFromPassword'] = (
  password: string,
  saltBuffer: Uint8Array
): Uint8Array => {
  const passBuffer = bufferFromString(String(password).normalize('NFKC'), 'utf-8');
  const key = pbkdf2(passBuffer, saltBuffer, 100000, 32, 'sha256');

  return getBytesCopy(key);
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
  const dataBuffer = Uint8Array.from(Buffer.from(JSON.stringify(data), 'utf-8'));

  const cipher = await crypto.createCipheriv(ALGORITHM, secret, iv);
  let cipherData = cipher.update(dataBuffer);
  cipherData = Buffer.concat([cipherData, cipher.final()]);

  return {
    data: stringFromBuffer(cipherData),
    iv: stringFromBuffer(iv),
    salt: stringFromBuffer(salt),
  };
};

/**
 * Given a password and a keystore object, decrypts the text and returns
 * the resulting value
 * 
 * @throws {FuelError} {ErrorCode.INVALID_CREDENTIALS}
 * When the password provided is incorrect
 */
export const decrypt: CryptoApi['decrypt'] = async <T>(
  password: string,
  keystore: Keystore
): Promise<T> => {
  const iv = bufferFromString(keystore.iv);
  const salt = bufferFromString(keystore.salt);
  const secret = keyFromPassword(password, salt);
  const encryptedText = bufferFromString(keystore.data);

  const decipher = await crypto.createDecipheriv(ALGORITHM, secret, iv);
  const decrypted = decipher.update(encryptedText);
  const deBuff = Buffer.concat([decrypted, decipher.final()]);
  const decryptedData = Buffer.from(deBuff).toString('utf-8');

  try {
    return JSON.parse(decryptedData);
  } catch {
    throw new FuelError(ErrorCode.INVALID_CREDENTIALS, 'Invalid credentials.');
  }
};
