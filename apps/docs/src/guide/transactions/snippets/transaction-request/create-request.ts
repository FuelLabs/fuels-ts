// #region transaction-request-1
import {
  CreateTransactionRequest,
  ScriptTransactionRequest,
  ZeroBytes32,
} from 'fuels';

import { ScriptSum } from '../../../../typegend';

// Instantiate the transaction request using a ScriptTransactionRequest
const scriptTransactionRequest = new ScriptTransactionRequest({
  script: ScriptSum.bytecode,
});

const scriptData = [1];

// Set the script main function arguments (can also be passed in the class constructor)
scriptTransactionRequest.setData(ScriptSum.abi, scriptData);
// #endregion transaction-request-1

const contractByteCode = ZeroBytes32;

// #region transaction-request-2
// Instantiate the transaction request using a CreateTransactionRequest
const createTransactionRequest = new CreateTransactionRequest({
  witnesses: [contractByteCode],
});
// #endregion transaction-request-2

console.log('createTransactionRequest', createTransactionRequest);
