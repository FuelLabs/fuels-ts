# Options

Sway provides the `Option` (optional) container for handling variables that can have a value or be marked as `no-value`. This concept is useful when dealing with situations where a variable may or may not have a defined value.

In this guide, we'll explain how to work with Option types in Sway and demonstrate their usage through a practical example.

## Overview of `Option` Type

The `Option` type in Sway is a special wrapper type of Enum. In TypeScript, you can represent the `Option` type by using the `undefined` keyword, as shown in the following example

<<< @/../../docs-snippets2/src/types/options/overview-of-option.ts#snippet-1{ts:line-numbers}

In this example, the variable `input1` can be either a `number` or `undefined`.

## Example: `Option<u8>` Parameters

Let's say we have a contract function that accepts two `Option<u8>` parameters. Both of these parameters can have a value or be undefined. The function checks whether each input has a value; if not, it assigns a value of `0`. Finally, the function returns the sum of the two inputs.

Here's the contract function written in Sway:

<<< @/../../docs-snippets2/sway/sum-option-u8/src/main.sw#options-2{rust:line-numbers}

You can interact with the contract function using the SDK as follows:

<<< @/../../docs-snippets2/src/types/options/overview-of-option.ts#snippet-2{ts:line-numbers}

In this case, the result of the contract function call is the sum of both input parameters. If we pass only one parameter, the contract function will default the other parameter's value to `0`.

<<< @/../../docs-snippets2/src/types/options/example-option-u8.ts#snippet-1{ts:line-numbers}

Using `Option` types in Sway allows you to elegantly handle situations where a variable may or may not have a defined value.
