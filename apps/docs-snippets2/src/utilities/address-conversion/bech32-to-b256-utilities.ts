// #region conversion-6
import type { B256Address, Bech32Address } from 'fuels';
import { isBech32, toB256 } from 'fuels';

const bech32: Bech32Address =
  'fuel1d5cfwekq78r0zq73g7eg0747etkaxxltrqx5tncm7lvg89awe3hswhqjhs';

const b256: B256Address | null = isBech32(bech32) ? toB256(bech32) : null;
// 0x6d309766c0f1c6f103d147b287fabecaedd31beb180d45cf1bf7d88397aecc6f
// #endregion conversion-6

const expectedB256 =
  '0x6d309766c0f1c6f103d147b287fabecaedd31beb180d45cf1bf7d88397aecc6f';
console.log('B256 should be equal to example', b256 === expectedB256);
