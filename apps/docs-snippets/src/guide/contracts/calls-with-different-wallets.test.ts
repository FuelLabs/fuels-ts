import type { Contract } from 'fuels';
import { WalletUnlocked } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { DocSnippetProjectsEnum } from '../../../test/fixtures/forc-projects';
import { createAndDeployContractFromProject } from '../../utils';

/**
 * @group node
 */
describe(__filename, () => {
  let deployedContract: Contract;

  beforeAll(async () => {
    deployedContract = await createAndDeployContractFromProject(
      DocSnippetProjectsEnum.RETURN_CONTEXT
    );
  });

  it('should successfully update contract instance wallet', async () => {
    using launched = await launchTestNode();
    const { provider } = launched;
    const newWallet = WalletUnlocked.generate({
      provider,
    });

    expect(deployedContract.account?.address).not.toBe(newWallet.address);

    // #region calls-with-different-wallets-1
    deployedContract.account = newWallet;
    // #endregion calls-with-different-wallets-1

    expect(deployedContract.account.address).toBe(newWallet.address);
  });
});
