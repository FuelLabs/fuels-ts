<script setup>
  import { data } from '../../versions.data'
  const { forc } = data
  const abiUrl = `
    https://fuellabs.github.io/sway/v${forc}/book/sway-program-types/smart_contracts.html#the-abi-declaration
  `
  const contractsUrl = `
    https://fuellabs.github.io/sway/v${forc}/book/sway-program-types/smart_contracts.html
  `
  const scriptsUrl = `
    https://fuellabs.github.io/sway/v${forc}/book/sway-program-types/scripts.html
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

- [Generating Types](./generating-types-from-abi.md)
- [Using Generated Types](./using-generated-types.md)
