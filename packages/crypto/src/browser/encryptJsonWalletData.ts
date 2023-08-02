import type { CryptoApi } from '../types';

import { crypto } from './crypto';

export const encryptJsonWalletData: CryptoApi['encryptJsonWalletData'] = async (
  data: Uint8Array,
  key: Uint8Array,
  iv: Uint8Array
): Promise<Uint8Array> => {
  const subtle = crypto.subtle;
  const keyBuffer = new Uint8Array(key.subarray(0, 16));
  const ivBuffer = iv;
  const dataBuffer = data;

  const cryptoKey = await subtle.importKey(
    'raw',
    keyBuffer,
    { name: 'AES-CTR', length: 128 },
    false,
    ['encrypt', 'decrypt']
  );

  const encrypted = (await subtle.encrypt(
    { name: 'AES-CTR', counter: ivBuffer, length: 128 },
    cryptoKey,
    dataBuffer
  )) as ArrayBuffer;

  return new Uint8Array(encrypted);
};

export const decryptJsonWalletData: CryptoApi['decryptJsonWalletData'] = async (
  data: Uint8Array,
  key: Uint8Array,
  iv: Uint8Array
): Promise<Uint8Array> => {
  const subtle = crypto.subtle;
  const keyBuffer = new Uint8Array(key.subarray(0, 16)).buffer;
  const ivBuffer = new Uint8Array(iv).buffer;
  const dataBuffer = new Uint8Array(data).buffer;

  const cryptoKey = await subtle.importKey(
    'raw',
    keyBuffer,
    { name: 'AES-CTR', length: 128 },
    false,
    ['encrypt', 'decrypt']
  );

  const decrypted = (await subtle.decrypt(
    { name: 'AES-CTR', counter: ivBuffer, length: 128 },
    cryptoKey,
    dataBuffer
  )) as ArrayBuffer;

  return new Uint8Array(decrypted);
};
