import { FuelError, ErrorCode } from '@fuel-ts/errors';

import { dataSlice } from './dataSlice';

/**
 * @group node
 * @group browser
 */
describe('dataSlice', () => {
  it('should slice data correctly', () => {
    const data = '0x1234567890abcdef';
    expect(dataSlice(data, 2, 6)).toBe('0x567890ab');
    expect(dataSlice(data, 0, 4)).toBe('0x12345678');
    expect(dataSlice(data)).toBe('0x1234567890abcdef');
  });

  it('should throw an error if end index is greater than data length', () => {
    const data = '0x1234567890abcdef';
    expect(() => dataSlice(data, 0, 20)).toThrowError(
      new FuelError(ErrorCode.INVALID_DATA, 'cannot slice beyond data bounds')
    );
  });

  it('should handle undefined start and end indices', () => {
    const data = '0x1234567890abcdef';
    expect(dataSlice(data, undefined, undefined)).toBe('0x1234567890abcdef');
    expect(dataSlice(data, 1)).toBe('0x34567890abcdef');
    expect(dataSlice(data, undefined, 4)).toBe('0x12345678');
  });
});
