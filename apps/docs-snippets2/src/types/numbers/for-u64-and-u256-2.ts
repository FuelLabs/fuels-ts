// #region snippet-1
import { bn } from 'fuels';

const strNumber = '9007199254740992';

const bigNumber = bn(strNumber);

console.log('equals', bigNumber.toString() === strNumber);
// true
// #endregion snippet-1
