import type { Contract } from 'fuels';
import { Provider, WalletUnlocked, ContractFactory } from 'fuels';

import { SnippetProjectEnum, getSnippetProjectArtifacts } from '../../../projects';
import { getTestWallet } from '../../utils';

describe(__filename, () => {
  let deployedContract: Contract;

  beforeAll(async () => {
    const wallet = await getTestWallet();

    const { abiContents, binHexlified } = getSnippetProjectArtifacts(
      SnippetProjectEnum.RETURN_CONTEXT
    );

    const contractFactory = new ContractFactory(binHexlified, abiContents, wallet);

    deployedContract = await contractFactory.deployContract();
  });

  it('should successfully update contract instace wallet', () => {
    const newWallet = WalletUnlocked.generate();

    expect(deployedContract.account?.address).not.toBe(newWallet.address);

    // #region calls-with-different-wallets-1
    deployedContract.account = newWallet;
    // #endregion calls-with-different-wallets-1

    expect(deployedContract.account.address).toBe(newWallet.address);
  });

  it('should successfully update contract instace provider', () => {
    const newProvider = new Provider('http://provider:9999');

    expect(deployedContract.provider?.url).not.toBe(newProvider.url);

    // #region calls-with-different-wallets-2
    deployedContract.provider = newProvider;
    // #endregion calls-with-different-wallets-2

    expect(deployedContract.provider.url).toBe(newProvider.url);
  });
});
