// #region main
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../env';
import { ConfigurablePin } from '../../../typegend';

const { info } = console;

async function onTransferPressed(pin: number, recipientAddress: string) {
  // Initialize the provider and sender
  const provider = await Provider.create(LOCAL_NETWORK_URL);
  const sender = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

  // Instantiate the predicate and fund it
  const predicate = new ConfigurablePin({ provider, data: [pin] });
  const fundTx = await sender.transfer(
    predicate.address,
    500_000,
    provider.getBaseAssetId()
  );
  await fundTx.waitForResult();

  // Calling the transfer function will create the transaction,
  // and then perform multiple network requests to fund, simulate and submit
  const transaction = await predicate.transfer(recipientAddress, 10_000);
  info(`Transaction ID Submitted: ${transaction.id}`);
  const result = await transaction.waitForResult();
  info(`Transaction ID Successful: ${result.id}`);
}
// #endregion main

await onTransferPressed(1337, Wallet.generate().address.toString());
