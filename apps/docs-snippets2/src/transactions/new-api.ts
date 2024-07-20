/*
import type { TxParams } from 'fuels';
import {
  LOCAL_NETWORK_URL,
  fuels,
  bn,
} from 'fuels';

import { WALLET_PVT_KEY } from '../env';
import { SumScript, CounterContract, counterBytecode } from '../typegend';

const client = await fuels(LOCAL_NETWORK_URL);
const wallet = client.wallet(WALLET_PVT_KEY, client);
const deploy = await CounterContract.deploy(wallet);

const txParams: TxParams = {
  gasLimit: bn(69242), // BigNumberish or undefined
  maxFee: bn(69242), // BigNumberish or undefined
  tip: bn(100), // BigNumberish or undefined
  maturity: 1, // BigNumberish or undefined
  witnessLimit: bn(5000), // BigNumberish or undefined
};

const { contract } = await deploy.waitForResult();

const transactionRequest = new fuels.ScriptTransactionRequest({
  script: ScriptSum.bin,
  gasLimit: 100,
});

const { waitForResult } = await contract.functions
  .increment_count(15) // contract method
  .txParams(txParams)
  .call();

const {
  value,
  transactionResult: { isStatusSuccess },
} = await waitForResult();

console.log({ value, isStatusSuccess, transactionRequest });
*/
