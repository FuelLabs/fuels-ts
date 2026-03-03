// #region full
import { Address } from 'fuels';

// B256 is a 256-bit (32-byte) value represented as a hex string
// Example: A real Fuel wallet address
const walletAddress: string = '0xbebd3baab326f895289ecbd4210cf886ce41952316441ae4cac35f00f0e882a6';

// You can create an Address instance from a B256
const address = new Address(walletAddress);

console.log('B256 address:', walletAddress);
console.log('Address instance:', address.toB256());
// #endregion full
