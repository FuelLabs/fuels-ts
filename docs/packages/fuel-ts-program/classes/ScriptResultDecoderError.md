---
layout: default
title: ScriptResultDecoderError
parent: "@fuel-ts/program"
nav_order: 1

---

# Class: ScriptResultDecoderError

[@fuel-ts/program](../index.md).ScriptResultDecoderError

## Hierarchy

- `Error`

  ↳ **`ScriptResultDecoderError`**

## Constructors

### constructor

• **new ScriptResultDecoderError**(`result`, `message`, `logs`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `result` | [`TransactionResult`](../namespaces/internal.md#transactionresult)<``"failure"``, `void`\> |
| `message` | `string` |
| `logs` | `any`[] |

#### Overrides

Error.constructor

#### Defined in

[packages/program/src/errors.ts:15](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/errors.ts#L15)

## Properties

### logs

• **logs**: `any`[]

#### Defined in

[packages/program/src/errors.ts:14](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/errors.ts#L14)
