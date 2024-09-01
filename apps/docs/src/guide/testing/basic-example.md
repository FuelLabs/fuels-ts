<script setup>
  import { data } from '../../versions.data'
  const { forc } = data
  const url = `https://docs.fuel.network/docs/forc/commands/forc_test/`
</script>

# Basic Example

Let's use `launchTestNode` with the counter contract from the [Fuel dApp tutorial](../creating-a-fuel-dapp/index.md).

_Note: you will have to change the import paths of the contract factory and bytecode to match your folder structure._

<<< @/../../docs-snippets/src/guide/testing/launching-a-test-node.test.ts#basic-example{ts:line-numbers}

## Summary

1.  The `launched` variable was instantiated with the [`using`](https://www.typescriptlang.org/docs/handbook/variable-declarations.html#using-declarations) keyword.
1.  `launchTestNode` spun up a short-lived `fuel-core` node, deployed a contract to it and returned it for testing.
1.  The deployed contract is fully typesafe because of `launchTestNode`'s type-level integration with `typegen` outputs.
1.  Besides the contract, you've got the [provider](../provider/index.md) and [wallets](../wallets/index.md) at your disposal.
