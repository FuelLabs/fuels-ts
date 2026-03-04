import { Address } from '@fuel-ts/address';
import { safeExec } from '@fuel-ts/errors/test-utils';

import { decryptKeystoreWallet, encryptKeystoreWallet, removeHexPrefix } from './keystore-wallet';

/**
 * @group node
 */
describe('Keystore Wallet', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  const privateKey = '0xeac85e732b683119e62fb52ce3b04c0d2f60539cd55af34c731fcdcf802e5ef4';

  const address = Address.fromAddressOrString(
    '0x67bc49451a363ab1ded81795b54e46ae0c6122472642470bc4fa6a9bd8215f5c'
  );
  const password = '123456';

  it('should return a valid keystore when given correct parameters', async () => {
    // Act
    const keystore = await encryptKeystoreWallet(privateKey, address.toB256(), password);

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

    expect(recoveredPrivateKey).toEqual(privateKey);
  });

  it('should throw an error when given an incorrect password', async () => {
    // Arrange
    const wrongPassword = '111222';

    // Act
    const keystore = await encryptKeystoreWallet(privateKey, address, password);

    const { error } = await safeExec(() => decryptKeystoreWallet(keystore, wrongPassword));

    // Assert
    expect(error?.message).toEqual(
      'Failed to decrypt the keystore wallet, the provided password is incorrect.'
    );
  });

  test('should remove the "0x" prefix from a hex string', () => {
    // Arrange
    const hexString = '0x123abc';

    // Act
    const result = removeHexPrefix(hexString);

    // Assert
    expect(result).toBe('123abc');
  });

  test('should not modify a string without "0x" prefix', () => {
    // Arrange
    const hexString = '123abc';

    // Act
    const result = removeHexPrefix(hexString);

    // Assert
    expect(result).toBe(hexString);
  });

  test('should not modify an empty string', () => {
    // Arrange
    const hexString = '';

    // Act
    const result = removeHexPrefix(hexString);

    // Assert
    expect(result).toBe(hexString);
  });
});
