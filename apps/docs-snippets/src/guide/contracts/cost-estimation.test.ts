import { TestNodeLauncher } from '@fuel-ts/test-utils';
import { BaseAssetId } from 'fuels';

import { getProgramDir } from '../../utils';

const projectDir = getProgramDir('return-context');

/**
 * @group node
 */
describe(__filename, () => {
  beforeAll(async (ctx) => {
    await TestNodeLauncher.prepareCache(ctx.tasks.length);

    return () => TestNodeLauncher.killCachedNodes();
  });

  it('should successfully get transaction cost estimate for a single contract call', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [projectDir],
    });

    const {
      contracts: [contract],
      provider,
    } = launched;

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

    expect(cost.minFee).toBeDefined();
    expect(cost.maxFee).toBeDefined();
    expect(cost.gasPrice).toBeDefined();
    expect(cost.gasUsed).toBeDefined();
    expect(cost.minGasPrice).toBeDefined();
    // #endregion cost-estimation-1
  });

  it('should get transaction cost estimate for multi contract calls just fine', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [projectDir],
    });

    const {
      contracts: [contract],
      provider,
    } = launched;

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

    expect(cost.minFee).toBeDefined();
    expect(cost.maxFee).toBeDefined();
    expect(cost.gasPrice).toBeDefined();
    expect(cost.gasUsed).toBeDefined();
    expect(cost.minGasPrice).toBeDefined();
    // #endregion cost-estimation-2
  });
});
