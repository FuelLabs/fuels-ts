// #region full
import { Address } from 'fuels';

const b256 =
  '0xbebd3baab326f895289ecbd4210cf886ce41952316441ae4cac35f00f0e882a6';

const address = Address.fromB256(b256);
// #endregion full

console.log('address', address);
