// #region bytes32-1
import { randomBytes } from 'crypto';
import type { Bytes } from 'fuels';
import { arrayify, hexlify } from 'fuels';

let bytes32: Bytes = randomBytes(32);

// #region bytes32-2
// #endregion bytes32-1

const bytes32String: string = hexlify(bytes32);

bytes32 = arrayify(bytes32String);
// #endregion bytes32-2
