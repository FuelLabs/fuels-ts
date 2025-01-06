import { Address, Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { InputOutputTypesFactory } from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const deploy = await InputOutputTypesFactory.deploy(wallet);
const { contract } = await deploy.waitForResult();

// #region address-input
const address = Address.fromRandom();
const addressInput = { bits: address.toB256() };
// #endregion address-input

const response1 = await contract.functions.address(addressInput).get();

// #region address-output
const addressOutput = response1.value;
const addressFromOutput: Address = Address.fromB256(addressOutput.bits);
// #endregion address-output

console.log('equals', addressFromOutput.equals(address));
