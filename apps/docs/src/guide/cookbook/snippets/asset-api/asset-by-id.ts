// #region full
import type { AssetInfo } from 'fuels';
import { getAssetById, TESTNET_ASSET_API_URL } from 'fuels';

const asset: AssetInfo | null = await getAssetById({
  assetId: '0x0000000000000000000000000000000000000000000000000000000000000000',
});

console.log(asset);
// AssetInfo { ... }
// #endregion full
console.log(asset);

// #region testnet
await getAssetById({
  assetId: '0x0000000000000000000000000000000000000000000000000000000000000000',
  url: TESTNET_ASSET_API_URL,
});
// #endregion testnet
