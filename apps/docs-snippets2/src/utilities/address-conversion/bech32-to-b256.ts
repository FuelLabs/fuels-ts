// #region conversion-5
import type { B256Address, Bech32Address } from 'fuels';
import { Address } from 'fuels';

const bech32: Bech32Address =
  'fuel1d5cfwekq78r0zq73g7eg0747etkaxxltrqx5tncm7lvg89awe3hswhqjhs';

const address: Address = Address.fromDynamicInput(bech32);

const b256: B256Address = address.toB256();
// 0x6d309766c0f1c6f103d147b287fabecaedd31beb180d45cf1bf7d88397aecc6f
// #endregion conversion-5

const expectedB256 =
  '0x6d309766c0f1c6f103d147b287fabecaedd31beb180d45cf1bf7d88397aecc6f';
console.log('B256 should be equal to example', b256 === expectedB256);
