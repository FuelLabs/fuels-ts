import { BaseAssetId, type Contract, type Provider } from 'fuels';

import { DocSnippetProjectsEnum } from '../../../projects';
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
    const { minGasPrice, maxGasPerTx } = provider.getGasConfig();

    const cost = await contract.functions
      .return_context_amount()
      .callParams({
        forward: [100, BaseAssetId],
      })
      .txParams({
        gasPrice: minGasPrice,
        gasLimit: maxGasPerTx,
      })
      .getTransactionCost();

    expect(cost.fee).toBeDefined();
    expect(cost.gasPrice).toBeDefined();
    expect(cost.gasUsed).toBeDefined();
    expect(cost.minGasPrice).toBeDefined();
    // #endregion cost-estimation-1
  });

  it('should get transaction cost estimate for multi contract calls just fine', async () => {
    // #region cost-estimation-2
    const { minGasPrice, maxGasPerTx } = provider.getGasConfig();

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
        gasLimit: maxGasPerTx,
      });

    const cost = await scope.getTransactionCost();

    expect(cost.fee).toBeDefined();
    expect(cost.gasPrice).toBeDefined();
    expect(cost.gasUsed).toBeDefined();
    expect(cost.minGasPrice).toBeDefined();
    // #endregion cost-estimation-2
  });
});
