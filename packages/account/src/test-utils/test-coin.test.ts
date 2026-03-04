import { Address } from '@fuel-ts/address';
import { randomBytes } from '@fuel-ts/crypto';
import { hexlify } from '@fuel-ts/utils';

import { TestCoin } from './test-coin';

/**
 * @group node
 */
describe('test-coin', () => {
  test('has default values', () => {
    const coin = new TestCoin().toChainCoin();

    expect(coin.amount).toBeDefined();
    expect(coin.asset_id).toBeDefined();
    expect(coin.owner).toBeDefined();
    expect(coin.tx_id).toBeDefined();
    expect(coin.tx_pointer_block_height).toBeDefined();
    expect(coin.tx_pointer_tx_idx).toBeDefined();
    expect(coin.output_index).toBeDefined();
  });

  test('accepts custom values', () => {
    const owner = Address.fromRandom();
    const amount = 500;
    const assetId = hexlify(randomBytes(32));
    const txId = hexlify(randomBytes(32));

    const testCoin = new TestCoin({
      owner,
      amount,
      asset_id: assetId,
      tx_id: txId,
      tx_pointer_block_height: 1,
      tx_pointer_tx_idx: 2,
      output_index: 3,
    });

    const coin = testCoin.toChainCoin();
    expect(coin.amount).toEqual('500');
    expect(coin.asset_id).toEqual(assetId);
    expect(coin.owner).toEqual(owner.toHexString());
    expect(coin.tx_id).toEqual(txId);
    expect(coin.tx_pointer_block_height).toEqual(1);
    expect(coin.tx_pointer_tx_idx).toEqual(2);
    expect(coin.output_index).toEqual(3);
  });

  test('toChainCoin accepts owner override', () => {
    const originalOwner = Address.fromRandom();
    const overrideOwner = Address.fromRandom();

    const testCoin = new TestCoin({ owner: originalOwner });
    const coin = testCoin.toChainCoin(overrideOwner);

    expect(coin.owner).toEqual(overrideOwner.toHexString());
  });

  test('many creates multiple coins', () => {
    const owner = Address.fromRandom();
    const coins = TestCoin.many({ owner }, 4);

    expect(coins).toHaveLength(4);
    coins.forEach((coin) => {
      expect(coin.owner).toEqual(owner);
      // Each coin should have a unique tx_id
      expect(coin.tx_id).toBeDefined();
    });

    // Verify all tx_ids are unique
    const txIds = coins.map((c) => c.tx_id);
    expect(new Set(txIds).size).toEqual(4);
  });

  test('many with default count creates one coin', () => {
    const coins = TestCoin.many();
    expect(coins).toHaveLength(1);
  });
});
