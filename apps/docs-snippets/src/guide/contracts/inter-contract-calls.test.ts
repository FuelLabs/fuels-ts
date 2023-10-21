import { DocSnippetProjectsEnum } from '@fuel-ts/utils/test-utils';
import type { Contract, WalletUnlocked } from 'fuels';
import { BN, ContractFactory } from 'fuels';

import { getSnippetProjectArtifacts } from '../../../projects';
import { getTestWallet } from '../../utils';

describe(__filename, () => {
  let wallet: WalletUnlocked;

  let simpleToken: Contract;
  let tokenDepositor: Contract;

  let gasPrice: BN;

  beforeAll(async () => {
    wallet = await getTestWallet();

    ({ minGasPrice: gasPrice } = wallet.provider.getGasConfig());

    const tokenArtifacts = getSnippetProjectArtifacts(DocSnippetProjectsEnum.SIMPLE_TOKEN);
    const depositorArtifacts = getSnippetProjectArtifacts(DocSnippetProjectsEnum.TOKEN_DEPOSITOR);

    simpleToken = await new ContractFactory(
      tokenArtifacts.binHexlified,
      tokenArtifacts.abiContents,
      wallet
    ).deployContract({ gasPrice });

    tokenDepositor = await new ContractFactory(
      depositorArtifacts.binHexlified,
      depositorArtifacts.abiContents,
      wallet
    ).deployContract({ gasPrice });
  });

  it('should successfully make call to another contract', async () => {
    // #region inter-contract-calls-3
    const amountToDeposit = 70;

    const { value: initialBalance } = await simpleToken.functions
      .get_balance(wallet.address.toB256())
      .txParams({ gasPrice })
      .call();

    expect(new BN(initialBalance).toNumber()).toBe(0);

    await tokenDepositor.functions
      .deposit_to_simple_token(simpleToken.id.toB256(), amountToDeposit)
      .addContracts([simpleToken])
      .txParams({ gasPrice })
      .call();

    const { value: finalBalance } = await simpleToken.functions
      .get_balance(wallet.address.toB256())
      .txParams({ gasPrice })
      .call();

    expect(new BN(finalBalance).toNumber()).toBe(amountToDeposit);
    // #endregion inter-contract-calls-3
  });
});
