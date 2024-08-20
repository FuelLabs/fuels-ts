# Class: Vault&lt;TOptions\>

[@fuel-ts/account](/api/Account/index.md).Vault

## Type parameters

| Name | Type |
| :------ | :------ |
| `TOptions` | { `secret?`: `string`  } |

## Implemented by

- [`MnemonicVault`](/api/Account/MnemonicVault.md)
- [`PrivateKeyVault`](/api/Account/PrivateKeyVault.md)

## Constructors

### constructor

• **new Vault**&lt;`TOptions`\>(`_options`): [`Vault`](/api/Account/Vault.md)&lt;`TOptions`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TOptions` | { `secret?`: `string`  } |

#### Parameters

| Name | Type |
| :------ | :------ |
| `_options` | `TOptions` |

#### Returns

[`Vault`](/api/Account/Vault.md)&lt;`TOptions`\>

#### Defined in

[packages/account/src/wallet-manager/types.ts:37](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/wallet-manager/types.ts#L37)

## Properties

### type

▪ `Static` `Readonly` **type**: `string`

#### Defined in

[packages/account/src/wallet-manager/types.ts:35](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/wallet-manager/types.ts#L35)

## Methods

### addAccount

▸ **addAccount**(): [`WalletManagerAccount`](/api/Account/index.md#walletmanageraccount)

#### Returns

[`WalletManagerAccount`](/api/Account/index.md#walletmanageraccount)

#### Defined in

[packages/account/src/wallet-manager/types.ts:49](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/wallet-manager/types.ts#L49)

___

### exportAccount

▸ **exportAccount**(`_address`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `_address` | [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) |

#### Returns

`string`

#### Defined in

[packages/account/src/wallet-manager/types.ts:53](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/wallet-manager/types.ts#L53)

___

### getAccounts

▸ **getAccounts**(): [`WalletManagerAccount`](/api/Account/index.md#walletmanageraccount)[]

#### Returns

[`WalletManagerAccount`](/api/Account/index.md#walletmanageraccount)[]

#### Defined in

[packages/account/src/wallet-manager/types.ts:45](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/wallet-manager/types.ts#L45)

___

### getWallet

▸ **getWallet**(`_address`): [`WalletUnlocked`](/api/Account/WalletUnlocked.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_address` | [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) |

#### Returns

[`WalletUnlocked`](/api/Account/WalletUnlocked.md)

#### Defined in

[packages/account/src/wallet-manager/types.ts:57](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/wallet-manager/types.ts#L57)

___

### serialize

▸ **serialize**(): `TOptions`

#### Returns

`TOptions`

#### Defined in

[packages/account/src/wallet-manager/types.ts:41](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/wallet-manager/types.ts#L41)
