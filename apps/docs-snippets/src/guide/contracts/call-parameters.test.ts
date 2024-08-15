import { BN } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { ReturnContextFactory } from '../../../test/typegen';

/**
 * @group node
 * @group browser
 */
describe('Call Parameters', () => {
  it('should successfully execute contract call with forwarded amount', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: ReturnContextFactory,
        },
      ],
    });

    const {
      provider,
      contracts: [contract],
    } = launched;

    // #region call-params-1
    const amountToForward = 10;

    const { waitForResult } = await contract.functions
      .return_context_amount()
      .callParams({
        forward: [amountToForward, provider.getBaseAssetId()],
      })
      .call();

    const { value } = await waitForResult();

    expect(new BN(value).toNumber()).toBe(amountToForward);
    // #endregion call-params-1
  });

  it('should throw error due not enough gas', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: ReturnContextFactory,
        },
      ],
    });
    const {
      provider,
      contracts: [contract],
    } = launched;
    // #region call-params-2

    await expect(async () => {
      const call = await contract.functions
        .return_context_amount()
        .callParams({
          forward: [10, provider.getBaseAssetId()],
          gasLimit: 1,
        })
        .call();

      await call.waitForResult();
    }).rejects.toThrow('The transaction reverted with reason: "OutOfGas"');
    // #endregion call-params-2
  });

  it('should successfully execute transaction with `txParams` and `callParams`', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: ReturnContextFactory,
        },
      ],
    });
    const {
      provider,
      contracts: [contract],
    } = launched;
    // #region call-params-3
    const amountToForward = 10;
    const contractCallGasLimit = 4000;
    const transactionGasLimit = 100_000;

    const { waitForResult } = await contract.functions
      .return_context_amount()
      .callParams({
        forward: [amountToForward, provider.getBaseAssetId()],
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
