// #region main
import type { Account } from 'fuels';
import { Provider, Wallet, ScriptTransactionRequest, Address } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY_2 } from '../../../env';
import { ConfigurablePin } from '../../../typegend';

const { info } = console;

let provider: Provider;
let sender: Account;
let request: ScriptTransactionRequest;
let predicate: ConfigurablePin;

// This is a generic page load function which should be called
// as soon as the user lands on the page
async function onPageLoad() {
  // Initialize the provider and wallet
  provider = await Provider.create(LOCAL_NETWORK_URL);
  sender = Wallet.fromPrivateKey(WALLET_PVT_KEY_2, provider);

  // Instantiate the predicate and fund it
  predicate = new ConfigurablePin({ provider });
  const fundTx = await sender.transfer(
    predicate.address,
    500_000,
    provider.getBaseAssetId()
  );
  await fundTx.waitForResult();

  // Create a new transaction request and add the predicate resources
  request = new ScriptTransactionRequest();
  const resources = await predicate.getResourcesToSpend([
    [100_000, provider.getBaseAssetId()],
  ]);
  request.addResources(resources);

  // Estimate and fund the transaction, including the predicate gas used
  const txCost = await predicate.getTransactionCost(request);
  request.updatePredicateGasUsed(txCost.estimatedPredicates);
  request.gasLimit = txCost.gasUsed;
  request.maxFee = txCost.maxFee;
  await predicate.fund(request, txCost);
}

async function onTransferPressed(pin: number, recipientAddress: string) {
  // When the user presses the transfer button, we add the output
  // to the transaction request
  request.addCoinOutput(
    Address.fromString(recipientAddress),
    10_000,
    provider.getBaseAssetId()
  );
  // Then we must alter any existing predicate data that may have changed
  const predicateWithData = new ConfigurablePin({ provider, data: [pin] });
  const requestWithData =
    predicateWithData.populateTransactionPredicateData(request);
  // And submit the transaction, ensuring that the dependencies are
  // not re-estimated and making redundant calls to the network
  const transaction = await sender.sendTransaction(requestWithData, {
    estimateTxDependencies: false,
  });
  info(`Transaction ID Submitted: ${transaction.id}`);
  const result = await transaction.waitForResult();
  info(`Transaction ID Successful: ${result.id}`);
}
// #endregion main

await onPageLoad();
await onTransferPressed(1337, Wallet.generate().address.toString());
