// #region create-asset-id-1
import type { AssetId, B256Address } from 'fuels';
import { createAssetId } from 'fuels';

const contractId: B256Address =
  '0x67eb6a384151a30e162c26d2f3e81ca2023dfa1041000210caed42ead32d63c0';
const subID: B256Address =
  '0xc7fd1d987ada439fc085cfa3c49416cf2b504ac50151e3c2335d60595cb90745';

const assetId: AssetId = createAssetId(contractId, subID);
// {
//   bits: '0x16c1cb95e999d0c74806f97643af158e821a0063a0c8ea61183bad2497b57478'
// }
// #endregion create-asset-id-1

const expectedAssetId =
  '0x16c1cb95e999d0c74806f97643af158e821a0063a0c8ea61183bad2497b57478';

console.log('Asset ID should be equal', assetId.bits === expectedAssetId);
