import { bufferFromString, pbkdf2 } from '..';

/**
 * @group node
 * @group browser
 */
describe('pbkdf2 node & browser', () => {
  it('should compute the PBKDF2 hash correctly', () => {
    const passwordBuffer = bufferFromString(String('password123').normalize('NFKC'), 'utf-8');
    const saltBuffer = bufferFromString(String('salt456').normalize('NFKC'), 'utf-8');
    const iterations = 1000;
    const keylen = 32;
    const algo = 'sha256';
    const expectedResult = '0x90eceedd899d5cdcdfd9b315ad6e2c3391bf95cc131b6f0f016339db5ee60494';

    const result = pbkdf2(passwordBuffer, saltBuffer, iterations, keylen, algo);

    expect(result).toBe(expectedResult);
  });
});
