// #region getMessageProof-blockId
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

// Retrieves the message proof for the transaction ID and nonce using the next block Id
const messageProofFromBlockId = await provider.getMessageProof(
  result.id,
  nonce,
  latestBlock?.id
);
// #endregion getMessageProof-blockId

console.log('messageProofFromBlockId', messageProofFromBlockId);
console.log(
  'messageProofFromBlockId.amount equals 100',
  messageProofFromBlockId?.amount.toNumber() === 100
);
