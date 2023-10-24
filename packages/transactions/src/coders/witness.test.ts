import { getBytesCopy, hexlify } from 'ethers';

import type { Witness } from './witness';
import { WitnessCoder } from './witness';

describe('WitnessCoder', () => {
  it('Can encode empty Witness', () => {
    const witness: Witness = {
      dataLength: 0,
      data: '0x',
      offset: 0,
    };

    const encoded = hexlify(new WitnessCoder().encode(witness));

    expect(encoded).toEqual('0x0000000000000000');

    const [decoded, offset] = new WitnessCoder().decode(getBytesCopy(encoded), 0);

    expect(offset).toEqual(8);
    expect(decoded).toEqual(witness);
  });

  it('Can encode four-byte Witness', () => {
    const witness: Witness = {
      dataLength: 4,
      data: '0xdeadbeef',
      offset: 0,
    };

    const encoded = hexlify(new WitnessCoder().encode(witness));

    expect(encoded).toEqual('0x0000000000000004deadbeef00000000');

    const [decoded, offset] = new WitnessCoder().decode(getBytesCopy(encoded), 0);

    expect(offset).toEqual(16);
    expect(decoded).toEqual(witness);
  });
});
