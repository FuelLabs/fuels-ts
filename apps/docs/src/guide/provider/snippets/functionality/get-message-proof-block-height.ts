// #region getMessageProof-blockHeight
import type { TransactionResultMessageOutReceipt } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

using launched = await launchTestNode();

const {
  provider,
  wallets: [sender, recipient],
} = launched;

// Performs a withdrawal transaction from sender to recipient, thus generating a message
const withdrawTx = await sender.withdrawToBaseLayer(
  recipient.address.toB256(),
  100
);
const result = await withdrawTx.waitForResult();

// Produce a confirmation block on this local test node
await provider.produceBlocks(1);
// Retrieves the latest block
const latestBlock = await provider.getBlock('latest');

// Retrieves the `nonce` via message out receipt from the initial transaction result
const { nonce } = result.receipts[0] as TransactionResultMessageOutReceipt;

// Retrieves the message proof for the transaction ID and nonce using the block height
const messageProofFromBlockHeight = await provider.getMessageProof(
  result.id,
  nonce,
  undefined,
  latestBlock?.height
);
// #endregion getMessageProof-blockHeight

console.log('messageProofFromBlockHeight', messageProofFromBlockHeight);
console.log(
  'messageProofFromBlockHeight.amount equals 100',
  messageProofFromBlockHeight?.amount.toNumber() === 100
);
