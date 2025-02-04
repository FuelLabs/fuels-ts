// #region snippet-1
import { bn } from 'fuels';

const number: number | string = 20;

const bigNumber = bn(number);

console.log('equals', bigNumber.eqn(number));
// true
// #endregion snippet-1
