import type { Contract } from 'fuels';

import { getSetupContract } from './utils';

const setupContract = getSetupContract('hello-world');

let contractInstance: Contract;

beforeAll(async () => {
  contractInstance = await setupContract();
  console.log({
    contractId: contractInstance.id.toB256(),
  });
});

describe('hello world', () => {
  it('can get hello world', async () => {
    const { value } = await contractInstance.functions.test_function().get();

    expect(value).toEqual(true);
  });

  it('multicall', async () => {
    const { value } = await contractInstance
      .multiCall([
        contractInstance.functions.test_function(),
        contractInstance.functions.return_struct(),
      ])
      .call();

    console.log({
      value,
    });
  });
});
