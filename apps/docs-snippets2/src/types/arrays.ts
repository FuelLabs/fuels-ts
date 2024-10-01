// #region full
import type { BigNumberish } from 'fuels';
import { BN, ErrorCode, Provider, Wallet } from 'fuels';
import { expectToThrowFuelError } from 'fuels/test-utils';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../env';
import { EchoValuesFactory } from '../typegend';

// #region arrays-1
const numberArray: number[] = [1, 2, 3, 4, 5]; // in Sway: [u8; 5]

const boolArray: boolean[] = [true, false, true]; // in Sway: [bool; 3]
// #endregion arrays-1

const provider = await Provider.create(LOCAL_NETWORK_URL);

const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const deploy = await EchoValuesFactory.deploy(wallet);

const { contract } = await deploy.waitForResult();

// #region arrays-3
const u64Array: [BigNumberish, BigNumberish] = [10000000, 20000000];

// This expects two arguments
const { value } = await contract.functions.echo_u64_array(u64Array).get();

expect(new BN(value[0]).toNumber()).toEqual(u64Array[0]);

expect(new BN(value[1]).toNumber()).toEqual(u64Array[1]);
// #endregion arrays-3

await expectToThrowFuelError(
  async () =>
    // @ts-expect-error ignore snippet error
    // #region arrays-4
    // will throw error because the second element is not of type u64
    contract.functions.echo_u64_array([10000000]).get(),
  // #endregion arrays-4

  { code: ErrorCode.ENCODE_ERROR }
);

await expectToThrowFuelError(
  async () =>
    // #region arrays-5
    // will throw error because the second element is not of type u64
    contract.functions.echo_u64_array([10000000, 'a']).get(),
  // #endregion arrays-5
  { code: ErrorCode.ENCODE_ERROR }
);
// #endregion full

expect(numberArray).toStrictEqual([1, 2, 3, 4, 5]);
expect(boolArray).toStrictEqual([true, false, true]);
