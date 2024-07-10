import type { Contract, Provider } from 'fuels';
import { BN } from 'fuels';

import { DocSnippetProjectsEnum } from '../../../test/fixtures/forc-projects';
import { createAndDeployContractFromProject } from '../../utils';

/**
 * @group node
 */
describe(__filename, () => {
  let contract: Contract;
  let provider: Provider;
  let baseAssetId: string;
  beforeAll(async () => {
    contract = await createAndDeployContractFromProject(DocSnippetProjectsEnum.RETURN_CONTEXT);
    provider = contract.provider;
    baseAssetId = provider.getBaseAssetId();
  });

  it('should successfully execute contract call with forwarded amount', async () => {
    // #region call-params-1
    const amountToForward = 10;

    const { waitForResult } = await contract.functions
      .return_context_amount()
      .callParams({
        forward: [amountToForward, baseAssetId],
      })
      .call();

    const { value } = await waitForResult();

    expect(new BN(value).toNumber()).toBe(amountToForward);
    // #endregion call-params-1
  });

  it('should throw error due not enough gas', async () => {
    // #region call-params-2

    await expect(async () => {
      const call = await contract.functions
        .return_context_amount()
        .callParams({
          forward: [10, baseAssetId],
          gasLimit: 1,
        })
        .call();

      await call.waitForResult();
    }).rejects.toThrow('The transaction reverted with reason: "OutOfGas"');
    // #endregion call-params-2
  });

  it('should successfully execute transaction with `txParams` and `callParams`', async () => {
    // #region call-params-3
    const amountToForward = 10;
    const contractCallGasLimit = 4000;
    const transactionGasLimit = 100_000;

    const { waitForResult } = await contract.functions
      .return_context_amount()
      .callParams({
        forward: [amountToForward, baseAssetId],
        gasLimit: contractCallGasLimit,
      })
      .txParams({
        gasLimit: transactionGasLimit,
      })
      .call();

    const result = await waitForResult();
    const { value } = result;
    const expectedValue = 10;

    expect(new BN(value).toNumber()).toBe(expectedValue);
    // #endregion call-params-3
  });
});
