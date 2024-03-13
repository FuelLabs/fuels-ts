# Interacting With Contracts

There are 4 ways to interact with contracts: `get`, `dryRun`, `simulate`, `call`.

## `get`

The `get` method should be used to read data from the blockchain without using resources. It can be used with an unfunded wallet or even without a wallet at all:

<<< @/../../docs-snippets/src/guide/contracts/interacting-with-contracts.test.ts#interacting-with-contracts-1{ts:line-numbers}

## `dryRun`

The `dryRun` method should be used to dry-run a contract call. It does not spend resources and can be used with an unfunded wallet or even without a wallet at all:

<<< @/../../docs-snippets/src/guide/contracts/interacting-with-contracts.test.ts#interacting-with-contracts-2{ts:line-numbers}

## `simulate`

The `simulate` method should be used to dry-run a contract call, ensuring that the wallet used has sufficient funds to cover the transaction fees, without consuming any resources.

This dry-run uses the `utxo-validate` parameter set to `true`, enforcing the use of real UTXOs.

A funded wallet it's required:

<<< @/../../docs-snippets/src/guide/contracts/interacting-with-contracts.test.ts#interacting-with-contracts-3{ts:line-numbers}

## `call`

The `call` method should be used to submit a real contract call transaction to the node.

Real resources are consumed, and any operations executed by the contract function will be processed on the blockchain.

<<< @/../../docs-snippets/src/guide/contracts/interacting-with-contracts.test.ts#interacting-with-contracts-4{ts:line-numbers}
