<script setup>
  import { data } from '../../versions.data'
  const { forc } = data
  const url = `https://docs.fuel.network/docs/forc/commands/forc_test/`
</script>

# Advanced Example

A more complex example showcasing genesis block state configuration with [`walletsConfig`](./test-node-options.md#walletsconfig) and deployment of multiple contracts is shown below.

<<< @/../../docs/src/snippets/testing/launching-a-test-node.ts#advanced-example{ts:line-numbers}

## Summary

1. All points listed in the [basic example](./basic-example.md#summary) apply here as well.
1. Multiple wallets were generated with highly-specific coins and messages.
1. It's possible to specify the wallet to be used for contract deployment via `walletIndex`.
1. The test contract can be deployed with all the options available for real contract deployment.
