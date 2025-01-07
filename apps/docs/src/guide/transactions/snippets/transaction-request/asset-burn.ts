import { InputType, Provider, ScriptTransactionRequest, Wallet } from 'fuels';
import { ASSET_A } from 'fuels/test-utils';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';

const provider = new Provider(LOCAL_NETWORK_URL);
const sender = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

// #region asset-burn
const transactionRequest = new ScriptTransactionRequest();

const {
  coins: [coin],
} = await sender.getCoins(ASSET_A);

// Add the coin as an input, without a change output
transactionRequest.inputs.push({
  id: coin.id,
  type: InputType.Coin,
  owner: coin.owner.toB256(),
  amount: coin.amount,
  assetId: coin.assetId,
  txPointer: '0x00000000000000000000000000000000',
  witnessIndex:
    transactionRequest.getCoinInputWitnessIndexByOwner(coin.owner) ??
    transactionRequest.addEmptyWitness(),
});

// Fund the transaction
await transactionRequest.autoCost(sender);

// Send the transaction with asset burn enabled
const tx = await sender.sendTransaction(transactionRequest, {
  enableAssetBurn: true,
});
// #endregion asset-burn

const { isStatusSuccess } = await tx.waitForResult();
console.log('Transaction should have been successful', isStatusSuccess);
