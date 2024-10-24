// #region getMessageProof-blockId
import type { TransactionResultMessageOutReceipt } from 'fuels';
import { Provider, sleep, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY, WALLET_PVT_KEY_2 } from '../env';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const sender = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const recipient = Wallet.fromPrivateKey(WALLET_PVT_KEY_2, provider);

// Performs a withdrawal transaction from sender to recipient, thus generating a message
const withdrawTx = await sender.withdrawToBaseLayer(
  recipient.address.toB256(),
  100
);
const result = await withdrawTx.waitForResult();

// Waiting for a new block to be committed (1 confirmation block)
// Retrieves the latest block
await sleep(1000);
const latestBlock = await provider.getBlock('latest');

// Retrieves the `nonce` via message out receipt from the initial transaction result
const { nonce } = result.receipts[0] as TransactionResultMessageOutReceipt;

// Retrieves the message proof for the transaction ID and nonce using the next block Id
const messageProofFromBlockId = await provider.getMessageProof(
  result.id,
  nonce,
  latestBlock?.id
);
// #endregion getMessageProof-blockId

// #region getMessageProof-blockHeight
// Retrieves the message proof for the transaction ID and nonce using the block height
const messageProofFromBlockHeight = await provider.getMessageProof(
  result.id,
  nonce,
  undefined,
  latestBlock?.height
);
// #endregion getMessageProof-blockHeight

console.log('messageProofFromBlockId', messageProofFromBlockId);
console.log(
  'messageProofFromBlockId.amount equals 100',
  messageProofFromBlockId?.amount.toNumber() === 100
);

console.log('messageProofFromBlockHeight', messageProofFromBlockHeight);
console.log(
  'messageProofFromBlockHeight.amount equals 100',
  messageProofFromBlockHeight?.amount.toNumber() === 100
);
