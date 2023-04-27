import type { Contract } from 'fuels';
import { ContractFactory } from 'fuels';

import { getSnippetContractArtifacts, SnippetContractEnum } from '../../../contracts';
import { getTestWallet } from '../../utils';

describe(__filename, () => {
  let contract: Contract;

  beforeAll(async () => {
    const wallet = await getTestWallet();

    const { abi, bin } = getSnippetContractArtifacts(SnippetContractEnum.ECHO_VALUES);

    const factory = new ContractFactory(bin, abi, wallet);

    contract = await factory.deployContract();
  });

  it('should validate string', () => {
    // #region string-1
    // Sway str[2]
    const stringSize2 = 'st';

    // Sway str[8]
    const stringSize8 = 'fuel-sdk';
    // #endregion string-1

    expect(stringSize2.length).toBe(2);
    expect(stringSize8.length).toBe(8);
  });

  it('should successfully return echoed 8 length string', async () => {
    // #region string-2
    const { value } = await contract.functions.echo_str_8('fuel-sdk').get();

    expect(value).toEqual('fuel-sdk');
    // #endregion string-2
  });

  it('should ensure input string will be truncate to the expected length', async () => {
    // #region string-3
    const longString = 'fuel-sdk-WILL-BE-OMITTED';

    const { value } = await contract.functions.echo_str_8(longString).call();

    expect(value).toEqual('fuel-sdk');
    // #endregion string-3
  });
});
