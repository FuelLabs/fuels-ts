# Errors

All errors thrown from the SDK are instances of the `FuelError` class which will have an accompanying `ErrorCode`.

## Error Codes

Here is a list of the expected error codes the SDK can throw. These error codes are used to help understand the error that has been thrown with potential resolutions.

### `ABI_MAIN_METHOD_MISSING`

When your ABI does not have a `main` method.

This can be resolved by adding a `main` method to your ABI. This is prevalent in scripts and predicates that must contain a `main` method.

### `ABI_TYPES_AND_VALUES_MISMATCH`

When the arguments supplied to the function do not match the minimum required input length.

Check that the arguments supplied to the function match the required type.

### `ACCOUNT_REQUIRED`

When an [`Account`](../../api/Account/Account.md) is required for an operation. This will usually be in the form of a [`Wallet`](../wallets/index.md).

It could be caused during the deployments of contracts when an account is required to sign the transaction. This can be resolved by following the deployment guide [here](../contracts/deploying-contracts.md).

### `CONFIG_FILE_NOT_FOUND`

When a configuration file is not found. This could either be a `fuels.config.[ts,js,mjs,cjs]` file or a TOML file.

Ensure that the configuration file is present in the root directory of your project.

### `CONFIG_FILE_ALREADY_EXISTS`

When a configuration file already exists in the root directory of your project.

You can not run `fuels init` more than once for a given project. Either remove the existing configuration file or update it.

### `CONVERTING_FAILED`

When converting a big number into an incompatible format.

Ensure that the value you've supplied to the big number is compatible with the value you are converting to.

### `CONTRACT_SIZE_EXCEEDS_LIMIT`

When the contract size exceeds the maximum contract size limit.

Ensure that the contract size is less than the maximum contract size limit, of 100 KB. This can be validated by checking the bytecode length of the contract.

### `DUPLICATED_POLICY`

When there are more than policies with the same type, for a transaction.

Ensure that there are no duplicate (by type) policies for a transaction.

### `ERROR_BUILDING_BLOCK_EXPLORER_URL`

When more than one of the following options is passed: `path`, `address`, `txId`, `blockNumber`.

Check that only one of the above is passed.

### `FUNCTION_NOT_FOUND`

When the function with the given name, signature or selector is not found in the ABI.

Check that the function name, signature or selector is correct and exits on the ABI.

### `GAS_LIMIT_TOO_LOW`

When the gas limit is lower than the minimum gas limit.

Increase the gas limit to be greater than the minimum gas limit.

### `GAS_PRICE_TOO_LOW`

When the gas price is lower than the minimum gas price.

Increase the gas price to be greater than the minimum gas price.

### `HD_WALLET_ERROR`

A hardware wallet will throw for unsupported configurations.

The error message will determine which element of the configuration is incorrect. It could be due to the public or private key or when configuring to/from an extended key.

### `INVALID_CHECKSUM`

Checksum validation failed for the provided mnemonic.

Ensure that the mnemonic is correct.

### `INVALID_CONFIGURABLE_CONSTANTS`

When the program type either: does _not_ have configurable constants to be set; or the provided configurable constant does not belong to the program type, as defined by its ABI.

Ensure the configurable constants provided are correct and are defined in ABI.

### `INVALID_COMPONENT`

When an expected component is not found in the ABI or is malformed.

Ensure that you have correctly formed Sway types for [Arrays](../types/arrays.md) and [Vectors](../types/vectors.md).

### `INVALID_CREDENTIALS`

When the password provided is incorrect.

Ensure that the password is correct.

### `INVALID_DATA`

When the value being passed is not considered valid, as defined by the function.

Check the function signature and ensure that the passed value is valid.

### `INVALID_ENTROPY`

When the entropy is not: between 16 and 32 bytes; a multiple of 4.

Ensure that the entropy is between 16 and 32 bytes and a multiple of 4.

### `INVALID_EVM_ADDRESS`

When the provided EVM address is invalid.

Ensure that the [EVM address](../types/evm-address.md) is valid.

### `INVALID_INPUT_PARAMETERS`

When the provided input parameters are _not_ valid.

The error message will determine which parameter is missing. It could be that the provided program type is not one of the following `contract`, `script`, or `predicate`.

### `INVALID_MNEMONIC`

When the supplied mnemonic is invalid.

Check the message for more details. It could be that the mnemonic phrase word length is _not_ one of the following: 12, 15, 18, 21, or 24 lengths.

### `INVALID_PASSWORD`

When the provided password is incorrect.

Ensure that the password is correct.

### `INVALID_POLICY_TYPE`

When the supplied policy type is invalid for the given Script.

Check the policy type is defined in `PolicyType`.

### `INVALID_PROVIDER`

When unable to connect to the `Provider` or `Network` supplied to a method on the [`Fuel`](../wallets/connectors.md) class.

Check that the `Provider` or `Network` is supplied correctly.

### `INVALID_PUBLIC_KEY`

When the provided public key is invalid.

Ensure that the public key is valid.

### `INVALID_RECEIPT_TYPE`

When the receipt type is invalid.

Check the type is within `ReceiptType`.

### `INVALID_REQUEST`

When the request to the Fuel node fails, error messages are propagated from the Fuel node.

Check the error message from the Fuel node.

### `INVALID_SEED`

When the seed length is not between 16 and 64 bytes.

Ensure that the seed length is between 16 and 64 bytes.

### `INVALID_TRANSACTION_INPUT`

When the input type is invalid.

Check the type is within `InputType`.

### `INVALID_TRANSACTION_OUTPUT`

When the output type is invalid.

Check the type is within `OutputType`.

### `INVALID_TRANSACTION_STATUS`

When the transaction status received from the node is unexpected.

Check the status received is within `TransactionStatus`.

### `UNSUPPORTED_TRANSACTION_TYPE`

When the transaction type from the Fuel Node is _not_ supported.

The type is within [`TransactionType`](../../api/Account/TransactionType.md).

### `INVALID_TTL`

When the TTL is less than or equal to zero.

Ensure that the TTL is a number and that the TTL is greater than zero.

### `INVALID_WORD_LIST`

When the word list length is not equal to 2048.

The word list provided to the mnemonic length should be equal to 2048.

### `JSON_ABI_ERROR`

When an ABI type does not conform to the correct format.

It is usually caused by an incorrect type/s within your program, check our type [docs](../types/index.md) here for information on the types we support and their expected format.

### `LOG_TYPE_NOT_FOUND`

When the log type ID supplied can not be found in the ABI.

Check that the log type ID is correct and exists in the ABI.

### `MISSING_CONNECTOR`

A connector is missing when it's required for a given operation.

Ensure that a connector has been supplied to the `Account` or `Wallet`.

### `MISSING_PROVIDER`

A provider is missing when it's required for a given operation.

It could be caused by the provider not being set for either an [`Account`](../../api/Account/index.md) or a [`Wallet`](../wallets/index.md) - use the `connect` method to attach a provider.

### `MISSING_REQUIRED_PARAMETER`

When a required parameter has not been supplied to a given method.

The error message will determine which parameter is missing. This could be caused during type generation when neither `inputs` nor `filepaths` are supplied (at least one is required).

### `NODE_INFO_CACHE_EMPTY`

When the Fuel Node info cache is empty; This is usually caused by not being connected to the Fuel Node.

Ensure that the provider has connected to a Fuel Node successfully.

### `NOT_ENOUGH_FUNDS`

When the account sending the transaction does not have enough funds to cover the transaction fee.

### `TIMEOUT_EXCEEDED`

When the timeout has been exceeded for a given operation.

Check that you're connected to the network and that the network is stable.

### `TYPE_NOT_FOUND`

When the type with the given type ID is not found in the ABI.

Check that the type ID is correct and exists in the ABI.

### `TYPE_NOT_SUPPORTED`

When an unexpected type has been detected - the error message will determine which type is incorrect.

Check the type against your ABI and ensure that it is correct. You can find a list of all our types [here](../types/index.md).

### `UNSUPPORTED_FUEL_CLIENT_VERSION`

When the version of the Fuel Node you are targeting is not supported by the client you are accessing it from.

Check the version of the Fuel Node and use a compatible version of the SDK to target it.

### `WALLET_MANAGER_ERROR`

A wallet manager will throw for a multitude of reasons. The error message will determine which element of the configuration is incorrect.

It could be that the passphrase is incorrect and/or the wallet does _not_ exist in the manager.

### `WORKSPACE_NOT_DETECTED`

When the workspace is not detected in the directory indicated in the message.

Ensure that the workspace is present in the directory specified.

### `HASHER_LOCKED`

The hashing algorithm is currently locked, any subsequent attempts to register a new implementation will throw this error.
The purpose of the lock function is to provide a way to ensure that the implementation of the specific hashing algorithm cannot be changed once it is locked. This can be useful in scenarios where you want to guarantee the integrity and consistency of the hashing function throughout your application.

### `UNKNOWN`

In cases where the error hasn't been mapped yet, this code will be used.

If you believe you found a bug, please report the [issue](https://github.com/FuelLabs/fuels-ts/issues/new/choose) to the team.

### `MAX_INPUTS_EXCEEDED`

When the number of transaction inputs exceeds the maximum limit allowed by the blockchain.

### `MAX_OUTPUTS_EXCEEDED`

When the number of transaction outputs exceeds the maximum limit allowed by the blockchain.
