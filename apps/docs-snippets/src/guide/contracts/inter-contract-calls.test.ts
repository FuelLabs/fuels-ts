import type { Contract, WalletUnlocked } from 'fuels';
import { BN, ContractFactory } from 'fuels';

import { getSnippetProjectArtifacts, SnippetProjectEnum } from '../../../projects';
import { getTestWallet } from '../../utils';

describe(__filename, () => {
  let wallet: WalletUnlocked;

  let simpleToken: Contract;
  let tokenDepositor: Contract;

  beforeAll(async () => {
    wallet = await getTestWallet();

    const tokenArtifacts = getSnippetProjectArtifacts(SnippetProjectEnum.SIMPLE_TOKEN);
    const depositorArtifacts = getSnippetProjectArtifacts(SnippetProjectEnum.TOKEN_DEPOSITOR);

    simpleToken = await new ContractFactory(
      tokenArtifacts.binHelixfied,
      tokenArtifacts.abiContents,
      wallet
    ).deployContract();

    tokenDepositor = await new ContractFactory(
      depositorArtifacts.binHelixfied,
      depositorArtifacts.abiContents,
      wallet
    ).deployContract();
  });

  it('should successfully make call to another contract', async () => {
    // #region inter-contract-calls-3
    const amountToDeposit = 70;

    const { value: initialBalance } = await simpleToken.functions
      .get_balance(wallet.address.toB256())
      .call();

    expect(new BN(initialBalance).toNumber()).toBe(0);

    await tokenDepositor.functions
      .deposit_to_simple_token(simpleToken.id.toB256(), amountToDeposit)
      .addContracts([simpleToken])
      .call();

    const { value: finalBalance } = await simpleToken.functions
      .get_balance(wallet.address.toB256())
      .call();

    expect(new BN(finalBalance).toNumber()).toBe(amountToDeposit);
    // #endregion inter-contract-calls-3
  });
});
