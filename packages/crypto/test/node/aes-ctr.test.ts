import { encrypt, decrypt } from '../../src/index';

/**
 * @group node
 */
describe('Keystore', () => {
  it('Encrypt and Decrypt', async () => {
    const password = '0b540281-f87b-49ca-be37-2264c7f260f7';
    const data = {
      name: 'test',
    };
    const encryptedResult = await encrypt(password, data);

    expect(encryptedResult.data).toBeTruthy();
    expect(encryptedResult.iv).toBeTruthy();
    expect(encryptedResult.salt).toBeTruthy();

    const decryptedResult = await decrypt(password, encryptedResult);

    expect(decryptedResult).toEqual(data);
  });

  it('Decrypt with wrong password should throw', async () => {
    const password = '0b540281-f87b-49ca-be37-2264c7f260f7';
    const data = {
      name: 'test',
    };
    const encryptedResult = await encrypt(password, data);

    await expect(decrypt(`${password}123`, encryptedResult)).rejects.toThrow('Invalid credentials');
  });

  it('Decrypt Loop', async () => {
    const INPUTS = [
      {
        data: '07yJczBTonXWyKdJfEcx',
        iv: 'MROpfbpxAjLZ2LxK0tlN0g==',
        salt: 'sisrSI8eavMAAXg2N7mncIp6A9pk+bEEvxtC/O5HPK0=',
      },
      {
        data: 'tQomRkvp3tZPZYKG8xiP',
        iv: 'c5SmUHGOJqlwfE3FJJ3w+g==',
        salt: 'RWcKoopiyTZkp7ufS8E8iOwXb6biVyYHndpkZz4Bnno=',
      },
      {
        data: 'wRA2KEAuNPBvrlPc2thy',
        iv: 'hE6jwBCbm7IpmWZoZN9MJw==',
        salt: '8kT/g8Pq+NACIM0HrKJ5XhDrYijk6/tTt79EfNAC0Yw=',
      },
    ];
    const password = '0b540281-f87b-49ca-be37-2264c7f260f7';
    const data = {
      name: 'test',
    };

    for (let i = 0; i < INPUTS.length; i += 1) {
      const decryptedResult = await decrypt(password, INPUTS[i]);

      expect(decryptedResult).toEqual(data);
    }
  });
});
