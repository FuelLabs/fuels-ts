// #region full
import type { AssetInfo } from 'fuels';
import { getAssetById } from 'fuels';

const asset: AssetInfo | null = await getAssetById({
  assetId: '0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07',
});

console.log('AssetInfo', asset);
// AssetInfo { ... }
// #endregion full

// #region testnet
await getAssetById({
  assetId: '0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07',
  network: 'testnet',
});
// #endregion testnet
