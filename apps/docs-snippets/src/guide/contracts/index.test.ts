import type { Contract } from 'fuels';
import { ContractFactory } from 'fuels';

import { SnippetProjectEnum, getSnippetContractArtifacts } from '../../../projects';
import { getTestWallet } from '../../utils';

describe(__filename, () => {
  let contract: Contract;

  beforeAll(async () => {
    const wallet = await getTestWallet();

    const { abi, bin } = getSnippetContractArtifacts(SnippetProjectEnum.ECHO_VALUES);

    const factory = new ContractFactory(bin, abi, wallet);

    contract = await factory.deployContract();
  });

  it('should successfully call contract and echo values', async () => {
    // #region echo-values
    const u8Value = 10;
    const str8Value = 'fuel-sdk';

    const res1 = await contract.functions.echo_u8(u8Value).get();
    const res2 = await contract.functions.echo_str_8(str8Value).get();

    expect(res1.value).toBe(u8Value);
    expect(res2.value).toBe(str8Value);
    // #endregion echo-values
  });
});
