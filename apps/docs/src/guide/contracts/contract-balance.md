# Contract Balance

When working with contracts, it's crucial to be aware of the available contract balance of an asset while paying for costly operations. This guide will explain the `getBalance` method in the [Contract](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_program.Contract.html) class, which allows you to check a contract's available balance.

## The `getBalance` Method

The [`Contract`](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_program.Contract.html) class includes a method called `getBalance` that retrieves the available balance of a specific asset for a contract. This method is particularly useful for determining the remaining balance after sending assets to a contract and executing contract calls.

<<< @/../../../packages/program/src/contract.ts#contract-balance-1{ts:line-numbers}

## Checking Contract Balance

Consider a simple contract that transfers a specified amount of a given asset to an address:

<<< @/../../docs-snippets/test/fixtures/forc-projects/transfer-to-address/src/main.sw#contract-balance-2{rust:line-numbers}

The `transfer` function has three parameters:

1. `amount_to_transfer`: The amount that is being transferred.

2. `asset`: The address of the deployed contract Token.

3. `recipient`: The address from the receiver's wallet.

The `transfer` function calls the built-in Sway function `transfer_to_address`, which does precisely what the name suggests.

Let's execute this contract and use the `getBalance` method to validate the remaining asset amount the contract has left to spend.

<<< @/../../docs-snippets/src/guide/contracts/contract-balance.test.ts#contract-balance-3{ts:line-numbers}

In this example, we first forward an asset amount greater than the amount required for the transfer and then execute the contract call.

Finally, we use the `getBalance` method to confirm that the contract balance is precisely the total forwarded amount minus the transferred amount.

It is important to note that this method returns the total available contract balance, regardless of how often assets have been sent or spent on costly operations.
