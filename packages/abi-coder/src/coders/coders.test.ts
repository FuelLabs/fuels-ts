/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { hexlify } from '@ethersproject/bytes';
import { bn, toHex } from '@fuel-ts/math';

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
import U64Coder from './u64';

const B256_ZERO = '0x0000000000000000000000000000000000000000000000000000000000000000';
const B256 = '0xd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b';
const U8_MAX = 2 ** 8 - 1;
const U16_MAX = 2 ** 16 - 1;
const U32_MAX = 2 ** 32 - 1;
const U64_MAX = bn(2).pow(bn(64)).sub(bn(1));

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
        new EnumCoder('TestEnum', { a: new BooleanCoder(), b: new U64Coder() }),
        { a: true },
        { a: true },
      ],
      [
        new EnumCoder('TestEnum', { a: new BooleanCoder(), b: new U64Coder() }),
        { b: toHex(1337) },
        { b: toHex(1337) },
      ],
      [
        new ArrayCoder(
          new EnumCoder('TestEnum', {
            a: new U64Coder(),
            b: new TupleCoder([new U64Coder(), new U64Coder()]),
          }),
          4
        ),
        [
          { a: toHex(1337) },
          { b: [toHex(1337), toHex(1337)] },
          { a: toHex(1337) },
          { b: [toHex(1337), toHex(1337)] },
        ],
        [
          { a: toHex(1337) },
          { b: [toHex(1337), toHex(1337)] },
          { a: toHex(1337) },
          { b: [toHex(1337), toHex(1337)] },
        ],
      ],
    ],
    [
      // Under
      [new EnumCoder('TestEnum', { a: new BooleanCoder(), b: new U64Coder() }), {}, {}],
      // Over
      [
        new EnumCoder('TestEnum', { a: new BooleanCoder(), b: new U64Coder() }),
        { a: true, b: toHex(1337) },
        { a: true, b: toHex(1337) },
      ],
      // Wrong
      [new EnumCoder('TestEnum', {}), {}, {}],
      [
        new EnumCoder('TestEnum', { a: new BooleanCoder(), b: new U64Coder() }),
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

      // `string` hex inputs
      [new U64Coder(), toHex(0), toHex(0)],
      [new U64Coder(), toHex(100), toHex(100)],
      [new U64Coder(), toHex(U8_MAX), toHex(U8_MAX)],
      [new U64Coder(), toHex(U16_MAX), toHex(U16_MAX)],
      [new U64Coder(), toHex(U32_MAX), toHex(U32_MAX)],
      [new U64Coder(), toHex(U64_MAX), toHex(U64_MAX)],
    ],
    [
      // Under
      [new NumberCoder('u8'), -1, -1],
      [new NumberCoder('u16'), -1, -1],
      [new NumberCoder('u32'), -1, -1],
      [new U64Coder(), -1, -1],
      // Over
      [new NumberCoder('u8'), U8_MAX + 1, U8_MAX + 1],
      [new NumberCoder('u16'), U16_MAX + 1, U16_MAX + 1],
      [new NumberCoder('u32'), U32_MAX + 1, U32_MAX + 1],
      [new U64Coder(), toHex(U64_MAX.add(bn(1))), toHex(U64_MAX.add(bn(1)))],
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
        new StructCoder('TestStruct', { a: new BooleanCoder(), b: new U64Coder() }),
        { a: true, b: 1337 },
        { a: true, b: toHex(1337) },
      ],
      [
        new StructCoder('TestStruct', { a: new BooleanCoder(), b: new U64Coder() }),
        { a: true, b: toHex(1337) },
        { a: true, b: toHex(1337) },
      ],
    ],
    [
      // Under
      [
        new StructCoder('TestStruct', { a: new BooleanCoder(), b: new U64Coder() }),
        { a: true },
        { a: true },
      ],
      [new StructCoder('TestStruct', { a: new BooleanCoder() }), {}, {}],
      // Over
      [
        new StructCoder('TestStruct', { a: new BooleanCoder() }),
        { a: true, b: 1337 },
        { a: true, b: 1337 },
      ],
      [new StructCoder('TestStruct', {}), { a: true }, { a: true }],
      // Wrong
      [new StructCoder('TestStruct', { b: new U64Coder() }), { b: U8_MAX + 1 }, { b: U8_MAX + 1 }],
      [new StructCoder('TestStruct', { b: new U64Coder() }), { b: 'whoops' }, { b: 'whoops' }],
    ],
  ],
  [
    'TupleCoder',
    [
      [new TupleCoder([]), [], []],
      [new TupleCoder([new U64Coder(), new U64Coder()]), [13, 37], [toHex(13), toHex(37)]],
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
    const [decoded, length] = coder.decode(encoded, 0);
    expect(length).toEqual(encoded.length);

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
    const coder = new EnumCoder('TestEnum', { a: new BooleanCoder(), b: new U64Coder() });

    // Good
    expect(() => coder.encode({ a: true })).not.toThrow();
    expect(() => coder.encode({ b: toHex(1337) })).not.toThrow();
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
        { a: true, b: 1337 }
      )
    ).toThrow();
    // Wrong
    expect(() =>
      coder.encode(
        // @ts-expect-error
        { a: 1337 }
      )
    ).not.toThrow();
    expect(() =>
      coder.encode(
        // @ts-expect-error
        { b: true }
      )
    ).toThrow();
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
      b: new U64Coder(),
    });

    // Good
    expect(() => coder.encode({ a: true, b: toHex(1337) })).not.toThrow();
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
        { b: toHex(1337) }
      )
    ).toThrow();
    // Over
    expect(() =>
      coder.encode(
        // @ts-expect-error
        { a: true, b: toHex(1337), c: false }
      )
    ).not.toThrow();
    // Wrong
    expect(() =>
      coder.encode(
        // @ts-expect-error
        { a: 1337 }
      )
    ).toThrow();
    expect(() =>
      coder.encode(
        // @ts-expect-error
        { b: true }
      )
    ).toThrow();
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
    const coder = new TupleCoder<[BooleanCoder, U64Coder]>([new BooleanCoder(), new U64Coder()]);

    // Good
    expect(() => coder.encode([true, toHex(1337)])).not.toThrow();
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
        [toHex(1337)]
      )
    ).toThrow();
    // Over
    expect(() =>
      coder.encode(
        // @ts-expect-error
        [true, toHex(1337), false]
      )
    ).toThrow();
    // Wrong
    expect(() =>
      coder.encode(
        // @ts-expect-error
        [toHex(1337), true]
      )
    ).toThrow();
    expect(() =>
      coder.encode(
        // @ts-expect-error
        ['true', toHex(1337)]
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
