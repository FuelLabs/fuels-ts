# Transaction Request

A transaction request provides the foundations for submitting a transaction and interacting with the blockchain.

Within Fuel, we have the following transaction types:

- Script
- Create
- Mint

The SDK provides class helpers for handling script and create transactions: `ScriptTransactionRequest` and `CreateTransactionRequest`, respectively.

> **Note**: Mint transactions can only be created by the block producer and do not have any use outside of block creation. Therefore, the SDK only provides the ability to decode them.

## Creating a Transaction Request

To create a transaction request, you must first instantiate either a `ScriptTransactionRequest` or `CreateTransactionRequest`.

A `ScriptTransactionRequest` is used for script transactions, which allows you to execute bytecode on chain to perform a task or chain of tasks. Within the SDK they can be created like so:

<<< @./snippets/transaction-request/create-request.ts#transaction-request-1{ts:line-numbers}

A `CreateTransactionRequest` is used for create transactions, which are transactions that create a new contract on the blockchain.

<<< @./snippets/transaction-request/create-request.ts#transaction-request-2{ts:line-numbers}

> **Note**: We recommend you use the `ContractFactory` for contract deployment as this will shape the create transaction request for you. Information on this can be found in the [contract deployment guide](../contracts/deploying-contracts.md#2-contract-deployment).

## Modifying a Transaction Request

Once you have instantiated a transaction request, you can modify it by setting the transaction parameters and policies. This can either be done manually by directly altering the transaction request object, or through helper methods that are available on the above classes.

### Adding `OutputCoin`

Including `OutputCoin`s in the transaction request specifies the UTXOs that will be created once the transaction is processed. These UTXOs represent the amounts being transferred to specified account addresses during the transaction:

<<< @./snippets/transaction-request/add-output-coin.ts#transaction-request-3{ts:line-numbers}

### Estimating and Funding the Transaction Request

Before submitting a transaction, it is essential to ensure it is properly funded to meet its requirements and cover the associated fee:

<<< @./snippets/transaction-request/estimate-and-fund.ts#transaction-request-4{ts:line-numbers}

This is the recommended approach for manually estimating and funding a transaction before submission. It ensures that the `gasLimit` and `maxFee` are accurately calculated and that the required amounts for `OutputCoin`s are fulfilled. The `fund` method automatically fetches any missing resource amounts from the calling account and adds them to the transaction request.

### Manually Fetching Resources

In certain scenarios, you may need to manually fetch resources. This can be achieved using the `getResourcesToSpend` method, which accepts an array of `CoinQuantities` and returns the necessary resources to meet the specified amounts:

<<< @./snippets/transaction-request/fetch-resources.ts#transaction-request-5{ts:line-numbers}

#### Manually Fetching Coins or Messages

If needed, you can manually include specific coins or messages in the transaction. However, this approach is generally discouraged and should only be used in scenarios where explicitly adding particular coins or messages to the transaction request is required:

<<< @./snippets/transaction-request/fetch-coins.ts#transaction-request-6{ts:line-numbers}

### Adding a Contract Input and Output to a Transaction Request

Imagine that you have a Sway script that manually calls a contract:

<<< @/../../docs/sway/script-call-contract/src/main.sw#transaction-request-7{rs:line-numbers}

In those cases, you will need to add both an `InputContract` and `OutputContract` to the transaction request:

<<< @./snippets/transaction-request/input-contract.ts#transaction-request-8{ts:line-numbers}

### Adding a Predicate to a Transaction Request

Predicates are used to define the conditions under which a transaction can be executed. Therefore you may want to add a predicate to a transaction request to unlock funds that are utilized by a script. This can be added like so:

<<< @./snippets/transaction-request/add-predicate.ts#transaction-request-9{ts:line-numbers}

> **Note**: For more information on predicates, including information on configuring them, funding them and using them to unlock funds, please refer to the [predicate guide](../predicates/index.md).

### Adding a Witness and Signing a Transaction Request

The SDK provides a way of either modifying the witnesses for a transaction request directly, or by passing accounts. This will then sign the transaction request with the account's private key. Below will detail how to add a witness to a transaction request:

<<< @./snippets/transaction-request/add-witness.ts#transaction-request-10{ts:line-numbers}

A more complex example of adding multiple witnesses to a transaction request can be seen in the multiple signers guide [here](../cookbook/transactions-with-multiple-signers.md), which validates the signatures inside the script itself.

> **Note**: Once `addAccountWitnesses` has been called, any additional modifications to the transaction request will invalidate the signature as the transaction ID changes. Therefore, it is recommended to add witnesses last.

### Getting the Transaction ID for a Transaction Request

The transaction ID is a SHA-256 hash of the entire transaction request. This can be useful for tracking the transaction on chain. To get the transaction ID, you can use the following method:

<<< @./snippets/transaction-request/add-witness.ts#transaction-request-11{ts:line-numbers}

> **Note**: Any changes made to a transaction request will alter the transaction ID. Therefore, you should only get the transaction ID after all modifications have been made.
