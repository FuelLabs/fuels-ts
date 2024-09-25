// #region full
import type { TxParams } from 'fuels';
import { bn, Provider, ScriptTransactionRequest, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../env';
import { CounterFactory } from '../typegend';
import { ScriptSum } from '../typegend/scripts';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const deploy = await CounterFactory.deploy(wallet);

const { contract } = await deploy.waitForResult();

// #region transaction-parameters-6
const txParams: TxParams = {
  // #region transaction-parameters-1
  gasLimit: bn(69242),
  // #endregion transaction-parameters-1
  // #region transaction-parameters-2
  maxFee: bn(69242),
  // #endregion transaction-parameters-2
  // #region transaction-parameters-3
  tip: bn(100),
  // #endregion transaction-parameters-3
  // #region transaction-parameters-4
  maturity: 1,
  // #endregion transaction-parameters-4
  // #region transaction-parameters-5
  witnessLimit: bn(5000),
  // #endregion transaction-parameters-5
};
// #endregion transaction-parameters-6

// #region transaction-parameters-7
const transactionRequest = new ScriptTransactionRequest({
  script: ScriptSum.bytecode,
  gasLimit: 100,
});
// #endregion transaction-parameters-7

// #region transaction-parameters-8
const { waitForResult } = await contract.functions
  .increment_count(15) //
  .txParams(txParams)
  .call();

const {
  value,
  transactionResult: { isStatusSuccess },
} = await waitForResult();

console.log('Transaction status', isStatusSuccess);
console.log('Transaction value', value);
console.log('Transaction request', transactionRequest);

// #endregion transaction-parameters-8
// #endregion full
