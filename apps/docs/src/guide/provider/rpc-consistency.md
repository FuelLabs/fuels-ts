# RPC Consistency

A common issue with querying distributed networks is ensuring consistency between nodes. At any moment, each node could be at a different block height; therefore, querying the state of the blockchain may yield different results from node to node.

To defend against this, the SDK appends the block height to block-sensitive requests so the node will verify that it meets the block height criteria before processing the request.

If the node has not met the block height criteria, the request will either be awaited on the node's side (if the node supports this) or retried from the SDK side. The SDK will attempt to retry the request until it reaches the maximum number of retries and then throw an error.

This functionality is enabled by default, but can be disabled as so:

<<< @./snippets/rpc-consistency.ts#full{ts:line-numbers}
