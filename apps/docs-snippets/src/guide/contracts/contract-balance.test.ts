import type { Contract } from 'fuels';
import { Wallet, BN, NativeAssetId } from 'fuels';

import { SnippetProjectEnum } from '../../../projects';
import { createAndDeployContractFromProject } from '../../utils';

describe(__filename, () => {
  let contract: Contract;

  beforeAll(async () => {
    contract = await createAndDeployContractFromProject(SnippetProjectEnum.TRANSFER_TO_ADDRESS);
  });

  it('should successfully get a contract balance', async () => {
    // #region contract-balance-3
    // #context import { Wallet, BN, NativeAssetId } from 'fuels';

    const amountToForward = 40;
    const amountToTransfer = 10;

    const recipient = Wallet.generate();

    await contract.functions
      .transfer(amountToTransfer, NativeAssetId, recipient.address.toB256())
      .callParams({
        forward: [amountToForward, NativeAssetId],
      })
      .call();

    const contractBalance = await contract.getBalance(NativeAssetId);

    const expectedBalance = amountToForward - amountToTransfer;

    expect(new BN(contractBalance).toNumber()).toBe(expectedBalance);
    // #endregion contract-balance-3
  });
});
