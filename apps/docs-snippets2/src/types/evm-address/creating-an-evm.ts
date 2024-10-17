import { Address } from 'fuels';

// #region snippet-1
// #region snippet-2
const b256Address =
  '0xbebd3baab326f895289ecbd4210cf886ce41952316441ae4cac35f00f0e882a6';
// #endregion snippet-2

const address = Address.fromB256(b256Address);

const evmAddress = address.toEvmAddress();

console.log('evmAddress', evmAddress);
// '0x000000000000000000000000210cf886ce41952316441ae4cac35f00f0e882a6'
// #endregion snippet-1
