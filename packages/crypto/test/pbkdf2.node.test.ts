import { bufferFromString, pbkdf2 } from '..';

/**
 * @group node
 */
describe('pbkdf2 node', () => {
  it('should use the registered function for PBKDF2 computation', () => {
    const expectedResult = '0x90eceedd899d5cdcdfd9b315ad6e2c3391bf95cc131b6f0f016339db5ee60494';
    const passwordBuffer = bufferFromString(String('password123').normalize('NFKC'), 'utf-8');
    const saltBuffer = bufferFromString(String('salt456').normalize('NFKC'), 'utf-8');
    const iterations = 1000;
    const keylen = 32;
    const algo = 'sha256';

    pbkdf2.register((password, salt, iter, kl, al) => {
      expect(password).toBeInstanceOf(Uint8Array);
      expect(salt).toBeInstanceOf(Uint8Array);
      expect(iter).toBe(1000);
      expect(keylen).toBe(32);
      expect(al).toBe('sha256');
      return expectedResult;
    });

    expect(pbkdf2(passwordBuffer, saltBuffer, iterations, keylen, algo)).toBe(expectedResult);
  });

  it('should throw an error when registering a function after locking', () => {
    pbkdf2.lock();

    expect(() => {
      pbkdf2.register(() => {});
    }).toThrowError('pbkdf2 is locked');
  });

  it('should have a frozen object', () => {
    expect(Object.isFrozen(pbkdf2)).toBe(true);
  });
});
