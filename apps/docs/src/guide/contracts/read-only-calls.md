# Interacting With Contracts

There 4 ways to interact with contracts: `get`, `dryRun`, `simulate`, `call`.

## `get`

The `get` method should be used to read data from the blockchain without using resources.

It can be used with an unfunded wallet or even without a wallet at all:

<<< @/../../docs-snippets/src/guide/contracts/read-only-calls.test.ts#read-only-calls-1{ts:line-numbers}

## `dryRun`

The `dryRun` method should be used to dry-run a contract call and does not spend resources.

This dry-run uses the `utxo-validate` parameter set to `false`, allowing the use of fake UTXOs.

It can be used with an unfunded wallet or even without a wallet at all:

<<< @/../../docs-snippets/src/guide/contracts/read-only-calls.test.ts#read-only-calls-2{ts:line-numbers}

## `simulate`

The `simulate` method should be used to dry-run a contract call, ensuring that the wallet used has sufficient funds to cover the transaction fees, without consuming any resources.

This dry-run uses the `utxo-validate` parameter set to `true`, preventing the use of fake UTXOs.

A funded wallet it's required:

<<< @/../../docs-snippets/src/guide/contracts/read-only-calls.test.ts#read-only-calls-3{ts:line-numbers}

## `call`

The `call` method should be used to submit a real contract call transaction to the node.

Real resources are consumed and any operations executed by the called contract function will be processed on the blockchain.

<<< @/../../docs-snippets/src/guide/contracts/read-only-calls.test.ts#read-only-calls-4{ts:line-numbers}
