import type { Contract } from 'fuels';
import { ContractFactory } from 'fuels';

import { SnippetContractEnum, getSnippetContractArtifacts } from '../../../projects';
import { getTestWallet } from '../../utils';

describe(__filename, () => {
  let contract: Contract;

  beforeAll(async () => {
    const wallet = await getTestWallet();

    const { abi, bin } = getSnippetContractArtifacts(SnippetContractEnum.ECHO_VALUES);

    const factory = new ContractFactory(bin, abi, wallet);

    contract = await factory.deployContract();
  });

  it('should successfully execute a read only call', async () => {
    // #region read-only-call-1
    const { value } = await contract.functions.echo_u8(15).get();

    expect(value).toEqual(15);
    // #endregion read-only-call-1
  });
});
