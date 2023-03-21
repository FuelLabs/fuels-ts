import type { Keystore } from './aes-ctr';
import { bufferFromString, stringFromBuffer, keyFromPassword } from './aes-ctr';
import { randomBytes } from './randomBytes';
import { crypto } from './universal-crypto';

const ALGORITHM = 'aes-256-ctr';

/**
 * Encrypts a data object that can be any serializable value using
 * a provided password.
 *
 * @returns Promise<Keystore> object
 */
// eslint-disable-next-line @typescript-eslint/require-await
export async function encrypt<T>(password: string, data: T): Promise<Keystore> {
  const iv = randomBytes(16);
  const salt = randomBytes(32);
  const secret = keyFromPassword(password, salt);
  const dataBuffer = Uint8Array.from(Buffer.from(JSON.stringify(data), 'utf-8'));

  const cipher = crypto.createCipheriv(ALGORITHM, secret, iv);
  let cipherData = cipher.update(dataBuffer);
  cipherData = Buffer.concat([cipherData, cipher.final()]);

  return {
    data: stringFromBuffer(cipherData),
    iv: stringFromBuffer(iv),
    salt: stringFromBuffer(salt),
  };
}

/**
 * Given a password and a keystore object, decrypts the text and returns
 * the resulting value
 */
// eslint-disable-next-line @typescript-eslint/require-await
export async function decrypt<T>(password: string, keystore: Keystore): Promise<T> {
  const iv = bufferFromString(keystore.iv);
  const salt = bufferFromString(keystore.salt);
  const secret = keyFromPassword(password, salt);
  const encryptedText = bufferFromString(keystore.data);

  const decipher = crypto.createDecipheriv(ALGORITHM, secret, iv);
  const decrypted = decipher.update(encryptedText);
  const deBuff = Buffer.concat([decrypted, decipher.final()]);
  const decryptedData = Buffer.from(deBuff).toString('utf-8');

  try {
    return JSON.parse(decryptedData);
  } catch {
    throw new Error('Invalid credentials');
  }
}
