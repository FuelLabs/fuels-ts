# Inter-Contract Calls with the SDK

This guide explains how to use the SDK to execute a contract call where one contract interacts with another contract. We will use a simple scenario involving a `SimpleToken` contract and a `TokenDepositor` contract.

## `SimpleToken` and `TokenDepositor` Contracts

In this example, we have a `SimpleToken` contract representing a basic token contract capable of holding balances for different addresses. We also have a `TokenDepositor` contract that deposits tokens into the `SimpleToken` contract.

### Contract: `SimpleToken`

Here's a simple token contract that allows holding balances:

<<< @/../../docs-snippets/test/fixtures/forc-projects/simple-token/src/main.sw#inter-contract-calls-1{ts:line-numbers}

### Contract: `TokenDepositor`

The `TokenDepositor` contract imports the `SimpleToken` contract and calls its `deposit` function to deposit tokens:

<<< @/../../docs-snippets/test/fixtures/forc-projects/token-depositor/src/main.sw#inter-contract-calls-2{ts:line-numbers}

## Inter-contract calls using the SDK

Once both contracts are deployed, we can use the SDK to make the `TokenDepositor` contract to call the `SimpleToken` contract.

<<< @/../../docs-snippets/src/guide/contracts/inter-contract-calls.test.ts#inter-contract-calls-3{ts:line-numbers}

Pay attention to the method `addContracts` called by the `TokenDepositor` contract. This method accepts an array of instances of deployed contracts. Without calling this method, the inter-contract call will not work.
