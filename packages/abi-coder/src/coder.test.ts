import { BigNumber as BN } from '@ethersproject/bignumber';

import AbiCoder from './abi-coder';
import type { DecodedValue } from './coders/abstract-coder';

const B256 = '0xd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b';
const U32_MAX = 4294967295;
// U64_MAX is greater than Number.MAX_SAFE_INTEGER
// The max safe integer value is 2^53 - 1
const U64_MAX = '18446744073709551615';

describe('AbiCoder', () => {
  let abiCoder: AbiCoder;

  beforeEach(() => {
    abiCoder = new AbiCoder();
  });

  it('encodes and decodes addresses', () => {
    let encoded = abiCoder.encode(
      [
        {
          type: 'address',
          name: 'arg',
        },
      ],
      [B256]
    );
    expect(encoded).toEqual(B256);
    let decoded = abiCoder.decode(
      [
        {
          type: 'address',
          name: 'arg',
        },
      ],
      encoded
    ) as DecodedValue[];

    expect(Array.from(decoded)).toEqual([
      '0xd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b',
    ]);

    encoded = abiCoder.encode(
      [
        {
          type: 'address',
          name: 'arg1',
        },
        {
          type: 'address',
          name: 'arg2',
        },
      ],
      [B256, B256]
    );
    expect(encoded).toEqual(
      '0xd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930bd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b'
    );

    decoded = abiCoder.decode(
      [
        {
          type: 'address',
          name: 'arg1',
        },
        {
          type: 'address',
          name: 'arg2',
        },
      ],
      encoded
    ) as DecodedValue[];
    expect(Array.from(decoded)).toEqual([
      '0xd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b',
      '0xd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b',
    ]);
  });

  it('encodes and decodes b256', () => {
    let encoded = abiCoder.encode(
      [
        {
          type: 'b256',
          name: 'arg0',
        },
      ],
      [B256]
    );
    expect(encoded).toEqual(B256);

    let decoded = abiCoder.decode(
      [
        {
          type: 'b256',
          name: 'arg0',
        },
      ],
      encoded
    ) as DecodedValue[];

    expect(Array.from(decoded)).toEqual([B256]);

    encoded = abiCoder.encode(
      [
        {
          type: 'b256',
          name: 'arg0',
        },
        {
          type: 'b256',
          name: 'arg1',
        },
      ],
      [B256, B256]
    );
    expect(encoded).toEqual(
      '0xd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930bd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b'
    );

    decoded = abiCoder.decode(
      [
        {
          type: 'b256',
          name: 'arg0',
        },
        {
          type: 'b256',
          name: 'arg1',
        },
      ],
      encoded
    ) as DecodedValue[];

    expect(Array.from(decoded)).toEqual([B256, B256]);
  });

  it('encodes and decodes b256 starting with zero', () => {
    const encoded = abiCoder.encode(
      [
        {
          type: 'b256',
          name: 'arg0',
        },
      ],
      ['0x00579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b']
    );
    expect(encoded).toEqual('0x00579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b');
    const decoded = abiCoder.decode(
      [
        {
          type: 'b256',
          name: 'arg0',
        },
      ],
      encoded
    );
    expect(decoded).toContain('0x00579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b');
  });

  it('encodes and decodes byte', () => {
    const encoded = abiCoder.encode(
      [
        {
          type: 'byte',
          name: 'arg1',
        },
      ],
      ['255']
    );
    expect(encoded).toEqual('0x00000000000000ff');

    const decoded = abiCoder.decode(
      [
        {
          type: 'byte',
          name: 'arg1',
        },
      ],
      encoded
    ) as DecodedValue[];

    expect(Array.from(decoded)).toEqual([BN.from(255)]);
  });

  it('encodes and decodes boolean', () => {
    let encoded = abiCoder.encode(
      [
        {
          type: 'bool',
          name: 'arg0',
        },
      ],
      [true]
    );
    expect(encoded).toEqual('0x0000000000000001');
    let decoded = abiCoder.decode(
      [
        {
          type: 'bool',
          name: 'arg0',
        },
      ],
      encoded
    ) as DecodedValue[];

    expect(Array.from(decoded)).toEqual([true]);

    encoded = abiCoder.encode(
      [
        {
          type: 'bool',
          name: 'arg0',
        },
      ],
      [false]
    );
    expect(encoded).toEqual('0x0000000000000000');
    decoded = abiCoder.decode(
      [
        {
          type: 'bool',
          name: 'arg0',
        },
      ],
      encoded
    ) as DecodedValue[];

    expect(Array.from(decoded)).toEqual([false]);
  });

  it('encodes u8, u16, u32, u64', () => {
    let encoded = abiCoder.encode(
      [
        {
          type: 'u8',
          name: 'arg0',
        },
      ],
      [1]
    );
    expect(encoded).toEqual('0x0000000000000001');
    expect(
      abiCoder.decode(
        [
          {
            type: 'u8',
            name: 'arg0',
          },
        ],
        encoded
      )
    ).toContainEqual(BN.from(1));

    encoded = abiCoder.encode(
      [
        {
          type: 'u8',
          name: 'arg0',
        },
      ],
      [BN.from(1)]
    );
    expect(encoded).toEqual('0x0000000000000001');
    expect(
      abiCoder.decode(
        [
          {
            type: 'u8',
            name: 'arg0',
          },
        ],
        encoded
      )
    ).toContainEqual(BN.from(1));

    encoded = abiCoder.encode(
      [
        {
          type: 'u8',
          name: 'arg0',
        },
      ],
      [255]
    );
    expect(encoded).toEqual('0x00000000000000ff');
    expect(
      abiCoder.decode(
        [
          {
            type: 'u8',
            name: 'arg0',
          },
        ],
        encoded
      )
    ).toContainEqual(BN.from(255));

    encoded = abiCoder.encode(
      [
        {
          type: 'u16',
          name: 'arg0',
        },
      ],
      [1]
    );
    expect(encoded).toEqual('0x0000000000000001');
    expect(
      abiCoder.decode(
        [
          {
            type: 'u16',
            name: 'arg0',
          },
        ],
        encoded
      )
    ).toContainEqual(BN.from(1));

    encoded = abiCoder.encode(
      [
        {
          type: 'u16',
          name: 'arg0',
        },
      ],
      [65535]
    );
    expect(encoded).toEqual('0x000000000000ffff');
    expect(
      abiCoder.decode(
        [
          {
            type: 'u16',
            name: 'arg0',
          },
        ],
        encoded
      )
    ).toContainEqual(BN.from(65535));

    encoded = abiCoder.encode(
      [
        {
          type: 'u32',
          name: 'arg0',
        },
      ],
      [U32_MAX]
    );
    expect(encoded).toEqual('0x00000000ffffffff');
    expect(
      abiCoder.decode(
        [
          {
            type: 'u32',
            name: 'arg0',
          },
        ],
        encoded
      )
    ).toContainEqual(BN.from(U32_MAX));

    encoded = abiCoder.encode(
      [
        {
          type: 'u32',
          name: 'arg0',
        },
      ],
      [42]
    );
    expect(encoded).toEqual('0x000000000000002a');
    expect(
      abiCoder.decode(
        [
          {
            type: 'u32',
            name: 'arg0',
          },
        ],
        encoded
      )
    ).toContainEqual(BN.from(42));

    encoded = abiCoder.encode(
      [
        {
          type: 'u64',
          name: 'arg0',
        },
      ],
      [U64_MAX]
    );
    expect(encoded).toEqual('0xffffffffffffffff');
    expect(
      abiCoder.decode(
        [
          {
            type: 'u64',
            name: 'arg0',
          },
        ],
        encoded
      )
    ).toContainEqual(BN.from(U64_MAX));

    encoded = abiCoder.encode(
      [
        {
          type: 'u64',
          name: 'arg0',
        },
      ],
      [BigInt(U64_MAX)]
    );
    expect(encoded).toEqual('0xffffffffffffffff');
    encoded = abiCoder.encode(
      [
        {
          type: 'u64',
          name: 'arg0',
        },
      ],
      [BN.from(U64_MAX)]
    );
    expect(encoded).toEqual('0xffffffffffffffff');
  });

  it('encodes and decodes fixed strings', () => {
    let encoded = abiCoder.encode(
      [
        {
          type: 'str[12]',
          name: 'arg0',
        },
      ],
      ['Hello, World']
    );
    expect(encoded).toEqual('0x48656c6c6f2c20576f726c6400000000');
    expect(
      abiCoder.decode(
        [
          {
            type: 'str[12]',
            name: 'arg0',
          },
        ],
        encoded
      )
    ).toContain('Hello, World');

    encoded = abiCoder.encode(
      [
        {
          type: 'str[23]',
          name: 'arg0',
        },
      ],
      ['This is a full sentence']
    );
    expect(encoded).toEqual('0x5468697320697320612066756c6c2073656e74656e636500');
    expect(
      abiCoder.decode(
        [
          {
            type: 'str[23]',
            name: 'arg0',
          },
        ],
        encoded
      )
    ).toContain('This is a full sentence');

    encoded = abiCoder.encode(
      [
        {
          type: 'str[8]',
          name: 'arg0',
        },
      ],
      ['abcdefgh']
    );
    expect(encoded).toEqual('0x6162636465666768');
    expect(
      abiCoder.decode(
        [
          {
            type: 'str[8]',
            name: 'arg0',
          },
        ],
        encoded
      )
    ).toContain('abcdefgh');

    encoded = abiCoder.encode(
      [
        {
          type: 'str[23]',
          name: 'arg0',
        },
        {
          type: 'str[8]',
          name: 'arg1',
        },
        {
          type: 'str[12]',
          name: 'arg2',
        },
      ],
      ['This is a full sentence', 'abcdefgh', 'Hello, World']
    );
    expect(encoded).toEqual(
      '0x5468697320697320612066756c6c2073656e74656e636500616263646566676848656c6c6f2c20576f726c6400000000'
    );
    const decoded = abiCoder.decode(
      [
        {
          type: 'str[23]',
          name: 'arg0',
        },
        {
          type: 'str[8]',
          name: 'arg1',
        },
        {
          type: 'str[12]',
          name: 'arg2',
        },
      ],
      encoded
    ) as DecodedValue[];
    expect(Array.from(decoded)).toEqual(['This is a full sentence', 'abcdefgh', 'Hello, World']);
  });

  it('encodeds and decodes structs', () => {
    const encoded = abiCoder.encode(
      [
        {
          name: 'test',
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
      [
        {
          foo: 42,
          bar: 2,
        },
      ]
    );
    expect(encoded).toEqual('0x000000000000002a0000000000000002');

    const decoded = abiCoder.decode(
      [
        {
          name: 'test',
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
      encoded
    ) as DecodedValue[];

    const struct = Array.from(decoded)[0];
    expect(struct).toContainEqual(BN.from(42));
    expect(struct).toContainEqual(BN.from(2));
  });

  it('encodes and decodes an array of primitives', () => {
    const encoded = abiCoder.encode(
      [
        {
          type: 'bool',
          name: 'arg0',
        },
        {
          type: '[u8; 2]',
          name: 'arg1',
        },
      ],
      [true, [1, 2]]
    );
    expect(encoded).toEqual('0x000000000000000100000000000000010000000000000002');
    const decoded = abiCoder.decode(
      [
        {
          type: 'bool',
          name: 'arg0',
        },
        {
          type: '[u8; 2]',
          name: 'arg1',
        },
      ],
      encoded
    ) as DecodedValue[];
    expect(Array.from(decoded)).toEqual([true, [BN.from(1), BN.from(2)]]);
  });

  it('encodes and decodes empty', () => {
    let encoded = abiCoder.encode(
      [
        {
          name: 'arg',
          type: '()',
        },
      ],
      []
    );
    expect(encoded).toEqual('0x');
    expect(
      abiCoder.decode(
        [
          {
            name: 'arg',
            type: '()',
          },
        ],
        encoded
      )
    ).toEqual(undefined);

    encoded = abiCoder.encode(
      [
        {
          name: 'arg0',
          type: 'u16',
        },
        {
          name: 'arg1',
          type: '()',
        },
      ],
      [65535]
    );
    expect(encoded).toEqual('0x000000000000ffff');
    const decoded = abiCoder.decode(
      [
        {
          name: 'arg0',
          type: 'u16',
        },
        {
          name: 'arg1',
          type: '()',
        },
      ],
      encoded
    ) as DecodedValue[];

    expect(Array.from(decoded)).toEqual([BN.from(65535)]);
  });

  it('encodes and decodes tuples', () => {
    let encoded = abiCoder.encode(
      [
        {
          name: 'input',
          type: '(u64, u64)',
          components: null,
        },
      ],
      [[42, 2]]
    );
    expect(encoded).toEqual('0x000000000000002a0000000000000002');

    let decoded = abiCoder.decode(
      [
        {
          name: 'input',
          type: '(u64, u64)',
          components: null,
        },
      ],
      encoded
    ) as DecodedValue[];

    expect(Array.from(decoded)).toEqual([[BN.from(42), BN.from(2)]]);

    encoded = abiCoder.encode(
      [
        {
          name: 'input',
          type: '(u64,u64)',
          components: null,
        },
      ],
      [[42, 2]]
    );
    expect(encoded).toEqual('0x000000000000002a0000000000000002');

    decoded = abiCoder.decode(
      [
        {
          name: 'input',
          type: '(u64,u64)',
          components: null,
        },
      ],
      encoded
    ) as DecodedValue[];

    expect(Array.from(decoded)).toEqual([[BN.from(42), BN.from(2)]]);
  });

  it('it throws errors if tuple type and input/output length do not match', () => {
    expect(() =>
      abiCoder.encode(
        [
          {
            name: 'input',
            type: '(u64, u64)',
            components: null,
          },
        ],
        [[42, 2, 4]]
      )
    ).toThrow('Types/values length mismatch');

    expect(() =>
      abiCoder.encode(
        [
          {
            name: 'input',
            type: '(u64, u64)',
            components: null,
          },
        ],
        [[]]
      )
    ).toThrow('Types/values length mismatch');

    expect(() =>
      abiCoder.decode(
        [
          {
            name: 'input',
            type: '(u64)',
            components: null,
          },
        ],
        '0x000000000000002a0000000000000002'
      )
    ).toThrow('Types/values length mismatch');

    // TODO: Update to throw type/value error
    expect(() =>
      abiCoder.decode(
        [
          {
            name: 'input',
            type: '(u64, u64, u64)',
            components: null,
          },
        ],
        '0x000000000000002a0000000000000002'
      )
    ).toThrowError();
  });

  it('throws an error if empty ABI has values', () => {
    expect(() =>
      abiCoder.encode(
        [
          {
            name: 'arg0',
            type: '()',
          },
        ],
        ['abcde']
      )
    ).toThrow('Types/values length mismatch');
    expect(
      abiCoder.decode(
        [
          {
            name: 'arg0',
            type: '()',
          },
        ],
        '0xffffffffffffffff'
      )
    ).toBe(undefined);
  });

  it('throws an error when value and type lengths are different', () => {
    expect(() =>
      abiCoder.decode(
        [
          {
            name: 'arg',
            type: 'u16',
          },
        ],
        '0x000000000000ffff000000000000002a48656c6c6f2c20576f726c6400000000'
      )
    ).toThrow('Types/values length mismatch');
    expect(() =>
      abiCoder.encode(
        [
          {
            name: 'arg',
            type: '[u16; 3]',
          },
        ],
        [[65535]]
      )
    ).toThrow('Types/values length mismatch');
  });

  it('throws an error if the value type is not valid', () => {
    expect(() =>
      abiCoder.encode(
        [
          {
            type: 'foobar',
            name: '1234',
          },
        ],
        [65535]
      )
    ).toThrow('Invalid type');
  });

  it('throws error on mis-match value and type', () => {
    expect(() =>
      abiCoder.encode(
        [
          {
            name: 'arg',
            type: 'u8',
          },
        ],
        [U64_MAX]
      )
    ).toThrow('Invalid u8');
    expect(() =>
      abiCoder.encode(
        [
          {
            name: 'arg',
            type: 'u16',
          },
        ],
        [U64_MAX]
      )
    ).toThrow('Invalid u16');
    expect(() =>
      abiCoder.encode(
        [
          {
            name: 'arg',
            type: 'u32',
          },
        ],
        [U64_MAX]
      )
    ).toThrow('Invalid u32');

    expect(() =>
      abiCoder.decode(
        [
          {
            name: 'arg',
            type: 'bool',
          },
        ],
        '0x0000000000000003'
      )
    ).toThrow('Invalid boolean value');

    expect(() =>
      abiCoder.encode(
        [
          {
            name: 'arg',
            type: 'u64',
          },
        ],
        [2 ** 53]
      )
    ).toThrow('Invalid u64');
  });
});
