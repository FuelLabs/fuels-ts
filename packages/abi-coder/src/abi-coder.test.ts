import { hexlify } from '@ethersproject/bytes';
import { toHex } from '@fuel-ts/math';

import AbiCoder from './abi-coder';
import type { DecodedValue } from './coders/abstract-coder';

const B256 = '0xd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b';

describe('AbiCoder', () => {
  const abiCoder = new AbiCoder();

  it('encodes and decodes a single primitive', () => {
    const types = [
      {
        type: 'b256',
        name: 'arg0',
      },
    ];
    const encoded = abiCoder.encode(types, [B256]);
    expect(hexlify(encoded)).toEqual(B256);
    const decoded = abiCoder.decode(types, encoded) as DecodedValue[];
    expect(decoded).toEqual([B256]);
  });

  it('encodes and decodes multiple primitives', () => {
    const types = [
      {
        type: 'b256',
        name: 'arg0',
      },
      {
        type: 'b256',
        name: 'arg1',
      },
    ];
    const encoded = abiCoder.encode(types, [B256, B256]);
    expect(hexlify(encoded)).toEqual(
      '0xd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930bd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b'
    );
    const decoded = abiCoder.decode(types, encoded) as DecodedValue[];
    expect(decoded).toEqual([B256, B256]);
  });

  it('encodes and decodes arrays', () => {
    const types = [
      {
        name: 'a',
        type: '[u64; 3]',
        components: [
          {
            name: '__array_element',
            type: 'u64',
            components: null,
          },
        ],
      },
    ];

    const encoded = abiCoder.encode(types, [[toHex(1), toHex(2), toHex(3)]]);

    expect(hexlify(encoded)).toBe('0x000000000000000100000000000000020000000000000003');
  });

  it('encodes and decodes nested reference types', () => {
    const types = [
      {
        name: 'test',
        type: 'enum Test',
        components: [
          {
            name: 'foo',
            type: '(bool,bool)',
            components: [
              {
                name: '__tuple_element',
                type: 'bool',
              },
              {
                name: '__tuple_element',
                type: 'bool',
              },
            ],
          },
          {
            name: 'bar',
            type: 'u64',
          },
        ],
      },
      {
        name: 'arg0',
        type: 'bool',
      },
      {
        name: 'arg1',
        type: '[struct Test; 2]',
        components: [
          {
            name: '__array_element',
            type: 'struct Test',
            components: [
              {
                name: 'foo',
                type: 'u64',
              },
              {
                name: 'bar',
                type: 'u64',
              },
            ],
          },
        ],
      },
      {
        name: 'arg2',
        type: '(struct Test,bool)',
        components: [
          {
            name: '__tuple_element',
            type: 'struct Test',
            components: [
              {
                name: 'foo',
                type: 'u64',
              },
              {
                name: 'bar',
                type: 'u64',
              },
            ],
          },
          {
            name: '__tuple_element',
            type: 'bool',
          },
        ],
      },
    ];
    const encoded = abiCoder.encode(types, [
      {
        foo: [true, true],
      },
      true,
      [
        { foo: toHex(13), bar: toHex(37) },
        { bar: toHex(13), foo: toHex(37) },
      ],
      [{ foo: toHex(13), bar: toHex(37) }, true],
    ]);
    expect(hexlify(encoded)).toEqual(
      '0x0000000000000000000000000000000100000000000000010000000000000001000000000000000d00000000000000250000000000000025000000000000000d000000000000000d00000000000000250000000000000001'
    );
    const decoded = abiCoder.decode(types, encoded) as DecodedValue[];
    expect(Array.from(decoded)).toEqual([
      {
        foo: [true, true],
      },
      true,
      [
        { foo: toHex(13), bar: toHex(37) },
        { bar: toHex(13), foo: toHex(37) },
      ],
      [{ foo: toHex(13), bar: toHex(37) }, true],
    ]);
  });
});
