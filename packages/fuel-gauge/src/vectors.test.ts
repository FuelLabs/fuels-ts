import type { BN } from 'fuels';
import { bn, randomBytes, type Contract, hexlify } from 'fuels';

import { getSetupContract } from './utils';

const setupContract = getSetupContract('vectors');
let contractInstance: Contract;
beforeAll(async () => {
  contractInstance = await setupContract();
});

describe('Vector Tests', () => {
  it('should test u8 vector input/output', async () => {
    const INPUT = [8, 6, 7, 5, 3, 0, 9];

    const { value } = await contractInstance.functions.echo_u8(INPUT).call<number[]>();

    expect(value).toStrictEqual(INPUT);
  });

  it('should test u16 vector input/output', async () => {
    const INPUT = [8, 6, 7, 5, 3, 0, 9];

    const { value } = await contractInstance.functions.echo_u16(INPUT).call<number[]>();

    expect(value).toStrictEqual(INPUT);
  });

  it('should test u32 vector input/output', async () => {
    const INPUT = [8, 6, 7, 5, 3, 0, 9];

    const { value } = await contractInstance.functions.echo_u32(INPUT).call<number[]>();

    expect(value).toStrictEqual(INPUT);
  });

  it('should test u64 vector input/output', async () => {
    const INPUT = [8, 6, 7, 5, 3, 0, 9];

    const { value } = await contractInstance.functions.echo_u64(INPUT).call<BN[]>();

    expect(value.map((num: BN) => bn(num).toNumber())).toStrictEqual(INPUT);
  });

  it('should test bool vector input/output', async () => {
    const INPUT = [true, false, true, true];

    const { value } = await contractInstance.functions.echo_bool(INPUT).call<boolean[]>();

    expect(value).toStrictEqual(INPUT);
  });

  it('should test b256 vector input/output', async () => {
    const INPUT = [hexlify(randomBytes(32)), hexlify(randomBytes(32)), hexlify(randomBytes(32))];

    const { value } = await contractInstance.functions.echo_b256(INPUT).call<string[]>();

    expect(value).toStrictEqual(INPUT);
  });

  it('should test b512 vector input/output', async () => {
    const INPUT = [hexlify(randomBytes(64)), hexlify(randomBytes(64)), hexlify(randomBytes(64))];

    const { value } = await contractInstance.functions.echo_b512(INPUT).call<string[]>();

    expect(value).toStrictEqual(INPUT);
  });

  it('should test str[1] vector input/output', async () => {
    const INPUT = ['a', 'b', 'c', 'd'];

    const { value } = await contractInstance.functions.echo_str_1(INPUT).call<string[]>();

    expect(value).toStrictEqual(INPUT);
  });

  it('should test str[9] vector input/output', async () => {
    const INPUT = ['123456789', 'abcdefghi', 'catdogcat', 'onetwoone'];

    const { value } = await contractInstance.functions.echo_str_9(INPUT).call<string[]>();

    expect(value).toStrictEqual(INPUT);
  });

  it('should test (u8, u8) vector input/output', async () => {
    const INPUT = [
      [1, 2],
      [3, 4],
      [5, 6],
    ];

    const { value } = await contractInstance.functions.echo_tuple_u8(INPUT).call<string[]>();

    expect(value).toStrictEqual(INPUT);
  });

  it('should test (u64, u64) vector input/output', async () => {
    const INPUT = [
      [111, 2222],
      [333, 4445],
      [5555, 6],
    ];

    const { value } = await contractInstance.functions.echo_tuple_u64(INPUT).call<string[]>();

    expect(value).toStrictEqual(INPUT);
  });

  it('should test [u8; 2] vector input/output', async () => {
    const INPUT = [
      [1, 2],
      [5, 6],
    ];

    const { value } = await contractInstance.functions.echo_array_u8(INPUT).call<string[]>();

    expect(value).toStrictEqual(INPUT);
  });

  it('should test [u64; 5] vector input/output', async () => {
    const INPUT = [
      [1, 2, 3, 4, 5],
      [500, 600, 700, 9000, 9999],
      [11500, 22600, 33700, 55000, 669999],
    ];

    const { value } = await contractInstance.functions.echo_array_u64(INPUT).call<string[]>();

    expect(value).toStrictEqual(INPUT);
  });

  it('should test [bool; 2] vector input/output', async () => {
    const INPUT = [
      [true, true],
      [true, false],
      [false, true],
      [true, false],
      [true, true],
    ];

    const { value } = await contractInstance.functions.echo_array_bool(INPUT).call<string[]>();

    expect(value).toStrictEqual(INPUT);
  });
});
