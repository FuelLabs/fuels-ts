import { arrayify } from '@fuel-ts/utils';

import { computeHmac } from '..';
/**
 * @group node
 */
describe('computeHmac node', () => {
  it('should use the registered HMAC function', () => {
    const key = '0x0102030405060708090a0b0c0d0e0f10';
    const data = '0x11121314151617181920212223242526';
    const expectedHmac = '0x1234567890abcdef';

    computeHmac.register((algorithm, _key, _data) => {
      expect(algorithm).toBe('sha256');
      expect(arrayify(_key)).toEqual(arrayify(key));
      expect(arrayify(_data)).toEqual(arrayify(data));
      return arrayify(expectedHmac);
    });

    expect(computeHmac('sha256', key, data)).toBe(expectedHmac);
  });

  it('should lock the computeHmac function', () => {
    computeHmac.lock();
    expect(() => computeHmac.register((_, __, ___) => arrayify('0x1234'))).toThrowError(
      'computeHmac is locked'
    );
  });
});
