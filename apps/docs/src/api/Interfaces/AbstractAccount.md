[**@fuel-ts/interfaces v0.94.3**](../index.md) • **Docs**

***

# Class: `abstract` AbstractAccount

## Extended by

## Constructors

### new AbstractAccount()

> **new AbstractAccount**(): [`AbstractAccount`](AbstractAccount.md)

#### Returns

[`AbstractAccount`](AbstractAccount.md)

## Properties

### address

> `abstract` **address**: [`AbstractAddress`](AbstractAddress.md)

#### Defined in

[index.ts:61](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packag./src/index.ts#L61)

***

### provider

> `abstract` **provider**: `unknown`

#### Defined in

[index.ts:62](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packag./src/index.ts#L62)

## Methods

### fund()

> `abstract` **fund**(`transactionRequest`, `txCost`): `Promise`\&lt;`any`\>

#### Parameters

• **transactionRequest**: `any`

• **txCost**: `any`

#### Returns

`Promise`\&lt;`any`\>

#### Defined in

[index.ts:67](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packag./src/index.ts#L67)

***

### getResourcesToSpend()

> `abstract` **getResourcesToSpend**(`quantities`, `options`?): `any`

#### Parameters

• **quantities**: `any`[]

• **options?**: `any`

#### Returns

`any`

#### Defined in

[index.ts:63](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packag./src/index.ts#L63)

***

### getTransactionCost()

> `abstract` **getTransactionCost**(`transactionRequest`, `options`?): `Promise`\&lt;`any`\>

#### Parameters

• **transactionRequest**: `any`

• **options?**: `any`

#### Returns

`Promise`\&lt;`any`\>

#### Defined in

[index.ts:66](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packag./src/index.ts#L66)

***

### sendTransaction()

> `abstract` **sendTransaction**(`transactionRequest`, `options`?): `any`

#### Parameters

• **transactionRequest**: `any`

• **options?**: `any`

#### Returns

`any`

#### Defined in

[index.ts:64](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packag./src/index.ts#L64)

***

### simulateTransaction()

> `abstract` **simulateTransaction**(`transactionRequest`, `options`?): `any`

#### Parameters

• **transactionRequest**: `any`

• **options?**: `any`

#### Returns

`any`

#### Defined in

[index.ts:65](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packag./src/index.ts#L65)
