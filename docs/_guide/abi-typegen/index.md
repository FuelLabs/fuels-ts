[nav_order: 1]

# ABI Typegen

## The JSON ABI file

Whether you want to deploy or connect to a pre-existing smart contract, the [JSON ABI](https://fuellabs.github.io/sway/v{{site.data.versions.sway}}/book/introduction/sway_quickstart.html?highlight=abi#abi) file is what makes it possible.

It tells the SDK about the [ABI methods](https://fuellabs.github.io/sway/v{{site.data.versions.sway}}/book/introduction/sway_quickstart.html?highlight=abi#abi) in your [Smart Contracts](https://fuellabs.github.io/sway/vv{{site.data.versions.sway}}/book/sway-program-types/smart_contracts.html) and [Scripts](https://fuellabs.github.io/sway/vv{{site.data.versions.sway}}/book/sway-program-types/smart_contracts.html).

Given the following Sway smart contract:

```rust
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

- [Generating Contract Types](./generating-types-from-abi.md)
- [Generating Contract Types](./generating-types-from-abi.md)
