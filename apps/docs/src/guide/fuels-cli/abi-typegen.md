<script setup>
  import { data } from '../../versions.data'
  const { forc } = data
  const abiUrl = `
    https://docs.fuel.network/docs/sway/sway-program-types/smart_contracts/#the-abi-declaration
  `
  const contractsUrl = `
    https://docs.fuel.network/docs/sway/sway-program-types/smart_contracts/
  `
  const scriptsUrl = `
    https://docs.fuel.network/docs/sway/sway-program-types/scripts/
  `
</script>

# ABI Typegen

## The JSON ABI file

Whether you want to deploy or connect to a pre-existing smart contract, the <a :href="abiUrl" target="_blank" rel="noreferrer">JSON ABI</a> file is what makes it possible.

It tells the SDK about the <a :href="abiUrl" target="_blank" rel="noreferrer">ABI methods</a> in your <a :href="contractsUrl" target="_blank" rel="noreferrer">Smart Contracts</a> and <a :href="scriptsUrl" target="_blank" rel="noreferrer">Scripts</a>

Given the following Sway smart contract:

<!-- TODO: stop using hard-coded snippets -->

```rust:line-numbers
contract;

abi MyContract {
    fn test_function() -> bool;
}

impl MyContract for Contract {
    fn test_function() -> bool {
        true
    }
}
```

The JSON ABI file would look something like this:

```json
$ cat out/debug/my-test-abi.json
[
  {
    "type": "function",
    "inputs": [],
    "name": "test_function",
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "components": null
      }
    ]
  }
]
```

See also:

- [Generating Types](./generating-types.md)
- [Using Generated Types](./using-generated-types.md)
