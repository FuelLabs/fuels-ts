# Producing Blocks

You can produce blocks using the `produceBlocks` helper to achieve an arbitrary block height. This is especially useful when you want to do some testing regarding transaction maturity.

<<< @/../../../packages/providers/src/provider.test.ts#Provider-produce-blocks{ts:line-numbers}

# Producing Blocks With Custom Timestamps

You can also produce blocks with custom timestamps using the `produceBlocks` helper by specifying the second optional parameter `timeParameters`.

```typescript
import { fromUnixToTai64, Provider } from 'fuels';

const latestBlockNumber = await provider.produceBlocks(
  amountOfBlocksToProduce: 3,
  {
    blockTimeInterval: '100',
    startTime: fromUnixToTai64(1620000000), // Use the `fromUnixToTai64` helper to convert unix timestamps to tai64
  }
);
```
