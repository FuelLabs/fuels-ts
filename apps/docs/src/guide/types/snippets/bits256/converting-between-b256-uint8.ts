// #region full
import { arrayify, getRandomB256, hexlify } from 'fuels';

const randomB256: string = getRandomB256();

// Convert to Uint8Array
const uint8Arr: Uint8Array = arrayify(randomB256);

// Convert back to hexlified string
const hexedB256: string = hexlify(uint8Arr);
// #endregion full

console.log('hexedB256', hexedB256);
