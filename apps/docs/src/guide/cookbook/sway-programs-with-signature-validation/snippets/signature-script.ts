// #region combining-utxos
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { ScriptSigning } from '../../../../typegend/scripts';

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
const scope = script.functions.main(signer.address.toB256(), witnessIndex);

// Getting the transaction request to be signed
const request = await scope.getTransactionRequest();

// Signing the transaction request before estimation
let signature = await signer.signTransaction(request);

// Adding the signature to the transaction request
request.addWitness(signature);

// Assembling the transaction request, estimating and funding it
const assembledRequest = await scope.assembleTx();

// Signing the request again as the it was modified during estimation and funding
signature = await signer.signTransaction(assembledRequest);

// Updating the signature in the assembled request
assembledRequest.updateWitness(witnessIndex, signature);

/**
 * Sending the transaction request and skipping estimation and funding since
 * we already estimated and funded with assembleTx
 */
const call = await scope
  .fromTransactionRequest(assembledRequest)
  .call({ skipEstimationAndFunding: true });

// Getting the result of the transaction
const { value } = await call.waitForResult();
// #endregion signature-script

console.log(value, true);
