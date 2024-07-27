import { WalletUnlocked } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { ReturnContextAbi__factory } from '../../../test/typegen';
import ReturnContextAbiHex from '../../../test/typegen/contracts/ReturnContextAbi.hex';

/**
 * @group node
 * @group browser
 */
describe('Calls with different wallets', () => {
  it('should successfully update contract instance wallet', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          deployer: ReturnContextAbi__factory,
          bytecode: ReturnContextAbiHex,
        },
      ],
    });
    const {
      provider,
      contracts: [deployedContract],
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
});
