import { type Contract } from 'fuels';

import { getSetupContract } from './utils';

const setupContract = getSetupContract('bytes');
let contractInstance: Contract;
beforeAll(async () => {
  contractInstance = await setupContract();
});

describe('Bytes Tests', () => {
  it('should test bytes input/output', async () => {
    const INPUT = 10;

    const { value } = await contractInstance.functions.return_bytes(INPUT).call<number[]>();

    expect(value).toStrictEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });
});
