# Contract Balance

When working with contracts, it's crucial to know the available balance of an asset a contract has while paying for costly operations. This guide will explain the `getBalance` method in the `Contract` class, which allows you to check a contract's available balance.

## The `getBalance` Method

The `Contract` class includes a method called `getBalance` that retrieves the available balance of a specific asset for a contract. This method is particularly useful for determining the remaining balance after sending assets to a contract and executing contract calls.

<<< @/../../../packages/program/src/contract.ts#contract-balance-1{ts:line-numbers}

You can use the `getBalance` method to check how much of the sent amount a contract still has available to spend.

## Checking Contract Balance

Here's an example of how to use the `getBalance` method:

<<< @/../../docs-snippets/src/guide/contracts/contract-balance.test.ts#contract-balance-2{ts:line-numbers}

In this example, we forward assets to the contract three times using three separate calls. We then use the `getBalance` method to check the remaining balance of the contract.

The method returns the total available balance, regardless of how many times assets have been sent or spent on costly operations.
