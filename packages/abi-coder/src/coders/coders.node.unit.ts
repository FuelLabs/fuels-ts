/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { hexlify } from '@ethersproject/bytes';
import { bn, toHex } from '@fuel-ts/math';

import type Coder from './abstract-coder';
import ArrayCoder from './array';
import B256Coder from './b256';
import B512Coder from './b512';
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
const B512_ZERO =
  '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';
const B512 =
  '0x8e9dda6f7793745ac5aacf9e907cae30b2a01fdf0d23b7750a85c6a44fca0c29f0906f9d1f1e92e6a1fb3c3dcef3cc3b3cdbaae27e47b9d9a4c6a4fce4cf16b2';
const U8_MAX = 2 ** 8 - 1;
const U16_MAX = 2 ** 16 - 1;
const U32_MAX = 2 ** 32 - 1;
const U64_MAX = bn(2).pow(64).sub(1);

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
    'B512Coder',
    [
      [new B512Coder(), B512_ZERO, B512_ZERO],
      [new B512Coder(), B512, B512],
    ],
    [
      // Under
      [
        new B512Coder(),
        B512_ZERO.slice(0, B512_ZERO.length - 1),
        B512_ZERO.slice(0, B512_ZERO.length - 1),
      ],
      // Over
      [new B512Coder(), `${B512_ZERO}0`, `${B512_ZERO}0`],
      [new B512Coder(), `${B512_ZERO}00`, `${B512_ZERO}00`],
      // Wrong
      [new B512Coder(), 'whoops', 'whoops'],
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
      [new ByteCoder(), bn(0), 0],
      [new ByteCoder(), bn(U8_MAX), U8_MAX],
      // `number` inputs
      [new ByteCoder(), 0, 0],
      [new ByteCoder(), U8_MAX, 255],
    ],
    [
      // Under
      [new ByteCoder(), -1, -1],
      // Over
      [new ByteCoder(), bn(U8_MAX + 1), U8_MAX + 1],
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
        { b: bn(1337) },
        { b: bn(1337) },
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
          { a: bn(1337) },
          { b: [bn(1337), bn(1337)] },
          { a: bn(1337) },
          { b: [bn(1337), bn(1337)] },
        ],
        [
          { a: bn(1337) },
          { b: [bn(1337), bn(1337)] },
          { a: bn(1337) },
          { b: [bn(1337), bn(1337)] },
        ],
      ],
    ],
    [
      // Under
      [new EnumCoder('TestEnum', { a: new BooleanCoder(), b: new U64Coder() }), {}, {}],
      // Over
      [
        new EnumCoder('TestEnum', { a: new BooleanCoder(), b: new U64Coder() }),
        { a: true, b: bn(1337) },
        { a: true, b: bn(1337) },
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

      // `u64` BigNumberish inputs
      [new U64Coder(), 0, bn(0)],
      [new U64Coder(), toHex(100), bn(100)],
      [new U64Coder(), bn(U8_MAX), bn(U8_MAX)],
      [new U64Coder(), U16_MAX, bn(U16_MAX)],
      [new U64Coder(), U32_MAX, bn(U32_MAX)],
      [new U64Coder(), U64_MAX, U64_MAX],
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
      [new U64Coder(), bn(U64_MAX.add(1)), bn(U64_MAX.add(1))],
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
        { a: true, b: bn(1337) },
      ],
      [
        new StructCoder('TestStruct', { a: new BooleanCoder(), b: new U64Coder() }),
        { a: true, b: bn(1337) },
        { a: true, b: bn(1337) },
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
      [new TupleCoder([new U64Coder(), new U64Coder()]), [13, 37], [bn(13), bn(37)]],
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

    expect(JSON.stringify(decoded)).toEqual(JSON.stringify(output));
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

describe('ArrayCoder', () => {
  it('will throw when value to encode is not array', () => {
    const coder = new ArrayCoder(new NumberCoder('u8'), 1);
    const nonArrayInput = { ...[1] };
    expect(() => {
      coder.encode(nonArrayInput);
    }).toThrow('expected array value');
  });
});

describe('B256Coder', () => {
  it('will throw when the decoded value length is not equal to 32 bytes', () => {
    const coder = new B256Coder();
    const input = new Uint8Array(Array.from(Array(32).keys()));
    expect(() => {
      coder.decode(input, 1);
    }).toThrow('Invalid size for b256');
  });
});

describe('B512Coder', () => {
  it('will throw when the decoded value length is not equal to 64 bytes', () => {
    const coder = new B512Coder();
    const input = new Uint8Array(Array.from(Array(64).keys()));
    expect(() => {
      coder.decode(input, 1);
    }).toThrow('Invalid size for b512');
  });
});

describe('BooleanCoder', () => {
  it('will throw when the decoded value is not a valid boolean value', () => {
    const coder = new BooleanCoder();
    const input = new Uint8Array(Array.from(Array(4).keys()));
    expect(() => {
      coder.decode(input, 1);
    }).toThrow('Invalid boolean value');
  });
});

describe('ByteCoder', () => {
  it('will throw when the decoded value length is invalid', () => {
    const coder = new ByteCoder();
    const input = new Uint8Array(Array.from(Array(4).keys()));
    expect(() => {
      coder.decode(input, 1);
    }).toThrow('Invalid Byte');
  });
});

describe('EnumCoder', () => {
  it('is typed correctly', () => {
    const coder = new EnumCoder('TestEnum', { a: new BooleanCoder(), b: new U64Coder() });

    // Good
    expect(() => coder.encode({ a: true })).not.toThrow();
    expect(() => coder.encode({ b: bn(1337) })).not.toThrow();
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
  it('will throw when decoded value accesses an invalid coder index', () => {
    const coder = new EnumCoder('TestEnum', { a: new BooleanCoder(), b: new U64Coder() });
    const input = new Uint8Array(Array.from(Array(3).keys()));
    expect(() => {
      coder.decode(input, 1);
    }).toThrow('Invalid caseIndex');
  });
});

describe('StructCoder', () => {
  it('is typed correctly', () => {
    const coder = new StructCoder('TestStruct', {
      a: new BooleanCoder(),
      b: new U64Coder(),
    });

    // Good
    expect(() => coder.encode({ a: true, b: bn(1337) })).not.toThrow();
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
        { b: bn(1337) }
      )
    ).toThrow();
    // Over
    expect(() =>
      coder.encode(
        // @ts-expect-error
        { a: true, b: bn(1337), c: false }
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
    expect(() => coder.encode([true, bn(1337)])).not.toThrow();
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
        [bn(1337)]
      )
    ).toThrow();
    // Over
    expect(() =>
      coder.encode(
        // @ts-expect-error
        [true, bn(1337), false]
      )
    ).toThrow();
    // Wrong
    expect(() =>
      coder.encode(
        // @ts-expect-error
        [bn(1337), true]
      )
    ).toThrow();
    expect(() =>
      coder.encode(
        // @ts-expect-error
        ['true', bn(1337)]
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
