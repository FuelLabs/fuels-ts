<script setup>
  import { data } from '../../versions.data'
  const { forc } = data
  const url = `https://docs.fuel.network/docs/forc/commands/forc_test/`
</script>

# Fuel-Core Options

The `launchTestNode` creates a temporary snapshot directory and configurations every time it runs. The path to this directory is passed to `fuel-core` via the `--snapshot` flag.

## Default Snapshot

The default snapshot used is that of the current testnet network iteration.

Click [here](https://github.com/FuelLabs/fuels-ts/blob/master/.fuel-core/configs) to see what it looks like.

## Custom Snapshot

If you need a different snapshot, you can specify a `DEFAULT_CHAIN_SNAPSHOT_DIR` environment variable which points to your snapshot directory. `launchTestNode` will read that config and work with it instead, integrating all the functionality with it the same way it'd do with the default config.

How and where you specify the environment variable depends on your testing tool.

<<< @./snippets/launching-a-test-node.ts#custom-chain-config{ts:line-numbers}

## Fuel-Core Node Options

Besides the snapshot, you can provide arguments to the `fuel-core` node via the `nodeOptions.args` property. For a detailed list of all possible arguments run:

```shell
fuel-core run --help
```

If you want _all_ your tests to run with the same arguments, consider specifying the `DEFAULT_FUEL_CORE_ARGS` environment variable.

<<< @./snippets/launching-a-test-node.ts#custom-fuel-core-args{ts:line-numbers}
