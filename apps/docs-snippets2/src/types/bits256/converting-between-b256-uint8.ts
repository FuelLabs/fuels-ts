// #region full
import { arrayify, getRandomB256, hexlify } from 'fuels';

const randomB256: string = getRandomB256();

// convert to Uint8Array
const uint8Arr = arrayify(randomB256);

// convert back to hexlified string
const hexedB256 = hexlify(uint8Arr);
// #endregion full

console.log('hexedB256', hexedB256);
