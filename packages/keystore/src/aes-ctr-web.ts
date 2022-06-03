import type { Keystore } from './aes-ctr';
import { bufferFromString, stringFromBuffer, keyFromPassword } from './aes-ctr';
import { randomBytes } from './randomBytes';
import { crypto } from './universal-crypto';

const ALGORITHM = 'AES-CTR';

/**
 * Encrypts a data object that can be any serializable value using
 * a provided password.
 *
 * @returns Promise<Keystore> object
 */
export async function encrypt<T>(password: string, data: T): Promise<Keystore> {
  const iv = randomBytes(16);
  const salt = randomBytes(32);
  const secret = keyFromPassword(password, salt);
  const dataBuffer = Uint8Array.from(Buffer.from(JSON.stringify(data), 'utf-8'));
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
}

/**
 * Given a password and a keystore object, decrypts the text and returns
 * the resulting value
 */
export async function decrypt<T>(password: string, keystore: Keystore): Promise<T> {
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
}
