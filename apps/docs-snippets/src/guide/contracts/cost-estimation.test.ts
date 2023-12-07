import { BaseAssetId, type Contract, type Provider } from 'fuels';

import { DocSnippetProjectsEnum } from '../../../test/fixtures/forc-projects';
import { createAndDeployContractFromProject } from '../../utils';

describe(__filename, () => {
  let contract: Contract;
  let provider: Provider;

  beforeAll(async () => {
    contract = await createAndDeployContractFromProject(DocSnippetProjectsEnum.RETURN_CONTEXT);
    provider = contract.provider;
  });

  it('should successfully get transaction cost estimate for a single contract call', async () => {
    // #region cost-estimation-1
    const { minGasPrice } = provider.getGasConfig();

    const cost = await contract.functions
      .return_context_amount()
      .callParams({
        forward: [100, BaseAssetId],
      })
      .txParams({
        gasPrice: minGasPrice,
      })
      .getTransactionCost();

    expect(cost.minFee).toBeDefined();
    expect(cost.maxFee).toBeDefined();
    expect(cost.gasPrice).toBeDefined();
    expect(cost.gasUsed).toBeDefined();
    expect(cost.minGasPrice).toBeDefined();
    // #endregion cost-estimation-1
  });

  it('should get transaction cost estimate for multi contract calls just fine', async () => {
    // #region cost-estimation-2
    const { minGasPrice } = provider.getGasConfig();

    const scope = contract
      .multiCall([
        contract.functions.return_context_amount().callParams({
          forward: [100, BaseAssetId],
        }),
        contract.functions.return_context_amount().callParams({
          forward: [300, BaseAssetId],
        }),
      ])
      .txParams({
        gasPrice: minGasPrice,
      });

    const cost = await scope.getTransactionCost();

    expect(cost.minFee).toBeDefined();
    expect(cost.maxFee).toBeDefined();
    expect(cost.gasPrice).toBeDefined();
    expect(cost.gasUsed).toBeDefined();
    expect(cost.minGasPrice).toBeDefined();
    // #endregion cost-estimation-2
  });
});
