# Summary

[The Fuel TypeScript SDK](./index.md)

<!-- Introduction -->
- [Getting Started](./getting-started.md)
- [Creating a Fuel dApp](./creating-a-fuel-dapp.md)

<!-- Basics -->
- [Provider](./provider/index.md)
  - [Background](./provider/background.md)
  - [Instantiating a Provider](./provider/instantiating-a-provider.md)
  - [Provider Options](./provider/provider-options.md) <!-- I'd pop this in Instantiating -->
  - [Querying the Blockchain](./provider/query-the-chain.md)
  - [Retrying upon errors](./provider/retrying.md)
- [GraphQL](./graphql/index.md)
  - [Schema](./graphql/schema.md)
  - [Playground](./graphql/playground.md)
  - [Custom Queries](./graphql/custom-queries.md)
  - [Subscriptions](./graphql/subscriptions.md)
- [Managing wallets](./wallets/index.md)
  - [Creating a wallet from a private key](./wallets/private-keys.md)
  - [Creating a wallet from mnemonic phrases](./wallets/mnemonic-wallet.md)
  - [Wallet Access](./wallets/access.md) <!-- Not in Notion - but in the SDK and in RS docs -->
  - [Encrypting and storing wallets](./wallets/encrypting-and-storing.md) <!-- Previously : 'Encrypting and Decrypting JSON Wallets' -->
  - [Checking balances and coins](./wallets/checking-balances-and-coins.md)
  - [Locking and unlocking wallets](./wallets/locking-and-unlocking.md)
  - [Signing](./wallets/signing.md)
  - [External connectors](./wallets/external-connectors.md)
  - [Setting up test wallets](./wallets/test-wallets.md)
- [ABI](./abi/index.md)
  - [The JSON ABI file](./abi/the-json-abi-file.md)
  - [Generating Types](./abi/generating-types.md)
  - [Using Generated Types](./abi/using-generated-types.md)

<!-- Essentials -->
- [Contracts](./contracts/index.md);
  - [Instantiating a Contract](./contracts/instantiating-a-contract.md)
  - [Calling Contract Functions]() <!-- Nested ATM - see what people think... -->
    - [Methods]()
    - [Transaction Parameters]()
    - [Call Parameters]()
    - [Cost Estimation]()
    - [Dependency Estimation]()
    - [Variable Outputs]()
    - [Transaction Response]()
    - [Logs]()
  - [Inter-contract calls](./contracts/inter-contract-calls.md)
  - [Multi-contract calls](./contracts/multi-contract-calls.md)
  - [Using different wallets](./contracts/using-different-wallets.md)
  - [Deploying contracts]() <!-- Nested ATM - see what people think... -->
    - [Storage Slots]()
    - [Configurable Constants]()
    - [Understanding the FuelVM Binary File]()

- [Scripts](./scripts/index.md)
  - [Instantiating a Script](./scripts/instantiating-a-script.md)
  - [Configurable constants](./scripts/configurable-constants.md)
  - [Running scripts](./scripts/running-scripts.md)
  - [Custom script calls](./scripts/custom-script-calls.md)

- [Predicates](./predicates/index.md)
  - [Instantiating A Predicate](./predicates/instantiating-a-predicate.md)
  - [Configurable constants](./predicates/configurable-constants.md)
  - [Send And Spend Funds From Predicates](./predicates/send-and-spend-funds-from-predicates.md)

- [Cookbook](./cookbook/index.md)
  - [Transferring Assets](./cookbook/transferring-assets.md)
  - [Deposit And Withdraw](./cookbook/deposit-and-withdraw.md)
  - [Wallet SDK and React Hooks](./cookbook/wallet-sdk-and-react-hooks.md)

<!-- Extras -->
- [Types](./types/index.md)
  - [Address](./types/address.md)
  - [Arrays](./types/arrays.md)
  - [AssetId](./types/asset-id.md)
  - [Bech32](./types/bech32.md)
  - [Bits256](./types/bits256.md)
  - [Bits512](./types/bits512.md)
  - [Bytes](./types/Bytes.md)
  - [Bytes32](./types/bytes32.md)
  - [Enums](./types/enums.md)
  - [Evm Address](./types/evm-address.md)
  - [Native Parameters](./types/native-parameters.md)
  - [Numbers](./types/numbers.md)
  - [Options](./types/options.md)
  - [Raw Slice](./types/raw-slice.md)
  - [Std String](./types/std-string.md)
  - [String](./types/string.md)
  - [Structs](./types/structs.md)
  - [Tuples](./types/tuples.md)
  - [Vectors](./types/vectors.md)

- [Errors](./errors/index.md)
  - [Error Codes](./errors/error-codes.md)
  - [Revert Errors](./errors/revert-errors.md)

- [Utilities](./utilities/index.md)
  - [Big Number conversions](./utilities/big-number-conversions.md)
  - [Date time conversions](./utilities/date-time-conversions.md)
  - [Address conversions](./utilities/address-conversions.md)

<!-- Tooling -->
- [Testing](./testing/index.md)
  - [Launching nodes](./testing/launching-nodes.md)
  - [Launching test nodes](./testing/launching-test-nodes.md)
  - [Generate test wallets](./testing/generate-test-wallets.md)
  - [Testing utilities](./testing/testing-utilities.md)

- [CLI](./cli/index.md)
  - [fuels](./cli/fuels.md)
  - [create fuels](./cli/create-fuels.md)