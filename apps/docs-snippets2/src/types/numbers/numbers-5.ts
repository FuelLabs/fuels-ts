// #region snippet-1
import { toBigInt } from 'ethers';
import { bn } from 'fuels';

const number = 20;

const ethersBigNum = toBigInt(number);

const fuelsBigNum = bn(ethersBigNum.toString());

console.log(fuelsBigNum.toNumber());
// 20
// #endregion snippet-1
