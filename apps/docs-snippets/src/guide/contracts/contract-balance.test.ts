import type { AssetId } from 'fuels';
import { Wallet, BN } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { TransferToAddressFactory } from '../../../test/typegen';

/**
 * @group node
 * @group browser
 */
describe('Contract Balance', () => {
  it('should successfully get a contract balance', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: TransferToAddressFactory,
        },
      ],
    });
    const {
      provider,
      contracts: [contract],
    } = launched;

    // #region contract-balance-3
    // #import { AssetId, Wallet, BN };

    const amountToForward = 40;
    const amountToTransfer = 10;
    const baseAssetId = provider.getBaseAssetId();

    const recipient = Wallet.generate({
      provider,
    });

    const asset: AssetId = {
      bits: baseAssetId,
    };

    const { waitForResult } = await contract.functions
      .transfer(amountToTransfer, asset, recipient.address.toB256())
      .callParams({
        forward: [amountToForward, baseAssetId],
      })
      .call();

    await waitForResult();

    const contractBalance = await contract.getBalance(baseAssetId);

    const expectedBalance = amountToForward - amountToTransfer;

    expect(new BN(contractBalance).toNumber()).toBe(expectedBalance);
    // #endregion contract-balance-3
  });
});
