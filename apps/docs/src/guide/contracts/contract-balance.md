# Contract Balance

When working with contracts, it's crucial to be aware of the available contract balance of an asset while paying for costly operations. This guide will explain the `getBalance` method in the [Contract](../../api/Program/Contract.md) class, which allows you to check a contract's available balance.

## The `getBalance` Method

The [`Contract.getBalance`](../../api/Program/Contract.md#getbalance) method retrieves the available balance of a specific asset on your contract. This method is particularly useful for determining the remaining balance after sending assets to a contract and executing contract calls.

It is important to note that this method returns the total available contract balance, regardless of how often assets have been sent to it or spent.

## Checking Contract Balance

Consider a simple contract that transfers a specified amount of a given asset to an address:

<<< @/../../docs/sway/transfer-to-address/src/main.sw#full{rust:line-numbers}

The `transfer` function has three parameters:

1. `amount_to_transfer`: The amount that is being transferred.

2. `asset`: The address of the deployed contract token.

3. `recipient`: The address of the receiver's wallet.

The `transfer` function calls the built-in Sway function `transfer_to_address`, which does precisely what the name suggests.

Let's execute this contract and use the `getBalance` method to validate the remaining asset amount the contract has left to spend.

<<< @./snippets/contract-balance.ts#example{ts:line-numbers}

In this example, we first forward an asset amount greater than the amount required for the transfer, and then we execute the contract call.

Finally, we use the `getBalance` method to confirm that the contract balance is precisely the total forwarded amount minus the transferred amount.
