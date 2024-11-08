// #region conversion-7
import type { B256Address, Bech32Address } from 'fuels';
import { Address } from 'fuels';

const b256: B256Address =
  '0x6d309766c0f1c6f103d147b287fabecaedd31beb180d45cf1bf7d88397aecc6f';

const address: Address = Address.fromDynamicInput(b256);

const bech32: Bech32Address = address.bech32Address;
// fuel1d5cfwekq78r0zq73g7eg0747etkaxxltrqx5tncm7lvg89awe3hswhqjhs
// #endregion conversion-7

const expectedBech32 =
  'fuel1d5cfwekq78r0zq73g7eg0747etkaxxltrqx5tncm7lvg89awe3hswhqjhs';
console.log('Bech32 should be equal to example', bech32 === expectedBech32);
