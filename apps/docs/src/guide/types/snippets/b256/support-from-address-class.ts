// #region full
import { Address } from 'fuels';

// B256 wallet address
const b256Address: string = '0xbebd3baab326f895289ecbd4210cf886ce41952316441ae4cac35f00f0e882a6';

// Create Address instance from B256
const address = new Address(b256Address);

// Address class provides useful methods
console.log('B256:', address.toB256());
console.log('Hex:', address.toHexString());
console.log('Bytes:', address.toBytes());

// You can also create random addresses for testing
const randomAddress = Address.fromRandom();
console.log('Random address:', randomAddress.toB256());
// #endregion full
