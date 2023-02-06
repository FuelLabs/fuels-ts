import { Address } from '@fuel-ts/address';
import { bn } from '@fuel-ts/math';

import { normalizeJSON } from './json';

describe('JSON parser', () => {
  test('normalizeJSON', () => {
    const bytesValue = Uint8Array.from([1, 2, 3, 4]);
    const address = Address.fromRandom();
    const data = {
      number: 1,
      text: 'foo',
      bn: bn(1),
      bytes: bytesValue,
      arrayOfBytes: [bytesValue],
      address,
      mapOfBytes: {
        bytes: bytesValue,
      },
      arrayOfMapsOfBytes: [
        {
          bytes: bytesValue,
        },
      ],
    };
    const normalizedData = normalizeJSON(data);
    expect(normalizedData).toEqual({
      number: 1,
      text: 'foo',
      bn: '0x1',
      bytes: '0x01020304',
      arrayOfBytes: ['0x01020304'],
      address: address.toB256(),
      mapOfBytes: {
        bytes: '0x01020304',
      },
      arrayOfMapsOfBytes: [
        {
          bytes: '0x01020304',
        },
      ],
    });
  });
});
