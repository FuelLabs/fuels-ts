# Wallets

Wallets can be used for many important things, for instance:

1. Checking your balance;
2. Transferring coins to a destination address or contract;
3. Signing messages and transactions;
4. Paying for network fees when sending transactions or deploying smart contracts.

## Wallets Instances

The SDK has multiple Wallets related classes:

- [Wallet](../../api/Account/Wallet): Works simply like a wrapper providing methods to create and instantiating `WalletUnlocked` and `WalletLocked` instances.

- [WalletLocked](../../api/Account/WalletLocked): Provides the functionalities for a locked wallet.

- [WalletUnlocked](../../api/Account/WalletUnlocked): Provides the functionalities for an unlocked wallet.

- [Account](../../api/Account/Account): Provides an abstraction with basically functionalities for wallets or accounts to interact with the network. It is important to notice that both `WalletLocked` and `WalletUnlocked` extends from the `Account` class.

Let's explore these different approaches in the following sub-chapters.

> **Note:** Keep in mind that you should never share your private/secret key. And in the case of wallets that were derived from a mnemonic phrase, never share your mnemonic phrase. If you're planning on storing the wallet on disk, do not store the plain private/secret key and do not store the plain mnemonic phrase. Instead, use `WalletManager` to encrypt its content first before saving it to disk.
