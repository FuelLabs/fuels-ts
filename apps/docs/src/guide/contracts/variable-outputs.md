# Variable Outputs

Sway includes robust functions for transferring assets to wallets and contracts.

When using these transfer functions within your Sway projects, it is important to be aware that each call will require an [Output Variable](https://docs.fuel.network/docs/specs/tx-format/output#outputvariable) within the [Outputs](https://docs.fuel.network/docs/specs/tx-format/output) of the transaction.

For instance, if a contract function calls a Sway transfer function 3 times, it will require 3 Output Variables present within the list of outputs in your transaction.

## Example: Sway functions that requires `Output Variable`

<<< @/../../docs-snippets2/sway/token/src/main.sw#variable-outputs-1{ts:line-numbers}

## Adding Variable Outputs to the contract call

When your contract invokes any of these functions, or if it calls a function that leads to another contract invoking these functions, you need to add the appropriate number of Output Variables.

This can be done as shown in the following example:

<<< @/../../docs-snippets2/src/contracts/utilities/variable-outputs.ts#variable-outputs-2{ts:line-numbers}

In the TypeScript SDK, the Output Variables are automatically added to the transaction's list of outputs.

This process is done by a brute-force strategy, performing sequential dry runs until no errors are returned. This method identifies the number of Output Variables required to process the transaction.

However, this can significantly delay the transaction processing. Therefore, it is **highly recommended** to manually add the correct number of Output Variables before submitting the transaction.
