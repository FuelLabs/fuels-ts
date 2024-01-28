import { getBytesCopy, hexlify } from 'ethers';

import type { TxPointer } from './tx-pointer';
import { TxPointerCoder } from './tx-pointer';

const B256 = '0xd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b';

/**
 * @group node
 * @group browser
 */
describe('TxPointerCoder', () => {
  it('can encode TxPointer', () => {
    const txPointer: TxPointer = {
      blockHeight: 10,
      txIndex: 1,
    };

    const encoded = hexlify(new TxPointerCoder().encode(txPointer));

    expect(encoded).toEqual('0x000000000000000a0000000000000001');

    const [decoded, offset] = new TxPointerCoder().decode(getBytesCopy(encoded), 0);

    expect(offset).toEqual(16);
    expect(decoded).toEqual(txPointer);
  });
  it('does not encode bad TxPointer', () => {
    const txPointer: TxPointer = {
      // @ts-expect-error: Values shouldn't be assignable
      blockHeight: B256,
      // @ts-expect-error: Values shouldn't be assignable
      txIndex: B256,
    };

    expect(() => {
      new TxPointerCoder().encode(txPointer);
    }).toThrow();
  });
});
