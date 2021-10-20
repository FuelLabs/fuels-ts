import { BigNumber } from '@ethersproject/bignumber';
import { arrayify, hexlify } from '@ethersproject/bytes';
import { expect } from 'chai';

import type { Witness } from './witness';
import { WitnessCoder } from './witness';

describe('WitnessCoder', () => {
  it('Can encode Witness', () => {
    const witness: Witness = {
      dataLength: BigNumber.from(0),
      data: '0x',
    };

    const encoded = hexlify(new WitnessCoder('witness').encode(witness));

    expect(encoded).to.equal('0x0000000000000000');

    const [decoded, offset] = new WitnessCoder('witness').decode(arrayify(encoded), 0);

    expect(offset).to.equal((encoded.length - 2) / 2);
    expect(decoded).to.deep.equal(witness);
  });
});
