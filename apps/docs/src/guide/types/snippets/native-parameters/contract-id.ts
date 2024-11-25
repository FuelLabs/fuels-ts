import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { InputOutputTypesFactory } from '../../../../typegend';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const deploy = await InputOutputTypesFactory.deploy(wallet);
const { contract } = await deploy.waitForResult();

// #region contract-id-input
const contractId =
  '0x7296ff960b5eb86b5f79aa587d7ebe1bae147c7cac046a16d062fbd7f3a753ec';
const contractIdInput = { bits: contractId };
// #endregion contract-id-input

const response = await contract.functions.contract_id(contractIdInput).get();

// #region contract-id-output
const contractIdOutput = response.value;
const contractIdFromOutput: string = contractIdOutput.bits;
// #endregion contract-id-output

console.log('equals', contractIdFromOutput === contractId);
