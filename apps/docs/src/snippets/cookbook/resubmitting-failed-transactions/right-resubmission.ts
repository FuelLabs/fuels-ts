import type { FuelError } from 'fuels';
import { bn, Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../env';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const baseAssetId = provider.getBaseAssetId();
const transferAmount = 1000;

const transactionRequest = await wallet.createTransfer(
  wallet.address,
  transferAmount,
  baseAssetId
);

// Set the gasLimit to 0 to force revert with OutOfGas error
transactionRequest.gasLimit = bn(0);

// Transaction will be successfully submitted
const response = await wallet.sendTransaction(transactionRequest);

// #region resubmitting-failed-transactions-4
try {
  await response.waitForResult();
} catch (error) {
  if (/OutOfGas/.test((<FuelError>error).message)) {
    const transactionRequest2 = await wallet.createTransfer(
      wallet.address,
      transferAmount,
      baseAssetId
    );

    await wallet.sendTransaction(transactionRequest2);
  }
}
// #endregion resubmitting-failed-transactions-4
