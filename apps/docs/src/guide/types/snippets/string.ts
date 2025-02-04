// #region full
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../env';
import { EchoValuesFactory } from '../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const deploy = await EchoValuesFactory.deploy(wallet);
const { contract } = await deploy.waitForResult();

// #region string-1
// Sway str[2]
const stringSize2 = 'st';

// Sway str[8]
const stringSize8 = 'fuel-sdk';
// #endregion string-1

// #region string-2
const { value } = await contract.functions.echo_str_8('fuel-sdk').get();

console.log('value', value);
// 'fuel-sdk'
// #endregion string-2

// #region string-3
const longString = 'fuel-sdk-WILL-THROW-ERROR';

try {
  await contract.functions.echo_str_8(longString).call();
} catch (error) {
  console.log('error', error);
  // Value length mismatch during encode
}

const shortString = 'THROWS';

try {
  await contract.functions.echo_str_8(shortString).call();
} catch (error) {
  console.log('error', error);
  // Value length mismatch during encode
}
// #endregion string-3
// #endregion full

console.log('equals', stringSize2 === 'st');
console.log('equals', stringSize8 === 'fuel-sdk');
