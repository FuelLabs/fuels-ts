import { generateTestWallet } from '@fuel-ts/account/test-utils';
import { FUEL_NETWORK_URL, Provider, ScriptTransactionRequest, bn } from 'fuels';

/**
 * @group node
 */
describe('querying the chain', () => {
  it('query coins', async () => {
    // #region wallet-query
    // #import { Provider, FUEL_NETWORK_URL, generateTestWallet };
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const assetIdA = '0x0101010101010101010101010101010101010101010101010101010101010101';
    const baseAssetId = await provider.getBaseAssetId();

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
    const baseAssetId = await provider.getBaseAssetId();

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
      { assetId: baseAssetId, amount: bn(42) },
      { assetId: assetIdA, amount: bn(100) },
    ]);
  });
  it('get spendable resources', async () => {
    // #region wallet-get-spendable-resources
    // #import { Provider, FUEL_NETWORK_URL, generateTestWallet, ScriptTransactionRequest };

    const provider = await Provider.create(FUEL_NETWORK_URL);
    const assetIdA = '0x0101010101010101010101010101010101010101010101010101010101010101';
    const baseAssetId = await provider.getBaseAssetId();

    const wallet = await generateTestWallet(provider, [
      [42, baseAssetId],
      [100, assetIdA],
    ]);

    const spendableResources = await wallet.getResourcesToSpend([
      { amount: 32, assetId: baseAssetId, max: 42 },
      { amount: 50, assetId: assetIdA },
    ]);

    const tx = new ScriptTransactionRequest({ baseAssetId });
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
});
