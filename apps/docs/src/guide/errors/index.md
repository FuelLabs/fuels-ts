# Errors

All errors thrown from our SDK are instances of the `FuelError` class, which will have an accompanying `ErrorCode`. Below you will find a table with all our expected error codes and their descriptions.

## Error Codes

Here are a list of the expected error code's that can be thrown by the SDK. These error codes are used to help you debug and understand the error that has been thrown.ß

Error Codes | Description
--- | ---
ABI_MAIN_METHOD_MISSING | When your ABI does not have a main method. This can be resolved by adding a main method to your ABI.
ABI_TYPES_AND_VALUES_MISMATCH | When the arguments supplied to the function do not match the minimum required input length. Check that the arguments supplied to the function, match the required type.
ACCOUNT_REQUIRED | When the account has not been set for the contract.
CONVERTING_FAILED | When the `bn` function failed to convert a value supplied.
DUPLICATED_POLICY | When there are policies with the same type.
ERROR_BUILDING_BLOCK_EXPLORER_URL | When more than one of the following is options is passed: "path", "address", "txId", "blockNumber"
FRAGMENT_NOT_FOUND | When the function fragment is not found in the ABI.
FUNCTION_NOT_FOUND | When the function with the given name, signature or selector is not found in the ABI.
GAS_LIMIT_TOO_LOW | When the gas limit is lower than the minimum gas limit.
GAS_PRICE_TOO_LOW | When the gas price is lower than the minimum gas price.
HD_WALLET_ERROR | When neither privateKey nor publicKey is provided (at least one should be provided).
HD_WALLET_ERROR | When the depth is greater than 255.
HD_WALLET_ERROR | When the depth is zero but fingerprint/index is non-zero.
HD_WALLET_ERROR | When the path is invalid.
HD_WALLET_ERROR | When the provided key has an invalid checksum.
HD_WALLET_ERROR | When the provided key is an invalid **public** extended key.
HD_WALLET_ERROR | When the provided key is an invalid **private** extended key.
HD_WALLET_ERROR | When the provided key is an invalid extended key.
HD_WALLET_ERROR | When trying to derive the index without a private key set.
INVALID_CHECKSUM | Checksum validation failed for the provided mnemonic.
INVALID_CONFIGURABLE_CONSTANTS | When the ABI interface has no configurables to be set.
INVALID_CONFIGURABLE_CONSTANTS | When the ABI interface provided is `undefined`.
INVALID_CONFIGURABLE_CONSTANTS | When the contract does not have a configurable with the specified name.
INVALID_CONFIGURABLE_CONSTANTS | When the contract does not have configurables to be set.
INVALID_CONFIGURABLE_CONSTANTS | When the provided configurable constant is not found in the ABI interface.
INVALID_CONFIGURABLE_CONSTANTS | When the script does not have a configurable constant with the provided name.
INVALID_CONFIGURABLE_CONSTANTS | When the script does not have configurable constants to be set.
INVALID_CREDENTIALS | When the password provided is incorrect.
INVALID_DATA | When the value is more than the max value.
INVALID_ENTROPY | When the entropy is not: between 16 and 32 bytes; a multiple of 4.
INVALID_EVM_ADDRESS | When the provided Evm address is invalid.
INVALID_INPUT_PARAMETERS | When commitBlockId and commitBlockHeight are used together.
INVALID_INPUT_PARAMETERS | When the provided programType is not one of the valid types ("contract", "script", "predicate").
INVALID_INPUT_PARAMETERS | When the provided string is not a valid UTF-8 string.
INVALID_MNEMONIC | When the mnemonic phrase is not: 12, 15, 18, 21, or 24 words in length.
INVALID_MNEMONIC | When the provided mnemonic is invalid.
INVALID_MULTICALL | When the multi-call has a call that returns a heap type that is not the last call.
INVALID_MULTICALL | When the multi-call has more than one call that returns a heap type.
INVALID_PASSWORD | When the provided password is incorrect.
INVALID_POLICY_TYPE | When the supplied policy type is invalid.
INVALID_PUBLIC_KEY | When the provided public key is invalid
INVALID_RECEIPT_TYPE | When the receipt type is invalid.
INVALID_REQUEST | When the request to the Fuel node fails, error messages are propagated from the Fuel node.
INVALID_SEED | When the seed length is not between 16 and 64 bytes.
INVALID_TRANSACTION_INPUT | When the input type is invalid.
INVALID_TRANSACTION_OUTPUT | When the output type is invalid.
INVALID_TRANSACTION_STATUS | When the transaction status is invalid. 
INVALID_TRANSACTION_TYPE | When the transaction type is not recognized.
INVALID_TTL | When the TTL is less than or equal to zero.
INVALID_TTL | When the TTL is not a number.
INVALID_WORD_LIST | When the wordlist length is not equal 2048.
JSON_ABI_ERROR | When the struct name cannot be extracted from the JSON ABI.
LOG_TYPE_NOT_FOUND | When the log type ID supplied, can't be found in the ABI.
MISSING_CONNECTOR | A connector is required to sign messages.
MISSING_PROVIDER | The provider has not been set for either an Account or a Contract. Use the `connect` method to attach a provider.
MISSING_REQUIRED_PARAMETER | When neither `inputs` or `filepaths` are supplied (at least one is required).
NODE_INFO_CACHE_EMPTY | When the node info cache is empty within the Provider.
TYPE_NOT_FOUND | When the type with the given type ID is not found in the ABI.
TYPE_NOT_SUPPORTED | When the type that has been supplied, is not supported by our current coding standards.
UNSUPPORTED_FUEL_CLIENT_VERSION | When the client version is not supported by the Fuel node.
WALLET_MANAGER_ERROR | When the condition is not met.
WALLET_MANAGER_ERROR | When the vault can not be found.
WALLET_MANAGER_ERROR | When the vault type is not found.
WALLET_MANAGER_ERROR | When the wallet is locked.
WALLET_MANAGER_ERROR | When the wallet address provided, can not be found.
