// #region snippet-1
import type { Bytes } from 'fuels';
import { arrayify, hexlify, randomBytes } from 'fuels';

const randomBytes32: Bytes = randomBytes(32);

const bytes32String: string = hexlify(randomBytes32);

const bytes32: Bytes = arrayify(bytes32String);
// #endregion snippet-1
console.log('bytes32', bytes32);
