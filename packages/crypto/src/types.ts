export interface Keystore {
  data: string;
  iv: string;
  salt: string;
}

export type Encoding = 'utf-8' | 'base64' | 'hex';

export interface CryptoApi {
  bufferFromString(string: string, encoding?: Encoding): Uint8Array;
  decrypt<T>(password: string, keystore: Keystore): Promise<T>;
  encrypt<T>(password: string, data: T): Promise<Keystore>;
  keyFromPassword(password: string, saltBuffer: Uint8Array): Uint8Array;
  stringFromBuffer(buffer: Uint8Array, encoding?: Encoding): string;
  randomBytes(length: number): Uint8Array;
}
