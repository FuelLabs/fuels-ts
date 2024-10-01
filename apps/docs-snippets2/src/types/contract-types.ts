// #region full
import { Address, Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../env';
import { InputOutputTypesFactory } from '../typegend';
import type {
  AddressOutput,
  ContractIdOutput,
  IdentityOutput,
} from '../typegend/contracts/InputOutputTypes';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const deploy = await InputOutputTypesFactory.deploy(wallet);
const { contract } = await deploy.waitForResult();

// #region address-input
let address = Address.fromRandom();
let addressInput = { bits: address.toB256() };
// #endregion address-input

const response1 = await contract.functions.address(addressInput).get();

// #region address-output
const addressOutput = response1.value;
let addressFromOutput: Address = Address.fromB256(addressOutput.bits);
// #endregion address-output

expect(addressFromOutput).toEqual(address);

// #region contract-id-input
let contractId = '0x7296ff960b5eb86b5f79aa587d7ebe1bae147c7cac046a16d062fbd7f3a753ec';
let contractIdInput = { bits: contractId };
// #endregion contract-id-input

const response2 = await contract.functions.contract_id(contractIdInput).get();

// #region contract-id-output
let contractIdOutput = response2.value;
let contractIdFromOutput: string = contractIdOutput.bits;
// #endregion contract-id-output

expect(contractIdFromOutput).toEqual(contractId);

// #region identity-address-input
address = Address.fromRandom();
addressInput = { bits: address.toB256() };
const addressIdentityInput = { Address: addressInput };
// #endregion identity-address-input

// #region identity-address-output
const response3 = await contract.functions.identity(addressIdentityInput).get();

const identityFromOutput1: IdentityOutput = response3.value;

const addressStringFromOutput: AddressOutput = identityFromOutput1.Address as AddressOutput;

addressFromOutput = Address.fromB256(addressStringFromOutput.bits);
// #endregion identity-address-output

// #region identity-contract-input
contractId = '0x7296ff960b5eb86b5f79aa587d7ebe1bae147c7cac046a16d062fbd7f3a753ec';
contractIdInput = { bits: contractId.toString() };
const contractIdentityInput = { ContractId: contractIdInput };
// #endregion identity-contract-input

// #region identity-contract-output
const response4 = await contract.functions.identity(contractIdentityInput).get();

const identityFromOutput2: IdentityOutput = response4.value;

contractIdOutput = identityFromOutput2.ContractId as ContractIdOutput;

contractIdFromOutput = contractIdOutput.bits;
// #endregion identity-contract-output

expect(addressFromOutput).toEqual(address);
expect(contractIdFromOutput).toEqual(contractId);

// #region asset-id-input
const assetId = '0x0cfabde7bbe58d253cf3103d8f55d26987b3dc4691205b9299ac6826c613a2e2';
const assetIdInput = { bits: assetId };
// #endregion asset-id-input

const response5 = await contract.functions.asset_id(assetIdInput).get();

// #region asset-id-output
const assetIdOutput = response5.value;
const assetIdFromOutput: string = assetIdOutput.bits;
// #endregion asset-id-output

expect(assetIdFromOutput).toEqual(assetId);
// #endregion full
