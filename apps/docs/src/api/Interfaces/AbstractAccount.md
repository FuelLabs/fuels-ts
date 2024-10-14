[**@fuel-ts/interfaces v0.96.1**](../index.md) • **Docs**

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

[index.ts:63](https://github.com/FuelLabs/fuels-ts/blob/2d42dc2cd8ad9160914de24e3ddf50045f8b0f24/packag./src/index.ts#L63)

***

### provider

> `abstract` **provider**: `unknown`

#### Defined in

[index.ts:64](https://github.com/FuelLabs/fuels-ts/blob/2d42dc2cd8ad9160914de24e3ddf50045f8b0f24/packag./src/index.ts#L64)

## Methods

### fund()

> `abstract` **fund**(`transactionRequest`, `txCost`): `Promise`\&lt;`any`\>

#### Parameters

• **transactionRequest**: `any`

• **txCost**: `any`

#### Returns

`Promise`\&lt;`any`\>

#### Defined in

[index.ts:69](https://github.com/FuelLabs/fuels-ts/blob/2d42dc2cd8ad9160914de24e3ddf50045f8b0f24/packag./src/index.ts#L69)

***

### getResourcesToSpend()

> `abstract` **getResourcesToSpend**(`quantities`, `options`?): `any`

#### Parameters

• **quantities**: `any`[]

• **options?**: `any`

#### Returns

`any`

#### Defined in

[index.ts:65](https://github.com/FuelLabs/fuels-ts/blob/2d42dc2cd8ad9160914de24e3ddf50045f8b0f24/packag./src/index.ts#L65)

***

### getTransactionCost()

> `abstract` **getTransactionCost**(`transactionRequest`, `options`?): `Promise`\&lt;`any`\>

#### Parameters

• **transactionRequest**: `any`

• **options?**: `any`

#### Returns

`Promise`\&lt;`any`\>

#### Defined in

[index.ts:68](https://github.com/FuelLabs/fuels-ts/blob/2d42dc2cd8ad9160914de24e3ddf50045f8b0f24/packag./src/index.ts#L68)

***

### sendTransaction()

> `abstract` **sendTransaction**(`transactionRequest`, `options`?): `any`

#### Parameters

• **transactionRequest**: `any`

• **options?**: `any`

#### Returns

`any`

#### Defined in

[index.ts:66](https://github.com/FuelLabs/fuels-ts/blob/2d42dc2cd8ad9160914de24e3ddf50045f8b0f24/packag./src/index.ts#L66)

***

### simulateTransaction()

> `abstract` **simulateTransaction**(`transactionRequest`, `options`?): `any`

#### Parameters

• **transactionRequest**: `any`

• **options?**: `any`

#### Returns

`any`

#### Defined in

[index.ts:67](https://github.com/FuelLabs/fuels-ts/blob/2d42dc2cd8ad9160914de24e3ddf50045f8b0f24/packag./src/index.ts#L67)
