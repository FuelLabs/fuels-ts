# Encode and Decode

To interact with the FuelVM, types must be encoded and decoded per the [argument encoding specification](https://docs.fuel.network/docs/specs/abi/argument-encoding/). The SDK provides the `Interface` class to encode and decode data.

The relevant methods of `Interface` are:

- `encodeType`
- `decodeType`

The `Interface` class requires you to pass the [ABI](https://docs.fuel.network/docs/specs/abi/json-abi-format/) on initialization. Both methods accept a `concreteTypeId`, which must exist in the ABI's `concreteTypes` array. After that, a suitable coder will be assigned to encode/decode that type.

Imagine we are working with the following script that returns the sum of two `u32` integers:

<<< @/../../docs/sway/script-sum/src/main.sw#encode-and-decode-1{rust:line-numbers}

When you build this script, using:

```sh
forc build
```

It will produce the following ABI:

<<< @/../../docs/src/snippets/encoding/encode-and-decode.jsonc#encode-and-decode-2{json:line-numbers}

Now, let's prepare some data to pass to the `main` function to retrieve the combined integer. The function expects and returns a `u32` integer. So here, we will encode the `u32` to pass it to the function and receive the same `u32` back, as bytes, that we'll use for decoding. We can do both of these with the `Interface`.

First, let's prepare the transaction:

<<< @/../../docs/src/snippets/encoding/encode-and-decode.ts#encode-and-decode-3{ts:line-numbers}

Now, we can encode the script data to use in the transaction:

<<< @/../../docs/src/snippets/encoding/encode-and-decode.ts#encode-and-decode-4{ts:line-numbers}

Finally, we can decode the result:

<<< @/../../docs/src/snippets/encoding/encode-and-decode.ts#encode-and-decode-5{ts:line-numbers}

A similar approach can be taken with [Predicates](../predicates/index.md); however, you must set the encoded values to the `predicateData` property.

[Contracts](../contracts/index.md) require more care. Although you can utilize the `scriptData` property, the arguments must be encoded as part of the [contract call script](https://docs.fuel.network/docs/sway/sway-program-types/smart_contracts/#calling-a-smart-contract-from-a-script). Therefore, it is recommended to use a `FunctionInvocationScope` when working with contracts which will be instantiated for you when [submitting a contract function](../contracts/methods.md), and therefore handles all the encoding.

## Full Example

Here is the full example of the encoding and decoding methods:

<<< @/../../docs/src/snippets/encoding/encode-and-decode.ts#full{ts:line-numbers}
