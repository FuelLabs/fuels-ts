import type { Contract } from 'fuels';
import { BN, ContractFactory, NativeAssetId } from 'fuels';

import { getSnippetContractArtifacts, SnippetContractEnum } from '../../../contracts';
import { getTestWallet } from '../../utils';

describe(__filename, () => {
  let contract: Contract;

  beforeAll(async () => {
    const wallet = await getTestWallet();

    const { abi, bin } = getSnippetContractArtifacts(SnippetContractEnum.RETURN_CONTEXT);

    const factory = new ContractFactory(bin, abi, wallet);

    contract = await factory.deployContract();
  });

  it('should successfully get a contract balance', async () => {
    // #region contract-balance-2
    const amountToForward = 20;

    const scope = contract.functions.return_context_amount().callParams({
      forward: [amountToForward, NativeAssetId],
    });

    // forwarding assets to the contract 3 times in 3 different calls
    await scope.call();
    await scope.call();
    await scope.call();

    const contractBalance = await contract.getBalance(NativeAssetId);

    expect(new BN(contractBalance).toNumber()).toBe(amountToForward * 3);
    // #endregion contract-balance-2
  });
});
