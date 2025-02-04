// #region full
import type { AssetId } from 'fuels';
import { getRandomB256 } from 'fuels';

const b256 = getRandomB256();

const assetId: AssetId = {
  bits: b256,
};
// #endregion full
console.log(assetId, 'assetId');
