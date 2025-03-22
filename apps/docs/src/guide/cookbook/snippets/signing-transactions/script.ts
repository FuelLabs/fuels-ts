// #region multiple-signers-2
import { Provider, Wallet } from 'fuels';

import {
  LOCAL_NETWORK_URL,
  WALLET_PVT_KEY,
  WALLET_PVT_KEY_2,
  WALLET_PVT_KEY_3,
} from '../../../../env';
import { ScriptSigning } from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const sender = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const signer = Wallet.fromPrivateKey(WALLET_PVT_KEY_2, provider);
const receiver = Wallet.fromPrivateKey(WALLET_PVT_KEY_3, provider);
const baseAssetId = await provider.getBaseAssetId();

// #region signature-script
// Instantiate the script
const script = new ScriptSigning(sender);

const amountToReceiver = 100;

/**
 * Witness index in which we will add the signature, since there will only be
 * one witness in this transaction request
 */
const witnessIndex = 0;

// Getting the transaction request to be signed
const request = await script.functions
  .main(signer.address.toB256(), witnessIndex)
  .addTransfer({
    destination: receiver.address,
    amount: amountToReceiver,
    assetId: baseAssetId,
  })
  .getTransactionRequest();

// Signing the transaction request before estimation
let signature = await signer.signTransaction(request);

// Adding the signature to the transaction request
request.addWitness(signature);

// Assembling the transaction request, estimating and funding it
const { assembledRequest } = await provider.assembleTx({
  request,
  feePayerAccount: sender,
  accountCoinQuantities: [
    {
      amount: amountToReceiver,
      assetId: baseAssetId,
      account: sender,
      changeOutputAccount: sender,
    },
  ],
});

// Signing the request again as the it was modified during estimation and funding
signature = await signer.signTransaction(assembledRequest);

// Updating the signature in the assembled request
assembledRequest.updateWitness(witnessIndex, signature);

// Sending the transaction request
const submit = await sender.sendTransaction(assembledRequest);

// Getting the result of the transaction
const { isStatusSuccess } = await submit.waitForResult();
// #endregion multiple-signers-2

console.log('isStatusSuccess', isStatusSuccess);
