# Setting up test wallets

You'll often want to create one or more test wallets when testing your contracts. Here's how to do it.

## Create a single wallet

```ts:line-numbers
import { Wallet, WalletLocked, WalletUnlocked } from "fuels";

// use the `generate` helper to make an Unlocked Wallet
const myWallet: WalletUnlocked = Wallet.generate();

// or use an Address to create a wallet
const someWallet: WalletLocked = Wallet.fromAddress(myWallet.address);
```

###### [See code in context](https://github.com/FuelLabs/fuels-ts/blob/master/packages/fuel-gauge/src/doc-examples.test.ts#L155-L163)

## Setting up multiple test wallets

If you need multiple test wallets, they can be set up as follows:

```ts:line-numbers
import { Provider, bn } from "fuels";
import { generateTestWallet } from "@fuel-ts/wallet/test-utils";
const provider = new Provider("http://127.0.0.1:4000/graphql");
const assetIdA =
  "0x0101010101010101010101010101010101010101010101010101010101010101";
const assetIdB =
  "0x0202020202020202020202020202020202020202020202020202020202020202";

// single asset
const walletA = await generateTestWallet(provider, [[42, NativeAssetId]]);

// multiple assets
const walletB = await generateTestWallet(provider, [
  // [Amount, AssetId]
  [100, assetIdA],
  [200, assetIdB],
  [30, NativeAssetId],
]);

// this wallet has no assets
const walletC = await generateTestWallet(provider);

// retrieve balances of wallets
const walletABalances = await walletA.getBalances();
const walletBBalances = await walletB.getBalances();
const walletCBalances = await walletC.getBalances();

// validate balances
expect(walletABalances).toEqual([{ assetId: NativeAssetId, amount: bn(42) }]);
expect(walletBBalances).toEqual([
  { assetId: NativeAssetId, amount: bn(30) },
  { assetId: assetIdA, amount: bn(100) },
  { assetId: assetIdB, amount: bn(200) },
]);
expect(walletCBalances).toEqual([]);
```

###### [See code in context](https://github.com/FuelLabs/fuels-ts/blob/master/packages/fuel-gauge/src/doc-examples.test.ts#L212-L246)
