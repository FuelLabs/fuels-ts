/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { hexlify } from '@ethersproject/bytes';
import { toHex } from '@fuel-ts/math';

import type Coder from './abstract-coder';
import ArrayCoder from './array';
import B256Coder from './b256';
import BooleanCoder from './boolean';
import ByteCoder from './byte';
import EnumCoder from './enum';
import NumberCoder from './number';
import StringCoder from './string';
import StructCoder from './struct';
import TupleCoder from './tuple';

const B256_ZERO = '0x0000000000000000000000000000000000000000000000000000000000000000';
const B256 = '0xd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b';
const U8_MAX = 2 ** 8 - 1;
const U16_MAX = 2 ** 16 - 1;
const U32_MAX = 2 ** 32 - 1;
const U64_MAX = 2n ** 64n - 1n;

/**
 * Tests for implementations of Coder.
 *
 * This is an array of tuples containing one item for each Coder.
 *
 * Each item is another tuple, containing:
 * - The name of the Coder
 * - A list of good cases we expect to succeed
 * - A list of bad cases we expect to fail
 *
 * And each case is also a tuple, containing:
 * - An instance of the Coder
 * - InputValue to provide to `coder.encode`
 * - DecodedValue to expect from `coder.decode`
 */
const testCases = [
  [
    'ArrayCoder',
    [
      [new ArrayCoder(new NumberCoder('u8'), 0), [], []],
      [new ArrayCoder(new NumberCoder('u8'), 4), [0, 13, 37, U8_MAX], [0, 13, 37, U8_MAX]],
    ],
    [
      // Under
      [new ArrayCoder(new NumberCoder('u8'), 1), [], []],
      // Over
      [new ArrayCoder(new NumberCoder('u8'), 1), [1, 2], [1, 2]],
      // Wrong
      [new ArrayCoder(new NumberCoder('u8'), 1), ['whoops'], ['whoops']],
      [new ArrayCoder(new NumberCoder('u8'), 1), [U8_MAX + 1], [U8_MAX + 1]],
    ],
  ],
  [
    'B256Coder',
    [
      [new B256Coder(), B256_ZERO, B256_ZERO],
      [new B256Coder(), B256, B256],
    ],
    [
      // Under
      [
        new B256Coder(),
        B256_ZERO.slice(0, B256_ZERO.length - 1),
        B256_ZERO.slice(0, B256_ZERO.length - 1),
      ],
      // Over
      [new B256Coder(), `${B256_ZERO}0`, `${B256_ZERO}0`],
      [new B256Coder(), `${B256_ZERO}00`, `${B256_ZERO}00`],
      // Wrong
      [new B256Coder(), 'whoops', 'whoops'],
    ],
  ],
  [
    'BooleanCoder',
    [
      [new BooleanCoder(), true, true],
      [new BooleanCoder(), false, false],
    ],
    [
      // Under
      [new BooleanCoder(), -1, -1],
      // Over
      [new BooleanCoder(), 2, 2],
      // Wrong
      [new BooleanCoder(), 'a', 'a'],
    ],
  ],
  [
    'ByteCoder',
    [
      // `string` inputs
      [new ByteCoder(), toHex(0), 0],
      [new ByteCoder(), toHex(U8_MAX), U8_MAX],
      // `number` inputs
      [new ByteCoder(), 0, 0],
      [new ByteCoder(), U8_MAX, 255],
    ],
    [
      // Under
      [new ByteCoder(), -1, -1],
      // Over
      [new ByteCoder(), toHex(U8_MAX + 1), U8_MAX + 1],
      [new ByteCoder(), U8_MAX + 1, U8_MAX + 1],
      // Wrong
      [new ByteCoder(), 'whoops', 'whoops'],
    ],
  ],
  [
    'EnumCoder',
    [
      [
        new EnumCoder('TestEnum', { a: new BooleanCoder(), b: new NumberCoder('u64') }),
        { a: true },
        { a: true },
      ],
      [
        new EnumCoder('TestEnum', { a: new BooleanCoder(), b: new NumberCoder('u64') }),
        { b: 1337 },
        { b: 1337n },
      ],
    ],
    [
      // Under
      [new EnumCoder('TestEnum', { a: new BooleanCoder(), b: new NumberCoder('u64') }), {}, {}],
      // Over
      [
        new EnumCoder('TestEnum', { a: new BooleanCoder(), b: new NumberCoder('u64') }),
        { a: true, b: 1337 },
        { a: true, b: 1337n },
      ],
      // Wrong
      [new EnumCoder('TestEnum', {}), {}, {}],
      [
        new EnumCoder('TestEnum', { a: new BooleanCoder(), b: new NumberCoder('u64') }),
        { b: true },
        { b: true },
      ],
    ],
  ],
  [
    'NumberCoder',
    [
      // `number` inputs
      [new NumberCoder('u8'), 0, 0],
      [new NumberCoder('u8'), U8_MAX, U8_MAX],
      [new NumberCoder('u16'), 0, 0],
      [new NumberCoder('u16'), U16_MAX, U16_MAX],
      [new NumberCoder('u32'), 0, 0],
      [new NumberCoder('u32'), U32_MAX, U32_MAX],
      [new NumberCoder('u64'), 0, 0n],
      // `bigint` inputs
      [new NumberCoder('u8'), 0n, 0],
      [new NumberCoder('u8'), BigInt(U8_MAX), U8_MAX],
      [new NumberCoder('u16'), 0n, 0],
      [new NumberCoder('u16'), BigInt(U16_MAX), U16_MAX],
      [new NumberCoder('u32'), 0n, 0],
      [new NumberCoder('u32'), BigInt(U32_MAX), U32_MAX],
      [new NumberCoder('u64'), 0n, 0n],
      [new NumberCoder('u64'), U64_MAX, U64_MAX],
    ],
    [
      // Under
      [new NumberCoder('u8'), -1, -1],
      [new NumberCoder('u16'), -1, -1],
      [new NumberCoder('u32'), -1, -1],
      [new NumberCoder('u64'), -1n, -1n],
      // Over
      [new NumberCoder('u8'), U8_MAX + 1, U8_MAX + 1],
      [new NumberCoder('u16'), U16_MAX + 1, U16_MAX + 1],
      [new NumberCoder('u32'), U32_MAX + 1, U32_MAX + 1],
      [new NumberCoder('u64'), U64_MAX + 1n, U64_MAX + 1n],
      // Wrong
      [new NumberCoder('u8'), 'whoops', 'whoops'],
    ],
  ],
  [
    'StringCoder',
    [
      [new StringCoder(0), '', ''],
      [new StringCoder(U8_MAX), 'a'.repeat(U8_MAX), 'a'.repeat(U8_MAX)],
    ],
    [
      // Under
      [new StringCoder(0), 'a', 'a'],
      [new StringCoder(1), '', ''],
      // Over
      [new StringCoder(1), 'aa', 'aa'],
      // Wrong
      [new StringCoder(1), 'aa', 'aa'],
    ],
  ],
  [
    'StructCoder',
    [
      [new StructCoder('TestStruct', {}), {}, {}],
      [
        new StructCoder('TestStruct', { a: new BooleanCoder(), b: new NumberCoder('u64') }),
        { a: true, b: 1337 },
        { a: true, b: 1337n },
      ],
    ],
    [
      // Under
      [
        new StructCoder('TestStruct', { a: new BooleanCoder(), b: new NumberCoder('u64') }),
        { a: true },
        { a: true },
      ],
      [new StructCoder('TestStruct', { a: new BooleanCoder() }), {}, {}],
      // Over
      [
        new StructCoder('TestStruct', { a: new BooleanCoder() }),
        { a: true, b: 1337 },
        { a: true, b: 1337n },
      ],
      [new StructCoder('TestStruct', {}), { a: true }, { a: true }],
      // Wrong
      [
        new StructCoder('TestStruct', { b: new NumberCoder('u64') }),
        { b: U8_MAX + 1 },
        { b: U8_MAX + 1 },
      ],
      [
        new StructCoder('TestStruct', { b: new NumberCoder('u64') }),
        { b: 'whoops' },
        { b: 'whoops' },
      ],
    ],
  ],
  [
    'TupleCoder',
    [
      [new TupleCoder([]), [], []],
      [new TupleCoder([new NumberCoder('u64'), new NumberCoder('u64')]), [13, 37], [13n, 37n]],
    ],
    [
      // Under
      [new TupleCoder([new NumberCoder('u8')]), [], []],
      // Over
      [new TupleCoder([new NumberCoder('u8')]), [U8_MAX, U8_MAX], [U8_MAX, U8_MAX]],
      // Wrong
      [new TupleCoder([new NumberCoder('u8')]), [U8_MAX + 1], [U8_MAX + 1]],
      [new TupleCoder([new NumberCoder('u8')]), ['whoops'], ['whoops']],
    ],
  ],
] as const;

describe.each(testCases)('%s', (coderName, goodCases, badCases) => {
  it.each(
    goodCases.map(([coder, input, output]): [string, any, any, Coder] => [
      coder.type,
      input,
      output,
      coder,
    ])
  )('as a %s can encode %p then decode %p', (abiType, input, output, coder) => {
    const encoded = coder.encode(input);
    expect(hexlify(encoded)).toMatchSnapshot();
    const [decoded] = coder.decode(encoded, 0);
    expect(decoded).toEqual(output);
  });
  it.each(
    badCases.map(([coder, input, output]): [string, any, any, Coder] => [
      coder.type,
      input,
      output,
      coder,
    ])
  )('as a %s can not encode %p then decode %p', (abiType, input, output, coder) => {
    expect(() => {
      const encoded = coder.encode(input);
      const [decoded] = coder.decode(encoded, 0);
      expect(decoded).toEqual(output);
    }).toThrow();
  });
});

describe('EnumCoder', () => {
  it('is typed correctly', () => {
    const coder = new EnumCoder('TestEnum', { a: new BooleanCoder(), b: new NumberCoder('u64') });

    // Good
    expect(() => coder.encode({ a: true })).not.toThrow();
    expect(() => coder.encode({ b: 1337n })).not.toThrow();
    // Under
    expect(() =>
      coder.encode(
        // @ts-expect-error
        {}
      )
    ).toThrow();
    // Over
    expect(() =>
      coder.encode(
        // @ts-expect-error
        { a: true, b: 1337n }
      )
    ).toThrow();
    // Wrong
    expect(() =>
      coder.encode(
        // @ts-expect-error
        { a: 1337n }
      )
    ).not.toThrow();
    expect(() =>
      coder.encode(
        // @ts-expect-error
        { b: true }
      )
    ).not.toThrow();
    expect(() =>
      coder.encode(
        // @ts-expect-error
        { uwu: 42 }
      )
    ).toThrow();
  });
});

describe('StructCoder', () => {
  it('is typed correctly', () => {
    const coder = new StructCoder('TestStruct', {
      a: new BooleanCoder(),
      b: new NumberCoder('u64'),
    });

    // Good
    expect(() => coder.encode({ a: true, b: 1337n })).not.toThrow();
    // Under
    expect(() =>
      coder.encode(
        // @ts-expect-error
        {}
      )
    ).toThrow();
    expect(() =>
      coder.encode(
        // @ts-expect-error
        { a: true }
      )
    ).toThrow();
    expect(() =>
      coder.encode(
        // @ts-expect-error
        { b: 1337n }
      )
    ).not.toThrow();
    // Over
    expect(() =>
      coder.encode(
        // @ts-expect-error
        { a: true, b: 1337n, c: false }
      )
    ).not.toThrow();
    // Wrong
    expect(() =>
      coder.encode(
        // @ts-expect-error
        { a: 1337n }
      )
    ).toThrow();
    expect(() =>
      coder.encode(
        // @ts-expect-error
        { b: true }
      )
    ).not.toThrow();
    expect(() =>
      coder.encode(
        // @ts-expect-error
        { uwu: 42 }
      )
    ).toThrow();
  });
});

describe('TupleCoder', () => {
  it('is typed correctly', () => {
    const coder = new TupleCoder<[BooleanCoder, NumberCoder<'u64'>]>([
      new BooleanCoder(),
      new NumberCoder('u64'),
    ]);

    // Good
    expect(() => coder.encode([true, 1337n])).not.toThrow();
    // Under
    expect(() =>
      coder.encode(
        // @ts-expect-error
        []
      )
    ).toThrow();
    expect(() =>
      coder.encode(
        // @ts-expect-error
        [true]
      )
    ).toThrow();
    expect(() =>
      coder.encode(
        // @ts-expect-error
        [1337n]
      )
    ).toThrow();
    // Over
    expect(() =>
      coder.encode(
        // @ts-expect-error
        [true, 1337n, false]
      )
    ).toThrow();
    // Wrong
    expect(() =>
      coder.encode(
        // @ts-expect-error
        [1337n, true]
      )
    ).not.toThrow();
    expect(() =>
      coder.encode(
        // @ts-expect-error
        ['true', 1337n]
      )
    ).not.toThrow();
    expect(() =>
      coder.encode(
        // @ts-expect-error
        { uwu: 42 }
      )
    ).toThrow();
  });
});
