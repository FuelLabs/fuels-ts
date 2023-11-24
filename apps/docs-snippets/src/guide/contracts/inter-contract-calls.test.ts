import type { Contract, Provider, WalletUnlocked } from 'fuels';
import { BN, ContractFactory } from 'fuels';

import {
  DocSnippetProjectsEnum,
  getDocsSnippetsForcProject,
} from '../../../test/fixtures/forc-projects';
import { getTestWallet } from '../../utils';

describe(__filename, () => {
  let wallet: WalletUnlocked;
  let simpleToken: Contract;
  let tokenDepositor: Contract;
  let provider: Provider;

  beforeAll(async () => {
    wallet = await getTestWallet();
    provider = wallet.provider;
    const { minGasPrice } = provider.getGasConfig();

    const tokenArtifacts = getDocsSnippetsForcProject(DocSnippetProjectsEnum.SIMPLE_TOKEN);
    const depositorArtifacts = getDocsSnippetsForcProject(DocSnippetProjectsEnum.TOKEN_DEPOSITOR);

    simpleToken = await new ContractFactory(
      tokenArtifacts.binHexlified,
      tokenArtifacts.abiContents,
      wallet
    ).deployContract({ gasPrice: minGasPrice });

    tokenDepositor = await new ContractFactory(
      depositorArtifacts.binHexlified,
      depositorArtifacts.abiContents,
      wallet
    ).deployContract({ gasPrice: minGasPrice });
  });

  it('should successfully make call to another contract', async () => {
    // #region inter-contract-calls-3
    const amountToDeposit = 70;
    const { minGasPrice } = provider.getGasConfig();
    const { value: initialBalance } = await simpleToken.functions
      .get_balance(wallet.address.toB256())
      .txParams({ gasPrice: minGasPrice, gasLimit: 10_000 })
      .call();

    expect(new BN(initialBalance).toNumber()).toBe(0);

    await tokenDepositor.functions
      .deposit_to_simple_token(simpleToken.id.toB256(), amountToDeposit)
      .addContracts([simpleToken])
      .txParams({ gasPrice: minGasPrice, gasLimit: 10_000 })
      .call();

    const { value: finalBalance } = await simpleToken.functions
      .get_balance(wallet.address.toB256())
      .txParams({ gasPrice: minGasPrice, gasLimit: 10_000 })
      .call();

    expect(new BN(finalBalance).toNumber()).toBe(amountToDeposit);
    // #endregion inter-contract-calls-3
  });
});
