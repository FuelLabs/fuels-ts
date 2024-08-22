# Module: test-utils

## Interfaces

- [DeployContractConfig](/api/Contract/DeployContractConfig.md)
- [DeployableContractFactory](/api/Contract/DeployableContractFactory.md)
- [LaunchTestNodeOptions](/api/Contract/LaunchTestNodeOptions.md)
- [LaunchTestNodeReturn](/api/Contract/LaunchTestNodeReturn.md)

## Type Aliases

### TContracts

Ƭ **TContracts**&lt;`T`\>: { [K in keyof T]: Awaited&lt;ReturnType&lt;Awaited&lt;ReturnType&lt;T[K]["factory"]["deploy"]\>\>["waitForResult"]\>\>["contract"] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`DeployContractConfig`](/api/Contract/DeployContractConfig.md)[] |

#### Defined in

[packages/contract/src/test-utils/launch-test-node.ts:41](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/contract/src/test-utils/launch-test-node.ts#L41)

## Functions

### launchTestNode

▸ **launchTestNode**&lt;`TFactories`\>(`«destructured»?`): `Promise`&lt;[`LaunchTestNodeReturn`](/api/Contract/LaunchTestNodeReturn.md)&lt;`TFactories`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TFactories` | extends [`DeployContractConfig`](/api/Contract/DeployContractConfig.md)[] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Partial`&lt;[`LaunchTestNodeOptions`](/api/Contract/LaunchTestNodeOptions.md)&lt;`TFactories`\>\> |

#### Returns

`Promise`&lt;[`LaunchTestNodeReturn`](/api/Contract/LaunchTestNodeReturn.md)&lt;`TFactories`\>\>

#### Defined in

[packages/contract/src/test-utils/launch-test-node.ts:124](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/contract/src/test-utils/launch-test-node.ts#L124)
