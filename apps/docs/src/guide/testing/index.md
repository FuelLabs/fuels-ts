<script setup>
  import { data } from '../../versions.data'
  const { forc } = data
  const url = `https://docs.fuel.network/docs/forc/commands/forc_test/`
</script>

# Testing

In order to test your Sway and TS-SDK applications, you can test your code in a number of ways:

1. Testing with TS-SDK: Compiling you Sway code and connecting to the methods using TS-SDK and JS testing frameworks
2. Using `forc test` see <a :href="url" target="_blank" rel="noreferrer">the Sway docs</a> for more info
3. Using [the Rust SDK](https://docs.fuel.network/docs/fuels-rs/testing/)

## Testing with the TS-SDK

To test your Sway applications using the TS-SDK, you can pick whatever testing library or framework you feel comfortable with. There isn't any specific testing framework needed, it is entirely up to the user. That being said, the TS-SDK uses [`Vitest`](https://vitest.dev/) for its tests.

### Launching a Test Node

To simplify testing in isolation, the SDK provides `launchTestNode`, a utility via which you can spin up a short-lived `fuel-core` node, setup a custom provider and wallets, and deploy contracts in one go.
Here is a simple contract deployment in a test:

<<< @/../../../packages/contract/src/test-utils/launch-test-node.test.ts#deploy-contract{ts:line-numbers}

- The `launched` variable was instantiated with the [`using`](https://devblogs.microsoft.com/typescript/announcing-typescript-5-2/#using-declarations-and-explicit-resource-management) declaration. This is a TypeScript 5.2 feature called explicit resource management and it's used to automatically kill the node once `launched` goes out of scope. **IMPORTANT: if you instantiate it with `const`/`let`, the automatic disposal won't happen and you have to call the returned `cleanup` function yourself.**
- `launchTestNode` spun up a short-lived `fuel-core` node, deployed a contract to it and returned it for testing.
- Besides the contract, you've got the provider and wallets at your disposal.

---

You can also configure wallets and deploy multiple contracts with them:

<<< @/../../../packages/contract/src/test-utils/launch-test-node.test.ts#multiple-contracts-and-wallets{ts:line-numbers}

That's a lot of options! These docs showcase some functionality; for a detailed look it's best to fiddle with the utility yourself. Every property is documented with typedoc. If something is still unclear or you found a bug, please contact us via official channels of communication and we'll help you.

---

#### Configuring the node

`launchTestNode` creates a temporary chain config every time it runs.

The default chain config it uses is that of the current beta network iteration. [Click here](https://github.com/FuelLabs/fuels-ts/blob/master/.fuel-core/configs/chainConfig.json) to see what it looks like.

If you need a different base chain config, you can specify a `DEFAULT_CHAIN_CONFIG_PATH` environment variable which points to your chain config. `launchTestNode` will read that config and work with it instead, integrating all the functionality with it the same way it'd do with the default config.
How you specify the environment variable depends on your testing tool.

<<< @/../../../packages/contract/src/test-utils/launch-test-node.test.ts#custom-chain-config{ts:line-numbers}

Besides the chain config, you can provide arguments to the `fuel-core` node via the `nodeOptions.args` property. For a detailed list of all possible arguments run `fuel-core run --help`.

If you want _all_ your tests to run with the same config, consider specifying the `DEFAULT_FUEL_CORE_ARGS` environment variable.

_Note: these args will be overridden in a test if `nodeOptions.args` is provided._

<<< @/../../../packages/contract/src/test-utils/launch-test-node.test.ts#custom-fuel-core-args{ts:line-numbers}
