<script setup>
  import { data } from '../../versions.data'
  const { forc } = data
  const url = `https://docs.fuel.network/docs/forc/commands/forc_test/`
</script>

# Testing

In order to test your Sway and TS-SDK applications, you can test your code in a number of ways:

1. Testing with TS-SDK: Compiling you Sway code and connecting to the methods using TS-SDK and JS testing frameworks
2. Using `forc test` see <a :href="url" target="_blank" rel="noreferrer">the Sway docs</a> for more info
3. Using [the Rust SDK](https://fuellabs.github.io/fuels-rs/v0.31.1/testing/index.html)

### Testing with TS-SDK

To test your Sway applications using the TS-SDK, you can pick whatever testing library or framework you feel comfortable with. There isn't any specific testing framework needed, it is entirely up to the user. That being said, the TS-SDK uses [Jest](https://jestjs.io/) for its tests.

### Wallet Test Utilities

You'll often want to create one or more test wallets when testing your contracts.

For this, you can find two simple utilities on the wallet package:

- [`@fuel-ts/wallet`](https://github.com/FuelLabs/fuels-ts/tree/master/packages/wallet#test-utilities)

On top of these two utilities, if you want to quickly get up and running with a local node, you can use the `launchNodeAndGetWallets` from the `@fuel-ts/wallet/test-utils` package.

```ts
import { launchNodeAndGetWallets } from "@fuel-ts/wallet/test-utils";

const { stop, wallets, provider } = await launchNodeAndGetWallets();

// ... do your tests - deploy contracts using the wallets, fetch info from the provider, etc.

// stop the node when you're done
stop();
```

See also:

1. [Setting up test wallets](../wallets/test-wallets.md)
2. [Testing with Jest](./testing-with-jest.md)
