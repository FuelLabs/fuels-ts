// #region getBlocks
import { Provider } from 'fuels';

import { LOCAL_NETWORK_URL } from '../env';

const provider = await Provider.create(LOCAL_NETWORK_URL);

const blockToProduce = 3;

// Force-producing some blocks to make sure that blocks exist
await provider.produceBlocks(blockToProduce);

const { blocks } = await provider.getBlocks({
  last: blockToProduce,
});
// #endregion getBlocks

console.log(
  'blockToProduce equals blocks.length',
  blockToProduce === blocks.length
);
