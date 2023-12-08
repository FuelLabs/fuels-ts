# Vectors

In Sway, a Vector is a dynamic-sized collection of elements of the same type. Vectors can hold arbitrary types, including non-primitive types.

## Working with Vectors in the SDK

A basic Vector in Sway is similar to a TypeScript Array:

<<< @/../../docs-snippets/src/guide/types/vector.test.ts#vector-1{ts:line-numbers}

Consider the following example of a `EmployeeData` struct in Sway:

<<< @/../../docs-snippets/test/fixtures/forc-projects/employee-data/src/lib.sw#struct-1{rust:line-numbers}

Now, let's look at the following contract method. It receives a Vector of the `Transaction` struct type as a parameter and returns the last `Transaction` entry from the Vector:

<<< @/../../docs-snippets/test/fixtures/forc-projects/echo-employee-data-vector/src/main.sw#vector-3{ts:line-numbers}

The code snippet below demonstrates how to call this Sway contract method, which accepts a `Vec<Transaction>`:

<<< @/../../docs-snippets/src/guide/types/vector.test.ts#vector-4{ts:line-numbers}

## Returning vectors

Currently, returning vectors is not supported by Sway. If you try returning a type that is or contains a Vector, you will get a compile-time error.
