# Launching a Test Node

To simplify testing in isolation, we provide a utility called `launchTestNode`.

It allows you to spin up a short-lived `fuel-core` node, set up a custom provider, wallets, deploy contracts, and much more in one go.

For usage information for `launchTestNode` including it's inputs, outputs and options, please check the [API reference](https://fuels-ts-docs-api.vercel.app/functions/_fuel_ts_contract.test_utils.launchTestNode.html).

## Explicit Resource Management

We support [explicit resource management](https://www.typescriptlang.org/docs/handbook/variable-declarations.html#using-declarations), introduced in TypeScript 5.2, which automatically calls a `cleanup` function after a variable instantiated with the `using` keyword goes out of block scope:

<<< @/../../docs-snippets2/src/testing/launching-a-test-node.ts#automatic-cleanup{ts:line-numbers}

### Configuring Typescript

To use [explicit resource management](https://www.typescriptlang.org/docs/handbook/variable-declarations.html#using-declarations), you must:

1.  Set your TypeScript version to `5.2` or above
2.  Set the compilation target to `es2022` or below
3.  Configure your lib setting to either include `esnext` or `esnext.disposable`

```json
{
  "compilerOptions": {
    "target": "es2022",
    "lib": ["es2022", "esnext.disposable"]
  }
}
```

## Standard API

If you don't want, or can't use [explicit resource management](https://www.typescriptlang.org/docs/handbook/variable-declarations.html#using-declarations), you can use `const` as usual.

In this case, remember you must call `.cleanup()` to dispose of the node.

<<< @/../../docs-snippets2/src/testing/launching-a-test-node.ts#manual-cleanup{ts:line-numbers}
