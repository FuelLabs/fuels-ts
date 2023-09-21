import { BaseAssetId } from 'fuels';

import { SnippetProjectEnum } from '../../../projects';
import { createAndDeployContractFromProject } from '../../utils';

describe(__filename, () => {
  it('should successfully get transaction cost estimate for a single contract call', async () => {
    using contract = await createAndDeployContractFromProject(SnippetProjectEnum.RETURN_CONTEXT);

    // #region cost-estimation-1
    const cost = await contract.functions
      .return_context_amount()
      .callParams({
        forward: [100, BaseAssetId],
      })
      .getTransactionCost();

    expect(cost.fee).toBeDefined();
    expect(cost.gasPrice).toBeDefined();
    expect(cost.gasUsed).toBeDefined();
    expect(cost.minGasPrice).toBeDefined();
    // #endregion cost-estimation-1
  });

  it('should get transaction cost estimate for multi contract calls just fine', async () => {
    using contract = await createAndDeployContractFromProject(SnippetProjectEnum.RETURN_CONTEXT);

    // #region cost-estimation-2
    const scope = contract.multiCall([
      contract.functions.return_context_amount().callParams({
        forward: [100, BaseAssetId],
      }),
      contract.functions.return_context_amount().callParams({
        forward: [300, BaseAssetId],
      }),
    ]);

    const cost = await scope.getTransactionCost();

    expect(cost.fee).toBeDefined();
    expect(cost.gasPrice).toBeDefined();
    expect(cost.gasUsed).toBeDefined();
    expect(cost.minGasPrice).toBeDefined();
    // #endregion cost-estimation-2
  });
});
