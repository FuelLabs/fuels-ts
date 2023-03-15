# Signing

Once you've instantiated your wallet in an unlocked state using one of the previously discussed methods, you can sign a message with `wallet.sign_message`. Below is a full example of how to sign and recover a message.

```ts:line-numbers
import { WalletUnlocked, hashMessage, Signer } from "fuels";
const wallet = WalletUnlocked.generate();
const message = "doc-test-message";
const signedMessage = await wallet.signMessage(message);
const hashedMessage = hashMessage(message);
const recoveredAddress = Signer.recoverAddress(hashedMessage, signedMessage);

expect(wallet.privateKey).toBeTruthy();
expect(wallet.publicKey).toBeTruthy();
expect(wallet.address).toEqual(recoveredAddress);
```

###### [See code in context](https://github.com/FuelLabs/fuels-ts/blob/master/packages/fuel-gauge/src/doc-examples.test.ts#L197-L208)

---

You can also sign a _transaction_ by using `wallet.sign_transaction`. Below is a full example of how to sign and recover a transaction.

```ts:line-numbers
import { WalletUnlocked, hashMessage, Signer } from "fuels";
const wallet = new WalletUnlocked(signTransactionTest.privateKey);
const transactionRequest = signTransactionTest.transaction;
const signedTransaction = await wallet.signTransaction(transactionRequest);
const verifiedAddress = Signer.recoverAddress(
  hashTransaction(transactionRequest),
  signedTransaction
);

expect(signedTransaction).toEqual(signTransactionTest.signedTransaction);
expect(verifiedAddress).toEqual(wallet.address);
```

###### [See code in context](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet-unlocked.test.ts#L38-L50)
