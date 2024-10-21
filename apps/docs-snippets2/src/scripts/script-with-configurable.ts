/* eslint-disable @typescript-eslint/no-unused-vars */
// #region full
import { Script, BN, Wallet, Provider } from 'fuels';

import { WALLET_PVT_KEY, LOCAL_NETWORK_URL } from '../env';
import { ScriptSum } from '../typegend/scripts/ScriptSum';

// #region script-with-configurable-contants-2
const provider = await Provider.create(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const script = new Script(ScriptSum.bytecode, ScriptSum.abi, wallet);

const configurableConstants = {
  AMOUNT: 81,
};

script.setConfigurableConstants(configurableConstants);

const inputtedValue = 10;

const { waitForResult } = await script.functions.main(inputtedValue).call();
const { value } = await waitForResult();

const expectedTotal = inputtedValue + configurableConstants.AMOUNT;

// #endregion script-with-configurable-contants-2

const argument = 10;
const expected = 20;

// #region preparing-scripts
const myMainScript = new Script(ScriptSum.bytecode, ScriptSum.abi, wallet);

const tx = myMainScript.functions.main(argument);

// Set the call parameters
tx.callParams({ gasLimit: 7500 });

// Get the entire transaction request prior to
const txRequest = await tx.getTransactionRequest();

// Get the transaction ID
const txId = await tx.getTransactionId();

// Retrieve the value of the call and the actual gas used
const { waitForResult: waitForActualGasUsed } = await tx.call();
const { value: valueOfActualGasUsed, gasUsed: gasUsedOfActualGasUsed } =
  await waitForActualGasUsed();
// #endregion preparing-scripts

// #endregion full
