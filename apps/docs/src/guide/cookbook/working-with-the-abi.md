# Working with the ABI

Building a Sway program with `forc build` outputs multiple files, one of which is a JSON representation of the program's ABI. Because ABI specifications can change from one `forc` version to another, working directly with the ABI is cumbersome due to having to manage all ABI specification versions in order to ensure proper functionality.

<!-- TODO: fix links once it's live -->
<!-- AbiParser:  https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_abi.AbiParser.html-->
<!-- ABI: https://fuels-ts-docs-api.vercel.app/interfaces/_fuel_ts_abi.Abi.html -->

To mitigate this, The SDK provides [`AbiParser`](#working-with-the-abi) which can parse all ABI specification versions and output an object that conforms to the [`Abi`](#working-with-the-abi) interface. The SDK also internally uses this `Abi` interface for implementing its encoding/decoding and TS type generation.

<<< @./snippets/parsing-the-abi.ts#full{ts:line-numbers}
