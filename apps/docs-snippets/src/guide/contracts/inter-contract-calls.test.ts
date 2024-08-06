import type { Contract, WalletUnlocked } from 'fuels';
import { BN, ContractFactory } from 'fuels';

import {
  DocSnippetProjectsEnum,
  getDocsSnippetsForcProject,
} from '../../../test/fixtures/forc-projects';
import { getTestWallet } from '../../utils';

/**
 * @group node
 */
describe(__filename, () => {
  let wallet: WalletUnlocked;
  let simpleToken: Contract;
  let tokenDepositor: Contract;

  beforeAll(async () => {
    wallet = await getTestWallet();

    const tokenArtifacts = getDocsSnippetsForcProject(DocSnippetProjectsEnum.SIMPLE_TOKEN);
    const depositorArtifacts = getDocsSnippetsForcProject(DocSnippetProjectsEnum.TOKEN_DEPOSITOR);

    const { waitForResult } = await new ContractFactory(
      tokenArtifacts.binHexlified,
      tokenArtifacts.abiContents,
      wallet
    ).deploy();

    ({ contract: simpleToken } = await waitForResult());

    const { waitForResult: waitForResult2 } = await new ContractFactory(
      depositorArtifacts.binHexlified,
      depositorArtifacts.abiContents,
      wallet
    ).deploy();

    ({ contract: tokenDepositor } = await waitForResult2());
  });

  it('should successfully make call to another contract', async () => {
    // #region inter-contract-calls-3
    const amountToDeposit = 70;
    const call1 = await simpleToken.functions.get_balance(wallet.address.toB256()).call();

    const { value: initialBalance } = await call1.waitForResult();

    expect(new BN(initialBalance).toNumber()).toBe(0);

    const call2 = await tokenDepositor.functions
      .deposit_to_simple_token(simpleToken.id.toB256(), amountToDeposit)
      .addContracts([simpleToken])
      .call();

    await call2.waitForResult();

    const call3 = await simpleToken.functions.get_balance(wallet.address.toB256()).call();

    const { value: finalBalance } = await call3.waitForResult();

    expect(new BN(finalBalance).toNumber()).toBe(amountToDeposit);
    // #endregion inter-contract-calls-3
  });
});
