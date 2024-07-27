import type { TransferParams } from 'fuels';
import { Wallet } from 'fuels';
import { ASSET_A, ASSET_B, launchTestNode } from 'fuels/test-utils';

import { EchoValuesAbi__factory } from '../../../test/typegen';
import EchoValuesAbiHex from '../../../test/typegen/contracts/EchoValuesAbi.hex';

/**
 * @group node
 * @group browser
 */
describe(__filename, () => {
  it('should successfully execute addTransfer for one recipient', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          deployer: EchoValuesAbi__factory,
          bytecode: EchoValuesAbiHex,
        },
      ],
    });
    const {
      provider,
      contracts: [contract],
    } = launched;
    // #region add-transfer-1
    const recipient = Wallet.generate({ provider });

    const { waitForResult } = await contract.functions
      .echo_u64(100)
      .addTransfer({
        destination: recipient.address,
        amount: 100,
        assetId: provider.getBaseAssetId(),
      })
      .call();

    await waitForResult();
    // #endregion add-transfer-1

    const recipientBalance = await recipient.getBalance(provider.getBaseAssetId());

    expect(recipientBalance.toNumber()).toBe(100);
  });

  it('should successfully execute multiple addTransfer for multiple recipients', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          deployer: EchoValuesAbi__factory,
          bytecode: EchoValuesAbiHex,
        },
      ],
    });
    const {
      provider,
      contracts: [contract],
    } = launched;
    // #region add-transfer-2
    const recipient1 = Wallet.generate({ provider });
    const recipient2 = Wallet.generate({ provider });

    const transferParams: TransferParams[] = [
      { destination: recipient1.address, amount: 100, assetId: provider.getBaseAssetId() },
      { destination: recipient1.address, amount: 400, assetId: ASSET_A },
      { destination: recipient2.address, amount: 300, assetId: ASSET_B },
    ];

    const { waitForResult } = await contract.functions
      .echo_u64(100)
      .addBatchTransfer(transferParams)
      .call();

    await waitForResult();
    // #endregion add-transfer-2

    const recipient1BalanceBaseAsset = await recipient1.getBalance(provider.getBaseAssetId());
    const recipient1BalanceAssetA = await recipient1.getBalance(ASSET_A);

    const recipient2BalanceAssetB = await recipient2.getBalance(ASSET_B);

    expect(recipient1BalanceBaseAsset.toNumber()).toBe(100);
    expect(recipient1BalanceAssetA.toNumber()).toBe(400);
    expect(recipient2BalanceAssetB.toNumber()).toBe(300);
  });
});
