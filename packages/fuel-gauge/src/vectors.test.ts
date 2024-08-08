import { bn, randomBytes, hexlify } from 'fuels';
import type { BN } from 'fuels';

import { VectorsFactory } from '../test/typegen/contracts';
import { SmallEnumInput } from '../test/typegen/contracts/CoverageContract';

import { launchTestContract } from './utils';

const toNumbers = (nums: BN[]) => nums.map((num: BN) => bn(num).toNumber());

function setupContract() {
  return launchTestContract({
    factory: VectorsFactory,
  });
}

/**
 * @group node
 * @group browser
 */
describe('Vector Tests', () => {
  it('should test u8 vector input/output', async () => {
    using contractInstance = await setupContract();
    const INPUT = [8, 6, 7, 5, 3, 0, 9];

    const { waitForResult } = await contractInstance.functions.echo_u8(INPUT).call<number[]>();
    const { value } = await waitForResult();

    expect(value).toStrictEqual(INPUT);
  });

  it('should test u16 vector input/output', async () => {
    using contractInstance = await setupContract();
    const INPUT = [8, 6, 7, 5, 3, 0, 9];

    const { waitForResult } = await contractInstance.functions.echo_u16(INPUT).call<number[]>();
    const { value } = await waitForResult();

    expect(value).toStrictEqual(INPUT);
  });

  it('should test u32 vector input/output', async () => {
    using contractInstance = await setupContract();

    const INPUT = [8, 6, 7, 5, 3, 0, 9];

    const { waitForResult } = await contractInstance.functions.echo_u32(INPUT).call<number[]>();
    const { value } = await waitForResult();

    expect(value).toStrictEqual(INPUT);
  });

  it('should test u64 vector input/output', async () => {
    using contractInstance = await setupContract();

    const INPUT = [8, 6, 7, 5, 3, 0, 9];

    const { waitForResult } = await contractInstance.functions.echo_u64(INPUT).call<BN[]>();
    const { value } = await waitForResult();

    expect(toNumbers(value)).toStrictEqual(INPUT);
  });

  it('should test bool vector input/output', async () => {
    using contractInstance = await setupContract();

    const INPUT = [true, false, true, true];

    const { waitForResult } = await contractInstance.functions.echo_bool(INPUT).call<boolean[]>();
    const { value } = await waitForResult();

    expect(value).toStrictEqual(INPUT);
  });

  it('should test b256 vector input/output', async () => {
    using contractInstance = await setupContract();

    const INPUT = [hexlify(randomBytes(32)), hexlify(randomBytes(32)), hexlify(randomBytes(32))];

    const { waitForResult } = await contractInstance.functions.echo_b256(INPUT).call<string[]>();
    const { value } = await waitForResult();

    expect(value).toStrictEqual(INPUT);
  });

  it('should test b512 vector input/output', async () => {
    using contractInstance = await setupContract();

    const INPUT = [hexlify(randomBytes(64)), hexlify(randomBytes(64)), hexlify(randomBytes(64))];

    const { waitForResult } = await contractInstance.functions.echo_b512(INPUT).call<string[]>();
    const { value } = await waitForResult();

    expect(value).toStrictEqual(INPUT);
  });

  it('should test str[1] vector input/output', async () => {
    using contractInstance = await setupContract();

    const INPUT = ['a', 'b', 'c', 'd'];

    const { waitForResult } = await contractInstance.functions.echo_str_1(INPUT).call<string[]>();
    const { value } = await waitForResult();

    expect(value).toStrictEqual(INPUT);
  });

  it('should test str[9] vector input/output', async () => {
    using contractInstance = await setupContract();

    const INPUT = ['123456789', 'abcdefghi', 'catdogcat', 'onetwoone'];

    const { waitForResult } = await contractInstance.functions.echo_str_9(INPUT).call<string[]>();
    const { value } = await waitForResult();

    expect(value).toStrictEqual(INPUT);
  });

  it('should test (u8, u8) vector input/output', async () => {
    using contractInstance = await setupContract();

    const INPUT = [
      [1, 2],
      [3, 4],
      [5, 6],
    ];

    const { waitForResult } = await contractInstance.functions
      .echo_tuple_u8(INPUT)
      .call<string[]>();
    const { value } = await waitForResult();

    expect(value).toStrictEqual(INPUT);
  });

  it('should test (u64, u64) vector input/output', async () => {
    using contractInstance = await setupContract();

    const INPUT = [
      [111, 2222],
      [333, 4445],
      [5555, 6],
    ];

    const { waitForResult } = await contractInstance.functions.echo_tuple_u64(INPUT).call<BN[][]>();
    const { value } = await waitForResult();

    expect(value.map((nums: BN[]) => toNumbers(nums))).toStrictEqual(INPUT);
  });

  it('should test [u8; 2] vector input/output', async () => {
    using contractInstance = await setupContract();

    const INPUT = [
      [1, 2],
      [5, 6],
    ];

    const { waitForResult } = await contractInstance.functions
      .echo_array_u8(INPUT)
      .call<string[]>();
    const { value } = await waitForResult();

    expect(value).toStrictEqual(INPUT);
  });

  it('should test [u64; 5] vector input/output', async () => {
    using contractInstance = await setupContract();

    const INPUT = [
      [1, 2, 3, 4, 5],
      [500, 600, 700, 9000, 9999],
      [11500, 22600, 33700, 55000, 669999],
    ];

    const { waitForResult } = await contractInstance.functions.echo_array_u64(INPUT).call<BN[][]>();
    const { value } = await waitForResult();

    expect(value.map((nums: BN[]) => toNumbers(nums))).toStrictEqual(INPUT);
  });

  it('should test [bool; 2] vector input/output', async () => {
    using contractInstance = await setupContract();

    const INPUT = [
      [true, true],
      [true, false],
      [false, true],
      [true, false],
      [true, true],
    ];

    const { waitForResult } = await contractInstance.functions
      .echo_array_bool(INPUT)
      .call<string[]>();
    const { value } = await waitForResult();

    expect(value).toStrictEqual(INPUT);
  });

  it('should test U8Struct vector input/output', async () => {
    using contractInstance = await setupContract();

    const INPUT = [
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

    const { waitForResult } = await contractInstance.functions
      .echo_struct_u8(INPUT)
      .call<string[]>();
    const { value } = await waitForResult();

    expect(value).toStrictEqual(INPUT);
  });

  it('should test B256Struct vector input/output', async () => {
    using contractInstance = await setupContract();

    const INPUT = [
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

    const { waitForResult } = await contractInstance.functions
      .echo_struct_b256(INPUT)
      .call<string[]>();
    const { value } = await waitForResult();

    expect(value).toStrictEqual(INPUT);
  });

  it('should test ComplexStruct vector input/output', async () => {
    using contractInstance = await setupContract();

    type ComplexStruct = { foo: number; bar: BN; baz: string };
    const INPUT = [
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

    const { waitForResult } = await contractInstance.functions
      .echo_struct_complex(INPUT)
      .call<ComplexStruct[]>();
    const { value } = await waitForResult();

    expect(
      value.map((data: ComplexStruct) => ({
        ...data,
        bar: bn(data.bar).toNumber(),
      }))
    ).toStrictEqual(INPUT);
  });

  it('should test SmallEnum vector input/output', async () => {
    using contractInstance = await setupContract();

    const INPUT = [
      SmallEnumInput.Empty,
      SmallEnumInput.Empty,
      SmallEnumInput.Empty,
      SmallEnumInput.Empty,
      SmallEnumInput.Empty,
    ];

    const { waitForResult } = await contractInstance.functions
      .echo_enum_small(INPUT)
      .call<string[]>();
    const { value } = await waitForResult();

    expect(value).toStrictEqual(INPUT);
  });

  it('should test BigEnum vector input/output', async () => {
    using contractInstance = await setupContract();

    const INPUT = [
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

    const { waitForResult } = await contractInstance.functions
      .echo_enum_big(INPUT)
      .call<string[]>();
    const { value } = await waitForResult();

    expect(value).toStrictEqual(INPUT);
  });

  it('should test Option<u8> vector input/output', async () => {
    using contractInstance = await setupContract();

    const INPUT = [undefined, 1, undefined, 2, undefined, 3];

    const { waitForResult } = await contractInstance.functions.echo_option_u8(INPUT).call();
    const { value } = await waitForResult();

    expect(value).toStrictEqual(INPUT);
  });

  it('should test Vec<u8> inside struct input/output', async () => {
    using contractInstance = await setupContract();

    const INPUT = {
      num: 2,
      vec: [1, 5, 98],
    };

    const { waitForResult } = await contractInstance.functions
      .echo_vector_inside_struct(INPUT)
      .call();
    const { value } = await waitForResult();

    expect(value).toStrictEqual(INPUT);
  });

  it('should test Vec<u8> inside enum input/output', async () => {
    using contractInstance = await setupContract();

    const INPUT = {
      vec: [1, 5, 98],
    };

    const { waitForResult } = await contractInstance.functions
      .echo_vector_inside_enum(INPUT)
      .call();
    const { value } = await waitForResult();

    expect(value).toStrictEqual(INPUT);
  });

  it('should test Vec<u8> inside vector input/output', async () => {
    using contractInstance = await setupContract();

    const INPUT = [[1, 5, 98], [2, 44], [34]];

    const { waitForResult } = await contractInstance.functions
      .echo_vector_inside_vector(INPUT)
      .call();
    const { value } = await waitForResult();

    expect(value).toStrictEqual(INPUT);
  });

  it('should test struct and Vec<u8> input/output', async () => {
    using contractInstance = await setupContract();

    type Struct = { foo: number; bar: BN; baz: string };
    const INPUT: [Struct, number[]] = [
      {
        foo: 1,
        bar: bn(10000000),
        baz: 'abc123456',
      },
      [1, 4],
    ];

    const { waitForResult } = await contractInstance.functions
      .echo_struct_and_vector_tuple(INPUT[0], INPUT[1])
      .call();
    const { value } = await waitForResult();

    expect(value[0].foo).toStrictEqual(INPUT[0].foo);
    expect(value[0].bar.toNumber()).toStrictEqual(INPUT[0].bar.toNumber());
    expect(value[0].baz).toStrictEqual(INPUT[0].baz);
    expect(value[1]).toStrictEqual(INPUT[1]);
  });

  it('should test Vec<u8> and b256 tuple input/output', async () => {
    using contractInstance = await setupContract();

    const INPUT = [[1, 8, 3, 2, 55, 215], hexlify(randomBytes(32))];

    const { waitForResult } = await contractInstance.functions
      .echo_vector_and_b256_tuple(...INPUT)
      .call();
    const { value } = await waitForResult();

    expect(value).toStrictEqual(INPUT);
  });

  it('should test two vectors tuple input/output', async () => {
    using contractInstance = await setupContract();

    const INPUT = [
      [219, 229],
      [1, 254, 55],
    ];

    const { waitForResult } = await contractInstance.functions
      .echo_two_vectors_tuple(...INPUT)
      .call();
    const { value } = await waitForResult();

    expect(value).toStrictEqual(INPUT);
  });

  it('should test u32 and three different vectors tuple input/output', async () => {
    using contractInstance = await setupContract();

    const INPUT = [91000, [true, true, false], [95000, 153333], [20000, 65500]];

    const { waitForResult } = await contractInstance.functions
      .echo_u32_then_three_vectors(...INPUT)
      .call();
    const { value } = await waitForResult();

    expect(value).toStrictEqual(INPUT);
  });

  it('should test multiCall vectors', async () => {
    using contractInstance = await setupContract();

    const { waitForResult } = await contractInstance
      .multiCall([
        contractInstance.functions.echo_u8([1]),
        contractInstance.functions.echo_u8([2, 2]),
        contractInstance.functions.echo_u8([3, 3, 3]),
      ])
      .call();

    const { value: results } = await waitForResult();
    expect(results).toStrictEqual([[1], [2, 2], [3, 3, 3]]);
  });
});
