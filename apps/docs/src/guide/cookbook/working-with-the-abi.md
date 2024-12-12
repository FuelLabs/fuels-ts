# Working with the ABI

Building a Sway program with `forc build` outputs multiple files, one of which is a JSON representation of the program's ABI. Because ABI specifications can change from one `forc` version to another, working directly with the ABI is cumbersome due to having to manage all ABI specification versions in order to ensure proper functionality.

To mitigate this, The SDK provides [`AbiParser`](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_abi.AbiParser.html) which can parse all ABI specification versions and output an object that conforms to the [`Abi`](https://fuels-ts-docs-api.vercel.app/interfaces/_fuel_ts_abi.Abi.html) interface. The SDK also internally uses this `Abi` interface for implementing its encoding/decoding and TS type generation.

<<< @./snippets/abi-parser.ts#full{ts:line-numbers}
