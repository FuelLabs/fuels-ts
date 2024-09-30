// #region full
import { randomBytes } from 'crypto';
import { arrayify, Bytes, hexlify } from 'fuels';

// #region bytes32-1
// #region bytes32-2
const bytes32: Bytes = randomBytes(32);
// #endregion bytes32-1

const bytes32String: string = hexlify(bytes32);

// safely pass a 32-byte array into arrayify
expect(arrayify(bytes32)).toEqual(arrayify(bytes32String));

// a byte32 can be safely passed into hexlify more than once
expect(bytes32String).toEqual(hexlify(bytes32String));
// #endregion bytes32-2
// #endregion full
