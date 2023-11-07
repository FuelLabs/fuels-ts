import { TestNodeLauncher } from '@fuel-ts/test-utils';
import { WalletUnlocked } from 'fuels';

import { SnippetProjectEnum } from '../../../projects';
import { getProgramDir } from '../../utils';

const returnContextContractDir = getProgramDir(SnippetProjectEnum.RETURN_CONTEXT);

/**
 * @group node
 */
describe(__filename, () => {
  it('should successfully update contract instance wallet', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [returnContextContractDir],
    });

    const {
      contracts: [deployedContract],
      provider,
    } = launched;
    const newWallet = WalletUnlocked.generate({
      provider,
    });

    expect(deployedContract.account?.address).not.toBe(newWallet.address);

    // #region calls-with-different-wallets-1
    deployedContract.account = newWallet;
    // #endregion calls-with-different-wallets-1

    expect(deployedContract.account.address).toBe(newWallet.address);
  });

  // TODO: We are skipping and commenting out this test because the constructor for `Provider` is private now.
  /*
  it('should successfully update contract instance provider', () => {
    // use the `chainInfo` from the deployed contract's provider to create a new dummy provider
    const newProvider = new Provider('http://provider:9999');

    expect(deployedContract.provider?.url).not.toBe(newProvider.url);

    // #region calls-with-different-wallets-2
    deployedContract.provider = newProvider;
    // #endregion calls-with-different-wallets-2

    expect(deployedContract.provider.url).toBe(newProvider.url);
  });
  */
});
