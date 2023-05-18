import type { Contract } from 'fuels';
import { ContractFactory, NativeAssetId } from 'fuels';

import { SnippetProjectEnum, getSnippetProjectArtifacts } from '../../../projects';
import { getTestWallet } from '../../utils';

describe(__filename, () => {
  let contract: Contract;

  beforeAll(async () => {
    const wallet = await getTestWallet();

    const { abiContents, binHelixfied } = getSnippetProjectArtifacts(
      SnippetProjectEnum.RETURN_CONTEXT
    );

    const contractFactory = new ContractFactory(binHelixfied, abiContents, wallet);

    contract = await contractFactory.deployContract();
  });

  it('should get transaction cost estimate for a single contract call just fine', async () => {
    // #region cost-estimation-1
    const cost = await contract.functions
      .return_context_amount()
      .callParams({
        forward: [100, NativeAssetId],
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
    const scope = contract.multiCall([
      contract.functions.return_context_amount().callParams({
        forward: [100, NativeAssetId],
      }),
      contract.functions.return_context_amount().callParams({
        forward: [300, NativeAssetId],
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
