# Wallet Manager

The `WalletManager` is a robust tool designed for managing vaults of wallets. It offers robust management of vaults, including support for custom storage and powerful encryption of all held vaults.

## Key Features

### Managing Vaults with `WalletManager`

This includes adding new wallets to specific vaults, retrieving all wallets from a vault, exporting specific vaults, and exporting private keys. The `WalletManager` class currently supports two types of vaults: `PrivateKeyVault` and `MnemonicVault`.

### Custom Storage Solutions

The `WalletManager` supports defining a custom storage solution, allowing you to specify how and where the encrypted vaults are saved. With support for custom storage, you can make the `WalletManager` to fit your specific needs and security requirements.

### Locking and Unlocking `WalletManager`

The `WalletManager` implements an automatic encryption mechanism, securely saving the wallet's held vaults. This not only preserves the state of your vaults but also ensures robust protection of the stored information. When needed, you can easily unlock and decrypt the vaults using the previously defined password.
