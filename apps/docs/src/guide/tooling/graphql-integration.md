# Graphql Integration

The Fuel Network provides a GraphQL API to query the blockchain ([docs](https://graphql-docs.fuel.network/)).

For its own purposes, the SDK creates custom operations based off of the API's schema and auto-generates TypeScript client code via codegen tools.
The details of our integration can be found in the source code in the relevant [scripts](https://github.com/FuelLabs/fuels-ts/blob/e6df29c2d4ef373c6d266ba08110d6480732f0e1/packages/account/package.json#L42) that automate the process.

The end result of this are the operations available on the [`Provider`](../providers/index.md), of which some are shown below:

<<< @/../../docs-snippets/src/guide/provider/provider.test.ts#operations{ts:line-numbers}

Note that these operations primarily serve the needs of the SDK and the `Provider`'s methods which can encapsulate calls to multiple operations, parse the responses, etc.

If your querying needs exceed what the `Provider` provides, we suggest you follow this same process and write your own custom query operations.

For mutations and subscriptions, however, we strongly suggest that you communicate with the node via the `Provider` and do not write your own custom GraphQL operations because, in its methods, the `Provider` does additional processing before and after sending them to the node which might require detailed knowledge of various Fuel domain-specific topics.
