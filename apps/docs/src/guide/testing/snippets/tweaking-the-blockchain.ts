/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable  @typescript-eslint/no-non-null-assertion */
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
// #endregion produce-blocks

// #region produceBlocks-custom-timestamp
using launchedWithCustomTimestamp = await launchTestNode();
const { provider: providerWithCustomTimestamp } = launchedWithCustomTimestamp;

const latestBlock = await providerWithCustomTimestamp.getBlock('latest');
if (!latestBlock) {
  throw new Error('No latest block');
}
const latestBlockTimestamp = DateTime.fromTai64(
  latestBlock.time
).toUnixMilliseconds();
const newBlockHeight = await providerWithCustomTimestamp.produceBlocks(
  3,
  latestBlockTimestamp + 1000
);

// #endregion produceBlocks-custom-timestamp
// #endregion full
