import { FuelError, ErrorCode } from '@fuel-ts/errors';

import { encodeBase58, decodeBase58 } from './base58';

/**
 * @group node
 * @group browser
 */
describe('base58', () => {
  describe('encodeBase58', () => {
    it('should encode bytes correctly', () => {
      expect(encodeBase58('0x01')).toBe('1');
      expect(encodeBase58('0x1234567890abcdef')).toBe('1234567890abcdef');
      expect(encodeBase58('0x000001')).toBe('11');
      expect(encodeBase58('0x00000000000001')).toBe('11111');
    });

    it('should handle empty input', () => {
      expect(encodeBase58('')).toBe('');
    });
  });

  describe('decodeBase58', () => {
    it('should decode base58 strings correctly', () => {
      expect(decodeBase58('1')).toBe('1');
      expect(decodeBase58('1234567890abcdef')).toBe('1234567890abcdef');
      expect(decodeBase58('11')).toBe('1');
      expect(decodeBase58('11111')).toBe('1');
    });

    it('should handle empty input', () => {
      expect(decodeBase58('')).toBe('0');
    });

    it('should throw an error for invalid base58 characters', () => {
      expect(() => decodeBase58('1234567890abcdEF')).toThrowError(
        new FuelError(ErrorCode.INVALID_DATA, 'invalid base58 value E')
      );
    });
  });

  it('should round-trip encode and decode correctly', () => {
    const testValues = ['0x01', '0x1234567890abcdef', '0x000001', '0x00000000000001', ''];
    for (const value of testValues) {
      const encoded = encodeBase58(value);
      const decoded = decodeBase58(encoded);
      expect(decoded).toBe(value.slice(2));
    }
  });
});
