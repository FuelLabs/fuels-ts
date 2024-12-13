import type { BytesLike } from '@fuel-ts/interfaces';

export interface Keystore {
  data: string;
  iv: string;
  salt: string;
}

export interface IScryptParams {
  password: Uint8Array;
  salt: Uint8Array;
  n: number;
  p: number;
  r: number;
  dklen: number;
}

export type BufferEncoding = 'utf-8' | 'base64' | 'hex';

export interface CryptoApi {
  bufferFromString(string: string, encoding?: BufferEncoding): Uint8Array;
  decrypt<T>(password: string, keystore: Keystore): Promise<T>;
  encrypt<T>(password: string, data: T): Promise<Keystore>;
  keyFromPassword(password: string, saltBuffer: Uint8Array): Uint8Array;
  stringFromBuffer(buffer: Uint8Array, encoding?: BufferEncoding): string;
  randomBytes(length: number): Uint8Array;
  scrypt(params: IScryptParams): Uint8Array;
  keccak256(data: Uint8Array): Uint8Array;
  encryptJsonWalletData(data: Uint8Array, key: Uint8Array, iv: Uint8Array): Promise<Uint8Array>;
  decryptJsonWalletData(data: Uint8Array, key: Uint8Array, iv: Uint8Array): Promise<Uint8Array>;
  computeHmac(algorithm: 'sha256' | 'sha512', key: BytesLike, data: BytesLike): string;
  randomUUID(): string;
  pbkdf2(
    password: BytesLike,
    salt: BytesLike,
    iterations: number,
    keylen: number,
    algo: 'sha256' | 'sha512'
  ): string;
  ripemd160(data: BytesLike): Uint8Array;
}
