# The UTXO Model

In UTXO (Unspent Transaction Output) based systems, each coin is unique, similar to how physical currency bills have different denominations.

A UTXO represents a coin with a specific amount, similar to having a $10 or $5 bill. It's crucial to understand this unique feature of UTXOs, as it differs significantly from Ethereum's account-based system.

In Ethereum, balances are tracked as cumulative totals, similar to a bank account, rather than as distinct 'coins' or 'bills'.

## Why UTXOs Matter

Each UTXO corresponds to a unique coin and has an associated amount. This model allows for greater transparency and control in cryptocurrency transactions. Understanding UTXOs is key for effectively managing and tracking your digital assets.

## How UTXOs Work

When you create a transaction, you will use UTXOs from your account to fund it. Here's a step-by-step explanation:

`1. Selecting UTXOs`: The SDK selects one or more UTXOs from your account that together are equal to or greater than the transaction amount plus the transaction fee.

`2. Spending UTXOs`: These selected UTXOs are used to fund the transaction and cover the transaction fee. For example, if you need to send $15 and the transaction fee is $1, and you have $10 and $6 UTXOs, both will be used.

`3. New UTXOs`: If the total value of the selected UTXOs exceeds the transaction amount plus the transaction fee, the difference is returned to your account as new UTXOs. For instance, if you spend a $20 UTXO for a $15 transaction with a $1 fee, a new UTXO worth $4 will be created as change and added back to your account.

In summary, the original UTXOs used in the transaction are marked as spent and cannot be used again. The new UTXOs are available for future transactions.

Suppose you have the following UTXOs in your account:

- $10 UTXO
- $20 UTXO

You want to send $15 to someone, and the transaction fee is $1. Here's what happens:

- The $20 UTXO is selected to fund the $15 transaction and cover the $1 fee.
- The transaction is completed and the $20 UTXO is spent.
- A new $15 UTXO is generated to the recipient, and a new $4 UTXO (change) is created and added to your account.
