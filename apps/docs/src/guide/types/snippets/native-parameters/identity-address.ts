import { Address, Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { InputOutputTypesFactory } from '../../../../typegend';
import type {
  IdentityOutput,
  AddressOutput,
} from '../../../../typegend/contracts/InputOutputTypes';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const deploy = await InputOutputTypesFactory.deploy(wallet);
const { contract } = await deploy.waitForResult();

// #region identity-address-input
const address = Address.fromRandom();
const addressInput = { bits: address.toB256() };
const addressIdentityInput = { Address: addressInput };
// #endregion identity-address-input

// #region identity-address-output
const response = await contract.functions.identity(addressIdentityInput).get();

const identityFromOutput: IdentityOutput = response.value;
const addressStringFromOutput: AddressOutput =
  identityFromOutput.Address as AddressOutput;
const addressFromOutput = Address.fromB256(addressStringFromOutput.bits);
// #endregion identity-address-output

console.log('equals', addressFromOutput.equals(address));
