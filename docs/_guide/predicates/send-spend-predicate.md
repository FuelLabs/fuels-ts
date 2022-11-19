# Send and spend funds from predicates

Let's consider the following predicate example:

[@code:rust](./packages/fuel-gauge/test-projects/predicate-triple-sig/src/main.sw#typedoc:Predicate-triple)

This predicate accepts three signatures and matches them to three predefined public keys. The `ec_recover_address` function is used to recover the public key from the signatures. If two of three extracted public keys match the predefined public keys, the funds can be spent. Note that the signature order has to match the order of the predefined public keys.

Let's use the SDK to interact with the predicate. First, let's create three wallets with specific keys. Their hashed public keys are already hard-coded in the predicate.

[@code:typescript](./packages/fuel-gauge/test-projects/predicate-triple-sig/src/main.sw#typedoc:Predicate-triple-wallets)

Next, let's add some coins to the wallets.

[@code:typescript](./packages/fuel-gauge/test-projects/predicate-triple-sig/src/main.sw#typedoc:Predicate-triple-seed)

Now we can load the predicate binary, and prepare some transaction variables.

[@code:typescript](./packages/fuel-gauge/test-projects/predicate-triple-sig/src/main.sw#typedoc:Predicate-triple)

After the predicate address is generated we can send funds to it. Note that we are using the same `transfer` function as we used when sending funds to other wallets. We also make sure that the funds are indeed transferred.

[@code:typescript](./packages/fuel-gauge/test-projects/predicate-triple-sig/src/main.sw#typedoc:Predicate-triple-transfer)

Alternatively, you can use `Wallet.submitPredicate` to setup a `Predicate` and use funds from the `Wallet` you submitted from.

[@code:typescript](./packages/fuel-gauge/test-projects/predicate-triple-sig/src/main.sw#typedoc:Predicate-triple-submit)

To spend the funds that are now locked in this example's Predicate, we have to provide two out of three signatures whose public keys match the ones we defined in the predicate. In this example, the signatures are generated using a zeroed B256 value.

[@code:typescript](./packages/fuel-gauge/test-projects/predicate-triple-sig/src/main.sw#typedoc:Predicate-triple-sign)

After generating the signatures, we can send a transaction to spend the predicate funds. We use the `receiver` wallet as the recipient. We have to provide the predicate byte code and the required signatures. As we provide the correct data, we receive the funds and verify that the amount is correct.

[@code:typescript](./packages/fuel-gauge/test-projects/predicate-triple-sig/src/main.sw#typedoc:Predicate-triple-spend)
