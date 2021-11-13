import { arrayify, hexlify } from '@ethersproject/bytes';
import { expect } from 'chai';

import { ByteArrayCoder } from './byte-array';

describe('ByteArrayCoder', () => {
  it('Can encode empty byte[]', () => {
    const bytes = arrayify('0x');

    const encoded = hexlify(new ByteArrayCoder('bytes', bytes.length).encode(bytes));

    expect(encoded).to.equal('0x');

    const [decoded, offset] = new ByteArrayCoder('bytes', bytes.length).decode(
      arrayify(encoded),
      0
    );

    expect(offset).to.equal(0);
    expect(decoded).to.equal(hexlify(bytes));
  });

  it('Can encode four-byte byte[]', () => {
    const bytes = arrayify('0xdeadbeef');

    const encoded = hexlify(new ByteArrayCoder('bytes', bytes.length).encode(bytes));

    expect(encoded).to.equal('0xdeadbeef00000000');

    const [decoded, offset] = new ByteArrayCoder('bytes', bytes.length).decode(
      arrayify(encoded),
      0
    );

    expect(offset).to.equal(8);
    expect(decoded).to.equal(hexlify(bytes));
  });
});
