// #region main
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../env';

const { info } = console;

async function onTransferPressed(recipientAddress: string) {
  // Initialize the provider and sender
  const provider = await Provider.create(LOCAL_NETWORK_URL);
  const sender = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
  // Calling the transfer function will create the transaction,
  // and then perform multiple network requests to fund, simulate and submit
  const transaction = await sender.transfer(recipientAddress, 1_000_000);
  info(`Transaction ID Submitted: ${transaction.id}`);
  const result = await transaction.waitForResult();
  info(`Transaction ID Successful: ${result.id}`);
}
// #endregion main

await onTransferPressed(Wallet.generate().address.toString());
