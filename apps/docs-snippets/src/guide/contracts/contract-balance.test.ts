import type { Contract } from 'fuels';
import { Wallet, BN, BaseAssetId, Provider, FUEL_NETWORK_URL } from 'fuels';

import { SnippetProjectEnum } from '../../../projects';
import { createAndDeployContractFromProject } from '../../utils';

describe(__filename, () => {
  let contract: Contract;

  beforeAll(async () => {
    contract = await createAndDeployContractFromProject(SnippetProjectEnum.TRANSFER_TO_ADDRESS);
  });

  it('should successfully get a contract balance', async () => {
    // #region contract-balance-3
    // #context import { Wallet, BN, BaseAssetId } from 'fuels';

    const amountToForward = 40;
    const amountToTransfer = 10;

    const provider = await Provider.connect(FUEL_NETWORK_URL);

    const recipient = Wallet.generate({
      provider,
    });

    await contract.functions
      .transfer(amountToTransfer, BaseAssetId, recipient.address.toB256())
      .callParams({
        forward: [amountToForward, BaseAssetId],
      })
      .call();

    const contractBalance = await contract.getBalance(BaseAssetId);

    const expectedBalance = amountToForward - amountToTransfer;

    expect(new BN(contractBalance).toNumber()).toBe(expectedBalance);
    // #endregion contract-balance-3
  });
});
