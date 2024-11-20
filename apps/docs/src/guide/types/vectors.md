# Vectors

In Sway, a Vector is a dynamic-sized collection of elements of the same type. Vectors can hold arbitrary types, including non-primitive types.

## Working with Vectors in the SDK

A basic Vector in Sway is similar to a TypeScript Array:

<<< @./snippets/vectors.ts#vector-1{ts:line-numbers}

Consider the following example of a `EmployeeData` struct in Sway:

<<< @/../../docs/sway/employee-data/src/lib.sw#struct-1{rust:line-numbers}

Now, let's look at the following contract method. It receives a Vector of the `Transaction` struct type as a parameter and returns the last `Transaction` entry from the Vector:

<<< @/../../docs/sway/echo-employee-data-vector/src/main.sw#vector-3{ts:line-numbers}

The code snippet below demonstrates how to call this Sway contract method, which accepts a `Vec<Transaction>`:

<<< @./snippets/vectors.ts#vector-4{ts:line-numbers}

## Converting Bytecode to Vectors

Some functions require you to pass in bytecode to the function. The type of the bytecode parameter is usually `Vec<u8>`, here's an example of how to pass bytecode to a function:

<<< @/../../docs/sway/bytecode-input/src/main.sw#vector-bytecode-input-sway{ts:line-numbers}

To pass bytecode to this function, you can make use of the `arrayify` function to convert the bytecode file contents into a `UInt8Array`, the TS compatible type for Sway's `Vec<u8>` type and pass it the function like so:

<<< @./snippets/vectors.ts#vector-bytecode-input-ts{ts:line-numbers}
