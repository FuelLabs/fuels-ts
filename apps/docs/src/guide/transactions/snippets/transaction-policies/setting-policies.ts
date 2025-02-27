// #region transaction-policies-1
import { bn, ScriptTransactionRequest } from 'fuels';

const transactionRequest = new ScriptTransactionRequest({
  tip: bn(10), // Sets the tip policy
  witnessLimit: bn(1), // Sets the witness limit policy
  maturity: 1, // Sets the maturity policy
  maxFee: bn(1), // Sets the max fee policy
  expiration: 200, // Sets the block after which the transaction cannot be included.
});
// #endregion transaction-policies-1

console.log('transactionRequest', transactionRequest);
