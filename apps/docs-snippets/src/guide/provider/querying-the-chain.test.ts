import type { TransactionResultMessageOutReceipt } from 'fuels';
import { Provider } from 'fuels';
import { TestMessage, launchTestNode } from 'fuels/test-utils';

/**
 * @group node
 * @group browser
 */
describe('querying the chain', () => {
  it('can getMessageByNonce', async () => {
    using launched = await launchTestNode();
    const { provider: testProvider } = launched;

    const FUEL_NETWORK_URL = testProvider.url;

    // #region get-message-by-nonce-1
    // #import { Provider };

    const provider = await Provider.create(FUEL_NETWORK_URL);

    const nonce = '0x381de90750098776c71544527fd253412908dec3d07ce9a7367bd1ba975908a0';
    const message = await provider.getMessageByNonce(nonce);
    // #endregion get-message-by-nonce-1

    expect(message).toBeDefined();
    expect(message?.nonce).toEqual(nonce);
  });

  it('can getMessage', async () => {
    // #region Message-getMessages
    // #import { TestMessage, launchTestNode };

    // Creates a test message with an amount of 100
    const testMessage = new TestMessage({ amount: 100 });

    // Launches a test node with the test message configured
    using launched = await launchTestNode({ walletsConfig: { messages: [testMessage] } });
    const {
      wallets: [wallet],
    } = launched;

    // Retrieves messages from the wallet
    const { messages } = await wallet.getMessages();
    // #endregion Message-getMessages

    expect(messages[0].nonce).toEqual(testMessage.nonce);
  });

  it('can getMessageProof with blockId', async () => {
    // #region Message-getMessageProof-blockId
    // #import { launchTestNode, TransactionResultMessageOutReceipt };

    // Launches a test node
    using launched = await launchTestNode({
      nodeOptions: {
        args: ['--poa-instant', 'false', '--poa-interval-period', '1s'],
      },
    });

    const {
      wallets: [sender, recipient],
      provider,
    } = launched;

    // Performs a withdrawal transaction from sender to recipient, thus generating a message
    const withdrawTx = await sender.withdrawToBaseLayer(recipient.address.toB256(), 100);
    const result = await withdrawTx.waitForResult();

    // Waiting for a new block to be commited (1 confirmation block)
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });

    // Retrives the latest block
    const latestBlock = await provider.getBlock('latest');

    // Retrieves the `nonce` via message out receipt from the initial transaction result
    const { nonce } = result.receipts[0] as TransactionResultMessageOutReceipt;

    // Retrieves the message proof for the transaction ID and nonce using the next block Id
    const messageProof = await provider.getMessageProof(result.id, nonce, latestBlock?.id);
    // #endregion Message-getMessageProof-blockId

    expect(messageProof?.amount.toNumber()).toEqual(100);
    expect(messageProof?.sender.toHexString()).toEqual(result.id);
  });

  it('can getMessageProof with blockHeight', async () => {
    // #region Message-getMessageProof-blockHeight
    // #import { launchTestNode, TransactionResultMessageOutReceipt };

    // Launches a test node
    using launched = await launchTestNode({
      nodeOptions: {
        args: ['--poa-instant', 'false', '--poa-interval-period', '1s'],
      },
    });

    const {
      wallets: [sender, recipient],
      provider,
    } = launched;

    // Performs a withdrawal transaction from sender to recipient, thus generating a message
    const withdrawTx = await sender.withdrawToBaseLayer(recipient.address.toB256(), 100);
    const result = await withdrawTx.waitForResult();

    // Waiting for a new block to be commited (1 confirmation block)
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });

    // Retrieves the `nonce` via message out receipt from the initial transaction result
    const { nonce } = result.receipts[0] as TransactionResultMessageOutReceipt;

    // Retrives the latest block
    const latestBlock = await provider.getBlock('latest');

    // Retrieves the message proof for the transaction ID and nonce using the block height
    const messageProof = await provider.getMessageProof(
      result.id,
      nonce,
      undefined,
      latestBlock?.height
    );
    // #endregion Message-getMessageProof-blockHeight

    expect(messageProof?.amount.toNumber()).toEqual(100);
    expect(messageProof?.sender.toHexString()).toEqual(result.id);
  });

  it('get transactions', async () => {
    using launched = await launchTestNode();
    const {
      provider: testProvider,
      wallets: [wallet, receiver],
    } = launched;

    const tx = await wallet.transfer(receiver.address, 100);
    await tx.waitForResult();
    const FUEL_NETWORK_URL = testProvider.url;

    // #region get-transactions
    // #import { Provider };

    const provider = await Provider.create(FUEL_NETWORK_URL);

    const { transactions } = await provider.getTransactions();
    // #endregion get-transactions

    expect(transactions).toBeDefined();
    expect(transactions.length).toBe(2);
    // Includes base asset minting tx
  });
});
