export interface Keystore {
  data: string;
  iv: string;
  salt: string;
}

export interface CryptoApi {
  bufferFromString(string: string, encoding?: 'utf-8' | 'base64'): Uint8Array;
  decrypt<T>(password: string, keystore: Keystore): Promise<T>;
  encrypt<T>(password: string, data: T): Promise<Keystore>;
  keyFromPassword(password: string, saltBuffer: Uint8Array): Uint8Array;
  stringFromBuffer(buffer: Uint8Array, encoding?: 'utf-8' | 'base64'): string;
  randomBytes(length: number): Uint8Array;
}
