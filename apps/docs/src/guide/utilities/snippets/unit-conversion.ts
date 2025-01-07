/* eslint-disable @typescript-eslint/no-unused-vars */
// #region full
import { BN, DECIMAL_GWEI, DECIMAL_KWEI, bn, Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../env';
import { EchoValuesFactory } from '../../../typegend/contracts/EchoValuesFactory';

// #region instantiation-1
const myBigNumberOne = '100000000';

const resultOne = new BN('100000000').toString();

// #endregion instantiation-1

const myBigNumberTwo = '100000000';

// #region instantiation-2

const resultTwo = bn('100000000').toString();
// #endregion instantiation-2

// #region contract-calls-1

// Let's deploy a contract that has a function that takes a u64 as input
const provider = new Provider(LOCAL_NETWORK_URL);

const wallet = await Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const deployedContract = await new EchoValuesFactory(wallet).deploy();
const { contract } = await deployedContract.waitForResult();

const MAX_U64 = bn('18446744073709551615');

const { waitForResult } = await contract.functions.echo_u64(MAX_U64).call();
const { value } = await waitForResult();

// #endregion contract-calls-1

const myBigNumberThree = '1';

// #region parse-units-1
const resultThree = bn.parseUnits('0.000000001').toString();
// #endregion parse-units-1

// #endregion parse-units-1

// #region parse-units-2
const myBigNumberFour = '100100000000000';
const resultFour = bn.parseUnits('100100').toString();
// #endregion parse-units-2

// #endregion parse-units-3

// #region parse-units-3
const myBigNumberFive = '100100000200001';

const resultFive = bn.parseUnits('100,100.000200001').toString();
// #endregion parse-units-3

// #endregion parse-units-4

// #region parse-units-4
const myBigNumberSix = '1000000000';

const resultSix = bn.parseUnits('1', DECIMAL_GWEI).toString();
// #endregion parse-units-4

// #region format-1
const myBigNumberSeven = '1.000';
const oneGwei = bn('1000000000');

const resultSeven = oneGwei.format();
// #endregion format-1

// #region format-2
const myBigNumberEight = '2.000';

const twoGwei = bn('2000000000');

const resultEight = twoGwei.format({ units: DECIMAL_GWEI });
// #endregion format-2

// #region format-3
const oneDecimalGwei = '1.0';

const formattedGwei = oneGwei.format({ precision: 1 });
// #endregion format-3

// #region format-units-1
const myFormattedGwei = '1.000000000';

const formattedUnitsGwei = oneGwei.formatUnits();
// #endregion format-units-1

// #region format-units-2
const myFormattedKwei = '1.000000000000000';

const oneKwei = bn('1000000000000000');

const formattedUnitsKwei = oneKwei.formatUnits(DECIMAL_KWEI);
// #endregion format-units-2

// #endregion full
