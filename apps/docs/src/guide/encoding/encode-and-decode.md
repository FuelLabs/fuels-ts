# Encode and Decode

Encoding is the process of transforming raw data into bytecode as per a set of rules. Decoding is the reverse process, transforming bytecode back to raw data. The SDK provides the `AbiCoder` class to encode and decode data.

It has 3 static methods: `encode`, `decode`, and `getCoder`, `encode` and `decode` describe the aforementioned processes, while `getCoder` returns an instance of the internal coder required to serialize the passed type, and is used internally by the `encode` and `decode` methods. All methods expect you to pass the [ABI](https://docs.fuel.network/docs/specs/abi/json-abi-format/) and ABI Argument as function parameters, in order to deduce the specific type coders that will be required to parse the data.

Imagine we are working with the following script that returns the sum of two `u32` integers:

<<< @/../../docs-snippets/test/fixtures/forc-projects/sum-script/src/main.sw#encode-and-decode-1{rust:line-numbers}

It will produce the following ABI:

<<< @/../../docs-snippets/src/guide/encoding/encode-and-decode.test.ts#encode-and-decode-2{ts:line-numbers}

Now, let's prepare some data to pass to the `main` function to retrieve the combined integer. The function is expecting a `u32` integer and will return one. So here we are going to encode the `u32` to pass it to the function, and receive the same same `u32` as bytes back, that we will need to decode.

We can do both of these with the `AbiCoder`:

<<< @/../../docs-snippets/src/guide/encoding/encode-and-decode.test.ts#encode-and-decode-3{ts:line-numbers}

A similar approach can be taken with [Predicates](../predicates/index.md) however you must set the encoded values to the `predicateData` property. [Contracts](../contracts/index.md) require more care and although you can utilise the `scriptData` property, the arguments must be encoded as part of the [contract call script](https://docs.fuel.network/docs/sway/sway-program-types/smart_contracts/#calling-a-smart-contract-from-a-script), therefore it is recommended to use the helper classes provided by the SDK.