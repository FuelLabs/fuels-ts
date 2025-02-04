# GraphQL Integration

The Fuel Network provides a [GraphQL API](https://docs.fuel.network/docs/graphql/overview/) to query the blockchain. To get a better understanding of the underlying schema and other operations, you can visit the [playground](https://testnet.fuel.network/v1/playground) for an interactive deep dive.

## Operations

For its own purposes, the SDK creates custom operations based off of the API's schema and auto-generates TypeScript client code via codegen tools.
The end result of this code generation are the operations available on the [`Provider`](../provider/index.md), of which some are shown below:

<<< @/../../docs/src/guide/provider/snippets/provider-operations.ts#operations{ts:line-numbers}

Note that these operations primarily serve the needs of the SDK and the `Provider`'s methods which can encapsulate calls to multiple operations, parse the responses, etc.

If your querying needs exceed what the `Provider` provides, we suggest you follow this same process and write your own custom query operations, e.g.:

```gql
query getChain {
  latestBlock {
    transactions {
      id
    }
  }
}
```

### Mutations and subscriptions

For mutations and subscriptions, we strongly suggest that you communicate with the node via the `Provider` and do not write your own custom GraphQL operations because, in its methods, the `Provider` does additional processing before and after sending them to the node which might require detailed knowledge of various Fuel domain-specific topics.
