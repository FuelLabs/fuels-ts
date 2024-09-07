/* eslint-disable import/no-extraneous-dependencies */
import type { Keystore } from '@fuel-ts/crypto';
import { bufferFromString, pbkdf2, computeHmac, encrypt, decrypt } from '@fuel-ts/crypto';
import { bench } from 'vitest';

/**
 * @group node
 * @group browser
 */
describe('crypto bench', () => {
  bench(
    'should correctly convert string to Uint8Array with base64 encoding in a node environment',
    () => {
      const string = 'aGVsbG8='; // "hello" in Base64
      bufferFromString(string, 'base64');
    }
  );

  bench('should compute the PBKDF2 hash', () => {
    const passwordBuffer = bufferFromString(String('password123').normalize('NFKC'), 'utf-8');
    const saltBuffer = bufferFromString(String('salt456').normalize('NFKC'), 'utf-8');
    const iterations = 1000;
    const keylen = 32;
    const algo = 'sha256';

    pbkdf2(passwordBuffer, saltBuffer, iterations, keylen, algo);
  });

  bench('should compute HMAC correctly', () => {
    const key = '0x0102030405060708090a0b0c0d0e0f10';
    const data = '0x11121314151617181920212223242526';
    const sha256Length = 64;
    const sha512Length = 128;
    const prefix = '0x';

    expect(computeHmac('sha256', key, data).length).toBe(sha256Length + prefix.length);
    expect(computeHmac('sha512', key, data).length).toBe(sha512Length + prefix.length);
  });

  bench('Encrypt via aes-ctr', async () => {
    const password = '0b540281-f87b-49ca-be37-2264c7f260f7';
    const data = {
      name: 'test',
    };

    const encryptedResult = await encrypt(password, data);
    expect(encryptedResult.data).toBeTruthy();
    expect(encryptedResult.iv).toBeTruthy();
    expect(encryptedResult.salt).toBeTruthy();
  });

  bench('Decrypt via aes-ctr', async () => {
    const password = '0b540281-f87b-49ca-be37-2264c7f260f7';
    const encryptedResult: Keystore = {
      data: 'vj1/JyHR+NiIaWXTpl5T',
      iv: '0/lqnRVK5HE/5b1cQAHfqg==',
      salt: 'nHdHXW2EmOEagAH2UUDYMRNhd7LJ5XLIcZoVQZMPSlU=',
    };
    await decrypt(password, encryptedResult);
  });
});
