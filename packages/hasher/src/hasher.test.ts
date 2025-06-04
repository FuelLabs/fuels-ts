import { uint64ToBytesBE } from './hasher';

/**
 * @group node
 * @group browser
 */
describe('Hasher', () => {
  it('Convert uint64 to bytes in big-endian order', () => {
    const value = 1234567890;
    const expectedBytes = new Uint8Array([0, 0, 0, 0, 73, 150, 2, 210]);
    expect(uint64ToBytesBE(value)).toEqual(expectedBytes);
  });
});
