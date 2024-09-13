[**@fuel-ts/account v0.94.6**](../index.md) • **Docs**

***

# Class: `abstract` Vault\&lt;TOptions\>

## Type Parameters

• **TOptions** = `object`

## Constructors

### new Vault()

> **new Vault**\&lt;`TOptions`\>(`_options`): [`Vault`](Vault.md)\&lt;`TOptions`\>

#### Parameters

• **\_options**: `TOptions`

#### Returns

[`Vault`](Vault.md)\&lt;`TOptions`\>

#### Defined in

[packages/account/src/wallet-manager/types.ts:37](https://github.com/FuelLabs/fuels-ts/blob/edc427a506b3935e5c3045680dbc2670666cb638/packages/account/src/wallet-manager/types.ts#L37)

## Properties

### type

> `readonly` `static` **type**: `string`

#### Defined in

[packages/account/src/wallet-manager/types.ts:35](https://github.com/FuelLabs/fuels-ts/blob/edc427a506b3935e5c3045680dbc2670666cb638/packages/account/src/wallet-manager/types.ts#L35)

## Methods

### addAccount()

> **addAccount**(): [`WalletManagerAccount`](../index.md#walletmanageraccount)

#### Returns

[`WalletManagerAccount`](../index.md#walletmanageraccount)

#### Defined in

[packages/account/src/wallet-manager/types.ts:49](https://github.com/FuelLabs/fuels-ts/blob/edc427a506b3935e5c3045680dbc2670666cb638/packages/account/src/wallet-manager/types.ts#L49)

***

### exportAccount()

> **exportAccount**(`_address`): `string`

#### Parameters

• **\_address**: [`AbstractAddress`](../Interfaces/AbstractAddress.md)

#### Returns

`string`

#### Defined in

[packages/account/src/wallet-manager/types.ts:53](https://github.com/FuelLabs/fuels-ts/blob/edc427a506b3935e5c3045680dbc2670666cb638/packages/account/src/wallet-manager/types.ts#L53)

***

### getAccounts()

> **getAccounts**(): [`WalletManagerAccount`](../index.md#walletmanageraccount)[]

#### Returns

[`WalletManagerAccount`](../index.md#walletmanageraccount)[]

#### Defined in

[packages/account/src/wallet-manager/types.ts:45](https://github.com/FuelLabs/fuels-ts/blob/edc427a506b3935e5c3045680dbc2670666cb638/packages/account/src/wallet-manager/types.ts#L45)

***

### getWallet()

> **getWallet**(`_address`): [`WalletUnlocked`](WalletUnlocked.md)

#### Parameters

• **\_address**: [`AbstractAddress`](../Interfaces/AbstractAddress.md)

#### Returns

[`WalletUnlocked`](WalletUnlocked.md)

#### Defined in

[packages/account/src/wallet-manager/types.ts:57](https://github.com/FuelLabs/fuels-ts/blob/edc427a506b3935e5c3045680dbc2670666cb638/packages/account/src/wallet-manager/types.ts#L57)

***

### serialize()

> **serialize**(): `TOptions`

#### Returns

`TOptions`

#### Defined in

[packages/account/src/wallet-manager/types.ts:41](https://github.com/FuelLabs/fuels-ts/blob/edc427a506b3935e5c3045680dbc2670666cb638/packages/account/src/wallet-manager/types.ts#L41)
