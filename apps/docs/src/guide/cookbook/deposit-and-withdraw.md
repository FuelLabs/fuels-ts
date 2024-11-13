# Deposit And Withdraw

Consider the following contract:

<<< @/../../docs/sway/liquidity-pool/src/main.sw#deposit-and-withdraw-cookbook-1{rust:line-numbers}

As the name implies, this contract represents a simplified version of a liquidity pool. The `deposit()` method allows you to supply an arbitrary amount of `BASE_TOKEN`. In response, it mints twice the amount of the liquidity asset to the caller's address. Similarly, the `withdraw()` method transfers half the amount of the `BASE_TOKEN` back to the caller's address.

Now, let's deposit some tokens into the liquidity pool contract. Since this requires forwarding assets to the contract, we need to pass the appropriate values to `callParams` when creating a contract call.

<<< @/../../docs/src/snippets/cookbook/deposit-and-withdraw/deposit.ts#deposit-and-withdraw-cookbook-2{ts:line-numbers}

As a final demonstration, let's use all our liquidity asset balance to withdraw from the pool and confirm we retrieved the initial amount. For this, we get our liquidity asset balance and supply it to the `withdraw()` function via `callParams`.

<<< @/../../docs/src/snippets/cookbook/deposit-and-withdraw/withdraw.ts#deposit-and-withdraw-cookbook-3{ts:line-numbers}
