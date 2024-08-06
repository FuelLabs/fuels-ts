import { readFileSync } from 'fs';
import { Wallet, ContractFactory } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';
import { join } from 'path';

import { DocSnippetProjectsEnum } from '../../../test/fixtures/forc-projects';

/**
 * @group node
 */
describe('Deploying contracts', () => {
  it('should successfully deploy and execute contract function', async () => {
    const projectsPath = join(__dirname, '../../../test/fixtures/forc-projects');
    const contractName = DocSnippetProjectsEnum.ECHO_VALUES;

    using launched = await launchTestNode();
    const {
      provider,
      wallets: [testWallet],
    } = launched;
    const PRIVATE_KEY = testWallet.privateKey;

    // #region contract-setup-1
    // #context const PRIVATE_KEY = "..."

    const wallet = Wallet.fromPrivateKey(PRIVATE_KEY, provider);
    // #endregion contract-setup-1

    // #region contract-setup-2
    // #context const contractsDir = join(__dirname, '../path/to/contracts/dir')
    // #context const contractName = "contract-name"

    const byteCodePath = join(projectsPath, `${contractName}/out/release/${contractName}.bin`);
    const byteCode = readFileSync(byteCodePath);

    const abiJsonPath = join(projectsPath, `${contractName}/out/release/${contractName}-abi.json`);
    const abi = JSON.parse(readFileSync(abiJsonPath, 'utf8'));

    // #endregion contract-setup-2

    // #region contract-setup-3

    const factory = new ContractFactory(byteCode, abi, wallet);

    const { contractId, transactionId, waitForResult } = await factory.deploy();
    // #endregion contract-setup-3

    // #region contract-setup-4
    const { contract, transactionResult } = await waitForResult();
    // #endregion contract-setup-4

    // #region contract-setup-5
    const call = await contract.functions.echo_u8(15).call();

    const { value } = await call.waitForResult();
    // #endregion contract-setup-5

    expect(transactionId).toBeDefined();
    expect(contractId).toBeDefined();
    expect(transactionResult.isStatusSuccess).toBeTruthy();
    expect(value).toBe(15);
  });
});
