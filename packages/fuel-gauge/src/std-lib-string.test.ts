import { type Contract } from 'fuels';

import { getSetupContract } from './utils';

const setupContract = getSetupContract('std-lib-string');
let contractInstance: Contract;
beforeAll(async () => {
  contractInstance = await setupContract();
});

describe('std-lib-string Tests', () => {
  it('should test std-lib-string return', async () => {
    const { value } = await contractInstance.functions.return_dynamic_string().call<string>();
    expect(value).toBe('Hello World');
  });

  it('should test std-lib-string input', async () => {
    const INPUT = 'Hello World';

    await contractInstance.functions.accepts_dynamic_string(INPUT).call<number[]>();

    expect(true).toBe(true);
  });
});
