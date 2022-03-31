import * as keystore from './keystore';

describe('Keystore', () => {
  test('Encrypt and Decrypt', async () => {
    const password = '0b540281-f87b-49ca-be37-2264c7f260f7';
    const data = {
      name: 'test',
    };
    const encryptedResult = await keystore.encrypt(password, data);

    expect(encryptedResult.data).toBeTruthy();
    expect(encryptedResult.iv).toBeTruthy();
    expect(encryptedResult.salt).toBeTruthy();

    const decryptedResult = await keystore.decrypt(password, encryptedResult);

    expect(decryptedResult).toEqual(data);
  });
});
