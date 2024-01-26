# Testing in TS

As noted in [the testing intro](./index.md), you are free to test your Sway and TS-SDK code with any JS framework available. Below we have an example of how to load and test a contract using `Vitest`, but the general principles and steps are the same for any testing harness.

Here is a simple Sway program that takes an input and then returns it:

<<< @/../../demo-typegen/contract/src/main.sw#Testing-in-ts-rust{rust:line-numbers}

Here is JavaScript code testing the above program using a conventional `Vitest` setup:

<<< @/../../demo-typegen/src/demo.test.ts#Testing-in-ts-ts{ts:line-numbers}

> **Note:** The TS-SDK has recently migrated to `Vitest` however it follows a very similar API to Jest, and the above example applies to Jest also.