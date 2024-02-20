import { Provider, DateTime } from 'fuels';
import { launchNode } from '@fuel-ts/account/test-utils';

/**
 * @group node
 */
test('produceBlocks with custom timestamp docs snippet', async () => {
  // TODO: reevaluate/replace after #1356
  const { cleanup, ip, port } = await launchNode({});
  const url = `http://${ip}:${port}/graphql`;
  const provider = await Provider.create(url);
  const latestBlock = await provider.getBlock('latest');
  if (!latestBlock) {
    throw new Error('No latest block');
  }
  const lastBlockNumber = latestBlock.height;
  // #region Provider-produceBlocks-custom-timestamp
  const lastBlockTimestamp = DateTime.fromTai64(latestBlock.time).getTime();
  const latestBlockNumber = await provider.produceBlocks(3, lastBlockTimestamp + 1000);
  // #endregion Provider-produceBlocks-custom-timestamp
  expect(latestBlockNumber.toHex()).toBe(lastBlockNumber.add(3).toHex());

  cleanup();
});
