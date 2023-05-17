import type { Contract } from 'fuels';
import { BN, ContractFactory } from 'fuels';

import { getSnippetContractArtifacts, SnippetProjectEnum } from '../../../projects';
import { getTestWallet } from '../../utils';

describe(__filename, () => {
  let contract: Contract;

  beforeAll(async () => {
    const wallet = await getTestWallet();

    const { abi, bin } = getSnippetContractArtifacts(SnippetProjectEnum.LOG_VALUES);

    const factory = new ContractFactory(bin, abi, wallet);

    contract = await factory.deployContract();
  });

  it('should successfully execute contract call with forwarded amount', async () => {
    // #region log-2
    const value1 = 500;
    const value2 = '0xef86afa9696cf0dc6385e2c407a6e159a1103cefb7e2ae0636fb33d3cb2a9e4a';
    const value3 = 'Fuel';
    const value4 = [1, 2, 3];

    const { logs } = await contract.functions.log_values(value1, value2, value3, value4).call();

    expect(new BN(logs[0]).toNumber()).toBe(value1);
    expect(logs[1]).toBe(value2);
    expect(logs[2]).toBe(value3);
    expect([logs[3], logs[4], logs[5]]).toEqual(value4);
    // #endregion log-2
  });
});
