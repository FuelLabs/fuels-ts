import type { Contract } from 'fuels';

import { getSetupContract } from './utils';

const setupContract = getSetupContract('hello-world');

let contractInstance: Contract;

beforeAll(async () => {
  contractInstance = await setupContract();
});

describe('hello world', () => {
  it('can get hello world', async () => {
    const { value } = await contractInstance.functions.test_function().get();

    expect(value).toEqual('Hello World');
  });
});
