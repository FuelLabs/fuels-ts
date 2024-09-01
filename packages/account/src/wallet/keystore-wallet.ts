import { Address } from '@fuel-ts/address';
import {
  bufferFromString,
  keccak256,
  randomBytes,
  scrypt,
  stringFromBuffer,
  decryptJsonWalletData,
  encryptJsonWalletData,
  randomUUID,
} from '@fuel-ts/crypto';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { AbstractAddress } from '@fuel-ts/interfaces';
import { hexlify } from '@fuel-ts/utils';

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

export async function encryptKeystoreWallet(
  privateKey: string,
  address: string | AbstractAddress,
  password: string
): Promise<string> {
  // Convert the hexlified private key string to a Buffer.
  const privateKeyBuffer = bufferFromString(removeHexPrefix(privateKey), 'hex');
  const ownerAddress = Address.fromAddressOrString(address);
  // Generate a random salt.
  const salt = randomBytes(DEFAULT_KEY_SIZE);

  const key = scrypt({
    password: bufferFromString(password),
    salt,
    dklen: DEFAULT_KEY_SIZE,
    n: 2 ** DEFAULT_KDF_PARAMS_LOG_N,
    r: DEFAULT_KDF_PARAMS_R,
    p: DEFAULT_KDF_PARAMS_P,
  });

  // Encrypt the private key using AES-128-CTR.
  const iv = randomBytes(DEFAULT_IV_SIZE);

  const ciphertext = await encryptJsonWalletData(privateKeyBuffer, key, iv);

  const data = Uint8Array.from([...key.subarray(16, 32), ...ciphertext]);

  // Calculate the MAC.
  const macHashUint8Array = keccak256(data);

  const mac = stringFromBuffer(macHashUint8Array, 'hex');

  // Construct keystore.
  const keystore: KeystoreWallet = {
    id: randomUUID(),
    version: 3,
    address: removeHexPrefix(ownerAddress.toHexString()),
    crypto: {
      cipher: 'aes-128-ctr',
      mac,
      cipherparams: { iv: stringFromBuffer(iv, 'hex') },
      ciphertext: stringFromBuffer(ciphertext, 'hex'),
      kdf: 'scrypt',
      kdfparams: {
        dklen: DEFAULT_KEY_SIZE,
        n: 2 ** DEFAULT_KDF_PARAMS_LOG_N,
        p: DEFAULT_KDF_PARAMS_P,
        r: DEFAULT_KDF_PARAMS_R,
        salt: stringFromBuffer(salt, 'hex'),
      },
    },
  };

  return JSON.stringify(keystore);
}

export async function decryptKeystoreWallet(jsonWallet: string, password: string): Promise<string> {
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

  const ciphertextBuffer = bufferFromString(ciphertext, 'hex');
  const ivBuffer = bufferFromString(iv, 'hex');
  const saltBuffer = bufferFromString(salt, 'hex');

  const passwordBuffer = bufferFromString(password);

  const key = scrypt({
    password: passwordBuffer,
    salt: saltBuffer,
    n,
    p,
    r,
    dklen,
  });

  // Verify the MAC. It should be the Keccak-256 hash of the concatenation of the second half of the derived key and the ciphertext.
  const data = Uint8Array.from([...key.subarray(16, 32), ...ciphertextBuffer]);

  const macHashUint8Array = keccak256(data);

  const macHash = stringFromBuffer(macHashUint8Array, 'hex');

  if (mac !== macHash) {
    throw new FuelError(
      ErrorCode.INVALID_PASSWORD,
      'Failed to decrypt the keystore wallet, the provided password is incorrect.'
    );
  }

  // Decrypt the private key.
  const buffer = await decryptJsonWalletData(ciphertextBuffer, key, ivBuffer);

  const privateKey = hexlify(buffer);

  return privateKey;
}
