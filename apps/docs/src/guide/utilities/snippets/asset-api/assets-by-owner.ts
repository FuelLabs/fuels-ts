// #region full
import type { AssetsByOwner } from 'fuels';
import { getAssetsByOwner } from 'fuels';

const assets: AssetsByOwner = await getAssetsByOwner({
  owner: '0x0000000000000000000000000000000000000000000000000000000000000000',
});

console.log('AssetsByOwner', assets);
// AssetsByOwner { data: [], pageInfo: { count: 0 } }
// #endregion full

// #region pagination
await getAssetsByOwner({
  owner: '0x0000000000000000000000000000000000000000000000000000000000000000',
  pagination: { last: 100 },
});
// #endregion pagination
