import { launchTestNode } from 'fuels/test-utils';

import { ReturnContextFactory } from '../../../test/typegen';

/**
 * @group node
 * @group browser
 */
describe('Cost Estimation', () => {
  it('should successfully get transaction cost estimate for a single contract call', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: ReturnContextFactory,
        },
      ],
    });

    const {
      contracts: [contract],
      provider,
    } = launched;

    // #region cost-estimation-1
    const cost = await contract.functions
      .return_context_amount()
      .callParams({
        forward: [100, provider.getBaseAssetId()],
      })
      .getTransactionCost();

    expect(cost.minFee).toBeDefined();
    expect(cost.maxFee).toBeDefined();
    expect(cost.gasPrice).toBeDefined();
    expect(cost.gasUsed).toBeDefined();
    expect(cost.gasPrice).toBeDefined();
    // #endregion cost-estimation-1
  });

  it('should get transaction cost estimate for multi contract calls just fine', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: ReturnContextFactory,
        },
      ],
    });

    const {
      contracts: [contract],
      provider,
    } = launched;

    // #region cost-estimation-2
    const scope = contract.multiCall([
      contract.functions.return_context_amount().callParams({
        forward: [100, provider.getBaseAssetId()],
      }),
      contract.functions.return_context_amount().callParams({
        forward: [300, provider.getBaseAssetId()],
      }),
    ]);

    const cost = await scope.getTransactionCost();

    expect(cost.minFee).toBeDefined();
    expect(cost.maxFee).toBeDefined();
    expect(cost.gasPrice).toBeDefined();
    expect(cost.gasUsed).toBeDefined();
    expect(cost.gasPrice).toBeDefined();
    // #endregion cost-estimation-2
  });
});
