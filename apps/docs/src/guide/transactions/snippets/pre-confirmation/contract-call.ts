import { Address, bn, OutputType, Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { CounterFactory } from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);

const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const baseAssetId = await provider.getBaseAssetId();
const { waitForResult } = await new CounterFactory(wallet).deploy();
const { contract } = await waitForResult();

// #region pre-confirmation-contract-call-1
// Send a contract call and retrieve the pre-confirmation callback
const { waitForPreConfirmation } = await contract.functions
  .increment_count(1)
  .call();

const {
  transactionResult: { resolvedOutputs, isStatusPreConfirmationSuccess },
} = await waitForPreConfirmation();

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

    // Create a new transaction request for a new contract call
    const request = await contract.functions
      .increment_count(1)
      .txParams({
        maxFee: 100_000,
        gasLimit: 100_000,
      })
      .getTransactionRequest();

    // Add the change output as an input resource for the new transaction
    request.addResource({
      id: utxoId,
      assetId: output.assetId,
      amount: output.amount,
      owner: new Address(output.to),
      blockCreated: bn(0),
      txCreatedIdx: bn(0),
    });

    // Send the new transaction
    await wallet.sendTransaction(request);
  }
}
// #endregion pre-confirmation-contract-call-1

console.log('isPreConfirmationStatusSuccess', isStatusPreConfirmationSuccess);
