# Encoding

Encoding is the process of serializing data into a format that is suitable for transmission or storage. This is important for blockchains as it enables state minimization and efficiency, as well as for generating proofs.

Fortunately, if you are working with [program types](https://docs.fuel.network/docs/sway/sway-program-types/) on the Fuel network such as [calling contracts](https://docs.fuel.network/docs/fuels-ts/contracts/), the SDK will handle encoding for you automatically. It will adhere to the [argument encoding specification](https://docs.fuel.network/docs/specs/abi/argument-encoding/), so you can work with data in its expected format rather than as bytecode.

However, there may be scenarios where you want to manipulate call or return data yourself or even implement your own serialization specification. This guide will cover how to encode and decode data using the SDK.
