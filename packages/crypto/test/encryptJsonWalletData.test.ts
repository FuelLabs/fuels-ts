import { envs } from './envs';

/**
 * @group node
 */
describe('encryptJsonWalletData', () => {
  it.each(envs)(
    'should encrypt and decrypt json wallet data correctly in %s environment',
    async ({ encryptJsonWalletData, decryptJsonWalletData, randomBytes }) => {
      const testData = new Uint8Array([104, 101, 108, 108, 111]);
      const testKey = randomBytes(16);
      const testIv = randomBytes(16);

      const encryptedData = await encryptJsonWalletData(testData, testKey, testIv);
      expect(encryptedData).not.toEqual(testData); // ensure data was encrypted

      const decryptedData = await decryptJsonWalletData(encryptedData, testKey, testIv);
      expect(decryptedData).toEqual(testData); // ensure data was decrypted correctly
    }
  );
});
