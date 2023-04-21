import type { Contract } from 'fuels';
import { BN, ContractFactory } from 'fuels';

import { SnippetContractEnum, getSnippetContractArtifacts } from '../../../contracts';
import { getTestWallet } from '../../utils';

describe(__filename, () => {
  let contract: Contract;

  beforeAll(async () => {
    const wallet = await getTestWallet();

    const { abi, bin } = getSnippetContractArtifacts(SnippetContractEnum.COUNTER);

    const factory = new ContractFactory(bin, abi, wallet);

    contract = await factory.deployContract();
  });

  it('should successfully execute contract call with txParams', async () => {
    // #region transaction-parameters-2
    const gasPrice = 1;
    const gasLimit = 100000;

    // #region variable-outputs-1
    const { transactionResult } = await contract.functions
      .increment_count(15)
      .txParams({
        gasPrice,
        gasLimit,
        variableOutputs: 1,
      })
      .call();
    // #endregion variable-outputs-1
    // #endregion transaction-parameters-2

    const { transaction } = transactionResult;

    expect(new BN(transaction.gasPrice).toNumber()).toBe(gasPrice);
    expect(new BN(transaction.gasLimit).toNumber()).toBe(gasLimit);
  });

  it('should fail to execute call if gasLimit is too low', async () => {
    // #region transaction-parameters-3
    await expect(
      contract.functions
        .increment_count(10)
        .txParams({
          gasLimit: 1,
        })
        .call()
    ).rejects.toThrowError(/gasLimit[\s\S]*is lower than the required/);
    // #endregion transaction-parameters-3
  });
});
