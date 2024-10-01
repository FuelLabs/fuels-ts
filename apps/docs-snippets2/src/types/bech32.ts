import { Address } from 'fuels';

// #region bech32-2
const address = Address.fromRandom();

console.log('Bech32 address', address.bech32Address.toString());

// fuel1d5cfwekq78r0zq73g7eg0747etkaxxltrqx5tncm7lvg89awe3hswhqjhs
// #endregion bech32-2

// #region addresses-1
const bech32 = 'fuel1d5cfwekq78r0zq73g7eg0747etkaxxltrqx5tncm7lvg89awe3hswhqjhs';
// #endregion addresses-1

expect(bech32).toBe('fuel1d5cfwekq78r0zq73g7eg0747etkaxxltrqx5tncm7lvg89awe3hswhqjhs');
