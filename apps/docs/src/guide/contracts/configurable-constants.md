# Configurable Constants

Sway introduces a powerful feature: configurable constants. When creating a contract, you can define constants, each assigned with a default value.

Before deploying the contract, you can then redefine the value for these constants, it can be all of them or as many as you need.

This feature provides flexibility for dynamic contract environments. It allows a high level of customization, leading to more efficient and adaptable smart contracts.

## Defining Configurable Constants

Below is an example of a contract in which we declare four configurable constants:

<<< @/../../docs-snippets2/sway/echo-configurables/src/main.sw#configurable-constants-1{rust:line-numbers}

In this contract, we have a function `echo_configurables` that returns the values of the configurable constants, which we'll use for demonstrating the setting of configurables via the SDK.

## Setting New Values For Configurable Constants

During contract deployment, you can define new values for any/all of the configurable constants. The example below shows setting of one configurable constant, while the others will have default values.

<<< @/../../docs-snippets2/src/contracts/configurable-constants.ts#setting-configurable-constant{ts:line-numbers}

Please note that when assigning new values for a `Struct`, all properties of the `Struct` must be defined. Failing to do so will result in an error:

<<< @/../../docs-snippets2/src/contracts/configurable-constants.ts#invalid-configurable{ts:line-numbers}
