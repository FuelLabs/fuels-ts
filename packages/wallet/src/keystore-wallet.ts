import type { AbstractAddress } from '@fuel-ts/interfaces';
import crypto from 'crypto';
import { keccak256 } from 'ethereum-cryptography/keccak';
import { v4 as uuidv4 } from 'uuid';

export type KeystoreWallet = {
  id: string;
  version: number;
  address: string;
  crypto: KeystoreCrypto;
};

type KeystoreCrypto = {
  cipher: 'aes-128-ctr';
  cipherparams: { iv: string };
  ciphertext: string;
  kdf: 'scrypt';
  mac: string;
  kdfparams: KDFParams;
};

type KDFParams = {
  dklen: number;
  n: number;
  p: number;
  r: number;
  salt: string;
};

// Same values used in the Rust SDK
export const DEFAULT_KDF_PARAMS_LOG_N = 13;
export const DEFAULT_KDF_PARAMS_R = 8;
export const DEFAULT_KDF_PARAMS_P = 1;
export const DEFAULT_KEY_SIZE = 32;
export const DEFAULT_IV_SIZE = 16;

/**
 * Removes the '0x' prefix from a hexadecimal string.
 * If the prefix does not exist, it returns the original string.
 */
export const removeHexPrefix = (hexString: string) => {
  if (/^0x/.test(hexString)) {
    return hexString.slice(2);
  }

  return hexString;
};

export function encryptKeystoreWallet(
  privateKey: string,
  address: AbstractAddress,
  password: string
): string {
  // Convert the hexlified private key string to a Buffer.
  const privateKeyBuffer = Buffer.from(removeHexPrefix(privateKey), 'hex');

  // Generate a random salt.
  const salt = crypto.randomBytes(DEFAULT_KEY_SIZE);

  // Derive the key.
  const key = crypto.scryptSync(password, salt, DEFAULT_KEY_SIZE, {
    N: 2 ** DEFAULT_KDF_PARAMS_LOG_N,
    r: DEFAULT_KDF_PARAMS_R,
    p: DEFAULT_KDF_PARAMS_P,
  });

  // Encrypt the private key using AES-128-CTR.
  const iv = crypto.randomBytes(DEFAULT_IV_SIZE);
  const cipher = crypto.createCipheriv('aes-128-ctr', key.subarray(0, 16), iv);
  const ciphertext = Buffer.concat([cipher.update(privateKeyBuffer), cipher.final()]);

  // Calculate the MAC.
  const macHashUint8Array = keccak256(Buffer.concat([key.subarray(16, 32), ciphertext]));
  const mac = Buffer.from(macHashUint8Array).toString('hex');

  // Construct keystore.
  const keystore: KeystoreWallet = {
    id: uuidv4(),
    version: 3,
    address: removeHexPrefix(address.toHexString()),
    crypto: {
      cipher: 'aes-128-ctr',
      mac,
      cipherparams: { iv: iv.toString('hex') },
      ciphertext: ciphertext.toString('hex'),
      kdf: 'scrypt',
      kdfparams: {
        dklen: DEFAULT_KEY_SIZE,
        n: 2 ** DEFAULT_KDF_PARAMS_LOG_N,
        p: DEFAULT_KDF_PARAMS_P,
        r: DEFAULT_KDF_PARAMS_R,
        salt: salt.toString('hex'),
      },
    },
  };

  return JSON.stringify(keystore);
}

export function decryptKeystoreWallet(jsonWallet: string, password: string): string {
  const keystoreWallet = JSON.parse(jsonWallet) as KeystoreWallet;

  // Extract the parameters needed for decryption.
  const {
    crypto: {
      mac,
      ciphertext,
      cipherparams: { iv },
      kdfparams: { dklen, n, r, p, salt },
    },
  } = keystoreWallet;

  const ciphertextBuffer = Buffer.from(ciphertext, 'hex');
  const ivBuffer = Buffer.from(iv, 'hex');
  const saltBuffer = Buffer.from(salt, 'hex');

  // Derive the key.
  const key = crypto.scryptSync(password, saltBuffer, dklen, {
    N: n,
    r,
    p,
  });

  // Verify the MAC. It should be the Keccak-256 hash of the concatenation of the second half of the derived key and the ciphertext.
  const macHashUint8Array = keccak256(Buffer.concat([key.subarray(16, 32), ciphertextBuffer]));
  const macHash = Buffer.from(macHashUint8Array).toString('hex');

  if (mac !== macHash) {
    throw new Error('Error decrypting wallet: invalid password');
  }

  // Decrypt the private key.
  const decipher = crypto.createDecipheriv('aes-128-ctr', key.subarray(0, 16), ivBuffer);

  const privateKey = Buffer.concat([decipher.update(ciphertextBuffer), decipher.final()]).toString(
    'hex'
  );

  return privateKey;
}
