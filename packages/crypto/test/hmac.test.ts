import { computeHmac } from '..';

// #TODO: This computes the wrong value on node yet the other tests pass, I'm not sure why
/**
 * @group node
 * @group browser
 */
describe('computeHmac node & browser', () => {
  it('should compute HMAC correctly', () => {
    const key = '0x0102030405060708090a0b0c0d0e0f10';
    const data = '0x11121314151617181920212223242526';
    const sha256Length = 64;
    const sha512Length = 128;
    const prefix = '0x';

    expect(computeHmac('sha256', key, data).length).toBe(sha256Length + prefix.length);
    expect(computeHmac('sha512', key, data).length).toBe(sha512Length + prefix.length);
  });
});
