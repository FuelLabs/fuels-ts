# Inter-Contract Calls with the SDK

This guide explains how to use the SDK to execute a contract call where one contract interacts with another contract. We will use a simple scenario involving a SimpleToken contract and a TokenDepositor contract.

## Example Scenario: SimpleToken and TokenDepositor Contracts

In this example, we have a SimpleToken contract that represents a basic token contract capable of holding balances for different addresses. We also have a TokenDepositor contract that deposits tokens into the SimpleToken contract.

### SimpleToken Contract

Here's a simple token contract that allows holding balances:

<<< @/../../docs-snippets/contracts/simple-token/src/main.sw#call-external-contracts-1{ts:line-numbers}

### TokenDepositor Contract

The TokenDepositor contract imports the SimpleToken contract and calls its deposit function to deposit tokens:

<<< @/../../docs-snippets/contracts/token-depositor/src/main.sw#call-external-contracts-2{ts:line-numbers}

### Interacting with Contracts using the SDK

Once both contracts are deployed, we can use the SDK to make the TokenDepositor contract call the SimpleToken contract.

<<< @/../../docs-snippets/src/guide/contracts/calling-external-contracts.test.ts#call-external-contracts-3{ts:line-numbers}

Pay attention to the chain method addContracts called by the TokenDepositor contract. This method accepts an array of instances of deployed contracts. Without calling this method, the inter-contract call will not work.
