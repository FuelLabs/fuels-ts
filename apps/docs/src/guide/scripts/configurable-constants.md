# Script With Configurable

In the same way as [contracts](../contracts/configurable-constants.md) and [predicates](../predicates/configurable-constants.md), Scripts also support configurable constants. This feature enables dynamic adjustment of certain values within your scripts.

Configurable constants are fairly straightforward to add and set in your scripts.

Let's consider the following script:

<<< @/../../docs-snippets2/sway/script-sum/src/main.sw#script-with-configurable-contants-1{rust:line-numbers}

In this script, `AMOUNT` is a configurable constant with a default value of `10`. The main function returns the sum of the `inputted_amount` and the configurable constant `AMOUNT`.

To change the value of the `AMOUNT` constant, we can use the `setConfigurableConstants` method as shown in the following example:

<<< @/../../docs-snippets2/src/scripts/script-with-configurable.ts#script-with-configurable-contants-2{ts:line-numbers}

In this example, we're setting a new value `81` for the `AMOUNT` constant. We then call the main function with an inputted value of `10`.

The expectation is that the script will return the sum of the inputted value and the new value of `AMOUNT`.

This way, configurable constants in scripts allow for more flexibility and dynamic behavior during execution.


## Full Example

For a full example, see below:

<<< @/../../docs-snippets2/src/scripts/script-with-configurable.ts#full{ts:line-numbers}
