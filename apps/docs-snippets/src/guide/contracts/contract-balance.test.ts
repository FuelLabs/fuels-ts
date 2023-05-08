import type { Contract } from 'fuels';
import { Wallet, BN, ContractFactory, NativeAssetId } from 'fuels';

import { getSnippetContractArtifacts, SnippetContractEnum } from '../../../contracts';
import { getTestWallet } from '../../utils';

describe(__filename, () => {
  let contract: Contract;

  beforeAll(async () => {
    const wallet = await getTestWallet();

    const { abi, bin } = getSnippetContractArtifacts(SnippetContractEnum.TRANSFER_TO_ADDRESS);

    const factory = new ContractFactory(bin, abi, wallet);

    contract = await factory.deployContract();
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
