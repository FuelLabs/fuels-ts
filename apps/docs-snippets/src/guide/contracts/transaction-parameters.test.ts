import { TestNodeLauncher } from '@fuel-ts/test-utils';
import { BN } from 'fuels';

import { getProgramDir } from '../../utils';

/**
 * @group node
 */
describe(__filename, () => {
  beforeAll(async (ctx) => {
    await TestNodeLauncher.prepareCache(ctx.tasks.length);

    return () => TestNodeLauncher.killCachedNodes();
  });

  it('should successfully execute contract call with txParams', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [getProgramDir('counter')],
    });
    const {
      contracts: [contract],
      provider,
    } = launched;

    // #region transaction-parameters-2
    // #region variable-outputs-1
    const { minGasPrice, maxGasPerTx } = provider.getGasConfig();

    const { transactionResult } = await contract.functions
      .increment_count(15)
      .txParams({
        gasPrice: minGasPrice,
        gasLimit: maxGasPerTx,
        variableOutputs: 1,
      })
      .call();
    // #endregion variable-outputs-1
    // #endregion transaction-parameters-2

    const { transaction } = transactionResult;

    expect(new BN(transaction.gasPrice).toNumber()).toBe(minGasPrice.toNumber());
    expect(new BN(transaction.gasLimit).toNumber()).toBe(maxGasPerTx.toNumber());
  });

  it('should fail to execute call if gasLimit is too low', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [getProgramDir('counter')],
    });
    const {
      contracts: [contract],
      provider,
    } = launched;

    // #region transaction-parameters-3
    const { minGasPrice } = provider.getGasConfig();

    await expect(
      contract.functions
        .increment_count(10)
        .txParams({
          gasPrice: minGasPrice,
          gasLimit: 1,
        })
        .call()
    ).rejects.toThrowError(/Gas limit [\s\S]* is lower than the required/);
    // #endregion transaction-parameters-3
  });
});
