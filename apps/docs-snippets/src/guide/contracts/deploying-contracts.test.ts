import { readFileSync as originalReadFileSync } from 'fs';
import { Provider, FUEL_NETWORK_URL, Wallet, ContractFactory } from 'fuels';
import { join } from 'path';

import {
  DocSnippetProjectsEnum,
  getDocsSnippetsForcProject,
} from '../../../test/fixtures/forc-projects';
import { getTestWallet } from '../../utils';

/**
 * @group node
 */
describe(__filename, () => {
  let PRIVATE_KEY: string;
  let projectsPath: string;
  let contractName: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function readFileSync(path: string | Buffer, encoding?: BufferEncoding): any {
    if (/-abi\.json/.test(path.toString())) {
      const abi = getDocsSnippetsForcProject(DocSnippetProjectsEnum.ECHO_VALUES);
      return JSON.stringify(abi.abiContents, null, 2).toString();
    }
    return originalReadFileSync(path, encoding);
  }

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
