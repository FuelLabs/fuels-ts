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

const { waitForPreConfirmation } = await wallet.transfer(
  recipient1.address,
  1000
);

const { resolvedOutputs, isStatusPreConfirmationSuccess } =
  await waitForPreConfirmation();

// Find the change output for the base asset id
if (isStatusPreConfirmationSuccess) {
  const resolvedChangeOutput = resolvedOutputs?.find(
    (resolved) =>
      resolved.output.type === OutputType.Change &&
      resolved.output.assetId === baseAssetId
  );

  if (resolvedChangeOutput) {
    const { output, utxoId } = resolvedChangeOutput;

    const newTransaction = new ScriptTransactionRequest({
      maxFee: 1000,
      gasLimit: 1000,
    });

    newTransaction.addResource({
      id: utxoId,
      assetId: output.assetId,
      amount: output.amount,
      owner: new Address(output.to),
      blockCreated: bn(0),
      txCreatedIdx: bn(0),
    });

    newTransaction.addCoinOutput(recipient2.address, 1000, baseAssetId);

    await wallet.sendTransaction(newTransaction);
  }
}
// #endregion pre-confirmation-send-transaction-1

console.log('isPreConfirmationStatusSuccess', isStatusPreConfirmationSuccess);
