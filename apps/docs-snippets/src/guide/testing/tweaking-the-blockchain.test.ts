import { Provider, fromTai64ToUnix } from 'fuels';

test('produceBlocks with custom timestamp docs snippet', async () => {
  const provider = await Provider.connect('http://127.0.0.1:4000/graphql');
  const latestBlock = await provider.getBlock('latest');
  if (!latestBlock) {
    throw new Error('No latest block');
  }
  const lastBlockNumber = latestBlock.height;
  // #region Provider-produceBlocks-custom-timestamp
  const lastBlockTimestamp = fromTai64ToUnix(latestBlock.time);
  const latestBlockNumber = await provider.produceBlocks(3, lastBlockTimestamp + 1000);
  // #endregion Provider-produceBlocks-custom-timestamp
  expect(latestBlockNumber.toHex()).toBe(lastBlockNumber.add(3).toHex());
});
