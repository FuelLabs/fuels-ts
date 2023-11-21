import type { Contract } from 'fuels';
import { Wallet, BN, BaseAssetId, Provider, FUEL_NETWORK_URL } from 'fuels';

import { DocSnippetProjectsEnum } from '../../../test/fixtures/forc-projects';
import { createAndDeployContractFromProject } from '../../utils';

describe(__filename, () => {
  let contract: Contract;
  let provider: Provider;

  beforeAll(async () => {
    provider = await Provider.create(FUEL_NETWORK_URL);
    contract = await createAndDeployContractFromProject(DocSnippetProjectsEnum.TRANSFER_TO_ADDRESS);
  });

  it('should successfully get a contract balance', async () => {
    // #region contract-balance-3
    // #context import { Wallet, BN, BaseAssetId } from 'fuels';

    const amountToForward = 40;
    const amountToTransfer = 10;

    const recipient = Wallet.generate({
      provider,
    });

    const { minGasPrice } = provider.getGasConfig();

    await contract.functions
      .transfer(amountToTransfer, BaseAssetId, recipient.address.toB256())
      .callParams({
        forward: [amountToForward, BaseAssetId],
      })
      .txParams({
        gasPrice: minGasPrice,
      })
      .call();

    const contractBalance = await contract.getBalance(BaseAssetId);

    const expectedBalance = amountToForward - amountToTransfer;

    expect(new BN(contractBalance).toNumber()).toBe(expectedBalance);
    // #endregion contract-balance-3
  });
});
