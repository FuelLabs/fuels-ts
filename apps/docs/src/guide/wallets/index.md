# Wallets

Wallets can be used for many important things, for instance:

1. Checking your balance;
2. Transferring coins to a destination address or contract;
3. Signing messages and transactions;
4. Paying for network fees when sending transactions or deploying smart contracts.

## Wallets Instances

The SDK has multiple classes related to a Wallet instance:

- [Wallet](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_account.Wallet.html): Works simply like a wrapper providing methods to create and instantiating `WalletUnlocked` and `WalletLocked` instances.

- [WalletLocked](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_account.WalletUnlocked.html): Provides the functionalities for a locked wallet.

- [WalletUnlocked](https://fuels-ts-docs-api.vercel.app/Account/WalletUnlocked.md): Provides the functionalities for an unlocked wallet.

- [Account](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_account.Account.html): Provides an abstraction with basic functionalities for wallets or accounts to interact with the network. It is essential to notice that both `WalletLocked` and `WalletUnlocked` extend from the `Account` class.

Let's explore these different approaches in the following sub-chapters.

> **Note:** Keep in mind that you should never share your private/secret key. And in the case of wallets that were derived from a mnemonic phrase, never share your mnemonic phrase. If you're planning on storing the wallet on disk, do not store the plain private/secret key and do not store the plain mnemonic phrase. Instead, use `WalletManager` to encrypt its content first before saving it to disk.
