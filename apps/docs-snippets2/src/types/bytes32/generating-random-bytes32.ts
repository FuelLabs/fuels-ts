// #region snippet-1
import { randomBytes } from 'crypto';
import type { Bytes } from 'fuels';

const bytes32: Bytes = randomBytes(32);

// #endregion snippet-1
console.log('bytes32', bytes32);
