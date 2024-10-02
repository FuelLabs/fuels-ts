// #region full
import { Address, arrayify, getRandomB256, hexlify } from 'fuels';
// #region bits256-1
// randomB256 is a hexlified string representing a 256-bit value
let bits256String: string = getRandomB256();
// #endregion bits256-1

// #region bits256-2
// convert to Uint8Array
const uint8Arr = arrayify(bits256String);

// convert back to hexlified string
bits256String = hexlify(uint8Arr);
// #endregion bits256-2

// #region addresses-2
const bits256 = '0xbebd3baab326f895289ecbd4210cf886ce41952316441ae4cac35f00f0e882a6';
// #endregion addresses-2

// #region bits256-3
const address = Address.fromB256(bits256String);

// #endregion bits256-3
// #endregion full

expect(address.toB256()).toEqual(bits256String);
expect(bits256).toBe('0xbebd3baab326f895289ecbd4210cf886ce41952316441ae4cac35f00f0e882a6');
