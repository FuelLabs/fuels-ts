# Instantiating predicates

A predicate in Sway can be as simple as the following:

<<< @/../../docs-snippets/test/fixtures/forc-projects/return-true-predicate/src/main.sw#predicate-index-1{rust:line-numbers}

In this minimal example, the `main` function does not accept any parameters and simply returns true.

Just like contracts in Sway, once you've created a predicate, you can compile it using `forc build`. For more information on working with Sway, refer to the <a :href="introUrl" target="_blank" rel="noreferrer">Sway documentation</a>.

After compiling, you will obtain the binary of the predicate and its JSON ABI (Application Binary Interface). Using these, you can instantiate a predicate in TypeScript as shown in the code snippet below:

<<< @/../../docs-snippets/src/guide/predicates/index.test.ts#predicate-index-2{ts:line-numbers}

The created [`Predicate`](https://fuels-ts-docs-api.vercel.app/Account/Predicate.md) instance, among other things, has three important properties: the predicate `bytes` (byte code), the `chainId`, and the predicate `address`.

This address, generated from the byte code, corresponds to the Pay-to-Script-Hash (P2SH) address used in Bitcoin.

## Predicate with multiple arguments

You can pass more than one argument to a predicate. For example, this is a predicate that evaluates to `true` if the two arguments are not equal:

<<< @/../../../packages/fuel-gauge/test/fixtures/forc-projects/predicate-multi-args/src/main.sw#predicate-multi-args-sw{rust:line-numbers}

You can pass the two arguments to this predicate like this:

<<< @/../../../packages/fuel-gauge/src/predicate/predicate-arguments.test.ts#predicate-multi-args{ts:line-numbers}

## Predicate with a Struct argument

You can also pass a struct as an argument to a predicate. This is one such predicate that expects a struct as an argument:

<<< @/../../../packages/fuel-gauge/test/fixtures/forc-projects/predicate-main-args-struct/src/main.sw#Predicate-main-args{rust:line-numbers}

You can pass a struct as an argument to this predicate like this:

<<< @/../../../packages/fuel-gauge/src/predicate/predicate-arguments.test.ts#predicate-struct-arg{ts:line-numbers}
