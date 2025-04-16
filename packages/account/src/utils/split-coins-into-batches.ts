import type { Coin } from '../providers';

export const splitCoinsIntoBatches = (coins: Coin[], maxBatchLength: number) => {
  const batchesNum = Math.ceil(coins.length / maxBatchLength);
  const batches: Coin[][] = [];

  for (let i = 0; i < batchesNum; i += 1) {
    const batchStart = i * maxBatchLength;
    const batchEnd = (i + 1) * maxBatchLength;
    batches.push(coins.slice(batchStart, batchEnd));
  }

  return batches;
};
