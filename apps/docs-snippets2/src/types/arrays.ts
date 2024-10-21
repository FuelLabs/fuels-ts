import type { BigNumberish } from 'fuels';
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../env';
import { EchoValuesFactory } from '../typegend';

// #region arrays-1
// in Sway: [u8; 5]
const numberArray: number[] = [1, 2, 3, 4, 5];

// in Sway: [bool; 3]
const boolArray: boolean[] = [true, false, true];
// #endregion arrays-1

console.log('numberArray', numberArray);
console.log('boolArray', boolArray);

const provider = await Provider.create(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const deploy = await EchoValuesFactory.deploy(wallet);
const { contract } = await deploy.waitForResult();

// #region arrays-3
const u64Array: [BigNumberish, BigNumberish] = [10000000, 20000000];

const { value } = await contract.functions.echo_u64_array(u64Array).get();

console.log('value', value);
// [<BN: 0x989680>, <BN: 1312D00>]
// #endregion arrays-3

console.log('value 1', value[0]);
console.log('value 2', value[1]);

// #region arrays-4
try {
  // @ts-expect-error forced error
  await contract.functions.echo_u64_array([10000000]).get();
} catch (e) {
  console.log('error', e);
  // Types/values length mismatch.
}
// #endregion arrays-4

// #region arrays-5
try {
  await contract.functions.echo_u64_array([10000000, 'a']).get();
} catch (e) {
  console.log('error', e);
  // Invalid u64.
}
// #endregion arrays-5
