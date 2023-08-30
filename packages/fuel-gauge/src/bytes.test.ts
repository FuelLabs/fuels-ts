import { type Contract } from 'fuels';

import { getSetupContract } from './utils';

const setupContract = getSetupContract('bytes');
let contractInstance: Contract;
beforeAll(async () => {
  contractInstance = await setupContract();
});

describe('Bytes Tests', () => {
  it('should test bytes output', async () => {
    const INPUT = 10;

    const { value } = await contractInstance.functions.return_bytes(INPUT).call<number[]>();

    expect(value).toStrictEqual(new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]));
  });

  it('should test bytes output [100 items]', async () => {
    const INPUT = 100;

    const { value } = await contractInstance.functions.return_bytes(INPUT).call<number[]>();

    expect(value).toStrictEqual(new Uint8Array(Array.from({ length: 100 }, (e, i) => i)));
  });

  it('should test bytes input', async () => {
    const INPUT = [40, 41, 42];

    await contractInstance.functions.accept_bytes(INPUT).call<number[]>();

    expect(true).toBeTruthy();
  });

});
