# Locking and Unlocking `WalletManager`

This guide will walk you through the process of managing the lock state of your wallets using the `WalletManager`.

## Initializing and Unlocking the `WalletManager`

As mentioned earlier, a `WalletManager` instance begins in a locked state. Before usage, you need to unlock it by providing a password via the unlock method.

<<< @/../../docs-snippets/src/guide/wallet-manager/locking-and-unlocking-wallet-manager.test.ts#locking-and-unlocking-wallet-manager-1{ts:line-numbers}

## Locking the `WalletManager`

When you lock the `WalletManager` using the `lock` method, all its vaults and associated accounts (wallets) are cleared. This clearance is possible due to the encryption and saving of all data by the storage system. `WalletManager` frequently uses the storage system to preserve its state. Consequently, sensitive operations including exporting vaults, private keys, accessing wallets, and saving/loading the `WalletManager` state are not possible when it is locked.

<<< @/../../docs-snippets/src/guide/wallet-manager/locking-and-unlocking-wallet-manager.test.ts#locking-and-unlocking-wallet-manager-2{ts:line-numbers}

Remember, it's crucial to lock your `WalletManager` when it's not in use to ensure the safety of your funds.

## Reaccessing Your Wallets by Unlocking the `WalletManager`

The `unlock` method requires the previously set password to unlock the `WalletManager` and all its vaults. The password decrypts the stored vaults, allowing `WalletManager` to load its saved data.

<<< @/../../docs-snippets/src/guide/wallet-manager/locking-and-unlocking-wallet-manager.test.ts#locking-and-unlocking-wallet-manager-3{ts:line-numbers}

Providing an incorrect password will result in an error. However, when unlocked successfully, `WalletManager` is ready for use again.

## Verifying the Lock State

You can confirm the current lock state of the `WalletManager` by using the `isLocked` method:

<<< @/../../docs-snippets/src/guide/wallet-manager/locking-and-unlocking-wallet-manager.test.ts#locking-and-unlocking-wallet-manager-4{ts:line-numbers}

## Updating the Password

To change the current password, invoke the `updatePassphrase` method, and provide both the old and new passwords:

<<< @/../../docs-snippets/src/guide/wallet-manager/locking-and-unlocking-wallet-manager.test.ts#locking-and-unlocking-wallet-manager-5{ts:line-numbers}

## Reminder: Always Lock Your `WalletManager`

Always ensure you lock the `WalletManager` after completing operations. This step is critical for securing your wallets.

<<< @/../../docs-snippets/src/guide/wallet-manager/locking-and-unlocking-wallet-manager.test.ts#locking-and-unlocking-wallet-manager-6{ts:line-numbers}

By using `WalletManager` to manage lock and unlock states, you introduce an additional layer of security. Never forget to lock your `WalletManager` when it's not in use.
