import { generateTestWallet } from '@fuel-ts/account/test-utils';
import type { CoinQuantityLike, ExcludeResourcesOption } from 'fuels';
import { FUEL_NETWORK_URL, Provider, ScriptTransactionRequest } from 'fuels';

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
    // #import { Provider, FUEL_NETWORK_URL, generateTestWallet, ScriptTransactionRequest };

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

    const { balances, pageInfo } = await provider.getBalances(wallet.address);
    // [
    //   { amount: bn(42), assetId: baseAssetId } // total amount of baseAssetId
    //   { amount: bn(100), assetId: assetIdA } // total amount of assetIdA
    // ]
    // #endregion get-balances-1

    // #region get-balances-2
    await wallet.getBalances();
    // #endregion get-balances-2

    expect(balances).toBeDefined();
    expect(pageInfo).toBeDefined();
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
    // #region get-message-by-nonce-1
    // #import { FUEL_NETWORK_URL, Provider };

    const provider = await Provider.create(FUEL_NETWORK_URL);

    const nonce = '0x381de90750098776c71544527fd253412908dec3d07ce9a7367bd1ba975908a0';
    const message = await provider.getMessageByNonce(nonce);

    expect(message).toBeDefined();
    expect(message?.nonce).toEqual(nonce);
    // #endregion get-message-by-nonce-1
  });
});
