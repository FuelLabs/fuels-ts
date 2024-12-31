// #region conversion-8
import { isB256, toBech32 } from 'fuels';

const b256 =
  '0x6d309766c0f1c6f103d147b287fabecaedd31beb180d45cf1bf7d88397aecc6f';
const bech32 = isB256(b256) ? toBech32(b256) : null;
// fuel1d5cfwekq78r0zq73g7eg0747etkaxxltrqx5tncm7lvg89awe3hswhqjhs
// #endregion conversion-8

const expectedBech32 =
  'fuel1d5cfwekq78r0zq73g7eg0747etkaxxltrqx5tncm7lvg89awe3hswhqjhs';
console.log('Bech32 should be equal to example', bech32 === expectedBech32);
