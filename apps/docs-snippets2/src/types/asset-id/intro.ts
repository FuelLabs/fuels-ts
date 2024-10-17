// #region full
import type { AssetId } from 'fuels';
import { getRandomB256 } from 'fuels';

const bits256 = getRandomB256();

const assetId: AssetId = {
  bits: bits256,
};
// #endregion full
console.log(assetId, 'assetId');
