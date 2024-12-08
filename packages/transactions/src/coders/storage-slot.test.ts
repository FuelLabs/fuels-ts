import { ZeroBytes32 } from '@fuel-ts/address/configs';
import { arrayify, hexlify } from '@fuel-ts/utils';

import type { StorageSlot } from './storage-slot';
import { storageSlotCoder } from './storage-slot';

/**
 * @group node
 * @group browser
 */
describe('StorageSlotCoder', () => {
  it('Can encode and decode', () => {
    const storageSlot: StorageSlot = {
      key: ZeroBytes32,
      value: ZeroBytes32,
    };

    const encoded = hexlify(storageSlotCoder.encode(storageSlot));

    expect(encoded).toEqual(
      '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
    );

    const [decoded, offset] = storageSlotCoder.decode(arrayify(encoded), 0);

    expect(offset).toEqual(64);
    expect(decoded).toEqual(storageSlot);
  });
});
