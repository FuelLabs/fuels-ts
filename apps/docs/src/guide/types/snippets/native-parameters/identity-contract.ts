import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { InputOutputTypesFactory } from '../../../../typegend';
import type {
  ContractIdOutput,
  IdentityOutput,
} from '../../../../typegend/contracts/InputOutputTypes';

const provider = new Provider(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const deploy = await InputOutputTypesFactory.deploy(wallet);
const { contract } = await deploy.waitForResult();

// #region identity-contract-input
const contractId =
  '0x7296ff960b5eb86b5f79aa587d7ebe1bae147c7cac046a16d062fbd7f3a753ec';
const contractIdInput = { bits: contractId.toString() };
const contractIdentityInput = { ContractId: contractIdInput };
// #endregion identity-contract-input

// #region identity-contract-output
const response = await contract.functions.identity(contractIdentityInput).get();

const identityFromOutput2: IdentityOutput = response.value;
const contractIdOutput = identityFromOutput2.ContractId as ContractIdOutput;
const contractIdFromOutput = contractIdOutput.bits;
// #endregion identity-contract-output

console.log('equals', contractIdFromOutput === contractId);
