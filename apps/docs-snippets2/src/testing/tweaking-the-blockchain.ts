// #region full
// #region produce-blocks
import { DateTime } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

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
console.assert(producedBlock, 'No latest block');
console.assert(newest >= oldest, 'Newest block is not greater or equal to oldest block');
// #endregion produce-blocks

// #region produceBlocks-custom-timestamp
using launchedWithCustomTimestamp = await launchTestNode();
const { provider: providerWithCustomTimestamp } = launchedWithCustomTimestamp;

const latestBlock = await providerWithCustomTimestamp.getBlock('latest');
if (!latestBlock) {
  throw new Error('No latest block');
}
const latestBlockTimestamp = DateTime.fromTai64(latestBlock.time).toUnixMilliseconds();
const newBlockHeight = await providerWithCustomTimestamp.produceBlocks(
  3,
  latestBlockTimestamp + 1000
);

console.assert(
  newBlockHeight.toHex() === latestBlock.height.add(3).toHex(),
  'New block height is not equal to latest block height + 3'
);
// #endregion produceBlocks-custom-timestamp
// #endregion full
