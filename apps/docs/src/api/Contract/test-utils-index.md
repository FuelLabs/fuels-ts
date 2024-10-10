[**@fuel-ts/contract v0.95.0**](../index.md) • **Docs**

***

# test-utils

## Index

### Interfaces

- [DeployContractConfig](./DeployContractConfig.md)
- [DeployableContractFactory](./DeployableContractFactory.md)
- [LaunchTestNodeOptions](./LaunchTestNodeOptions.md)
- [LaunchTestNodeReturn](./LaunchTestNodeReturn.md)

## Type Aliases

### TContracts\&lt;T\>

> **TContracts**\&lt;`T`\>: `{ [K in keyof T]: Awaited&lt;ReturnType&lt;Awaited&lt;ReturnType&lt;T[K]["factory"]["deploy"]>>["waitForResult"]>>["contract"] }`

#### Type Parameters

• **T** *extends* [`DeployContractConfig`](./DeployContractConfig.md)[]

#### Defined in

[packages/contract/src/test-utils/launch-test-node.ts:41](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/contract/src/test-utils/launch-test-node.ts#L41)

## Functions

### launchTestNode()

> **launchTestNode**\&lt;`TFactories`\>(`__namedParameters`): `Promise`\&lt;[`LaunchTestNodeReturn`](./LaunchTestNodeReturn.md)\&lt;`TFactories`\>\>

#### Type Parameters

• **TFactories** *extends* [`DeployContractConfig`](./DeployContractConfig.md)[]

#### Parameters

• **\_\_namedParameters**: `Partial`\&lt;[`LaunchTestNodeOptions`](./LaunchTestNodeOptions.md)\&lt;`TFactories`\>\> = `{}`

#### Returns

`Promise`\&lt;[`LaunchTestNodeReturn`](./LaunchTestNodeReturn.md)\&lt;`TFactories`\>\>

#### Defined in

[packages/contract/src/test-utils/launch-test-node.ts:124](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/contract/src/test-utils/launch-test-node.ts#L124)
