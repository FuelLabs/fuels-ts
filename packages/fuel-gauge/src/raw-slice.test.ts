import type { BN } from 'fuels';
import { type Contract } from 'fuels';

import { getSetupContract } from './utils';

const setupContract = getSetupContract('raw-slice');
let contractInstance: Contract;
beforeAll(async () => {
  contractInstance = await setupContract();
});

describe('Raw Slice Tests', () => {
  it('should test raw slice output', async () => {
    const INPUT = 10;

    const { value } = await contractInstance.functions.return_raw_slice(INPUT).call<BN[]>();

    expect(value.map((v: BN) => v.toNumber())).toStrictEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it('should test raw slice input', async () => {
    const INPUT = [40, 41, 42];

    await contractInstance.functions.accept_raw_slice(INPUT).call<number[]>();

    expect(true).toBeTruthy();
  });

  it('should test raw slice input [nested]', async () => {
    const slice = [40, 41, 42];
    const INPUT = {
      inner: [slice, slice],
      inner_enum: { Second: slice },
    };

    await contractInstance.functions.accept_nested_raw_slice(INPUT).call<number[]>();

    expect(true).toBeTruthy();
  });
});
