import type { Keystore } from './aes-ctr';
import { encrypt as encNode, decrypt as decNode } from './aes-ctr-node';
import { encrypt as encWeb, decrypt as decWeb } from './aes-ctr-web';
import { strategy } from './universal-crypto';

export type { Keystore } from './aes-ctr';
export { keyFromPassword } from './aes-ctr';

/**
 * Encrypts a data object that can be any serializable value using
 * a provided password.
 *
 * @returns Promise<Keystore> Keystore object
 */
export async function encrypt<T>(password: string, data: T): Promise<Keystore> {
  return strategy === 'Node' ? encNode<T>(password, data) : encWeb<T>(password, data);
}

/**
 * Given a password and a keystore object, decrypts the text and returns
 * the resulting value
 *
 *  @returns Promise<T> T object
 */
export async function decrypt<T>(password: string, keystore: Keystore): Promise<T> {
  return strategy === 'Node' ? decNode<T>(password, keystore) : decWeb<T>(password, keystore);
}
