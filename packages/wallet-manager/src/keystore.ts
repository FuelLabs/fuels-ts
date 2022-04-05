import type { BytesLike } from '@ethersproject/bytes';
import { arrayify } from '@ethersproject/bytes';
import { pbkdf2 } from '@ethersproject/pbkdf2';
import { randomBytes } from '@ethersproject/random';
// TODO: Remove EAS and use native crypto libs on browser and node
import aes from 'aes-js';

export interface Keystore {
  data: string;
  iv: string;
  salt: string;
}

/**
 * Generate a CryptoKey from a password and random salt
 */
export function keyFromPassword(password: string, salt: BytesLike): Uint8Array {
  const passBuffer = Buffer.from(String(password).normalize('NFKC'), 'utf-8');
  const saltBuffer = arrayify(salt);
  const key = pbkdf2(passBuffer, saltBuffer, 100000, 32, 'sha256');

  return arrayify(key);
}

/**
 * Encrypts a data object that can be any serializable value using
 * a provided password.
 *
 * @returns Promise<string> cypher text
 */
export function encrypt<T>(password: string, data: T): Keystore {
  const iv = randomBytes(16);
  const salt = randomBytes(32);
  const secret = keyFromPassword(password, salt);
  const dataBuffer = Uint8Array.from(Buffer.from(JSON.stringify(data), 'utf-8'));
  const counter = new aes.Counter(iv);
  // eslint-disable-next-line new-cap
  const aesCtr = new aes.ModeOfOperation.ctr(secret, counter);
  const cipherdata = aesCtr.encrypt(dataBuffer);

  return {
    data: Buffer.from(cipherdata).toString('base64'),
    iv: Buffer.from(iv).toString('base64'),
    salt: Buffer.from(salt).toString('base64'),
  };
}

/**
 * Given a password and a cypher text, decrypts the text and returns
 * the resulting value
 */
export function decrypt<T>(password: string, keystore: Keystore): T {
  const iv = arrayify(Buffer.from(keystore.iv, 'base64'));
  const salt = arrayify(Buffer.from(keystore.salt, 'base64'));
  const secret = keyFromPassword(password, salt);

  const counter = new aes.Counter(iv);
  // eslint-disable-next-line new-cap
  const aesCtr = new aes.ModeOfOperation.ctr(secret, counter);
  const decryptedData = aesCtr.decrypt(Buffer.from(keystore.data, 'base64'));

  try {
    return JSON.parse(Buffer.from(decryptedData).toString('utf-8'));
  } catch {
    throw new Error('Invalid credentials');
  }
}
