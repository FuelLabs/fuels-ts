import { getForcProject } from '@fuel-ts/utils/test-utils';
import { generateTestWallet } from '@fuel-ts/wallet/test-utils';
import type { BN, Contract, JsonAbi, WalletUnlocked } from 'fuels';
import {
  AssertFailedRevertError,
  ContractFactory,
  BaseAssetId,
  Provider,
  getRandomB256,
  FUEL_NETWORK_URL,
} from 'fuels';
import path from 'path';

let contractInstance: Contract;
let wallet: WalletUnlocked;
let gasPrice: BN;

describe('Auth Testing', () => {
  beforeAll(async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    ({ minGasPrice: gasPrice } = provider.getGasConfig());
    wallet = await generateTestWallet(provider, [[1_000_000, BaseAssetId]]);

    const projectPath = path.join(__dirname, '../fixtures/forc-projects/auth_testing_contract');
    const { binHexlified, abiContents } = getForcProject<JsonAbi>(projectPath);

    const factory = new ContractFactory(binHexlified, abiContents, wallet);
    contractInstance = await factory.deployContract({ gasPrice });
  });

  it('can get is_caller_external', async () => {
    const { value } = await contractInstance.functions
      .is_caller_external()
      .txParams({ gasPrice })
      .call();

    expect(value).toBeTruthy();
  });

  it('can check_msg_sender [with correct id]', async () => {
    const { value } = await contractInstance.functions
      .check_msg_sender({ value: wallet.address.toB256() })
      .txParams({ gasPrice })
      .call();

    expect(value).toBeTruthy();
  });

  it('can check_msg_sender [with incorrect id]', async () => {
    await expect(
      contractInstance.functions
        .check_msg_sender({ value: getRandomB256() })
        .txParams({ gasPrice })
        .call()
    ).rejects.toThrow(AssertFailedRevertError);
  });
});
