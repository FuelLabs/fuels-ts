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

A funded wallet it's required:

<<< @/../../docs-snippets/src/guide/contracts/interacting-with-contracts.test.ts#interacting-with-contracts-3{ts:line-numbers}

## `call`

The `call` method should be used to submit a real contract call transaction to the node.

Real resources are consumed, and any operations executed by the contract function will be processed on the blockchain.

<<< @/../../docs-snippets/src/guide/contracts/interacting-with-contracts.test.ts#interacting-with-contracts-4{ts:line-numbers}

## `isReadOnly` (utility)

If you want to figure out whether a function is read-only, you can use the `isReadOnly` method:

<<< @/../../docs-snippets/src/guide/contracts/is-function-readonly.test.ts#is-function-readonly-1{ts:line-numbers}

If the function is read-only, you can use the `get` method to retrieve onchain data without spending gas.

If the function is not read-only you will have to use the `call` method to submit a transaction onchain which incurs a gas fee.
