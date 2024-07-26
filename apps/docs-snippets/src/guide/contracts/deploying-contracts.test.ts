import { readFileSync } from 'fs';
import { Wallet, ContractFactory } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';
import { join } from 'path';

import { EchoValuesAbi__factory } from '../../../test/typegen';
import EchoValuesHex from '../../../test/typegen/contracts/EchoValuesAbi.hex';

/**
 * @group node
 * @group browser
 */
describe('Deploying contracts', () => {
  it('should successfully deploy and execute contract function', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          deployer: EchoValuesAbi__factory,
          bytecode: EchoValuesHex,
        },
      ],
    });
    const { provider } = launched;

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

    const { contractId, transactionId, waitForResult } = await factory.deployContract();
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
