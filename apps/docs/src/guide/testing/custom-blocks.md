# Custom Blocks

You can force-produce blocks using the `produceBlocks` helper to achieve an arbitrary block height. This is especially useful when you want to do some testing regarding transaction maturity.

<<< @/../../docs-snippets/src/guide/testing/tweaking-the-blockchain.test.ts#produce-blocks{ts:line-numbers}

# Blocks With Custom Timestamps

You can also produce blocks with a custom block time using the `produceBlocks` helper by specifying the second optional parameter.

<<< @/../../docs-snippets/src/guide/testing/tweaking-the-blockchain.test.ts#produceBlocks-custom-timestamp{ts:line-numbers}
