/**
 * Simple tests to make sure functional shortcuts are working.
 *
 * Deeper tests are in ./bn.test.ts
 */

import { format, formatUnits, toBytes, toHex, toNumber } from './functional';

/**
 * @group node
 */
describe('Math - Functional shortcuts', () => {
  it('should toNumber return a number', () => {
    expect(toNumber('50000')).toEqual(50000);
  });
  it('should toHex return a Hex string', () => {
    expect(toHex('50000')).toEqual('0xc350');
  });
  it('should toBytes return a bytes array (Uint8Array)', () => {
    expect(JSON.stringify(toBytes('50000'))).toEqual(JSON.stringify({ 0: 195, 1: 80 }));
  });
  it('should formatUnits return a formatted string', () => {
    expect(formatUnits('1000000000')).toEqual('1.000000000');
  });
  it('should format return a formatted string', () => {
    expect(format('1000000000')).toEqual('1.000');
  });
});
