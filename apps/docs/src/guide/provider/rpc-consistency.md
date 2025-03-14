# RPC Consistency

Because the Fuel network consists of numerous nodes that at the same moment might be at different block heights, querying the state of the blockchain might yield different results from node to node. To fix that, every node appends its current block height to every response it returns. This enables the SDK to then append this block height to block-sensitive requests that it makes towards the network, thereby requiring the node it hits to be at that block height before processing the request.
If the node is at a lower block height, the request will either be awaited on the node's side if the node is configured to do so, or it'll be retried from the SDK side for a couple of times with an exponential backoff. Once the maximum retry amount is reached, the SDK will throw an error.

This functionality is turned on by default. If you want to turn it off to e.g. have faster response times, you can do the following:

<<< @./snippets/rpc-consistency.ts#full{ts:line-numbers}
