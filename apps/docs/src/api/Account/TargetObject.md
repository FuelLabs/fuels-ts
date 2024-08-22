# Interface: TargetObject

[@fuel-ts/account](/api/Account/index.md).TargetObject

Target Object that represents the global event bus used by Fuel Connector Manager.
On browser the default target is the window or document. For other environments
the event bus should be provided.

## Properties

### addEventListener

• `Optional` **addEventListener**: (`event`: `string`, `callback`: `any`) => `void`

#### Type declaration

▸ (`event`, `callback`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` |
| `callback` | `any` |

##### Returns

`void`

#### Defined in

[packages/account/src/connectors/types/target-object.ts:12](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/connectors/types/target-object.ts#L12)

___

### emit

• `Optional` **emit**: (`event`: `string`, `data`: `any`) => `void`

#### Type declaration

▸ (`event`, `data`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` |
| `data` | `any` |

##### Returns

`void`

#### Defined in

[packages/account/src/connectors/types/target-object.ts:11](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/connectors/types/target-object.ts#L11)

___

### off

• `Optional` **off**: (`event`: `string`, `callback`: `any`) => `void`

#### Type declaration

▸ (`event`, `callback`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` |
| `callback` | `any` |

##### Returns

`void`

#### Defined in

[packages/account/src/connectors/types/target-object.ts:10](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/connectors/types/target-object.ts#L10)

___

### on

• `Optional` **on**: (`event`: `string`, `callback`: `any`) => `void`

#### Type declaration

▸ (`event`, `callback`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` |
| `callback` | `any` |

##### Returns

`void`

#### Defined in

[packages/account/src/connectors/types/target-object.ts:9](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/connectors/types/target-object.ts#L9)

___

### postMessage

• `Optional` **postMessage**: (`message`: `string`) => `void`

#### Type declaration

▸ (`message`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

##### Returns

`void`

#### Defined in

[packages/account/src/connectors/types/target-object.ts:14](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/connectors/types/target-object.ts#L14)

___

### removeEventListener

• `Optional` **removeEventListener**: (`event`: `string`, `callback`: `any`) => `void`

#### Type declaration

▸ (`event`, `callback`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` |
| `callback` | `any` |

##### Returns

`void`

#### Defined in

[packages/account/src/connectors/types/target-object.ts:13](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/connectors/types/target-object.ts#L13)
