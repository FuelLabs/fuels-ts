// #region main
import type { Account } from 'fuels';
import { ScriptTransactionRequest, Address, Provider, Wallet, bn } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../env';

const { info } = console;

let provider: Provider;
let sender: Account;
let request: ScriptTransactionRequest;

// This is a generic page load function which should be called
// as soon as the user lands on the page
async function onPageLoad() {
  // Initialize the provider and sender
  provider = await Provider.create(LOCAL_NETWORK_URL);
  sender = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
  // Create and prepare the transaction request
  request = new ScriptTransactionRequest();
  // Estimate and fund the transaction with enough resources to cover
  // both the transfer and the gas
  const txCost = await sender.getTransactionCost(request, {
    quantities: [
      {
        assetId: provider.getBaseAssetId(),
        amount: bn(1_000_000),
      },
    ],
  });
  await sender.fund(request, txCost);
}

async function onTransferPressed(recipientAddress: string) {
  // When the user presses the transfer button, we add the output
  // to the transaction request
  request.addCoinOutput(
    Address.fromString(recipientAddress),
    1_000_000,
    provider.getBaseAssetId()
  );
  // And submit the transaction, ensuring that the dependencies are
  // not re-estimated and making redundant calls to the network
  const transaction = await sender.sendTransaction(request, {
    estimateTxDependencies: false,
  });
  info(`Transaction ID Submitted: ${transaction.id}`);
  const result = await transaction.waitForResult();
  info(`Transaction ID Successful: ${result.id}`);
}
// #endregion main

await onPageLoad();
await onTransferPressed(Wallet.generate().address.toString());
