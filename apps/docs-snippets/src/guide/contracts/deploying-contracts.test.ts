import { TestNodeLauncher } from '@fuel-ts/test-utils';
import { readFileSync } from 'fs';
import { Wallet, ContractFactory } from 'fuels';
import { join } from 'path';

import { SnippetProjectEnum } from '../../../projects';

/**
 * @group node
 */
describe(__filename, () => {
  const projectsPath = join(__dirname, '../../../projects');
  const contractName = SnippetProjectEnum.ECHO_VALUES;

  it('should successfully deploy and execute contract function', async () => {
    await using launched = await TestNodeLauncher.launch();

    const {
      provider,
      wallets: [{ privateKey: PRIVATE_KEY }],
    } = launched;

    // #region contract-setup-1
    // #context const provider = await Provider.create(...)
    // #context const PRIVATE_KEY = "..."

    const wallet = Wallet.fromPrivateKey(PRIVATE_KEY, provider);
    // #endregion contract-setup-1

    // #region contract-setup-2
    // #context const contractsDir = join(__dirname, '../path/to/contracts/dir')
    // #context const contractName = "contract-name"

    const byteCodePath = join(projectsPath, `${contractName}/out/debug/${contractName}.bin`);
    const byteCode = readFileSync(byteCodePath);

    const abiJsonPath = join(projectsPath, `${contractName}/out/debug/${contractName}-abi.json`);
    const abi = JSON.parse(readFileSync(abiJsonPath, 'utf8'));
    // #endregion contract-setup-2

    // #region contract-setup-3
    const factory = new ContractFactory(byteCode, abi, wallet);

    const { minGasPrice: gasPrice } = wallet.provider.getGasConfig();

    const contract = await factory.deployContract({ gasPrice });
    // #endregion contract-setup-3

    // #region contract-setup-4
    const { value } = await contract.functions.echo_u8(15).simulate();

    expect(value).toBe(15);
    // #endregion contract-setup-4
  });
});
