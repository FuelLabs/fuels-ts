import type { Address } from '@fuel-ts/address';

import { truncateWalletAddress } from '../src/utils';

/**
 * @group node
 * @group browser
 */
describe('truncateWalletAddress Tests', () => {
  it('should correctly truncate a wallet address', () => {
    const mockAddress: Address = {
      toString: () => '0x1234567890abcdef1234567890abcdef',
    };
    const options = { prefixLength: 6, suffixLength: 4 };
    const result = truncateWalletAddress(mockAddress, options);
    expect(result).toBe('0x1234…cdef');
  });

  it('should handle default options if none provided', () => {
    const mockAddress: Address = {
      toString: () => '0x1234567890abcdef1234567890abcdef',
    };
    const result = truncateWalletAddress(mockAddress);
    expect(result).toBe('0x…cdef');
  });
});
