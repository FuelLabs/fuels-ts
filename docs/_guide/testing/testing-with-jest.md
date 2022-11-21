# Testing with Jest

As noted in [the testing intro](./index.md), you are free to test your Sway and TS-SDK code with any JS framework available. Below we have an example of how to load and test a contract using Jest, but the general principles and steps are the same for any testing harness.

Here is a simple Sway program that takes an input and then returns it:
[@code:rust](./packages/example-contract/src/main.sw#typedoc:Testing-with-jest-contract)

Here is JavaScript code testing the above program using a conventional Jest setup:
[@code:typescript](./packages/example-contract/src/example-contract.test.ts#typedoc:Testing-with-jest)
