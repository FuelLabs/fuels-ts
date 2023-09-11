import type { Contract } from 'fuels';
import { FUEL_NETWORK_URL, Provider, WalletUnlocked } from 'fuels';

import { SnippetProjectEnum } from '../../../projects';
import { createAndDeployContractFromProject } from '../../utils';

describe(__filename, () => {
  let deployedContract: Contract;

  beforeAll(async () => {
    deployedContract = await createAndDeployContractFromProject(SnippetProjectEnum.RETURN_CONTEXT);
  });

  it('should successfully update contract instance wallet', async () => {
    const provider = await Provider.connect(FUEL_NETWORK_URL);
    const newWallet = WalletUnlocked.generate({
      provider,
    });

    expect(deployedContract.account?.address).not.toBe(newWallet.address);

    // #region calls-with-different-wallets-1
    deployedContract.account = newWallet;
    // #endregion calls-with-different-wallets-1

    expect(deployedContract.account.address).toBe(newWallet.address);
  });

  it('should successfully update contract instance provider', () => {
    const chainInfo = deployedContract.provider.getCachedChainInfo();

    // use the `chainInfo` from the deployed contract's provider to create a new dummy provider
    const newProvider = new Provider('http://provider:9999', chainInfo);

    expect(deployedContract.provider?.url).not.toBe(newProvider.url);

    // #region calls-with-different-wallets-2
    deployedContract.provider = newProvider;
    // #endregion calls-with-different-wallets-2

    expect(deployedContract.provider.url).toBe(newProvider.url);
  });
});
