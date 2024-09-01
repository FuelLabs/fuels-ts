/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { DateTime } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

/**
 * @group node
 * @group browser
 */
describe('tweaking the blockchain', () => {
  test('produceBlocks', async () => {
    // #region produce-blocks
    using launched = await launchTestNode();
    const { provider } = launched;
    const block = await provider.getBlock('latest');
    if (!block) {
      throw new Error('No latest block');
    }
    const { time: timeLastBlockProduced } = block;

    const producedBlockHeight = await provider.produceBlocks(3);

    const producedBlock = await provider.getBlock(producedBlockHeight.toNumber());

    const oldest = DateTime.fromTai64(timeLastBlockProduced);
    const newest = DateTime.fromTai64(producedBlock!.time);
    // newest >= oldest
    // #endregion produce-blocks
    expect(producedBlock).toBeDefined();
    expect(newest >= oldest).toBeTruthy();
  });

  test('produceBlocks with custom timestamp docs snippet', async () => {
    // #region produceBlocks-custom-timestamp
    using launched = await launchTestNode();
    const { provider } = launched;

    const latestBlock = await provider.getBlock('latest');
    if (!latestBlock) {
      throw new Error('No latest block');
    }
    const latestBlockTimestamp = DateTime.fromTai64(latestBlock.time).toUnixMilliseconds();
    const newBlockHeight = await provider.produceBlocks(3, latestBlockTimestamp + 1000);
    // #endregion produceBlocks-custom-timestamp
    expect(newBlockHeight.toHex()).toBe(latestBlock.height.add(3).toHex());
  });
});
