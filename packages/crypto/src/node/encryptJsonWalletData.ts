import crypto from 'crypto';

export async function encryptJsonWalletData(data: Uint8Array, key: Uint8Array, iv: Uint8Array) {
  const cipher = await crypto.createCipheriv('aes-128-ctr', key.subarray(0, 16), iv);

  const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);

  return new Uint8Array(encrypted);
}

export async function decryptJsonWalletData(data: Uint8Array, key: Uint8Array, iv: Uint8Array) {
  const decipher = crypto.createDecipheriv('aes-128-ctr', key.subarray(0, 16), iv);

  const decrypted = await Buffer.concat([decipher.update(data), decipher.final()]);

  return new Uint8Array(decrypted);
}
