# Bits512

In Sway, the `b512` type is commonly used to handle public keys and signatures. This guide will explain how the `b512` type is defined in Sway, how to visualize a `b512` value using the SDK, and how to interact with a contract function that accepts a `b512` parameter.

The `b512` type in Sway is a wrapper around two `b256` types, allowing for the representation of 64-byte values. It is defined as a struct:

<<< @/../../docs/sway/bytecode-input/src/main.sw#b512-1{rs:line-numbers}

## `b512` in the SDK

In the SDK, you can visualize a `b512` value by examining a wallet's public key:

<<< @/../../docs/src/snippets/types/bits512/b512-in-the-sdk.ts#snippet-1{ts:line-numbers}

## Example: Echoing a `b512` Value in a Contract Function

Let's consider a contract function that accepts a `b512` parameter and returns the same value:

<<< @/../../docs/sway/echo-values/src/main.sw#bits512-3{rust:line-numbers}

To call this function and validate the returned value, follow these steps:

<<< @/../../docs/src/snippets/types/bits512/echoing-a-b512.ts#snippet-1{ts:line-numbers}

In this example, we generate a wallet, use its public key as the `b512` input, call the `echo_b512` contract function, and expect the returned value to match the original input.
