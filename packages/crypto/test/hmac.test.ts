import { getBytes } from '@fuel-ts/utils';

import { computeHmac } from '..';

/**
 * @group node
 * @group browser
 */
describe('computeHmac', () => {
  it('should compute HMAC correctly', () => {
    const key = '0x0102030405060708090a0b0c0d0e0f10';
    const data = '0x11121314151617181920212223242526';
    const expectedSha256 = '0x83fca26d3d0a75cec885885f94d3fc65bf56706e6a1b64fc54bf76a4da4bd5f4';
    const expectedSha512 =
      '0x502c1ba066f564b3520c6f98e1ffecaddf47eb438887f71448edb75a69acd35313c0102b38f4cce3553437fcdcee8107d8d7c68878bf593c513a9e83fb82b3b3';

    expect(computeHmac('sha256', key, data)).toBe(expectedSha256);
    expect(computeHmac('sha512', key, data)).toBe(expectedSha512);
  });

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
