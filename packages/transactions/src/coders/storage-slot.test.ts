import { arrayify, hexlify } from '@ethersproject/bytes';

import type { StorageSlot } from './storage-slot';
import { StorageSlotCoder } from './storage-slot';

describe('StorageSlotCoder', () => {
  it('Can encode and decode', () => {
    const storageSlot: StorageSlot = {
      key: '0x0000000000000000000000000000000000000000000000000000000000000000',
      value: '0x0000000000000000000000000000000000000000000000000000000000000000',
    };

    const encoded = hexlify(new StorageSlotCoder('storageSlot').encode(storageSlot));

    expect(encoded).toEqual(
      '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
    );

    const [decoded, offset] = new StorageSlotCoder('storageSlot').decode(arrayify(encoded), 0);

    expect(offset).toEqual(64);
    expect(decoded).toEqual(storageSlot);
  });
});
