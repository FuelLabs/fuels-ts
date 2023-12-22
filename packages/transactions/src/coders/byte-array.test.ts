import { getBytesCopy, hexlify } from 'ethers';

import { ByteArrayCoder } from './byte-array';

/**
 * @group node
 */
describe('ByteArrayCoder', () => {
  it('Can encode empty byte[]', () => {
    const bytes = getBytesCopy('0x');

    const encoded = hexlify(new ByteArrayCoder(bytes.length).encode(bytes));

    expect(encoded).toEqual('0x');

    const [decoded, offset] = new ByteArrayCoder(bytes.length).decode(getBytesCopy(encoded), 0);

    expect(offset).toEqual(0);
    expect(decoded).toEqual(hexlify(bytes));
  });

  it('Can encode four-byte byte[]', () => {
    const bytes = getBytesCopy('0xdeadbeef');

    const encoded = hexlify(new ByteArrayCoder(bytes.length).encode(bytes));

    expect(encoded).toEqual('0xdeadbeef00000000');

    const [decoded, offset] = new ByteArrayCoder(bytes.length).decode(getBytesCopy(encoded), 0);

    expect(offset).toEqual(8);
    expect(decoded).toEqual(hexlify(bytes));
  });
});
