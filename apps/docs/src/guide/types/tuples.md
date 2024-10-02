# Tuples

In Sway, Tuples are fixed-length collections of heterogeneous elements. Tuples can store multiple data types, including basic types, structs, and enums. This guide will demonstrate how to represent and work with Tuples in TypeScript and interact with a contract function that accepts a tuple as a parameter.

In TypeScript, you can represent Sway tuples using arrays with specified types for each element:

<<< @/../../docs-snippets2/src/types/tuples.ts#tuples-1{ts:line-numbers}

In this example, the Typescript `tuple` variable contains three elements of different types: a number, a boolean, and another number.

## Example: Passing Tuple as a Parameter

Let's consider a contract function that accepts a tuple as a parameter and returns the same Tuple:

<<< @/../../docs-snippets2/sway/echo-values/src/main.sw#tuples-2{rust:line-numbers}

To execute and validate the contract function using the SDK, follow these steps:

<<< @/../../docs-snippets2/src/types/tuples.ts#tuples-3{ts:line-numbers}

In this example, we create a Tuple with three elements, call the `echo_tuple` contract function, and expect the returned tuple to match the original one. Note that we convert the third element of the returned tuple to a number using `new BN(value[2]).toNumber()`.

Tuples in Sway provide a convenient way to store and manipulate collections of heterogeneous elements. Understanding how to represent and work with tuples in TypeScript and Sway contracts will enable you to create more versatile and expressive code.

## Full Example

<<< @/../../docs-snippets2/src/types/tuples.ts#full{ts:line-numbers}
