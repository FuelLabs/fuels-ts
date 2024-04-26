import { ASSET_A, ASSET_B } from '@fuel-ts/utils/test-utils';
import type { Account, Contract, Provider } from 'fuels';
import { Wallet } from 'fuels';

import { DocSnippetProjectsEnum } from '../../../test/fixtures/forc-projects';
import { createAndDeployContractFromProject, getTestWallet } from '../../utils';

/**
 * @group node
 */
describe(__filename, () => {
  let contract: Contract;
  let provider: Provider;
  let wallet: Account;
  let baseAssetId: string;

  beforeAll(async () => {
    contract = await createAndDeployContractFromProject(DocSnippetProjectsEnum.ECHO_VALUES);
    provider = contract.provider;
    baseAssetId = provider.getBaseAssetId();
    wallet = await getTestWallet([
      [5000, baseAssetId],
      [5000, ASSET_A],
      [5000, ASSET_B],
    ]);

    contract.account = wallet;
  });

  it('should successfully execute addTransfer for one recipient', async () => {
    // #region add-transfer-1
    const recipient = Wallet.generate({ provider });

    await contract.functions.echo_u64(100).addTransfer(recipient.address, 100, baseAssetId).call();
    // #endregion add-transfer-1

    const recipientBalance = await recipient.getBalance(baseAssetId);

    expect(recipientBalance.toNumber()).toBe(100);
  });

  it('should successfully execute multiple addTransfer for multiple recipients', async () => {
    // #region add-transfer-2
    const recipient1 = Wallet.generate({ provider });
    const recipient2 = Wallet.generate({ provider });

    await contract.functions
      .echo_u64(100)
      .addTransfer(recipient1.address, 100, baseAssetId)
      .addTransfer(recipient1.address, 400, ASSET_A)
      .addTransfer(recipient2.address, 300, ASSET_B)
      .call();
    // #endregion add-transfer-2

    const recipient1BalanceBaseAsset = await recipient1.getBalance(baseAssetId);
    const recipient1BalanceAssetA = await recipient1.getBalance(ASSET_A);

    const recipient2BalanceAssetB = await recipient2.getBalance(ASSET_B);

    expect(recipient1BalanceBaseAsset.toNumber()).toBe(100);
    expect(recipient1BalanceAssetA.toNumber()).toBe(400);
    expect(recipient2BalanceAssetB.toNumber()).toBe(300);
  });
});
