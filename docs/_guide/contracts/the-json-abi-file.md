# The JSON ABI file

Whether you want to deploy or connect to a pre-existing smart contract, the JSON ABI file is extremely important: it's what tells the SDK about the [ABI methods](https://fuellabs.github.io/sway/master/introduction/overview.html#declare-abi-in-wallet_lib) in your smart contracts.

For the same example Sway code as above:

```Rust
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

The JSON ABI file looks like this:

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

The Fuel TypeScript SDK will take this file as input and generate equivalent methods (and custom types if applicable) that you can call from your Rust code.
