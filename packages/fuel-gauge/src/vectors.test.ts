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
});
