import type { Contract } from 'fuels';
import { BN } from 'fuels';

import { SnippetProjectEnum } from '../../../projects';
import { createAndDeployContractFromProject } from '../../utils';

describe(__filename, () => {
  let contract: Contract;

  beforeAll(async () => {
    contract = await createAndDeployContractFromProject(SnippetProjectEnum.COUNTER);
  });

  it('should successfully execute contract call with txParams', async () => {
    // #region transaction-parameters-2
    const gasPrice = 1;
    const gasLimit = 3_500_000;

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
    ).rejects.toThrowError(/Gas limit [\s\S]* is lower than the required/);
    // #endregion transaction-parameters-3
  });
});
