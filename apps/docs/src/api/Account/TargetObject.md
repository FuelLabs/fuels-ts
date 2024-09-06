[**@fuel-ts/account v0.94.5**](../index.md) • **Docs**

***

# Interface: TargetObject

Target Object that represents the global event bus used by Fuel Connector Manager.
On browser the default target is the window or document. For other environments
the event bus should be provided.

## Properties

### addEventListener()?

> `optional` **addEventListener**: (`event`, `callback`) => `void`

#### Parameters

• **event**: `string`

• **callback**: `any`

#### Returns

`void`

#### Defined in

[packages/account/src/connectors/types/target-object.ts:12](https://github.com/FuelLabs/fuels-ts/blob/26e9ebed3aac7c894878eda94559482cc10c369f/packages/account/src/connectors/types/target-object.ts#L12)

***

### emit()?

> `optional` **emit**: (`event`, `data`) => `void`

#### Parameters

• **event**: `string`

• **data**: `any`

#### Returns

`void`

#### Defined in

[packages/account/src/connectors/types/target-object.ts:11](https://github.com/FuelLabs/fuels-ts/blob/26e9ebed3aac7c894878eda94559482cc10c369f/packages/account/src/connectors/types/target-object.ts#L11)

***

### off()?

> `optional` **off**: (`event`, `callback`) => `void`

#### Parameters

• **event**: `string`

• **callback**: `any`

#### Returns

`void`

#### Defined in

[packages/account/src/connectors/types/target-object.ts:10](https://github.com/FuelLabs/fuels-ts/blob/26e9ebed3aac7c894878eda94559482cc10c369f/packages/account/src/connectors/types/target-object.ts#L10)

***

### on()?

> `optional` **on**: (`event`, `callback`) => `void`

#### Parameters

• **event**: `string`

• **callback**: `any`

#### Returns

`void`

#### Defined in

[packages/account/src/connectors/types/target-object.ts:9](https://github.com/FuelLabs/fuels-ts/blob/26e9ebed3aac7c894878eda94559482cc10c369f/packages/account/src/connectors/types/target-object.ts#L9)

***

### postMessage()?

> `optional` **postMessage**: (`message`) => `void`

#### Parameters

• **message**: `string`

#### Returns

`void`

#### Defined in

[packages/account/src/connectors/types/target-object.ts:14](https://github.com/FuelLabs/fuels-ts/blob/26e9ebed3aac7c894878eda94559482cc10c369f/packages/account/src/connectors/types/target-object.ts#L14)

***

### removeEventListener()?

> `optional` **removeEventListener**: (`event`, `callback`) => `void`

#### Parameters

• **event**: `string`

• **callback**: `any`

#### Returns

`void`

#### Defined in

[packages/account/src/connectors/types/target-object.ts:13](https://github.com/FuelLabs/fuels-ts/blob/26e9ebed3aac7c894878eda94559482cc10c369f/packages/account/src/connectors/types/target-object.ts#L13)
