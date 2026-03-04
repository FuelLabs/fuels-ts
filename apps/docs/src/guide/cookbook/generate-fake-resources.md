# Generate Fake Resources

When working with an unfunded account, you can generate fake resources to perform a dry-run on your transactions. This is useful for testing purposes without the need for real funds.

Below is an example script that returns the value `1337`. You can use fake resources to execute a dry-run of this script and obtain the returned value.

<<< @/../../docs/sway/return-script/src/main.sw#generate-fake-resources-1{rust:line-numbers}

To execute a dry-run, use the `Provider.dryRun` method. Ensure you set the `utxo_validation` flag to true, as this script uses fake UTXOs:

<<< @./snippets/fake-resources.ts#generate-fake-resources-2{ts:line-numbers}

By setting `utxo_validation` to `true`, you can successfully execute the dry-run and retrieve the returned value from the script without requiring actual funds.
