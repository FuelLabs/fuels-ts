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

## Working with Bytecode in the SDK

Some Sway functions require you to pass in bytecode to the function. The type of the bytecode parameter is usually `Vec<u8>`.

Take the `compute_bytecode_root` function from the [`bytecode` Sway library](https://github.com/FuelLabs/sway-libs/tree/master/libs/src/bytecode.sw), for example.

<<< @/../../docs-snippets/test/fixtures/forc-projects/bytecode-input/src/main.sw#vector-bytecode-input-sway{ts:line-numbers}

To pass bytecode to this function, you can make use of the `arrayify` function to convert the bytecode file contents into a `UInt8Array`, the TS compatible type for Sway's `Vec<u8>` type and pass it the function like so:

<<< @/../../docs-snippets/src/guide/types/vector.test.ts#vector-bytecode-input-ts{ts:line-numbers}

## Returning vectors

Currently, returning vectors is not supported by Sway. If you try returning a type that is or contains a Vector, you will get a compile-time error.
