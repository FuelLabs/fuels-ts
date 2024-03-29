import type { Contract, AssetId } from 'fuels';
import { Wallet, BN, Provider, FUEL_NETWORK_URL } from 'fuels';

import { DocSnippetProjectsEnum } from '../../../test/fixtures/forc-projects';
import { createAndDeployContractFromProject } from '../../utils';

/**
 * @group node
 */
describe(__filename, () => {
  let contract: Contract;
  let provider: Provider;
  let baseAssetId: string;

  beforeAll(async () => {
    provider = await Provider.create(FUEL_NETWORK_URL);
    contract = await createAndDeployContractFromProject(DocSnippetProjectsEnum.TRANSFER_TO_ADDRESS);
    baseAssetId = provider.getBaseAssetId();
  });

  it('should successfully get a contract balance', async () => {
    // #region contract-balance-3
    // #import { AssetId, Wallet, BN };

    const amountToForward = 40;
    const amountToTransfer = 10;

    const recipient = Wallet.generate({
      provider,
    });

    const asset: AssetId = {
      value: baseAssetId,
    };

    await contract.functions
      .transfer(amountToTransfer, asset, recipient.address.toB256())
      .callParams({
        forward: [amountToForward, baseAssetId],
      })
      .call();

    const contractBalance = await contract.getBalance(baseAssetId);

    const expectedBalance = amountToForward - amountToTransfer;

    expect(new BN(contractBalance).toNumber()).toBe(expectedBalance);
    // #endregion contract-balance-3
  });
});
