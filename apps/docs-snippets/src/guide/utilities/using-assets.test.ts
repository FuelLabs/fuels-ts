/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { Asset, AssetFuel } from 'fuels';
import { assets, CHAIN_IDS, getAssetFuel, Wallet } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

/**
 * @group node
 * @group browser
 */
describe('using-assets', () => {
  it('should be able to use `getAssetFuel`', async () => {
    using launched = await launchTestNode();
    const {
      provider,
      wallets: [sender],
    } = launched;

    // #region using-assets-1
    // #import { Wallet, Asset, AssetFuel, assets, getAssetFuel };

    const recipient = Wallet.generate({ provider });

    // Find the asset with symbol 'ETH'
    const assetEth: Asset = assets.find((asset) => asset.symbol === 'ETH')!;

    // Get all the metadata for ETH on Fuel Test Network
    const chainId: number = CHAIN_IDS.fuel.testnet;
    const assetEthOnFuel: AssetFuel = getAssetFuel(assetEth, chainId)!;

    // Send a transaction (using the asset on Fuel Test Network)
    const transaction = await sender.transfer(recipient.address, 100, assetEthOnFuel.assetId);
    const result = await transaction.waitForResult();
    // #endregion using-assets-1

    expect(result.isStatusSuccess).toBe(true);
    expect(assetEthOnFuel).toBeDefined();
    expect(assetEthOnFuel).toBeDefined();
  });
});
