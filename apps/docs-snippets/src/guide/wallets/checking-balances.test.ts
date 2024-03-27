import { generateTestWallet } from '@fuel-ts/account/test-utils';
import { ASSET_A } from '@fuel-ts/utils/test-utils';
import type { CoinQuantity, BN } from 'fuels';
import { BaseAssetId, FUEL_NETWORK_URL, Provider, Wallet } from 'fuels';

/**
 * @group node
 */
describe(__filename, () => {
  let provider: Provider;
  let privateKey: string;
  const assetId = BaseAssetId;

  beforeAll(async () => {
    provider = await Provider.create(FUEL_NETWORK_URL);
    const wallet = await generateTestWallet(provider, [
      [1000, BaseAssetId],
      [1000, ASSET_A],
    ]);
    privateKey = wallet.privateKey;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  /* eslint-disable no-console */
  it('should fetch specific balance just fine', async () => {
    vi.spyOn(console, 'log').mockImplementation(() => ({}));

    // #region checking-balances-1
    const myWallet = Wallet.fromPrivateKey(privateKey, provider);

    const balance: BN = await myWallet.getBalance(assetId);

    // Amount is returned as a BigNumber
    console.log(`Balance amount: ${balance.toString()}`);
    // #endregion checking-balances-1

    expect(balance).toBeDefined();
  });

  it('should fetch all balances just fine', async () => {
    vi.spyOn(console, 'log').mockImplementation(() => ({}));

    // #region checking-balances-2
    const myWallet = Wallet.fromPrivateKey(privateKey, provider);

    const balances: CoinQuantity[] = await myWallet.getBalances();

    balances.forEach((balance) => {
      // Amount is a BigNumber
      console.log(`Balance amount: ${balance.amount.toString()}`);
      console.log(`Balance asset ID: ${balance.assetId}`);
    });
    // #endregion checking-balances-2

    expect(balances).toBeDefined();
  });
});
/* eslint-enable no-console */
