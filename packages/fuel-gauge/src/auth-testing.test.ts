import type { Contract, WalletUnlocked } from 'fuels';
import { ContractFactory, Provider, getRandomB256, FUEL_NETWORK_URL } from 'fuels';
import { generateTestWallet } from 'fuels/test-utils';

import { FuelGaugeProjectsEnum, getFuelGaugeForcProject } from '../test/fixtures';

let contractInstance: Contract;
let wallet: WalletUnlocked;
let baseAssetId: string;

/**
 * @group node
 */
describe('Auth Testing', () => {
  beforeAll(async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    baseAssetId = provider.getBaseAssetId();
    wallet = await generateTestWallet(provider, [[1_000_000, baseAssetId]]);

    const { binHexlified, abiContents } = getFuelGaugeForcProject(
      FuelGaugeProjectsEnum.AUTH_TESTING_CONTRACT
    );

    const factory = new ContractFactory(binHexlified, abiContents, wallet);
    contractInstance = await factory.deployContract();
  });

  it('can get is_caller_external', async () => {
    const { value } = await contractInstance.functions.is_caller_external().call();

    expect(value).toBeTruthy();
  });

  it('can check_msg_sender [with correct id]', async () => {
    const { value } = await contractInstance.functions
      .check_msg_sender({ bits: wallet.address.toB256() })
      .call();

    expect(value).toBeTruthy();
  });

  it('can check_msg_sender [with incorrect id]', async () => {
    await expect(
      contractInstance.functions.check_msg_sender({ bits: getRandomB256() }).call()
    ).rejects.toThrow(
      'The transaction reverted because an "assert" statement failed to evaluate to true.'
    );
  });
});
