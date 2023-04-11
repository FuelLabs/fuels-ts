import { readFileSync } from 'fs';
import { Provider, FUEL_NETWORK_URL, Wallet, ContractFactory } from 'fuels';
import { join } from 'path';

import { SnippetContractEnum } from '../../../contracts';
import { getTestWallet } from '../../utils';

describe(__filename, () => {
  let PRIVATE_KEY: string;
  let contractsDir: string;
  let contractName: string;

  beforeAll(async () => {
    const wallet = await getTestWallet();

    PRIVATE_KEY = wallet.privateKey;

    contractsDir = join(__dirname, '../../../contracts');
    contractName = SnippetContractEnum.ECHO_VALUES;
  });

  it('should deploy and execute contract function successfully', async () => {
    // #region contract-setup-step-2
    // #context const PRIVATE_KEY = "..."

    const provider = new Provider(FUEL_NETWORK_URL);

    const wallet = Wallet.fromPrivateKey(PRIVATE_KEY, provider);
    // #endregion contract-setup-step-2

    // #region contract-setup-step-3
    // #context const contractsDir = join(__dirname, '../path/to/contracts/dir')
    // #context const contractName = "contract-name"

    const byteCodePath = join(contractsDir, `${contractName}/out/debug/${contractName}.bin`);
    const byteCode = readFileSync(byteCodePath);

    const abiJsonPath = join(contractsDir, `${contractName}/out/debug/${contractName}-abi.json`);
    const abi = JSON.parse(readFileSync(abiJsonPath, 'utf8'));
    // #endregion contract-setup-step-3

    // #region contract-setup-step-4
    const factory = new ContractFactory(byteCode, abi, wallet);

    const contract = await factory.deployContract();
    // #endregion contract-setup-step-4

    // #region contract-setup-step-5
    const { value } = await contract.functions.echo_u8(15).get();

    expect(value).toBe(15);
    // #endregion contract-setup-step-5
  });
});
