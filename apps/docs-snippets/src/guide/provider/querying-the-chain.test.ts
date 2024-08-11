import type {
  TransactionResultMessageOutReceipt,
  CoinQuantityLike,
  ExcludeResourcesOption,
} from 'fuels';
import { FUEL_NETWORK_URL, Provider, ScriptTransactionRequest } from 'fuels';
import { TestMessage, generateTestWallet, launchTestNode } from 'fuels/test-utils';

/**
 * @group node
 */
describe('querying the chain', () => {
  it('query coins', async () => {
    // #region get-coins-1
    // #import { Provider, FUEL_NETWORK_URL, generateTestWallet };

    const provider = await Provider.create(FUEL_NETWORK_URL);
    const assetIdA = '0x0101010101010101010101010101010101010101010101010101010101010101';
    const baseAssetId = provider.getBaseAssetId();

    const wallet = await generateTestWallet(provider, [
      [42, baseAssetId],
      [100, assetIdA],
    ]);

    // fetches up to 100 coins from baseAssetId
    const { coins, pageInfo } = await provider.getCoins(wallet.address, baseAssetId);
    // [
    //   { amount: bn(42), assetId: baseAssetId },
    //   ...
    // ]

    // fetches up to 100 coins from all assets
    await provider.getCoins(wallet.address);
    // [
    //   { amount: bn(42), assetId: baseAssetId }
    //   { amount: bn(100), assetId: assetIdA }
    //   ...
    // ]
    // #endregion get-coins-1

    // #region get-coins-2
    await wallet.getCoins(baseAssetId);
    // #endregion get-coins-2

    expect(coins).toBeDefined();
    expect(pageInfo).toBeDefined();
  });

  it('get spendable resources', async () => {
    // #region get-spendable-resources-1
    // #import { Provider, FUEL_NETWORK_URL, generateTestWallet, ScriptTransactionRequest, CoinQuantityLike, ExcludeResourcesOption };

    const provider = await Provider.create(FUEL_NETWORK_URL);
    const assetIdA = '0x0101010101010101010101010101010101010101010101010101010101010101';
    const baseAssetId = provider.getBaseAssetId();

    const wallet = await generateTestWallet(provider, [
      [42, baseAssetId],
      [100, assetIdA],
    ]);

    const quantities: CoinQuantityLike[] = [
      { amount: 32, assetId: baseAssetId, max: 42 },
      { amount: 50, assetId: assetIdA },
    ];

    const utxoId = '0x00000000000000000000000000000000000000000000000000000000000000010001';
    const messageNonce = '0x381de90750098776c71544527fd253412908dec3d07ce9a7367bd1ba975908a0';
    const excludedIds: ExcludeResourcesOption = {
      utxos: [utxoId],
      messages: [messageNonce],
    };

    const spendableResources = await provider.getResourcesToSpend(
      wallet.address,
      quantities,
      excludedIds
    );

    const tx = new ScriptTransactionRequest();
    tx.addResources(spendableResources);
    // #endregion get-spendable-resources-1

    // #region get-spendable-resources-2
    await wallet.getResourcesToSpend(spendableResources, excludedIds);
    // #endregion get-spendable-resources-2

    expect(spendableResources).toBeDefined();
  });

  it('get balances', async () => {
    // #region get-balances-1
    // #import { Provider, FUEL_NETWORK_URL, generateTestWallet };

    const provider = await Provider.create(FUEL_NETWORK_URL);
    const assetIdA = '0x0101010101010101010101010101010101010101010101010101010101010101';
    const baseAssetId = provider.getBaseAssetId();

    const wallet = await generateTestWallet(provider, [
      [42, baseAssetId],
      [100, assetIdA],
    ]);

    const { balances } = await provider.getBalances(wallet.address);
    // [
    //   { amount: bn(42), assetId: baseAssetId } // total amount of baseAssetId
    //   { amount: bn(100), assetId: assetIdA } // total amount of assetIdA
    // ]
    // #endregion get-balances-1

    // #region get-balances-2
    await wallet.getBalances();
    // #endregion get-balances-2

    expect(balances).toBeDefined();
  });

  it('can getBlocks', async () => {
    // #region Provider-get-blocks
    // #import { Provider, FUEL_NETWORK_URL };

    const provider = await Provider.create(FUEL_NETWORK_URL);
    const blockToProduce = 3;

    // Force-producing some blocks to make sure that 10 blocks exist
    await provider.produceBlocks(blockToProduce);

    const { blocks } = await provider.getBlocks({
      last: blockToProduce,
    });
    // #endregion Provider-get-blocks
    expect(blocks.length).toBe(blockToProduce);
  });

  it('can getMessageByNonce', async () => {
    // #region get-message-by-nonce-1
    // #import { FUEL_NETWORK_URL, Provider };

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
    const messageProof = await provider.getMessageProof(
      result.gqlTransaction.id,
      nonce,
      latestBlock?.id
    );
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
      result.gqlTransaction.id,
      nonce,
      undefined,
      latestBlock?.height
    );
    // #endregion Message-getMessageProof-blockHeight

    expect(messageProof?.amount.toNumber()).toEqual(100);
    expect(messageProof?.sender.toHexString()).toEqual(result.id);
  });
});
