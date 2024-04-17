import { FuelError, ErrorCode } from '@fuel-ts/errors';
import { bn } from '@fuel-ts/math';

import { decodeBase58, encodeBase58 } from './base58';

describe('base58', () => {
  describe('encodeBase58', () => {
    it('should encode a BytesLike value to a base58 string', () => {
      expect(encodeBase58(new Uint8Array([0]))).toBe('1');
      expect(encodeBase58(new Uint8Array([57]))).toBe('z');
      expect(encodeBase58(new Uint8Array([58]))).toBe('21');
      expect(encodeBase58(new Uint8Array([0, 1]))).toBe('12');
      expect(encodeBase58(new Uint8Array([1, 0]))).toBe('5R');
      expect(encodeBase58(new Uint8Array([0, 0, 1]))).toBe('112');
    });

    it('should handle leading padding zeros', () => {
      expect(encodeBase58(new Uint8Array([0, 0, 0, 1]))).toBe('1112');
      expect(encodeBase58(new Uint8Array([0, 0, 0, 0, 1]))).toBe('11112');
      expect(encodeBase58(new Uint8Array([0, 0, 0, 0, 0, 1]))).toBe('111112');
    });

    it('should handle empty input', () => {
      expect(encodeBase58(new Uint8Array([]))).toBe('');
    });

    it('should handle different BytesLike input types', () => {
      expect(encodeBase58(Buffer.from([0, 1, 2]))).toBe('15T');
      expect(encodeBase58('0x000102')).toBe('15T');
    });
  });

  describe('decodeBase58', () => {
    it('should decode a base58 string to a BN', () => {
      expect(decodeBase58('1').toString()).toBe(bn(0).toString());
      expect(decodeBase58('z').toString()).toBe(bn(57).toString());
      expect(decodeBase58('21').toString()).toBe(bn(58).toString());
      expect(decodeBase58('3yQ').toString()).toBe(bn(9999).toString());
    });

    it('should throw an error for invalid base58 characters', () => {
      expect(() => decodeBase58('0')).toThrow(
        new FuelError(ErrorCode.INVALID_DATA, 'invalid base58 value 0')
      );
      expect(() => decodeBase58('I')).toThrow(
        new FuelError(ErrorCode.INVALID_DATA, 'invalid base58 value I')
      );
      expect(() => decodeBase58('l')).toThrow(
        new FuelError(ErrorCode.INVALID_DATA, 'invalid base58 value l')
      );
      expect(() => decodeBase58('O')).toThrow(
        new FuelError(ErrorCode.INVALID_DATA, 'invalid base58 value O')
      );
    });

    it('should handle empty string', () => {
      expect(decodeBase58('').toString()).toBe(bn(0).toString());
    });
  });
});
