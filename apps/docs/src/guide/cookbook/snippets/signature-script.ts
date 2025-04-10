// #region combining-utxos
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../env';
import { ScriptSigning } from '../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const signer = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

// #region signature-script
// Instantiate the script
const script = new ScriptSigning(signer);

/**
 * Witness index in which we will add the signature, since there will only be
 * one witness in this transaction request
 */
const witnessIndex = 0;

// Creating the scope invocation to be used later
const request = await script.functions
  .main(signer.address.toB256(), witnessIndex)
  .getTransactionRequest();

// Signing the transaction request before estimation
let signature = await signer.signTransaction(request);

// Adding the signature to the transaction request
request.addWitness(signature);

/**
 * Uses `assembleTx` to estimate and fund the transaction request.
 * Because the transaction only requires enough to cover the fee, there's no
 * need to pass any `accountCoinQuantities` to the `assembleTx` function.
 */
const { assembledRequest } = await provider.assembleTx({
  request,
  feePayerAccount: signer,
});
// Signing the request again as the it was modified during estimation and funding
signature = await signer.signTransaction(assembledRequest);

// Updating the signature in the assembled request
assembledRequest.updateWitness(witnessIndex, signature);

// Sending the transaction request
const submit = await signer.sendTransaction(assembledRequest);

// Getting the result of the transaction
const { isStatusSuccess } = await submit.waitForResult();
// #endregion signature-script

console.log('isStatusSuccess', isStatusSuccess);
