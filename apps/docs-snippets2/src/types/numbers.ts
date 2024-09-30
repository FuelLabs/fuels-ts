// #region full
import { toBigInt } from 'ethers';
import { bn, Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../env';
import { EchoValuesFactory } from '../typegend';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const deploy = await EchoValuesFactory.deploy(wallet);
const { contract } = await deploy.waitForResult();

// #region numbers-docs-1
let originalNumber: number | string = 20;

let bigNumber = bn(originalNumber);

expect(bigNumber.toNumber()).toEqual(originalNumber);
// #endregion numbers-docs-1

// #region numbers-docs-2
originalNumber = '9007199254740992';

bigNumber = bn(originalNumber);

expect(bigNumber.toString()).toEqual(originalNumber);
// #endregion numbers-docs-2

// #region numbers-docs-3
originalNumber = 20;

const { value: value1 } = await contract.functions.echo_u64(bn(originalNumber)).get();

expect(value1.toNumber()).toEqual(originalNumber);
// #endregion numbers-docs-3

// #region numbers-docs-4
originalNumber = 20;

const { value: value2 } = await contract.functions.echo_u8(originalNumber).get();

expect(value2).toEqual(originalNumber);
// #endregion numbers-docs-4

// #region numbers-docs-5
originalNumber = 20;

const ethersBigNum = toBigInt(originalNumber);

const fuelsBigNum = bn(ethersBigNum.toString());

expect(fuelsBigNum.toNumber()).toEqual(originalNumber);
// #endregion numbers-docs-5
// #endregion full
