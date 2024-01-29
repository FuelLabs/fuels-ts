import { generateTestWallet } from '@fuel-ts/account/test-utils';
import type { BN, Contract, WalletUnlocked } from 'fuels';
import {
  AssertFailedRevertError,
  ContractFactory,
  BaseAssetId,
  Provider,
  getRandomB256,
  FUEL_NETWORK_URL,
} from 'fuels';

import { FuelGaugeProjectsEnum, getFuelGaugeForcProject } from '../test/fixtures';

let contractInstance: Contract;
let wallet: WalletUnlocked;
let gasPrice: BN;

/**
 * @group node
 */
describe('Auth Testing', () => {
  beforeAll(async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    ({ minGasPrice: gasPrice } = provider.getGasConfig());
    wallet = await generateTestWallet(provider, [[1_000_000, BaseAssetId]]);

    const { binHexlified, abiContents } = getFuelGaugeForcProject(
      FuelGaugeProjectsEnum.AUTH_TESTING_CONTRACT
    );

    const factory = new ContractFactory(binHexlified, abiContents, wallet);
    contractInstance = await factory.deployContract({ gasPrice });
  });

  it('can get is_caller_external', async () => {
    const { value } = await contractInstance.functions
      .is_caller_external()
      .txParams({ gasPrice, gasLimit: 10_000 })
      .call();

    expect(value).toBeTruthy();
  });

  it('can check_msg_sender [with correct id]', async () => {
    const { value } = await contractInstance.functions
      .check_msg_sender({ value: wallet.address.toB256() })
      .txParams({ gasPrice, gasLimit: 10_000 })
      .call();

    expect(value).toBeTruthy();
  });

  it('can check_msg_sender [with incorrect id]', async () => {
    await expect(
      contractInstance.functions
        .check_msg_sender({ value: getRandomB256() })
        .txParams({ gasPrice, gasLimit: 10_000 })
        .call()
    ).rejects.toThrow(AssertFailedRevertError);
  });
});
