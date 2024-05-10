import { bn, hexlify, randomBytes } from 'fuels';
import type { BN, Contract } from 'fuels';

import { getSetupContract } from './utils';

const setupContract = getSetupContract('vectors');
let contractInstance: Contract;
beforeAll(async () => {
  contractInstance = await setupContract();
});

const toNumbers = (nums: BN[]) => nums.map((num: BN) => bn(num).toNumber());

enum SmallEnum {
  Empty = 'Empty',
}

/**
 * @group node
 */
describe('Vector Tests', () => {
  it('should test u8 vector input/output', async () => {
    const input = [8, 6, 7, 5, 3, 0, 9];

    const { value } = await contractInstance.functions
      .echo_u8(input)
      .call<number[]>();

    expect(value).toStrictEqual(input);
  });

  it('should test u16 vector input/output', async () => {
    const input = [8, 6, 7, 5, 3, 0, 9];

    const { value } = await contractInstance.functions
      .echo_u16(input)
      .call<number[]>();

    expect(value).toStrictEqual(input);
  });

  it('should test u32 vector input/output', async () => {
    const input = [8, 6, 7, 5, 3, 0, 9];

    const { value } = await contractInstance.functions
      .echo_u32(input)
      .call<number[]>();

    expect(value).toStrictEqual(input);
  });

  it('should test u64 vector input/output', async () => {
    const input = [8, 6, 7, 5, 3, 0, 9];

    const { value } = await contractInstance.functions
      .echo_u64(input)
      .call<BN[]>();

    expect(toNumbers(value)).toStrictEqual(input);
  });

  it('should test bool vector input/output', async () => {
    const input = [true, false, true, true];

    const { value } = await contractInstance.functions
      .echo_bool(input)
      .call<boolean[]>();

    expect(value).toStrictEqual(input);
  });

  it('should test b256 vector input/output', async () => {
    const input = [
      hexlify(randomBytes(32)),
      hexlify(randomBytes(32)),
      hexlify(randomBytes(32)),
    ];

    const { value } = await contractInstance.functions
      .echo_b256(input)
      .call<string[]>();

    expect(value).toStrictEqual(input);
  });

  it('should test b512 vector input/output', async () => {
    const input = [
      hexlify(randomBytes(64)),
      hexlify(randomBytes(64)),
      hexlify(randomBytes(64)),
    ];

    const { value } = await contractInstance.functions
      .echo_b512(input)
      .call<string[]>();

    expect(value).toStrictEqual(input);
  });

  it('should test str[1] vector input/output', async () => {
    const input = ['a', 'b', 'c', 'd'];

    const { value } = await contractInstance.functions
      .echo_str_1(input)
      .call<string[]>();

    expect(value).toStrictEqual(input);
  });

  it('should test str[9] vector input/output', async () => {
    const input = ['123456789', 'abcdefghi', 'catdogcat', 'onetwoone'];

    const { value } = await contractInstance.functions
      .echo_str_9(input)
      .call<string[]>();

    expect(value).toStrictEqual(input);
  });

  it('should test (u8, u8) vector input/output', async () => {
    const input = [
      [1, 2],
      [3, 4],
      [5, 6],
    ];

    const { value } = await contractInstance.functions
      .echo_tuple_u8(input)
      .call<string[]>();

    expect(value).toStrictEqual(input);
  });

  it('should test (u64, u64) vector input/output', async () => {
    const input = [
      [111, 2222],
      [333, 4445],
      [5555, 6],
    ];

    const { value } = await contractInstance.functions
      .echo_tuple_u64(input)
      .call<BN[][]>();

    expect(value.map((nums: BN[]) => toNumbers(nums))).toStrictEqual(input);
  });

  it('should test [u8; 2] vector input/output', async () => {
    const input = [
      [1, 2],
      [5, 6],
    ];

    const { value } = await contractInstance.functions
      .echo_array_u8(input)
      .call<string[]>();

    expect(value).toStrictEqual(input);
  });

  it('should test [u64; 5] vector input/output', async () => {
    const input = [
      [1, 2, 3, 4, 5],
      [500, 600, 700, 9000, 9999],
      [11500, 22600, 33700, 55000, 669999],
    ];

    const { value } = await contractInstance.functions
      .echo_array_u64(input)
      .call<BN[][]>();

    expect(value.map((nums: BN[]) => toNumbers(nums))).toStrictEqual(input);
  });

  it('should test [bool; 2] vector input/output', async () => {
    const input = [
      [true, true],
      [true, false],
      [false, true],
      [true, false],
      [true, true],
    ];

    const { value } = await contractInstance.functions
      .echo_array_bool(input)
      .call<string[]>();

    expect(value).toStrictEqual(input);
  });

  it('should test U8Struct vector input/output', async () => {
    const input = [
      {
        i: 1,
      },
      {
        i: 3,
      },
      {
        i: 7,
      },
    ];

    const { value } = await contractInstance.functions
      .echo_struct_u8(input)
      .call<string[]>();

    expect(value).toStrictEqual(input);
  });

  it('should test B256Struct vector input/output', async () => {
    const input = [
      {
        i: hexlify(randomBytes(32)),
      },
      {
        i: hexlify(randomBytes(32)),
      },
      {
        i: hexlify(randomBytes(32)),
      },
    ];

    const { value } = await contractInstance.functions
      .echo_struct_b256(input)
      .call<string[]>();

    expect(value).toStrictEqual(input);
  });

  it('should test ComplexStruct vector input/output', async () => {
    type ComplexStruct = { foo: number; bar: BN; baz: string };
    const input = [
      {
        foo: 1,
        bar: 10000000,
        baz: 'abc123456',
      },
      {
        foo: 2,
        bar: 20000000,
        baz: 'abc123456',
      },
      {
        foo: 3,
        bar: 30000000,
        baz: 'abc123456',
      },
    ];

    const { value } = await contractInstance.functions
      .echo_struct_complex(input)
      .call<ComplexStruct[]>();

    expect(
      value.map((data: ComplexStruct) => ({
        ...data,
        bar: bn(data.bar).toNumber(),
      })),
    ).toStrictEqual(input);
  });

  it('should test SmallEnum vector input/output', async () => {
    const input = [
      SmallEnum.Empty,
      SmallEnum.Empty,
      SmallEnum.Empty,
      SmallEnum.Empty,
      SmallEnum.Empty,
    ];

    const { value } = await contractInstance.functions
      .echo_enum_small(input)
      .call<string[]>();

    expect(value).toStrictEqual(input);
  });

  it('should test BigEnum vector input/output', async () => {
    const input = [
      {
        AddressA: hexlify(randomBytes(32)),
      },
      {
        AddressC: hexlify(randomBytes(32)),
      },
      {
        AddressB: hexlify(randomBytes(32)),
      },
    ];

    const { value } = await contractInstance.functions
      .echo_enum_big(input)
      .call<string[]>();

    expect(value).toStrictEqual(input);
  });

  it('should test Option<u8> vector input/output', async () => {
    const input = [undefined, 1, undefined, 2, undefined, 3];

    const { value } = await contractInstance.functions
      .echo_option_u8(input)
      .call();

    expect(value).toStrictEqual(input);
  });

  it('should test Vec<u8> inside struct input/output', async () => {
    const input = {
      num: 2,
      vec: [1, 5, 98],
    };

    const { value } = await contractInstance.functions
      .echo_vector_inside_struct(input)
      .call();

    expect(value).toStrictEqual(input);
  });

  it('should test Vec<u8> inside enum input/output', async () => {
    const input = {
      vec: [1, 5, 98],
    };

    const { value } = await contractInstance.functions
      .echo_vector_inside_enum(input)
      .call();

    expect(value).toStrictEqual(input);
  });

  it('should test Vec<u8> inside vector input/output', async () => {
    const input = [[1, 5, 98], [2, 44], [34]];

    const { value } = await contractInstance.functions
      .echo_vector_inside_vector(input)
      .call();

    expect(value).toStrictEqual(input);
  });

  it('should test struct and Vec<u8> input/output', async () => {
    type Struct = { foo: number; bar: BN; baz: string };
    const input: [Struct, number[]] = [
      {
        foo: 1,
        bar: bn(10000000),
        baz: 'abc123456',
      },
      [1, 4],
    ];

    const { value } = await contractInstance.functions
      .echo_struct_and_vector_tuple(input[0], input[1])
      .call();

    expect(value[0].foo).toStrictEqual(input[0].foo);
    expect(value[0].bar.toNumber()).toStrictEqual(input[0].bar.toNumber());
    expect(value[0].baz).toStrictEqual(input[0].baz);
    expect(value[1]).toStrictEqual(input[1]);
  });

  it('should test Vec<u8> and b256 tuple input/output', async () => {
    const input = [[1, 8, 3, 2, 55, 215], hexlify(randomBytes(32))];

    const { value } = await contractInstance.functions
      .echo_vector_and_b256_tuple(...input)
      .call();

    expect(value).toStrictEqual(input);
  });

  it('should test two vectors tuple input/output', async () => {
    const input = [
      [219, 229],
      [1, 254, 55],
    ];

    const { value } = await contractInstance.functions
      .echo_two_vectors_tuple(...input)
      .call();

    expect(value).toStrictEqual(input);
  });

  it('should test u32 and three different vectors tuple input/output', async () => {
    const input = [91000, [true, true, false], [95000, 153333], [20000, 65500]];

    const { value } = await contractInstance.functions
      .echo_u32_then_three_vectors(...input)
      .call();

    expect(value).toStrictEqual(input);
  });

  it('should test multiCall vectors', async () => {
    const { value: results } = await contractInstance
      .multiCall([
        contractInstance.functions.echo_u8([1]),
        contractInstance.functions.echo_u8([2, 2]),
        contractInstance.functions.echo_u8([3, 3, 3]),
      ])
      .call();
    expect(results).toStrictEqual([[1], [2, 2], [3, 3, 3]]);
  });
});
