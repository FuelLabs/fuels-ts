// #region bech32-2
import { Address } from 'fuels';

const address = Address.fromRandom();

console.log('Bech32', address.bech32Address.toString());

// fuel1d5cfwekq78r0zq73g7eg0747etkaxxltrqx5tncm7lvg89awe3hswhqjhs
// #endregion bech32-2

// #region addresses-1
const bech32 =
  'fuel1d5cfwekq78r0zq73g7eg0747etkaxxltrqx5tncm7lvg89awe3hswhqjhs';
// #endregion addresses-1

console.log('bech32', bech32);
