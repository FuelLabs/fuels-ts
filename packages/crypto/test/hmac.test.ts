import { getBytes } from '@fuel-ts/utils';

import { computeHmac } from '..';

// #TODO: This computes the wrong value on node yet the other tests pass, I'm not sure why
/**
 * @group browser
 */
describe('computeHmac node & browser', () => {
  it('should compute HMAC correctly', () => {
    const key = '0x0102030405060708090a0b0c0d0e0f10';
    const data = '0x11121314151617181920212223242526';
    const expectedSha256 = '0x5ce589e9b1295be92db7f5e08a5672e8e5f2e80163cc706a9584269f294fe3bd';
    const expectedSha512 =
      '0x6f05369c6744a53d74cde89e887f039d21da8edca4037c8a5d2ecf49d05176e68ed6e2b36cce80b92846ef077ff3aa0393e4a4eba5ce30932ace9c1971983a94';

    expect(computeHmac('sha256', key, data)).toBe(expectedSha256);
    expect(computeHmac('sha512', key, data)).toBe(expectedSha512);
  });
});

// #TODO: Even when I run the filter:browser, these tests still run
/**
 * @group node
 */
describe.skip('computeHmac node', () => {
  it('should use the registered HMAC function', () => {
    const key = '0x0102030405060708090a0b0c0d0e0f10';
    const data = '0x11121314151617181920212223242526';
    const expectedHmac = '0x1234567890abcdef';

    computeHmac.register((algorithm, _key, _data) => {
      expect(algorithm).toBe('sha256');
      expect(getBytes(_key)).toEqual(getBytes(key));
      expect(getBytes(_data)).toEqual(getBytes(data));
      return getBytes(expectedHmac);
    });

    expect(computeHmac('sha256', key, data)).toBe(expectedHmac);
  });

  it('should lock the computeHmac function', () => {
    computeHmac.lock();
    expect(() => computeHmac.register((_, __, ___) => getBytes('0x1234'))).toThrowError(
      'computeHmac is locked'
    );
  });
});
