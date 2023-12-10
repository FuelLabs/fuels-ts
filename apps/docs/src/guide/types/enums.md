# Enums

Sway Enums are a little distinct from TypeScript Enums. In this document, we will explore how you can represent Sway Enums in the SDK and how to use them with Sway contract functions.

## Basic Sway Enum Example

Consider the following basic Sway Enum called `StateError`:

<<< @/../../docs-snippets/test/fixtures/forc-projects/echo-enum/src/main.sw#enum-1{rust:line-numbers}

The type `()` indicates that there is no additional data associated with each Enum variant. Sway allows you to create Enums of Enums or associate types with Enum variants.

## Using Sway Enums As Function Parameters

Let's define a Sway contract function that takes a `StateError` Enum variant as an argument and returns it:

<<< @/../../docs-snippets/test/fixtures/forc-projects/echo-enum/src/main.sw#enum-2{rust:line-numbers}

To execute the contract function and validate the response, we can use the following code:

<<< @/../../docs-snippets/src/guide/types/enums.test.ts#enum-3{ts:line-numbers}

In this example, we simply pass the Enum variant as a value to execute the contract function call.

## Enum of Enums Example

In this example, the `Error` Enum is an Enum of two other Enums: `StateError` and `UserError`.

<<< @/../../docs-snippets/test/fixtures/forc-projects/echo-enum/src/main.sw#enum-4{rust:line-numbers}

## Using Enums of Enums with Contract Functions

Now, let's create a Sway contract function that accepts any variant of the `Error` Enum as a parameter and returns it immediately. This variant could be from either the `StateError` or `UserError` Enums.

<<< @/../../docs-snippets/test/fixtures/forc-projects/echo-enum/src/main.sw#enum-5{rust:line-numbers}

Since the `Error` Enum is an Enum of Enums, we need to pass the function parameter differently. The parameter will be a TypeScript object:

<<< @/../../docs-snippets/src/guide/types/enums.test.ts#enum-6{ts:line-numbers}

In this case, since the variant `InsufficientPermissions` belongs to the `UserError` Enum, we create a TypeScript object using the Enum name as the object key and the variant as the object value.

We would follow the same approach if we intended to use a variant from the `StateError` Enum:

<<< @/../../docs-snippets/src/guide/types/enums.test.ts#enum-7{ts:line-numbers}
