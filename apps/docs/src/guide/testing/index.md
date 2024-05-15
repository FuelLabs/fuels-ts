<script setup>
  import { data } from '../../versions.data'
  const { forc } = data
  const url = `https://docs.fuel.network/docs/forc/commands/forc_test/`
</script>

# Testing

In order to test your Sway and TS-SDK applications, you can test your code in a number of ways:

1. Testing with the TS-SDK: Compiling you Sway code and connecting to the methods using TS-SDK and JS testing frameworks
1. Using [`forc test`](https://docs.fuel.network/docs/forc/commands/forc%5ftest/#forc-test)
1. Using [the Rust SDK](https://docs.fuel.network/docs/fuels-rs/testing/)

## Testing with the TS-SDK

To test your Sway applications using the TS-SDK, you can pick whatever testing library or framework you feel comfortable with. There isn't any specific testing framework needed, it is entirely up to the user. That being said, the TS-SDK uses [`Vitest`](https://vitest.dev/) for its tests.

### Launching a Test Node

To simplify testing in isolation, the SDK provides `launchTestNode`, a utility that allows you to spin up a short-lived `fuel-core` node, set up a custom provider and wallets, and deploy contracts in one go.

The utility supports [`explicit resource management`](https://devblogs.microsoft.com/typescript/announcing-typescript-5-2/#using-declarations-and-explicit-resource-management) introduced in TypeScript 5.2 which automatically calls a cleanup function after a variable instantiated with the `using` keyword goes out of block scope. In the case of `launchTestNode`, the cleanup function kills the launched `fuel-core` node once your test finishes. In order to benefit from this feature, you need to do the following:

1. Set your TypeScript version to 5.2 or above,
2. In your tsconfig, set the compilation target to `es2022` or below, and configure your lib setting to either include `"esnext"` or `"esnext.disposable"`:

```json
{
  "compilerOptions": {
    "target": "es2022",
    "lib": ["es2022", "esnext.disposable"]
  }
}
```

3. If you're using `vitest`, you might have to follow [these instructions](https://github.com/vitest-dev/vitest/issues/4183#issuecomment-1780959907),
4. Instantiate the variable that stores the return of `launchTestNode` with the `using` keyword:

```ts
using launched = await launchTestNode();
```

If you instantiate it with `const`/`let`, the automatic disposal won't happen and you have to call the `cleanup` function yourself or the `fuel-core` node won't be killed after the test is complete:

```ts
const launched = await launchTestNode();
launched.cleanup();
```

---

Here is a simple counter contract deployment:

<<< @/../../docs-snippets/src/guide/testing/launching-a-test-node.test.ts#deploy-contract{ts:line-numbers}

- The `launched` variable was instantiated with the [`using`](https://devblogs.microsoft.com/typescript/announcing-typescript-5-2/#using-declarations-and-explicit-resource-management) declaration.
- `launchTestNode` spun up a short-lived `fuel-core` node, deployed a contract to it and returned it for testing.
- Besides the contract, you've got the [provider](../provider/index.md) and [wallets](../wallets/index.md) at your disposal.

---

You can also configure wallets on the genesis block with [`WalletConfig`](./wallet-config.md) and deploy multiple contracts:

<<< @/../../docs-snippets/src/guide/testing/launching-a-test-node.test.ts#multiple-contracts-and-wallets{ts:line-numbers}

#### Configuring the Test Node

`launchTestNode` creates a temporary snapshot directory and configurations every time it runs. The path to this directory is passed to `fuel-core` via the `--snapshot` flag.

The default snapshot used is that of the current testnet network iteration. [Click here](https://github.com/FuelLabs/fuels-ts/blob/master/.fuel-core/configs) to see what it looks like.

If you need a different snapshot, you can specify a `DEFAULT_CHAIN_SNAPSHOT_DIR` environment variable which points to your snapshot directory. `launchTestNode` will read that config and work with it instead, integrating all the functionality with it the same way it'd do with the default config.
How and where you specify the environment variable depends on your testing tool.

<<< @/../../docs-snippets/src/guide/testing/launching-a-test-node.test.ts#custom-chain-config{ts:line-numbers}

Besides the snapshot, you can provide arguments to the `fuel-core` node via the `nodeOptions.args` property. For a detailed list of all possible arguments run `fuel-core run --help`.

If you want _all_ your tests to run with the same arguments, consider specifying the `DEFAULT_FUEL_CORE_ARGS` environment variable.

_Note: these args will be overridden in a test if `nodeOptions.args` is provided._

<<< @/../../docs-snippets/src/guide/testing/launching-a-test-node.test.ts#custom-fuel-core-args{ts:line-numbers}
