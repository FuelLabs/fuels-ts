# Transactions

A transaction is any interaction with the blockchain. This is the primary way of interacting with the Fuel Network and can include actions like transferring assets, deploying contracts and minting tokens.

Within the Fuel Network, we have the following transaction types:

- Script
- Create
- Mint

The SDK provides class helpers for handling script and create transactions, `ScriptTransactionRequest` and `CreateTransactionRequest` respectively. Mint transactions are recognized by the SDK but can only be created by the block producer so do not have use any use outside of block creation. Therefore there is no need to manually create them.

This guide will discuss how to modify transactions, set their transaction parameters and policies, and submit them to the network to then produce an extractable transaction response.
