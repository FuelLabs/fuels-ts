import type { Contract } from 'fuels';
import { BN, NativeAssetId, ContractFactory } from 'fuels';

import { getSnippetContractArtifacts, SnippetContractEnum } from '../../../projects';
import { getTestWallet } from '../../utils';

describe(__filename, () => {
  let contract: Contract;

  beforeAll(async () => {
    const wallet = await getTestWallet();

    const { abi, bin } = getSnippetContractArtifacts(SnippetContractEnum.RETURN_CONTEXT);

    const factory = new ContractFactory(bin, abi, wallet);

    contract = await factory.deployContract();
  });

  it('should successfully execute contract call with forwarded amount', async () => {
    // #region call-params-1
    const amountToForward = 10;

    const { value } = await contract.functions
      .return_context_amount()
      .callParams({
        forward: [amountToForward, NativeAssetId],
      })
      .call();

    expect(new BN(value).toNumber()).toBe(amountToForward);
    // #endregion call-params-1
  });

  it('should throw error due not enough gas', async () => {
    // #region call-params-2
    await expect(
      contract.functions
        .return_context_amount()
        .callParams({
          forward: [10, NativeAssetId],
          gasLimit: 1,
        })
        .call()
    ).rejects.toThrow(/OutOfGas/);
    // #endregion call-params-2
  });

  it('should successfully execute transaction with `txParams` and `callParams`', async () => {
    // #region call-params-3
    const amountToForward = 10;
    const contractCallGasLimit = 100;
    const transactionGasLimit = 10000;

    const result = await contract.functions
      .return_context_amount()
      .callParams({
        forward: [amountToForward, NativeAssetId],
        gasLimit: contractCallGasLimit,
      })
      .txParams({
        gasLimit: transactionGasLimit,
      })
      .call();

    const {
      transactionResult: { transaction },
      value,
    } = result;

    expect(new BN(value).toNumber()).toBe(10);
    expect(new BN(transaction.gasLimit).toNumber()).toBe(10000);
    // #endregion call-params-3
  });
});
