import { generateTestWallet } from '@fuel-ts/account/test-utils';
import type { WalletUnlocked } from 'fuels';
import { Provider, getRandomB256, FUEL_NETWORK_URL } from 'fuels';

import { FuelGaugeProjectsEnum } from '../test/fixtures';

import { launchTestContract } from './utils';

let wallet: WalletUnlocked;
let baseAssetId: string;

/**
 * @group node
 * @group browser
 */
describe('Auth Testing', () => {
  beforeAll(async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    baseAssetId = provider.getBaseAssetId();
    wallet = await generateTestWallet(provider, [[1_000_000, baseAssetId]]);
  });

  it('can get is_caller_external', async () => {
    using contractInstance = await launchTestContract(FuelGaugeProjectsEnum.AUTH_TESTING_CONTRACT);

    const { value } = await contractInstance.functions.is_caller_external().call();

    expect(value).toBeTruthy();
  });

  it('can check_msg_sender [with correct id]', async () => {
    using contractInstance = await launchTestContract(FuelGaugeProjectsEnum.AUTH_TESTING_CONTRACT);

    const { value } = await contractInstance.functions
      .check_msg_sender({ bits: wallet.address.toB256() })
      .call();

    expect(value).toBeTruthy();
  });

  it('can check_msg_sender [with incorrect id]', async () => {
    using contractInstance = await launchTestContract(FuelGaugeProjectsEnum.AUTH_TESTING_CONTRACT);

    await expect(
      contractInstance.functions.check_msg_sender({ bits: getRandomB256() }).call()
    ).rejects.toThrow(
      'The transaction reverted because an "assert" statement failed to evaluate to true.'
    );
  });
});
