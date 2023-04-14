import type { Contract } from 'fuels';
import { ContractFactory } from 'fuels';

import { SnippetContractEnum, getSnippetContractArtifacts } from '../../../contracts';
import { getTestWallet } from '../../utils';

describe(__filename, () => {
  let contract: Contract;

  beforeAll(async () => {
    const wallet = await getTestWallet();

    const { abi, bin } = getSnippetContractArtifacts(SnippetContractEnum.ECHO_VALUES);

    const factory = new ContractFactory(bin, abi, wallet);

    contract = await factory.deployContract();
  });

  it('should execute read only call just fine', async () => {
    // #region Contract-read-only-call
    const { value } = await contract.functions.echo_u8(15).get();

    expect(value).toEqual(15);
    // #endregion Contract-read-only-call
  });
});
