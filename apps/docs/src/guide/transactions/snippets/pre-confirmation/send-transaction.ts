import {
  Address,
  bn,
  OutputType,
  Provider,
  ScriptTransactionRequest,
  Wallet,
} from 'fuels';

import {
  LOCAL_NETWORK_URL,
  WALLET_PVT_KEY,
  WALLET_PVT_KEY_2,
  WALLET_PVT_KEY_3,
} from '../../../../env';

// #region pre-confirmation-send-transaction-1
const provider = new Provider(LOCAL_NETWORK_URL);

const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const recipient1 = Wallet.fromPrivateKey(WALLET_PVT_KEY_2, provider);
const recipient2 = Wallet.fromPrivateKey(WALLET_PVT_KEY_3, provider);
const baseAssetId = await provider.getBaseAssetId();

// Send a transfer and retrieve the pre-confirmation callback
const { waitForPreConfirmation } = await wallet.transfer(
  recipient1.address,
  1000
);

// Wait for the transaction to reach a pre-confirmation status
const { resolvedOutputs, isStatusPreConfirmationSuccess } =
  await waitForPreConfirmation();

// Check if the pre-confirmation status indicates success
if (isStatusPreConfirmationSuccess) {
  // Find the change output associated with the base asset ID
  const resolvedChangeOutput = resolvedOutputs?.find(
    (resolved) =>
      resolved.output.type === OutputType.Change &&
      resolved.output.assetId === baseAssetId
  );

  // If we find the change output, we can use it to create a new transaction
  if (resolvedChangeOutput) {
    const { output, utxoId } = resolvedChangeOutput;

    // Create a new transaction request
    const newTransaction = new ScriptTransactionRequest({
      maxFee: 1000,
      gasLimit: 1000,
    });

    // Add the change output as an input resource for the new transaction
    newTransaction.addResource({
      id: utxoId,
      assetId: output.assetId,
      amount: output.amount,
      owner: new Address(output.to),
      blockCreated: bn(0),
      txCreatedIdx: bn(0),
    });

    // Define the transfer recipient of the new transaction
    newTransaction.addCoinOutput(recipient2.address, 1000, baseAssetId);

    // Send the new transaction
    await wallet.sendTransaction(newTransaction);
  }
}
// #endregion pre-confirmation-send-transaction-1

console.log('isPreConfirmationStatusSuccess', isStatusPreConfirmationSuccess);
