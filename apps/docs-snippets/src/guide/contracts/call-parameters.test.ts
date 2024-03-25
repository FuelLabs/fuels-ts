import type { Contract } from 'fuels';
import { BN, BaseAssetId } from 'fuels';

import { DocSnippetProjectsEnum } from '../../../test/fixtures/forc-projects';
import { createAndDeployContractFromProject } from '../../utils';

/**
 * @group node
 */
describe(__filename, () => {
  let contract: Contract;
  beforeAll(async () => {
    contract = await createAndDeployContractFromProject(DocSnippetProjectsEnum.RETURN_CONTEXT);
  });

  it('should successfully execute contract call with forwarded amount', async () => {
    // #region call-params-1
    const amountToForward = 10;

    const { value } = await contract.functions
      .return_context_amount()
      .callParams({
        forward: [amountToForward, BaseAssetId],
      })
      .call();

    expect(new BN(value).toNumber()).toBe(amountToForward);
    // #endregion call-params-1
  });

  it('should throw error due not enough gas', async () => {
    // #region call-params-2

    await expect(
      contract.functions
        .return_context_amount()
        .callParams({
          forward: [10, BaseAssetId],
          gasLimit: 1,
        })
        .call()
    ).rejects.toThrow(/Gas limit '1' is lower than the required: /);
    // #endregion call-params-2
  });

  it('should successfully execute transaction with `txParams` and `callParams`', async () => {
    // #region call-params-3
    const amountToForward = 10;
    const contractCallGasLimit = 100;
    const transactionGasLimit = 3_000_000;

    const result = await contract.functions
      .return_context_amount()
      .callParams({
        forward: [amountToForward, BaseAssetId],
        gasLimit: contractCallGasLimit,
      })
      .txParams({
        gasLimit: transactionGasLimit,
      })
      .call();

    const {
      transactionResult: { transaction },
      value,
    } = result;

    expect(new BN(value).toNumber()).toBe(10);
    expect(new BN(transaction.scriptGasLimit).toNumber()).toBe(transactionGasLimit);
    // #endregion call-params-3
  });
});
