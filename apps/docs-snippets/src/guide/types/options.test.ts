import type { Contract } from 'fuels';
import { ContractFactory } from 'fuels';

import { getSnippetContractArtifacts, SnippetProjectEnum } from '../../../projects';
import { getTestWallet } from '../../utils';

describe(__filename, () => {
  let contract: Contract;

  beforeAll(async () => {
    const wallet = await getTestWallet();

    const { abi, bin } = getSnippetContractArtifacts(SnippetProjectEnum.SUM_OPTION_U8);

    const factory = new ContractFactory(bin, abi, wallet);

    contract = await factory.deployContract();
  });

  it('should successfully execute contract call to sum 2 option inputs (2 INPUTS)', async () => {
    // #region options-1
    // Sway Option<u8>
    // #region options-3
    const input1: number | undefined = 10;
    // #endregion options-1

    const input2: number | undefined = 5;

    const { value } = await contract.functions.sum_optional_u8(input1, input2).get();

    expect(value).toEqual(input1 + input2);
    // #endregion options-3
  });

  it('should successfully execute contract call to sum 2 option inputs (1 INPUT)', async () => {
    // #region options-4
    const input: number | undefined = 5;

    const { value } = await contract.functions.sum_optional_u8(input).get();

    expect(value).toEqual(input);
    // #endregion options-4
  });
});
