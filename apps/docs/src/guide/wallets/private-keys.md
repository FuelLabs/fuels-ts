# Creating a wallet from a private key

A new wallet with a randomly generated private key can be created by supplying `Wallet.generate`.

```ts:line-numbers
import { Wallet, WalletLocked, WalletUnlocked } from "fuels";

// use the `generate` helper to make an Unlocked Wallet
const myWallet: WalletUnlocked = Wallet.generate();

// or use an Address to create a wallet
const someWallet: WalletLocked = Wallet.fromAddress(myWallet.address);
```

###### [See code in context](https://github.com/FuelLabs/fuels-ts/blob/master/packages/fuel-gauge/src/doc-examples.test.ts#L155-L163)

---

Alternatively, you can create a wallet from a Private Key:

```ts:line-numbers
// unlock an existing wallet
let unlockedWallet: WalletUnlocked = lockedWallet.unlock(PRIVATE_KEY);
// or directly from a private key
unlockedWallet = Wallet.fromPrivateKey(PRIVATE_KEY);
```

###### [See code in context](https://github.com/FuelLabs/fuels-ts/blob/master/packages/fuel-gauge/src/doc-examples.test.ts#L169-L174)

---

You can obtain an address to a private key using the `Signer` package

```ts:line-numbers
const signer = new Signer(PRIVATE_KEY);
// validate address
expect(wallet.address).toEqual(signer.address);
```

###### [See code in context](https://github.com/FuelLabs/fuels-ts/blob/master/packages/fuel-gauge/src/doc-examples.test.ts#L259-L263)
