import type { TransactionResultMessageOutReceipt } from 'fuels';
import { FUEL_NETWORK_URL, Provider, ScriptTransactionRequest, bn } from 'fuels';
import { AssetId, TestMessage, generateTestWallet, launchTestNode } from 'fuels/test-utils';

/**
 * @group node
 */
describe('querying the chain', () => {
  it('query coins', async () => {
    // #region wallet-query
    // #import { Provider, FUEL_NETWORK_URL, generateTestWallet };
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const assetIdA = '0x0101010101010101010101010101010101010101010101010101010101010101';
    const baseAssetId = provider.getBaseAssetId();

    const wallet = await generateTestWallet(provider, [
      [42, baseAssetId],
      [100, assetIdA],
    ]);

    // get single coin
    const coin = await wallet.getCoins(baseAssetId);
    // [{ amount: bn(42), assetId: baseAssetId }]

    // get all coins
    const coins = await wallet.getCoins();
    // [
    //   { amount: bn(42), assetId: baseAssetId }
    //   { amount: bn(100), assetId: assetIdA }
    // ]
    // #endregion wallet-query

    expect(coin.length).toEqual(1);
    expect(coin).toEqual([
      expect.objectContaining({
        assetId: baseAssetId,
        amount: bn(42),
      }),
    ]);
    expect(coins).toEqual([
      expect.objectContaining({
        assetId: baseAssetId,
        amount: bn(42),
      }),
      expect.objectContaining({
        assetId: assetIdA,
        amount: bn(100),
      }),
    ]);
  });

  it('get balances', async () => {
    // #region wallet-get-balances
    // #import { Provider, FUEL_NETWORK_URL, generateTestWallet };

    const provider = await Provider.create(FUEL_NETWORK_URL);
    const assetIdA = '0x0101010101010101010101010101010101010101010101010101010101010101';
    const baseAssetId = provider.getBaseAssetId();

    const wallet = await generateTestWallet(provider, [
      [42, baseAssetId],
      [100, assetIdA],
    ]);

    const walletBalances = await wallet.getBalances();
    // [
    //   { amount: bn(42), assetId: baseAssetId }
    //   { amount: bn(100), assetId: assetIdA }
    // ]
    // #endregion wallet-get-balances

    expect(walletBalances).toEqual([
      { assetId: assetIdA, amount: bn(100) },
      { assetId: baseAssetId, amount: bn(42) },
    ]);
  });
  it('get spendable resources', async () => {
    // #region wallet-get-spendable-resources
    // #import { Provider, FUEL_NETWORK_URL, generateTestWallet, ScriptTransactionRequest };

    const provider = await Provider.create(FUEL_NETWORK_URL);
    const assetIdA = '0x0101010101010101010101010101010101010101010101010101010101010101';
    const baseAssetId = provider.getBaseAssetId();

    const wallet = await generateTestWallet(provider, [
      [42, baseAssetId],
      [100, assetIdA],
    ]);

    const spendableResources = await wallet.getResourcesToSpend([
      { amount: 32, assetId: baseAssetId, max: 42 },
      { amount: 50, assetId: assetIdA },
    ]);

    const tx = new ScriptTransactionRequest();
    tx.addResources(spendableResources);
    // #endregion wallet-get-spendable-resources

    expect(spendableResources[0].amount).toEqual(bn(42));
    expect(spendableResources[1].amount).toEqual(bn(100));
  });

  it('can getBlocks', async () => {
    // #region Provider-get-blocks
    // #import { Provider, FUEL_NETWORK_URL };
    const provider = await Provider.create(FUEL_NETWORK_URL);
    // Force-producing some blocks to make sure that 10 blocks exist
    await provider.produceBlocks(10);
    const blocks = await provider.getBlocks({
      last: 10,
    });
    // #endregion Provider-get-blocks
    expect(blocks.length).toBe(10);
  });

  it('can getMessageByNonce', async () => {
    // #region getMessageByNonce
    // #import { FUEL_NETWORK_URL, Provider };

    const provider = await Provider.create(FUEL_NETWORK_URL);

    const nonce = '0x381de90750098776c71544527fd253412908dec3d07ce9a7367bd1ba975908a0';
    const message = await provider.getMessageByNonce(nonce);

    expect(message).toBeDefined();
    expect(message?.nonce).toEqual(nonce);
    // #endregion getMessageByNonce
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
    const [message] = await wallet.getMessages();
    // #endregion Message-getMessages

    expect(message.nonce).toEqual(testMessage.nonce);
  });

  it('can getResourcesToSpend', async () => {
    // #region Message-getResourcesToSpend
    // #import { launchTestNode, AssetId };

    // Launches a test node with pre-configured assets
    using launched = await launchTestNode({
      walletsConfig: {
        assets: [AssetId.A, AssetId.B],
        coinsPerAsset: 2,
        amountPerCoin: 100,
      },
    });

    // Defines asset IDs
    const assetIdA = '0x0101010101010101010101010101010101010101010101010101010101010101';
    const assetIdB = '0x0202020202020202020202020202020202020202020202020202020202020202';

    const {
      wallets: [wallet],
    } = launched;

    // Retrieves spendable resources for the specified asset amounts
    const spendableResources = await wallet.getResourcesToSpend([
      { amount: 40, assetId: assetIdA },
      { amount: 50, assetId: assetIdB },
    ]);
    // #endregion Message-getResourcesToSpend

    expect(spendableResources[0].amount).toEqual(bn(100));
    expect(spendableResources[1].amount).toEqual(bn(100));
  });

  it('can getMessageProof with blockId', async () => {
    // #region Message-getMessageProof-blockId
    // #import { launchTestNode, TransactionResultMessageOutReceipt };

    // Launches a test node with two wallets established
    using launched = await launchTestNode({
      walletsConfig: {
        count: 2,
      },
    });

    const {
      wallets: [sender, recipient],
      provider,
    } = launched;

    // Defines the recipient address
    const recipientAddress = recipient.address.toB256();

    // Performs a withdrawal transaction from sender to recipient
    const tx = await sender.withdrawToBaseLayer(recipientAddress, 100);
    const result = await tx.waitForResult();

    // Wait for the next block to be minter on out case we are using a local provider
    // so we can create a new tx to generate next block
    const resp = await sender.withdrawToBaseLayer(recipientAddress, 100);
    const { blockId } = await resp.waitForResult();

    // Retrieves the message out receipt from the transaction result
    const { nonce } = result.receipts[0] as TransactionResultMessageOutReceipt;

    // Retrieves the message proof for the transaction ID and nonce using blockId
    const messageProof = await provider.getMessageProof(
      result.gqlTransaction.id,
      nonce,
      blockId
    );
    // #endregion Message-getMessageProof-blockId

    expect(messageProof?.amount.toNumber()).toEqual(100);
    expect(messageProof?.sender.toHexString()).toEqual(result.id);
  });

  it('can getMessageProof with blockHeight', async () => {
    // #region Message-getMessageProof-blockHeight
    // #import { launchTestNode, TransactionResultMessageOutReceipt };

    // Launches a test node with two wallets established
    using launched = await launchTestNode({
      walletsConfig: {
        count: 2,
      },
    });

    const {
      wallets: [sender, recipient],
      provider,
    } = launched;

    // Defines the recipient address
    const recipientAddress = recipient.address.toB256();

    // Performs a withdrawal transaction from sender to recipient
    const tx = await sender.withdrawToBaseLayer(recipientAddress, 100);
    const result = await tx.waitForResult();

    // Wait for the next block to be minter on out case we are using a local provider
    await sender.withdrawToBaseLayer(recipientAddress, 100);

    // Retrieves the message out receipt from the transaction result
    const { nonce } = result.receipts[0] as TransactionResultMessageOutReceipt;

    // Retrives the latest block
    const latestBlock = await provider.getBlock('latest');

    // Retrieves the message proof for the transaction ID and nonce using blockHeight
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
