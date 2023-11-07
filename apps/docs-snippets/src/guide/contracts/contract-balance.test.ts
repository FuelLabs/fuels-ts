import { TestNodeLauncher } from '@fuel-ts/test-utils';
import { Wallet, BN, BaseAssetId } from 'fuels';

import { getProgramDir } from '../../utils';

/**
 * @group node
 */
describe(__filename, () => {
  it('should successfully get a contract balance', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [getProgramDir('transfer-to-address')],
    });

    const {
      contracts: [contract],
      provider,
    } = launched;

    // #region contract-balance-3
    // #context import { Wallet, BN, BaseAssetId } from 'fuels';

    const amountToForward = 40;
    const amountToTransfer = 10;

    const recipient = Wallet.generate({
      provider,
    });

    const { minGasPrice, maxGasPerTx } = provider.getGasConfig();

    await contract.functions
      .transfer(amountToTransfer, BaseAssetId, recipient.address.toB256())
      .callParams({
        forward: [amountToForward, BaseAssetId],
      })
      .txParams({
        gasPrice: minGasPrice,
        gasLimit: maxGasPerTx,
      })
      .call();

    const contractBalance = await contract.getBalance(BaseAssetId);

    const expectedBalance = amountToForward - amountToTransfer;

    expect(new BN(contractBalance).toNumber()).toBe(expectedBalance);
    // #endregion contract-balance-3
  });
});
