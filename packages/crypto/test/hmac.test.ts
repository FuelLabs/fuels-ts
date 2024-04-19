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

    expect(computeHmac('sha256', key, data).length).toBe(64);
    expect(computeHmac('sha512', key, data).length).toBe(128);
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
