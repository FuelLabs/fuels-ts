import { OutputType, Provider, ScriptTransactionRequest, Wallet } from 'fuels';
import { ASSET_A } from 'fuels/test-utils';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';

const provider = new Provider(LOCAL_NETWORK_URL);
const sender = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

// #region asset-burn
const baseAssetId = await provider.getBaseAssetId();
const request = new ScriptTransactionRequest();

const {
  coins: [coin],
} = await sender.getCoins(ASSET_A);

// Add the coin as an input, without a change output
request.addResource(coin);

/**
 * Remove the OutputChange for the specific assetId as it is always added by default
 * when using 'addResource'
 */
request.outputs = request.outputs.filter(
  (output) =>
    output.type !== OutputType.Change || String(output.assetId) !== ASSET_A
);

// Fund the transaction
const { assembledRequest } = await provider.assembleTx({
  request,
  feePayerAccount: sender,
  accountCoinQuantities: [
    {
      amount: '0',
      assetId: baseAssetId,
      account: sender,
      changeOutputAccount: sender,
    },
  ],
});

// Send the transaction with asset burn enabled
const tx = await sender.sendTransaction(assembledRequest, {
  enableAssetBurn: true,
});
// #endregion asset-burn

const { isStatusSuccess } = await tx.waitForResult();
console.log('Transaction should have been successful', isStatusSuccess);
