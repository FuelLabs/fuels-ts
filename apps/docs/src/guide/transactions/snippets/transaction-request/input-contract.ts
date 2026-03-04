import { Provider, ScriptTransactionRequest, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { CounterFactory, ScriptSum } from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

// #region transaction-request-8
const deploy = await CounterFactory.deploy(wallet);
const { contract } = await deploy.waitForResult();

const transactionRequest = new ScriptTransactionRequest({
  script: ScriptSum.bytecode,
  scriptData: contract.id.toB256(),
});

// Add the contract input and output using the contract ID
transactionRequest.addContractInputAndOutput(contract.id);
// #endregion transaction-request-8
