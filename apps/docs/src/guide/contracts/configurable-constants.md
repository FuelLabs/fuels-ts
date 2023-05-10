# Configurable Constants

Sway introduces a powerful feature: configurable constants. When creating a contract, you have the possibility to define constants, each assigned with a default value.

Prior to deploying the contract, you can then redefine the value for these constants, it can be all of them or as many as you need.

This feature provides flexibility for dynamic contract environments. It allows a high level of customization, leading to more efficient and adaptable smart contracts.

## Defining Configurable Constants

Below is an example of a contract in which we declare four configurable constants:

<<< @/../../docs-snippets/contracts/echo-configurables/src/main.sw#configurable-constants-1{rust:line-numbers}

In this contract, we have a function `echo_configurables` that returns the values of the configurable constants.

If each of theses constants have a new values have been assigned to them, the function will return the updated values. Otherwise, the function will return the default values.

## Setting New Values For Configurable Constants

During contract deployment, you can define new values for the configurable constants. This is achieved as follows:

<<< @/../../docs-snippets/src/guide/contracts/configurable-constants.test.ts#configurable-constants-2{ts:line-numbers}

You have the flexibility to assign new values to as many constants as necessary, which could be all or just a subset.

If you wish to assign a new value to just one constant, you can do the following:

<<< @/../../docs-snippets/src/guide/contracts/configurable-constants.test.ts#configurable-constants-3{ts:line-numbers}

Please note that when assigning new values for a `Struct`, all properties of the `Struct` must be defined. Failing to do so will result in an error:

<<< @/../../docs-snippets/src/guide/contracts/configurable-constants.test.ts#configurable-constants-4{ts:line-numbers}
