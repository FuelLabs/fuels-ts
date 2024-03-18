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

The code above spins up a `fuel-core` node on the first available port your machine provides, deploys your contract to that node, and returns the contract for you to test. After the `launched` variable goes out of scope, resource disposal is run and the node is killed.

You can also configure wallets and deploy multiple contracts with them:

<<< @/../../../packages/contract/src/test-utils/launch-test-node.test.ts#multiple-contracts-and-wallets{ts:line-numbers}

#### Configuring the node

The default chain config of `launchTestNode` is the current beta network iteration's chain config. [Click here](https://github.com/FuelLabs/fuels-ts/blob/master/.fuel-core/configs/chainConfig.json) to see what it looks like.

If you need a different base chain config, you can specify a `DEFAULT_CHAIN_CONFIG_PATH` environment variable which points to your chain config. `launchTestNode` will read that config and work with it instead.

<<< @/../../../packages/contract/src/test-utils/launch-test-node.test.ts#custom-chain-config{ts:line-numbers}

Besides the chain config, you can provide arguments to the `fuel-core` node via the `nodeOptions.args` property. For a detailed list of all possible arguments run `fuel-core run --help`.

If you want _all_ your tests to run with the same config, consider specifying the `DEFAULT_FUEL_CORE_ARGS` environment variable.

_Note: these args will be overridden in a test if `nodeOptions.args` is provided._

<<< @/../../../packages/contract/src/test-utils/launch-test-node.test.ts#custom-fuel-core-args{ts:line-numbers}
