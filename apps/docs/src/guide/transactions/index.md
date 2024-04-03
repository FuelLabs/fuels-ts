# Transactions

A transaction is a way of interacting with a Fuel blockchain and can include actions like transferring assets, deploying contracts and minting tokens.

Within the Fuel Network, we have the following transaction types:

- Script
- Create
- Mint

The SDK provides class helpers for handling script and create transactions: `ScriptTransactionRequest` and `CreateTransactionRequest`, respectively.
Mint transactions can only be created by the block producer and do not have any use outside of block creation. Therefore, the SDK only provides the ability to decode them.

This guide will discuss how to create, modify and submit transactions to the network, as well as how to get info on transactions that have previously executed.
