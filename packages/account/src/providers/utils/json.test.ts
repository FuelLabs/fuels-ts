import { Address } from '@fuel-ts/address';
import { BN, bn } from '@fuel-ts/math';

import { normalizeJSON } from './json';

/**
 * @group node
 */
describe('JSON parser', () => {
  test('normalizeJSON object', () => {
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
    // Should not change the root object
    expect(BN.isBN(data.bn)).toBeTruthy();
    expect(data.arrayOfMapsOfBytes[0].bytes).toEqual(bytesValue);
    expect(data.mapOfBytes.bytes).toEqual(bytesValue);
  });

  test('should not break if has undefined value in object', () => {
    const bytesValue = Uint8Array.from([1, 2, 3, 4]);
    const address = Address.fromRandom();
    const data = {
      number: 1,
      text: 'foo',
      bn: bn(1),
      bytes: bytesValue,
      arrayOfBytes: [bytesValue],
      address,
      undef: undefined,
    };
    const normalizedData = normalizeJSON(data);
    expect(normalizedData).toEqual({
      number: 1,
      text: 'foo',
      bn: '0x1',
      bytes: '0x01020304',
      arrayOfBytes: ['0x01020304'],
      address: address.toB256(),
      undef: undefined,
    });
  });

  test('normalizeJSON array', () => {
    const bytesValue = Uint8Array.from([1, 2, 3, 4]);
    const data = [
      bn(1),
      bytesValue,
      {
        bytes: bytesValue,
      },
    ];
    expect(normalizeJSON(data)).toEqual([
      '0x1',
      '0x01020304',
      {
        bytes: '0x01020304',
      },
    ]);
    expect(data[0]).toEqual(bn(1));
    expect(data[1]).toEqual(bytesValue);
    expect((data[2] as { bytes: Uint8Array }).bytes).toEqual(bytesValue);
  });
});
