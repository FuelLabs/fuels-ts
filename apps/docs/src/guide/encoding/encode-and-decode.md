# Encode and Decode

In order to interact with the FuelVM, types must be encoded and decoded as per the [argument encoding specification](https://docs.fuel.network/docs/specs/abi/argument-encoding/). The SDK provides the `AbiCoder` class to encode and decode data.

It has three static methods:

- `encode`
- `decode`
- `getCoder`

The methods `encode` and `decode` describe the aforementioned process, while `getCoder` returns an instance of the internal coder required to serialize the passed type. This coder is then used internally by the `encode` and `decode` methods.

All methods expect you to pass the [ABI](https://docs.fuel.network/docs/specs/abi/json-abi-format/) and ABI Argument as function parameters to deduce the specific type coders that will be required to parse the data.

Imagine we are working with the following script that returns the sum of two `u32` integers:

<<< @/../../docs-snippets/test/fixtures/forc-projects/sum-script/src/main.sw#encode-and-decode-1{rust:line-numbers}

When you build this script, using:

```sh
forc build
```

It will produce the following ABI:

<<< @/../../docs-snippets/src/guide/encoding/encode-and-decode.test.ts#encode-and-decode-2{ts:line-numbers}

Now, let's prepare some data to pass to the `main` function to retrieve the combined integer. The function expects and returns a `u32` integer. So here, we will encode the `u32` to pass it to the function and receive the same `u32` back, as bytes, that we'll use for decoding.

We can do both of these with the `AbiCoder`:

<<< @/../../docs-snippets/src/guide/encoding/encode-and-decode.test.ts#encode-and-decode-3{ts:line-numbers}

A similar approach can be taken with [Predicates](../predicates/index.md); however, you must set the encoded values to the `predicateData` property.

[Contracts](../contracts/index.md) require more care. Although you can utilize the `scriptData` property, the arguments must be encoded as part of the [contract call script](https://docs.fuel.network/docs/sway/sway-program-types/smart_contracts/#calling-a-smart-contract-from-a-script). Therefore, it is recommended to use a `FunctionInvocationScope` when working with contracts which will be instantiated for you when [submitting a contract function](../contracts/methods.md), and therefore handles all the encoding.
