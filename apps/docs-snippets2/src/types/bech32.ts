import { Address } from 'fuels';

// #region bech32-2
const address = Address.fromRandom();

console.log(address.bech32Address);

// fuel1d5cfwekq78r0zq73g7eg0747etkaxxltrqx5tncm7lvg89awe3hswhqjhs
// #endregion bech32-2

// #region addresses-1
const bech32 = 'fuel1d5cfwekq78r0zq73g7eg0747etkaxxltrqx5tncm7lvg89awe3hswhqjhs';
// #endregion addresses-1
