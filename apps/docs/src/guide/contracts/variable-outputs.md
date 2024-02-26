# Variable Outputs

Sway includes robust functions for transferring assets to wallets and contracts.

When using these transfer functions within your Sway projects, it is important to be aware that each call will require an [Output Variable](https://specs.fuel.network/master/tx-format/output.html#outputvariable) within the [Outputs](https://specs.fuel.network/master/tx-format/output.html) of the transaction.

For instance, if a contract function calls a Sway transfer function 3 times, it will requires 3 Output Variables present within the list of outputs into your transaction.

## Example: Sway's built-in functions that requires `Output Variable`

<<< @/../../docs-snippets/test/fixtures/forc-projects/token/src/main.sw#variable-outputs-1{ts:line-numbers}

> **Note:** Functions like `mint` and `burn` also requires an Output Variable for each call, as they internally execute the transfer function.

## Adding Variable Outputs to the contract call

When your contract invokes any of theses functions, or if it calls a function that leads to another contract invoking theses functions, you need to add the appropriate number of Output Variables.

This is can be done as shows the following example:

<<< @/../../docs-snippets/src/guide/contracts/transaction-parameters.test.ts#variable-outputs-1{ts:line-numbers}

In the TypeScript SDK, the Output Variables are automatically added to the transaction's list of outputs.

This process is done by a brute-force strategy, performing sequential dry runs until no errors are returned. This method identifies the number of Output Variables required in order to process the transaction.

However, this can significantly delay the transaction processing. Therefore it is **highly recommended** to manually add the correct number of Output Variables before submitting the transaction.
