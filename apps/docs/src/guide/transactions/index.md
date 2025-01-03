# Transactions

A transaction is a way of interacting with a Fuel blockchain and can include actions like transferring assets, deploying contracts and minting tokens. All of which are possible through the SDK by using simple utility methods or building out more custom transactions.

Transferring assets is the most common transaction type and can be be executed by calling the `transfer` function from an account to a recipient address:

<<< @./snippets/transaction.ts#transactions-1{ts:line-numbers}

Deploying and interacting with contracts are other common transactions. More information on this can be found in the [contracts guide](../contracts/index.md), either through the [contract deployment guide](../contracts/deploying-contracts.md) or the [contract interaction guide](../contracts/methods.md).

This guide will discuss how to create and modify transactions to fit bespoke use cases, as well as submit them to the network using transactional policies and parameters. As well as retrieving information about submitted transactions.
