import type { AbstractAddress } from '@fuel-ts/interfaces';
import { safeExec } from '@fuel-ts/utils/test';
import crypto from 'crypto';
import * as keccakMod from 'ethereum-cryptography/keccak';
import * as uuidv4 from 'uuid';

import * as keystoreWMod from './keystore-wallet';
import type { KeystoreWallet } from './keystore-wallet';

jest.mock('uuid', () => ({
  __esModule: true,
  ...jest.requireActual('uuid'),
}));

const {
  removeHexPrefix,
  encryptKeystoreWallet,
  decryptKeystoreWallet,
  DEFAULT_IV_SIZE,
  DEFAULT_KEY_SIZE,
  DEFAULT_KDF_PARAMS_LOG_N,
  DEFAULT_KDF_PARAMS_P,
  DEFAULT_KDF_PARAMS_R,
} = keystoreWMod;

describe('Keystore Wallet', () => {
  afterEach(jest.restoreAllMocks);

  it('Should encrypt jsonWallet just fine', () => {
    // setting call parameters
    const password = 'password';
    const privateKey = 'privateKey';
    const address = { toHexString: () => 'address' } as unknown as AbstractAddress;

    // setting dummy values to be returned by mocks
    const uuid = 'uuid';
    const salt = Buffer.from('salt');
    const iv = Buffer.from('iv');
    const key = Buffer.from('key');
    const privateKeyBuffer = Buffer.from(privateKey, 'hex');
    const macHashUint8Array = Buffer.from('macHashUint8Array');
    const mac = Buffer.from(macHashUint8Array).toString('hex');
    const cipher = {
      update: () => Buffer.from('update'),
      final: () => Buffer.from('final'),
    } as unknown as crypto.Cipher;
    const ciphertext = Buffer.concat([cipher.update(privateKeyBuffer), cipher.final()]);

    // mocking functions called by 'encryptKeystoreWallet'
    const removeHexPrefixMock = jest
      .spyOn(keystoreWMod, 'removeHexPrefix')
      .mockImplementationOnce(() => privateKey)
      .mockImplementationOnce(() => address.toHexString());

    const scryptSyncMock = jest.spyOn(crypto, 'scryptSync').mockImplementation(() => key);

    const uuidv4Mock = jest.spyOn(uuidv4, 'v4').mockImplementation(() => uuid);

    const keccakMock = jest
      .spyOn(keccakMod, 'keccak256')
      .mockImplementation(() => macHashUint8Array);

    const randomBytesMock = jest
      .spyOn(crypto, 'randomBytes')
      .mockImplementationOnce(() => salt)
      .mockImplementationOnce(() => iv);

    const createCipherivMock = jest
      .spyOn(crypto, 'createCipheriv')
      .mockImplementation(() => cipher);

    // executing function
    const encryptedWallet = encryptKeystoreWallet(privateKey, address, password);

    // asserting results
    expect(removeHexPrefixMock).toHaveBeenCalledTimes(2);
    expect(removeHexPrefixMock).toHaveBeenCalledWith(privateKey);
    expect(removeHexPrefixMock).toHaveBeenCalledWith(address.toHexString());

    expect(randomBytesMock).toHaveBeenCalledTimes(2);
    expect(randomBytesMock).toHaveBeenCalledWith(DEFAULT_IV_SIZE);
    expect(randomBytesMock).toHaveBeenCalledWith(DEFAULT_KEY_SIZE);

    expect(scryptSyncMock).toHaveBeenCalledTimes(1);
    expect(scryptSyncMock).toHaveBeenCalledWith(password, salt, DEFAULT_KEY_SIZE, {
      N: 2 ** DEFAULT_KDF_PARAMS_LOG_N,
      r: DEFAULT_KDF_PARAMS_R,
      p: DEFAULT_KDF_PARAMS_P,
    });

    expect(createCipherivMock).toHaveBeenCalledTimes(1);
    expect(createCipherivMock).toHaveBeenCalledWith('aes-128-ctr', key.subarray(0, 16), iv);

    expect(keccakMock).toHaveBeenCalledTimes(1);
    expect(keccakMock).toHaveBeenCalledWith(Buffer.concat([key.subarray(16, 32), ciphertext]));

    expect(uuidv4Mock).toHaveBeenCalledTimes(1);

    const keystore: KeystoreWallet = {
      id: uuid,
      version: 3,
      address: address.toHexString(),
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

    expect(encryptedWallet).toStrictEqual(JSON.stringify(keystore));
  });

  it('Should decrypts jsonWallet just fine', () => {
    // setting call parameters
    const password = 'password';
    const jsonWallet = 'jsonWallet';

    // setting dummy values to be returned by mocks
    const macHashUint8Array = Buffer.from('macHashUint8Array');
    const macHash = Buffer.from(macHashUint8Array).toString('hex');
    const key = Buffer.from('key');

    const decipher = {
      update: () => Buffer.from('update'),
      final: () => Buffer.from('final'),
    } as unknown as crypto.Decipher;

    const privateKey = Buffer.concat([
      decipher.update(Buffer.from('ciphertext', 'hex')),
      decipher.final(),
    ]).toString('hex');

    const wallet: KeystoreWallet = {
      id: 'id',
      version: 3,
      address: 'address',
      crypto: {
        cipher: 'aes-128-ctr',
        mac: macHash,
        cipherparams: { iv: 'iv' },
        ciphertext: 'ciphertext',
        kdf: 'scrypt',
        kdfparams: {
          dklen: 32,
          n: 2 ** 13,
          p: 1,
          r: 8,
          salt: 'salt',
        },
      },
    };

    // mocking functions called by 'decryptKeystoreWallet'
    const jsonParseMock = jest.spyOn(JSON, 'parse').mockImplementation(() => wallet);
    const scryptSyncMock = jest.spyOn(crypto, 'scryptSync').mockImplementation(() => key);
    const keccakMock = jest
      .spyOn(keccakMod, 'keccak256')
      .mockImplementation(() => macHashUint8Array);
    const createDecipherivMock = jest
      .spyOn(crypto, 'createDecipheriv')
      .mockImplementation(() => decipher);

    // executing function
    const resultPrivateKey = decryptKeystoreWallet(jsonWallet, password);

    // asserting results
    expect(jsonParseMock).toHaveBeenCalledTimes(1);
    expect(jsonParseMock).toHaveBeenCalledWith(jsonWallet);

    expect(keccakMock).toHaveBeenCalledTimes(1);
    expect(keccakMock).toHaveBeenCalledWith(
      Buffer.concat([key.subarray(16, 32), Buffer.from(wallet.crypto.ciphertext, 'hex')])
    );

    expect(scryptSyncMock).toHaveBeenCalledTimes(1);
    expect(scryptSyncMock).toHaveBeenCalledWith(
      password,
      Buffer.from(wallet.crypto.kdfparams.salt, 'hex'),
      wallet.crypto.kdfparams.dklen,
      {
        N: wallet.crypto.kdfparams.n,
        r: wallet.crypto.kdfparams.r,
        p: wallet.crypto.kdfparams.p,
      }
    );

    expect(createDecipherivMock).toHaveBeenCalledTimes(1);
    expect(createDecipherivMock).toHaveBeenCalledWith(
      'aes-128-ctr',
      key.subarray(0, 16),
      Buffer.from(wallet.crypto.cipherparams.iv, 'hex')
    );

    expect(resultPrivateKey).toBe(privateKey);
  });

  it('Should throws when trying to decrypts jsonWallet with wrong password', async () => {
    // setting call parameters
    const password = 'password';
    const jsonWallet = 'jsonWallet';

    // setting dummy values to be returned by mocks
    const macHashUint8Array = Buffer.from('macHashUint8Array');
    const key = Buffer.from('key');

    const decipher = {
      update: () => Buffer.from('update'),
      final: () => Buffer.from('final'),
    } as unknown as crypto.Decipher;

    const wallet: KeystoreWallet = {
      id: 'id',
      version: 3,
      address: 'address',
      crypto: {
        cipher: 'aes-128-ctr',
        mac: 'different mac', // different mac from the one generated (wrong password)
        cipherparams: { iv: 'iv' },
        ciphertext: 'ciphertext',
        kdf: 'scrypt',
        kdfparams: {
          dklen: 32,
          n: 2 ** 13,
          p: 1,
          r: 8,
          salt: 'salt',
        },
      },
    };

    // mocking functions called by 'decryptKeystoreWallet'
    const jsonParseMock = jest.spyOn(JSON, 'parse').mockImplementation(() => wallet);
    const scryptSyncMock = jest.spyOn(crypto, 'scryptSync').mockImplementation(() => key);
    const keccakMock = jest
      .spyOn(keccakMod, 'keccak256')
      .mockImplementation(() => macHashUint8Array);
    const createDecipherivMock = jest
      .spyOn(crypto, 'createDecipheriv')
      .mockImplementation(() => decipher);

    // executing function
    const { error, result } = await safeExec(() => decryptKeystoreWallet(jsonWallet, password));

    // asserting results
    expect(result).toBeUndefined();
    expect(error?.message).toBe('Error decrypting wallet: invalid password');

    expect(jsonParseMock).toHaveBeenCalledWith(jsonWallet);

    expect(keccakMock).toHaveBeenCalledTimes(1);
    expect(keccakMock).toHaveBeenCalledWith(
      Buffer.concat([key.subarray(16, 32), Buffer.from(wallet.crypto.ciphertext, 'hex')])
    );

    expect(scryptSyncMock).toHaveBeenCalledTimes(1);
    expect(scryptSyncMock).toHaveBeenCalledWith(
      password,
      Buffer.from(wallet.crypto.kdfparams.salt, 'hex'),
      wallet.crypto.kdfparams.dklen,
      {
        N: wallet.crypto.kdfparams.n,
        r: wallet.crypto.kdfparams.r,
        p: wallet.crypto.kdfparams.p,
      }
    );

    expect(createDecipherivMock).not.toBeCalled();
  });

  it('Should ensure "removeHexPrefix" removes "0x" prefix if it exists', () => {
    expect(removeHexPrefix('0x123456')).toBe('123456');
  });

  it('Should ensure "removeHexPrefix" not change the string if the prefix does not exist', () => {
    expect(removeHexPrefix('123456')).toBe('123456');
  });
});
