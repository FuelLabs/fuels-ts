import type { BN } from 'fuels';
import { bn, type Contract } from 'fuels';

import { getSetupContract } from './utils';

const setupContract = getSetupContract('vectors');
let contractInstance: Contract;
beforeAll(async () => {
  contractInstance = await setupContract();
});

describe('Vector Tests', () => {
  it('should test u8 vector input/output', async () => {
    const INPUT = [8, 6, 7, 5, 3, 0, 9];

    const { value } = await contractInstance.functions.echo_u8(INPUT).call<BN[]>();

    expect(value.map((num) => bn(num).toNumber())).toStrictEqual(INPUT);
  });
});
