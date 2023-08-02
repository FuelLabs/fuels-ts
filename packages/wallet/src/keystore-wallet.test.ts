import { safeExec } from '@fuel-ts/utils/test-utils';

import { decryptKeystoreWallet, encryptKeystoreWallet } from './keystore-wallet';
import { Wallet } from './wallet';

describe('Keystore Wallet', () => {
  afterEach(jest.restoreAllMocks);

  const wallet = Wallet.generate();
  const privateKey = wallet.privateKey;
  const address = wallet.address;
  const password = '123456';

  it('should return a valid keystore when given correct parameters', async () => {
    // Act
    const keystore = await encryptKeystoreWallet(privateKey, address, password);

    // Assert
    expect(keystore).toBeTruthy();

    const keystoreObject = JSON.parse(keystore);

    expect(keystoreObject).toHaveProperty('id');
    expect(keystoreObject).toHaveProperty('version', 3);
    expect(keystoreObject).toHaveProperty('address');
    expect(keystoreObject).toHaveProperty('crypto');
    expect(keystoreObject.crypto).toHaveProperty('cipher', 'aes-128-ctr');
    expect(keystoreObject.crypto).toHaveProperty('mac');
    expect(keystoreObject.crypto).toHaveProperty('cipherparams');
    expect(keystoreObject.crypto.cipherparams).toHaveProperty('iv');
    expect(keystoreObject.crypto).toHaveProperty('ciphertext');
    expect(keystoreObject.crypto).toHaveProperty('kdf', 'scrypt');
    expect(keystoreObject.crypto).toHaveProperty('kdfparams');
    expect(keystoreObject.crypto.kdfparams).toHaveProperty('dklen');
    expect(keystoreObject.crypto.kdfparams).toHaveProperty('n');
    expect(keystoreObject.crypto.kdfparams).toHaveProperty('p');
    expect(keystoreObject.crypto.kdfparams).toHaveProperty('r');
    expect(keystoreObject.crypto.kdfparams).toHaveProperty('salt');

    const recoveredPrivateKey = await decryptKeystoreWallet(keystore, password);
    const recoveredWallet = Wallet.fromPrivateKey(recoveredPrivateKey);

    expect(recoveredPrivateKey).toEqual(privateKey);
    expect(recoveredWallet.address).toEqual(address);
  });

  it('should throw an error when given an incorrect password', async () => {
    // Arrange
    const wrongPassword = '111222';

    // Act
    const keystore = await encryptKeystoreWallet(privateKey, address, password);

    const { error } = await safeExec(() => decryptKeystoreWallet(keystore, wrongPassword));

    // Assert
    expect(error?.message).toEqual('Error decrypting wallet: invalid password');
  });
});
