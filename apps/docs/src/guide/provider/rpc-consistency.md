# RPC Consistency

A common issue with querying distributed networks is ensuring each node is consistent. At any moment each node could be at a different block height, therefore querying the state of the blockchain may yield different results from node to node.

To defend against this, the SDK appends the block height to block-sensitive requests. The node will then ensure it has met the block height criteria before it processes the request.

If the block height criteria has not been met by the node, the request will either be awaited on the node's side (if the node supports this), or it'll be retried from the SDK side. The SDK will attempt to retry the request until it hits a maximum amount of retries, and then will throw an error.

This functionality is enabled by default, but can be disabled as so:

<<< @./snippets/rpc-consistency.ts#full{ts:line-numbers}
