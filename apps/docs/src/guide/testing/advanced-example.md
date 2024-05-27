<script setup>
  import { data } from '../../versions.data'
  const { forc } = data
  const url = `https://docs.fuel.network/docs/forc/commands/forc_test/`
</script>

# Advanced Example

A more complex example showcasing genesis block state configuration with [`walletConfig`](./reference.md#walletconfig) and deployment of multiple contracts is shown below.

<<< @/../../docs-snippets/src/guide/testing/launching-a-test-node.test.ts#multiple-contracts-and-wallets{ts:line-numbers}

## Summary

1.  This thing
1.  That thing as well
