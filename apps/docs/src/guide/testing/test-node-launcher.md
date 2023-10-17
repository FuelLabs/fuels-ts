# The `TestNodeLauncher` utility

---

Important notes:

- this utility uses [explicit resource management](https://devblogs.microsoft.com/typescript/announcing-typescript-5-2/#using-declarations-and-explicit-resource-management) introduced in TypeScript 5.2.
  Please update your TS version to 5.2 and follow their guide to make `using` and `await using` statements work.
- This utility is in the `@fuel-ts/test-utils` package.

---

To simplify testing of sway programs in isolation, the SDK provides `TestNodeLauncher`, a utility via which you can spin up a short-lived `fuel-core` node, setup a custom provider and wallets, and deploy contracts in one go.
Here is a simple contract deployment in a test:

<<< @/../../../packages/contract/src/test-utils/test-node-launcher.test.ts#TestNodeLauncher-deploy-contract{ts:line-numbers}

The code above spins up a `fuel-core` node on the first available port your your machine provides, deploys your contract to that node, and returns the contract for you to test. After the `launched` variable goes out of scope, resource disposal is run and the node is killed.

You can also configure wallets and deploy multiple contracts with them:

<<< @/../../../packages/contract/src/test-utils/test-node-launcher.test.ts#TestNodeLauncher-multiple-contracts-and-wallets{ts:line-numbers}
