# Creating a wallet from mnemonic phrases

A mnemonic phrase is a cryptographically-generated sequence of words that's used to derive a private key. For instance: `"oblige salon price punch saddle immune slogan rare snap desert retire surprise";` would generate the address `0xdf9d0e6c6c5f5da6e82e5e1a77974af6642bdb450a10c43f0c6910a212600185`.

In addition to that, we also support [Hierarchical Deterministic Wallets](https://www.ledger.com/academy/crypto/what-are-hierarchical-deterministic-hd-wallets) and [derivation paths](https://learnmeabitcoin.com/technical/derivation-paths), allowing multiple wallets to be derived from a single root mnemonic. You may recognize a derivation path like:

```text
"m/44'/60'/0'/0/0"
```

In simple terms, this structure enables the creation of multiple wallet addresses from the same mnemonic phrase.

The SDK gives you two wallets from mnemonic instantiation methods: one that takes a derivation path and one that uses the default derivation path, in case you don't want or don't need to configure that.

Here's how you can create wallets with both mnemonic phrases and derivation paths:

1 - Using the default derivation path `m/44'/60'/0'/0/0`

<<< @./snippets/mnemonic/from-mnemonic-phrases-1.ts#snippet-full{ts:line-numbers}

2 - Using a Custom Derivation Path

<<< @./snippets/mnemonic/from-mnemonic-phrases-2.ts#snippet-full{ts:line-numbers}
