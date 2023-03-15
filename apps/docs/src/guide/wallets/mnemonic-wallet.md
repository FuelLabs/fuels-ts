# Creating a wallet from mnemonic phrases

A mnemonic phrase is a cryptographically-generated sequence of words that's used to derive a private key. For instance: `"oblige salon price punch saddle immune slogan rare snap desert retire surprise";` would generate the address `0xdf9d0e6c6c5f5da6e82e5e1a77974af6642bdb450a10c43f0c6910a212600185`.

In addition to that, we also support [Hierarchical Deterministic Wallets](https://www.ledger.com/academy/crypto/what-are-hierarchical-deterministic-hd-wallets) and [derivation paths](https://learnmeabitcoin.com/technical/derivation-paths). You may recognize the string `"m/44'/60'/0'/0/0"` from somewhere; that's a derivation path. In simple terms, it's a way to derive many wallets from a single root wallet.

The SDK gives you two wallets from mnemonic instantiation methods: one that takes a derivation path and one that uses the default derivation path, in case you don't want or don't need to configure that.

Here's how you can create wallets with both mnemonic phrases and derivation paths:

```ts:line-numbers
const walletManager = new WalletManager();
const password = "0b540281-f87b-49ca-be37-2264c7f260f7";

await walletManager.unlock(password);

// Add a vault of type mnemonic
await walletManager.addVault(config);
```

###### [See code in context](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/wallet-manager.test.ts#L13-L22)
