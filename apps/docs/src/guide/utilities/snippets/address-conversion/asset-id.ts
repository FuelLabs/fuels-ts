// #region conversion-4
import type { AssetId, B256Address } from 'fuels';
import { Address } from 'fuels';

const b256: B256Address =
  '0x6d309766c0f1c6f103d147b287fabecaedd31beb180d45cf1bf7d88397aecc6f';
const address: Address = Address.fromB256(b256);
const assetId: AssetId = address.toAssetId();
// {
//    bits: '0x6d309766c0f1c6f103d147b287fabecaedd31beb180d45cf1bf7d88397aecc6f
// }
// #endregion conversion-4

const expectedB256 =
  '0x6d309766c0f1c6f103d147b287fabecaedd31beb180d45cf1bf7d88397aecc6f';
console.log('Should have expected format', assetId.bits === expectedB256);
