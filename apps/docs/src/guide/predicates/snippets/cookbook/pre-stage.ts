import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { SimplePredicate } from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const baseAssetId = await provider.getBaseAssetId();

const sender = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const receiver = Wallet.generate({ provider });

const inputAddress =
  '0xfc05c23a8f7f66222377170ddcbfea9c543dff0dd2d2ba4d0478a4521423a9d4';

const predicate = new SimplePredicate({
  provider,
  data: [inputAddress],
});

const amountToPredicate = 10_000_000;
const tx = await sender.transfer(
  predicate.address,
  amountToPredicate,
  baseAssetId,
  {
    gasLimit: 1_000,
  }
);
const { isStatusSuccess } = await tx.waitForResult();
console.log('Transfer to predicate should be successful', isStatusSuccess);

const amountToReceiver = 200;

// #region send-and-spend-funds-from-predicates-8
// Create the transaction for transferring funds from the predicate.
const transactionRequest = await predicate.createTransfer(
  receiver.address,
  amountToReceiver,
  baseAssetId,
  {
    gasLimit: 1000,
  }
);

// We can obtain the transaction ID before submitting the transaction.
const chainId = await provider.getChainId();
const transactionId = transactionRequest.getTransactionId(chainId);

// We can submit the transaction and wait for the result.
const submitTransaction = await predicate.sendTransaction(transactionRequest);
await submitTransaction.waitForResult();
// #endregion send-and-spend-funds-from-predicates-8

const { isStatusSuccess: isTransferFromPredicateSucessful } =
  await submitTransaction.waitForResult();
console.log(
  'Transfer from predicate should be successful',
  isTransferFromPredicateSucessful
);
console.log(
  'Transaction ID should be equal',
  transactionId === submitTransaction.id
);
