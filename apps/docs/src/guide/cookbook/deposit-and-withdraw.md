# Deposit And Withdraw

Consider the following contracts:

<<< @/../../../packages/fuel-gauge/test/fixtures/forc-projects/token_contract/src/main.sw#token-contract{rust:line-numbers}

<<< @/../../../packages/fuel-gauge/test/fixtures/forc-projects/liquidity-pool/src/main.sw#liquidity-pool-contract{rust:line-numbers}

The first contract is a contract that represents a simple token.

The second contract, as its name suggests, represents a simplified example of a liquidity pool contract. The method deposit() expects you to supply an arbitrary amount of the `base_token`. As a result, it mints double the amount of the liquidity asset to the calling address. Analogously, if you call `withdraw()` supplying it with the liquidity asset, it will transfer half that amount of the `base_token` back to the calling address except for deducting it from the contract balance instead of minting it.

The first step towards interacting with any contract in the TypeScript SDK is using the `typegen` CLI utility to generate type-safe bindings for the contract methods:

```sh
$ npx fuels typegen -i ./contract/out/debug/*-abi.json -o ./contract-types
```

Next, let's setup a [`Wallet`](../wallets/index.md) and seed it with some coins. We will need these coins to deploy the contracts and to interact with them.

<<< @/../../../packages/fuel-gauge/src/doc-examples.test.ts#deposit-and-withdraw-cookbook-wallet-setup{ts:line-numbers}

Let's now deploy both the contracts and set them up.

<<< @/../../../packages/fuel-gauge/src/doc-examples.test.ts#deposit-and-withdraw-cookbook-contract-deployments{ts:line-numbers}

Next, let's mint some tokens and transfer them to our wallet.

<<< @/../../../packages/fuel-gauge/src/doc-examples.test.ts#deposit-and-withdraw-cookbook-mint-and-transfer{ts:line-numbers}

Now, let's deposit some tokens into the liquidity pool contract. Since we have to transfer assets to the contract, we create the appropriate [`callParams`](../contracts/call-parameters.md) and chain them to the method call.

<<< @/../../../packages/fuel-gauge/src/doc-examples.test.ts#deposit-and-withdraw-cookbook-deposit{ts:line-numbers}

As a final demonstration, let's use all our liquidity asset balance to withdraw from the pool and confirm we retrieved the initial amount. For this, we get our liquidity asset balance and supply it to the `withdraw()` function via `callParams`.

<<< @/../../../packages/fuel-gauge/src/doc-examples.test.ts#deposit-and-withdraw-cookbook-withdraw{ts:line-numbers}
