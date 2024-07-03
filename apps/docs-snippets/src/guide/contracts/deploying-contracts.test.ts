import { readFileSync } from 'fs';
import { Provider, FUEL_NETWORK_URL, Wallet, ContractFactory } from 'fuels';
import { join } from 'path';

import { DocSnippetProjectsEnum } from '../../../test/fixtures/forc-projects';
import { getTestWallet } from '../../utils';

/**
 * @group node
 */
describe(__filename, () => {
  let PRIVATE_KEY: string;
  let projectsPath: string;
  let contractName: string;

  beforeAll(async () => {
    const wallet = await getTestWallet();
    PRIVATE_KEY = wallet.privateKey;
    projectsPath = join(__dirname, '../../../test/fixtures/forc-projects');

    contractName = DocSnippetProjectsEnum.ECHO_VALUES;
  });

  it('should successfully deploy and execute contract function', async () => {
    // #region contract-setup-1
    // #context const PRIVATE_KEY = "..."

    const provider = await Provider.create(FUEL_NETWORK_URL);

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

    const contract = await factory.deployContract();
    // #endregion contract-setup-3

    // #region contract-setup-5
    const { value } = await contract.functions.echo_u8(15).call();
    // #endregion contract-setup-5

    // expect(transactionResult.isStatusSuccess).toBeTruthy();
    expect(value).toBe(15);
  });

  it('should successfully deploy a contract async', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const wallet = Wallet.fromPrivateKey(PRIVATE_KEY, provider);
    // #context const contractName = "contract-name"

    const byteCodePath = join(projectsPath, `${contractName}/out/release/${contractName}.bin`);
    const byteCode = readFileSync(byteCodePath);

    const abiJsonPath = join(projectsPath, `${contractName}/out/release/${contractName}-abi.json`);
    const abi = JSON.parse(readFileSync(abiJsonPath, 'utf8'));

    // #region contract-setup-4
    const factory = new ContractFactory(byteCode, abi, wallet);

    const {
      // instance of TransactionResponse,
      transactionResponse,
      // the transaction result of the deployment (status its submited)
      transactionResult,
      // callback to wait for the contract to be deployed
      waitForDeploy,
    } = await factory.deployContractAsync();

    // It will only resolve once the contract is deployed
    const contract = await waitForDeploy();
    // #endregion contract-setup-4

    const { value } = await contract.functions.echo_u8(15).call();

    expect(transactionResult).toBeDefined();
    expect(transactionResponse).toBeDefined();

    expect(value).toBe(15);
  });
});
