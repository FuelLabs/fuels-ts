**@fuel-ts/utils v0.96.1** • [**Docs**](index.md)

***

# @fuel-ts/utils

## Variables

### defaultConsensusKey

> `const` **defaultConsensusKey**: `"0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298"` = `'0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298'`

#### Defined in

[packages/utils/src/utils/defaultSnapshotConfigs.ts:12](https://github.com/FuelLabs/fuels-ts/blob/2d42dc2cd8ad9160914de24e3ddf50045f8b0f24/packages/utils/src/utils/defaultSnapshotConfigs.ts#L12)

***

### defaultSnapshotConfigs

> `const` **defaultSnapshotConfigs**: [`SnapshotConfigs`](./SnapshotConfigs.md)

#### Defined in

[packages/utils/src/utils/defaultSnapshotConfigs.ts:6](https://github.com/FuelLabs/fuels-ts/blob/2d42dc2cd8ad9160914de24e3ddf50045f8b0f24/packages/utils/src/utils/defaultSnapshotConfigs.ts#L6)

## Functions

### arrayify()

> **arrayify**(`value`, `name`?, `copy`?): `Uint8Array`

Get a typed Uint8Array from a BytesLike object.

#### Parameters

• **value**: [`BytesLike`](../Interfaces/index.md#byteslike)

the BytesLike data.

• **name?**: `string`

a display name for the error result.

• **copy?**: `boolean` = `true`

create a copy of the original data (if applicable).

#### Returns

`Uint8Array`

- a typed Uint8Array.

#### Defined in

[packages/utils/src/utils/arrayify.ts:12](https://github.com/FuelLabs/fuels-ts/blob/2d42dc2cd8ad9160914de24e3ddf50045f8b0f24/packages/utils/src/utils/arrayify.ts#L12)

***

### assertUnreachable()

> **assertUnreachable**(`_x`): `never`

Used to verify that a switch statement exhausts all variants.

#### Parameters

• **\_x**: `never`

#### Returns

`never`

#### Defined in

[packages/utils/src/index.ts:21](https://github.com/FuelLabs/fuels-ts/blob/2d42dc2cd8ad9160914de24e3ddf50045f8b0f24/packages/utils/src/index.ts#L21)

***

### capitalizeString()

> **capitalizeString**(`str`): `string`

#### Parameters

• **str**: `string`

#### Returns

`string`

#### Defined in

[packages/utils/src/utils/capitalizeString.ts:1](https://github.com/FuelLabs/fuels-ts/blob/2d42dc2cd8ad9160914de24e3ddf50045f8b0f24/packages/utils/src/utils/capitalizeString.ts#L1)

***

### chunkAndPadBytes()

> **chunkAndPadBytes**(`bytes`, `chunkSize`): `Uint8Array`[]

Function to take a byte array and split into chunks of a given size

#### Parameters

• **bytes**: `Uint8Array`

The byte array to chunk

• **chunkSize**: `number`

The size of each chunk

#### Returns

`Uint8Array`[]

An array of byte arrays of a specified size

#### Defined in

[packages/utils/src/utils/chunkAndPadBytes.ts:8](https://github.com/FuelLabs/fuels-ts/blob/2d42dc2cd8ad9160914de24e3ddf50045f8b0f24/packages/utils/src/utils/chunkAndPadBytes.ts#L8)

***

### compressBytecode()

> **compressBytecode**(`bytecodeAsBinary`?): `string`

#### Parameters

• **bytecodeAsBinary?**: [`BytesLike`](../Interfaces/index.md#byteslike)

#### Returns

`string`

#### Defined in

[packages/utils/src/utils/bytecode.ts:6](https://github.com/FuelLabs/fuels-ts/blob/2d42dc2cd8ad9160914de24e3ddf50045f8b0f24/packages/utils/src/utils/bytecode.ts#L6)

***

### concat()

> **concat**(`arrays`): `Uint8Array`

Concatenates multiple BytesLike into a single Uint8Array.

#### Parameters

• **arrays**: readonly [`BytesLike`](../Interfaces/index.md#byteslike)[]

The arrays to concatenate.

#### Returns

`Uint8Array`

- The concatenated array.

#### Defined in

[packages/utils/src/utils/concat.ts:38](https://github.com/FuelLabs/fuels-ts/blob/2d42dc2cd8ad9160914de24e3ddf50045f8b0f24/packages/utils/src/utils/concat.ts#L38)

***

### concatBytes()

> **concatBytes**(`arrays`): `Uint8Array`

Concatenates multiple Uint8Arrays into a single Uint8Array.

#### Parameters

• **arrays**: readonly `Uint8Array`[] \| readonly `number`[][]

The arrays to concatenate.

#### Returns

`Uint8Array`

- The concatenated array.

#### Defined in

[packages/utils/src/utils/concat.ts:11](https://github.com/FuelLabs/fuels-ts/blob/2d42dc2cd8ad9160914de24e3ddf50045f8b0f24/packages/utils/src/utils/concat.ts#L11)

***

### dataSlice()

> **dataSlice**(`data`, `start`?, `end`?): `string`

Returns a hex string by slicing data from the start offset to the end offset.

#### Parameters

• **data**: [`BytesLike`](../Interfaces/index.md#byteslike)

the data to be sliced.

• **start?**: `number`

the start offset (default: 0).

• **end?**: `number`

the end offset (default: length of data).

#### Returns

`string`

- a sliced hex string from start to end.

#### Defined in

[packages/utils/src/utils/dataSlice.ts:15](https://github.com/FuelLabs/fuels-ts/blob/2d42dc2cd8ad9160914de24e3ddf50045f8b0f24/packages/utils/src/utils/dataSlice.ts#L15)

***

### decodeBase58()

> **decodeBase58**(`value`): `BN`

#### Parameters

• **value**: `string`

#### Returns

`BN`

#### Defined in

[packages/utils/src/utils/base58.ts:51](https://github.com/FuelLabs/fuels-ts/blob/2d42dc2cd8ad9160914de24e3ddf50045f8b0f24/packages/utils/src/utils/base58.ts#L51)

***

### decompressBytecode()

> **decompressBytecode**(`bytecodeAsBase64`): `Uint8Array`

#### Parameters

• **bytecodeAsBase64**: `string`

#### Returns

`Uint8Array`

#### Defined in

[packages/utils/src/utils/bytecode.ts:22](https://github.com/FuelLabs/fuels-ts/blob/2d42dc2cd8ad9160914de24e3ddf50045f8b0f24/packages/utils/src/utils/bytecode.ts#L22)

***

### encodeBase58()

> **encodeBase58**(`_value`): `string`

Encode value as a Base58-encoded string.

#### Parameters

• **\_value**: [`BytesLike`](../Interfaces/index.md#byteslike)

#### Returns

`string`

#### Defined in

[packages/utils/src/utils/base58.ts:30](https://github.com/FuelLabs/fuels-ts/blob/2d42dc2cd8ad9160914de24e3ddf50045f8b0f24/packages/utils/src/utils/base58.ts#L30)

***

### hexlify()

> **hexlify**(`data`): `string`

Returns a hex representation of the inputted bytes.

#### Parameters

• **data**: [`BytesLike`](../Interfaces/index.md#byteslike)

#### Returns

`string`

#### Defined in

[packages/utils/src/utils/hexlify.ts:10](https://github.com/FuelLabs/fuels-ts/blob/2d42dc2cd8ad9160914de24e3ddf50045f8b0f24/packages/utils/src/utils/hexlify.ts#L10)

***

### isDefined()

> **isDefined**\&lt;`T`\>(`value`): `value is T`

#### Type Parameters

• **T**

#### Parameters

• **value**: `undefined` \| `T`

#### Returns

`value is T`

#### Defined in

[packages/utils/src/utils/isDefined.ts:1](https://github.com/FuelLabs/fuels-ts/blob/2d42dc2cd8ad9160914de24e3ddf50045f8b0f24/packages/utils/src/utils/isDefined.ts#L1)

***

### normalizeString()

> **normalizeString**(`str`): `string`

Converts `some.string-value` into `SomeStringValue`.

Examples:
 my-simple.test —— MySimpleTest
 myFile.ts —— MyFileTs
 my-abi.json —— MyAbiJson

#### Parameters

• **str**: `string`

#### Returns

`string`

#### Defined in

[packages/utils/src/utils/normalizeString.ts:11](https://github.com/FuelLabs/fuels-ts/blob/2d42dc2cd8ad9160914de24e3ddf50045f8b0f24/packages/utils/src/utils/normalizeString.ts#L11)

***

### sleep()

> **sleep**(`time`): `Promise`\&lt;`unknown`\>

#### Parameters

• **time**: `number`

#### Returns

`Promise`\&lt;`unknown`\>

#### Defined in

[packages/utils/src/utils/sleep.ts:1](https://github.com/FuelLabs/fuels-ts/blob/2d42dc2cd8ad9160914de24e3ddf50045f8b0f24/packages/utils/src/utils/sleep.ts#L1)

***

### toUtf8Bytes()

> **toUtf8Bytes**(`stri`, `form`): `Uint8Array`

Returns the UTF-8 byte representation of str.

 If form is disabled, the string is not normalized.

#### Parameters

• **stri**: `string`

the string to convert to UTF-8 bytes.

• **form**: `boolean` = `true`

whether to normalize the string.

#### Returns

`Uint8Array`

- the UTF-8 byte representation of str.

#### Defined in

[packages/utils/src/utils/toUtf8Bytes.ts:11](https://github.com/FuelLabs/fuels-ts/blob/2d42dc2cd8ad9160914de24e3ddf50045f8b0f24/packages/utils/src/utils/toUtf8Bytes.ts#L11)

***

### toUtf8String()

> **toUtf8String**(`bytes`): `string`

Returns the string represented by the UTF-8 data bytes.

#### Parameters

• **bytes**: [`BytesLike`](../Interfaces/index.md#byteslike)

the UTF-8 data bytes

#### Returns

`string`

the string represented by the UTF-8 data bytes

#### Defined in

[packages/utils/src/utils/toUtf8String.ts:178](https://github.com/FuelLabs/fuels-ts/blob/2d42dc2cd8ad9160914de24e3ddf50045f8b0f24/packages/utils/src/utils/toUtf8String.ts#L178)

## Classes

- [DateTime](./DateTime.md)

## Interfaces

- [SnapshotConfigs](./SnapshotConfigs.md)
