# Class: Fuel

[@fuel-ts/account](/api/Account/index.md).Fuel

FuelConnector

Wallet Connector is a interface that represents a Wallet Connector and all the methods
that should be implemented to be compatible with the Fuel SDK.

## Hierarchy

- [`FuelConnector`](/api/Account/FuelConnector.md)

  ↳ **`Fuel`**

## Implements

- `FuelSdk`

## Constructors

### constructor

• **new Fuel**(`config?`): [`Fuel`](/api/Account/Fuel.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `config` | [`FuelConfig`](/api/Account/index.md#fuelconfig) | `Fuel.defaultConfig` |

#### Returns

[`Fuel`](/api/Account/Fuel.md)

#### Overrides

[FuelConnector](/api/Account/FuelConnector.md).[constructor](/api/Account/FuelConnector.md#constructor)

#### Defined in

[packages/account/src/connectors/fuel.ts:92](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/connectors/fuel.ts#L92)

## Properties

### \_connectors

• `Private` **\_connectors**: [`FuelConnector`](/api/Account/FuelConnector.md)[] = `[]`

#### Defined in

[packages/account/src/connectors/fuel.ts:85](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/connectors/fuel.ts#L85)

___

### \_currentConnector

• `Private` `Optional` **\_currentConnector**: ``null`` \| [`FuelConnector`](/api/Account/FuelConnector.md)

#### Defined in

[packages/account/src/connectors/fuel.ts:90](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/connectors/fuel.ts#L90)

___

### \_pingCache

• `Private` **\_pingCache**: [`CacheFor`](/api/Account/index.md#cachefor) = `{}`

#### Defined in

[packages/account/src/connectors/fuel.ts:89](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/connectors/fuel.ts#L89)

___

### \_storage

• `Private` `Optional` **\_storage**: ``null`` \| [`StorageAbstract`](/api/Account/StorageAbstract.md) = `null`

#### Defined in

[packages/account/src/connectors/fuel.ts:84](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/connectors/fuel.ts#L84)

___

### \_targetObject

• `Private` **\_targetObject**: ``null`` \| [`TargetObject`](/api/Account/TargetObject.md) = `null`

#### Defined in

[packages/account/src/connectors/fuel.ts:86](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/connectors/fuel.ts#L86)

___

### \_targetUnsubscribe

• `Private` **\_targetUnsubscribe**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[packages/account/src/connectors/fuel.ts:88](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/connectors/fuel.ts#L88)

___

### \_unsubscribes

• `Private` **\_unsubscribes**: () => `void`[] = `[]`

#### Defined in

[packages/account/src/connectors/fuel.ts:87](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/connectors/fuel.ts#L87)

___

### connected

• **connected**: `boolean` = `false`

#### Inherited from

[FuelConnector](/api/Account/FuelConnector.md).[connected](/api/Account/FuelConnector.md#connected)

#### Defined in

[packages/account/src/connectors/fuel-connector.ts:90](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/connectors/fuel-connector.ts#L90)

___

### events

• **events**: typeof [`FuelConnectorEventTypes`](/api/Account/FuelConnectorEventTypes.md) = `FuelConnectorEventTypes`

#### Inherited from

[FuelConnector](/api/Account/FuelConnector.md).[events](/api/Account/FuelConnector.md#events)

#### Defined in

[packages/account/src/connectors/fuel-connector.ts:92](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/connectors/fuel-connector.ts#L92)

___

### installed

• **installed**: `boolean` = `false`

#### Inherited from

[FuelConnector](/api/Account/FuelConnector.md).[installed](/api/Account/FuelConnector.md#installed)

#### Defined in

[packages/account/src/connectors/fuel-connector.ts:91](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/connectors/fuel-connector.ts#L91)

___

### metadata

• **metadata**: [`ConnectorMetadata`](/api/Account/index.md#connectormetadata)

#### Inherited from

[FuelConnector](/api/Account/FuelConnector.md).[metadata](/api/Account/FuelConnector.md#metadata)

#### Defined in

[packages/account/src/connectors/fuel-connector.ts:89](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/connectors/fuel-connector.ts#L89)

___

### name

• **name**: `string` = `''`

#### Inherited from

[FuelConnector](/api/Account/FuelConnector.md).[name](/api/Account/FuelConnector.md#name)

#### Defined in

[packages/account/src/connectors/fuel-connector.ts:88](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/connectors/fuel-connector.ts#L88)

___

### STORAGE\_KEY

▪ `Static` **STORAGE\_KEY**: `string` = `'fuel-current-connector'`

#### Defined in

[packages/account/src/connectors/fuel.ts:82](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/connectors/fuel.ts#L82)

___

### captureRejectionSymbol

▪ `Static` `Readonly` **captureRejectionSymbol**: typeof [`captureRejectionSymbol`](/api/Account/WalletManager.md#capturerejectionsymbol)

Value: `Symbol.for('nodejs.rejection')`

See how to write a custom `rejection handler`.

**`Since`**

v13.4.0, v12.16.0

#### Inherited from

[FuelConnector](/api/Account/FuelConnector.md).[captureRejectionSymbol](/api/Account/FuelConnector.md#capturerejectionsymbol)

#### Defined in

node_modules/.pnpm/@types+node@22.2.0/node_modules/@types/node/events.d.ts:452

___

### captureRejections

▪ `Static` **captureRejections**: `boolean`

Value: [boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Change the default `captureRejections` option on all new `EventEmitter` objects.

**`Since`**

v13.4.0, v12.16.0

#### Inherited from

[FuelConnector](/api/Account/FuelConnector.md).[captureRejections](/api/Account/FuelConnector.md#capturerejections)

#### Defined in

node_modules/.pnpm/@types+node@22.2.0/node_modules/@types/node/events.d.ts:459

___

### defaultConfig

▪ `Static` **defaultConfig**: [`FuelConfig`](/api/Account/index.md#fuelconfig) = `{}`

#### Defined in

[packages/account/src/connectors/fuel.ts:83](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/connectors/fuel.ts#L83)

___

### defaultMaxListeners

▪ `Static` **defaultMaxListeners**: `number`

By default, a maximum of `10` listeners can be registered for any single
event. This limit can be changed for individual `EventEmitter` instances
using the `emitter.setMaxListeners(n)` method. To change the default
for _all_`EventEmitter` instances, the `events.defaultMaxListeners` property
can be used. If this value is not a positive number, a `RangeError` is thrown.

Take caution when setting the `events.defaultMaxListeners` because the
change affects _all_ `EventEmitter` instances, including those created before
the change is made. However, calling `emitter.setMaxListeners(n)` still has
precedence over `events.defaultMaxListeners`.

This is not a hard limit. The `EventEmitter` instance will allow
more listeners to be added but will output a trace warning to stderr indicating
that a "possible EventEmitter memory leak" has been detected. For any single
`EventEmitter`, the `emitter.getMaxListeners()` and `emitter.setMaxListeners()` methods can be used to
temporarily avoid this warning:

```js
import { EventEmitter } from 'node:events';
const emitter = new EventEmitter();
emitter.setMaxListeners(emitter.getMaxListeners() + 1);
emitter.once('event', () => {
  // do stuff
  emitter.setMaxListeners(Math.max(emitter.getMaxListeners() - 1, 0));
});
```

The `--trace-warnings` command-line flag can be used to display the
stack trace for such warnings.

The emitted warning can be inspected with `process.on('warning')` and will
have the additional `emitter`, `type`, and `count` properties, referring to
the event emitter instance, the event's name and the number of attached
listeners, respectively.
Its `name` property is set to `'MaxListenersExceededWarning'`.

**`Since`**

v0.11.2

#### Inherited from

[FuelConnector](/api/Account/FuelConnector.md).[defaultMaxListeners](/api/Account/FuelConnector.md#defaultmaxlisteners)

#### Defined in

node_modules/.pnpm/@types+node@22.2.0/node_modules/@types/node/events.d.ts:498

___

### errorMonitor

▪ `Static` `Readonly` **errorMonitor**: typeof [`errorMonitor`](/api/Account/WalletManager.md#errormonitor)

This symbol shall be used to install a listener for only monitoring `'error'` events. Listeners installed using this symbol are called before the regular `'error'` listeners are called.

Installing a listener using this symbol does not change the behavior once an `'error'` event is emitted. Therefore, the process will still crash if no
regular `'error'` listener is installed.

**`Since`**

v13.6.0, v12.17.0

#### Inherited from

[FuelConnector](/api/Account/FuelConnector.md).[errorMonitor](/api/Account/FuelConnector.md#errormonitor)

#### Defined in

node_modules/.pnpm/@types+node@22.2.0/node_modules/@types/node/events.d.ts:445

## Methods

### [captureRejectionSymbol]

▸ **[captureRejectionSymbol]**&lt;`K`\>(`error`, `event`, `...args`): `void`

#### Type parameters

| Name |
| :------ |
| `K` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `Error` |
| `event` | `string` \| `symbol` |
| `...args` | `AnyRest` |

#### Returns

`void`

#### Inherited from

[FuelConnector](/api/Account/FuelConnector.md).[[captureRejectionSymbol]](/api/Account/FuelConnector.md#[capturerejectionsymbol])

#### Defined in

node_modules/.pnpm/@types+node@22.2.0/node_modules/@types/node/events.d.ts:136

___

### \_getProvider

▸ **_getProvider**(`providerOrNetwork?`): `Promise`&lt;[`Provider`](/api/Account/Provider.md)\>

Return a Fuel Provider instance with extends features to work with
connectors.

#### Parameters

| Name | Type |
| :------ | :------ |
| `providerOrNetwork?` | [`Provider`](/api/Account/Provider.md) \| [`Network`](/api/Account/index.md#network) |

#### Returns

`Promise`&lt;[`Provider`](/api/Account/Provider.md)\>

#### Defined in

[packages/account/src/connectors/fuel.ts:430](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/connectors/fuel.ts#L430)

___

### accounts

▸ **accounts**(): `Promise`&lt;`string`[]\>

Should return all the accounts authorized for the
current connection.

#### Returns

`Promise`&lt;`string`[]\>

The accounts addresses strings

#### Inherited from

[FuelConnector](/api/Account/FuelConnector.md).[accounts](/api/Account/FuelConnector.md#accounts)

#### Defined in

[packages/account/src/connectors/fuel-connector.ts:130](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/connectors/fuel-connector.ts#L130)

___

### addABI

▸ **addABI**(`_contractId`, `_abi`): `Promise`&lt;`boolean`\>

Should add the ABI to the connector and return true if the ABI was added successfully.

#### Parameters

| Name | Type |
| :------ | :------ |
| `_contractId` | `string` |
| `_abi` | `JsonAbi` |

#### Returns

`Promise`&lt;`boolean`\>

Return true if the ABI was added successfully.

#### Inherited from

[FuelConnector](/api/Account/FuelConnector.md).[addABI](/api/Account/FuelConnector.md#addabi)

#### Defined in

[packages/account/src/connectors/fuel-connector.ts:301](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/connectors/fuel-connector.ts#L301)

___

### addAsset

▸ **addAsset**(`_asset`): `Promise`&lt;`boolean`\>

Should add the asset metadata to the connector and return true if the asset
was added successfully.

If the asset already exists it should throw an error.

 assets

**`Throws`**

Error if the asset already exists

#### Parameters

| Name | Type |
| :------ | :------ |
| `_asset` | [`Asset`](/api/Account/index.md#asset) |

#### Returns

`Promise`&lt;`boolean`\>

True if the asset was added successfully

#### Inherited from

[FuelConnector](/api/Account/FuelConnector.md).[addAsset](/api/Account/FuelConnector.md#addasset)

#### Defined in

[packages/account/src/connectors/fuel-connector.ts:239](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/connectors/fuel-connector.ts#L239)

___

### addAssets

▸ **addAssets**(`_assets`): `Promise`&lt;`boolean`\>

Should add the assets metadata to the connector and return true if the asset
was added successfully.

If the asset already exists it should throw an error.

 assets

**`Throws`**

Error if the asset already exists

#### Parameters

| Name | Type |
| :------ | :------ |
| `_assets` | [`Asset`](/api/Account/index.md#asset)[] |

#### Returns

`Promise`&lt;`boolean`\>

True if the asset was added successfully

#### Inherited from

[FuelConnector](/api/Account/FuelConnector.md).[addAssets](/api/Account/FuelConnector.md#addassets)

#### Defined in

[packages/account/src/connectors/fuel-connector.ts:224](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/connectors/fuel-connector.ts#L224)

___

### addConnector

▸ **addConnector**(`connector`): `Promise`&lt;`void`\>

Add a new connector to the list of connectors.

#### Parameters

| Name | Type |
| :------ | :------ |
| `connector` | [`FuelConnector`](/api/Account/FuelConnector.md) |

#### Returns

`Promise`&lt;`void`\>

#### Defined in

[packages/account/src/connectors/fuel.ts:292](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/connectors/fuel.ts#L292)

___

### addListener

▸ **addListener**&lt;`K`\>(`eventName`, `listener`): `this`

Alias for `emitter.on(eventName, listener)`.

**`Since`**

v0.1.26

#### Type parameters

| Name |
| :------ |
| `K` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

`this`

#### Inherited from

[FuelConnector](/api/Account/FuelConnector.md).[addListener](/api/Account/FuelConnector.md#addlistener)

#### Defined in

node_modules/.pnpm/@types+node@22.2.0/node_modules/@types/node/events.d.ts:597

___

### addNetwork

▸ **addNetwork**(`_networkUrl`): `Promise`&lt;`boolean`\>

Should start the add network process and return true if the network was added successfully.

 networks

**`Throws`**

Error if the network already exists

#### Parameters

| Name | Type |
| :------ | :------ |
| `_networkUrl` | `string` |

#### Returns

`Promise`&lt;`boolean`\>

Return true if the network was added successfully

#### Inherited from

[FuelConnector](/api/Account/FuelConnector.md).[addNetwork](/api/Account/FuelConnector.md#addnetwork)

#### Defined in

[packages/account/src/connectors/fuel-connector.ts:260](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/connectors/fuel-connector.ts#L260)

___

### assets

▸ **assets**(): `Promise`&lt;[`Asset`](/api/Account/index.md#asset)[]\>

Should return all the assets added to the connector. If a connection is already established.

#### Returns

`Promise`&lt;[`Asset`](/api/Account/index.md#asset)[]\>

Array of assets metadata from the connector vinculated to the all accounts from a specific Wallet.

#### Inherited from

[FuelConnector](/api/Account/FuelConnector.md).[assets](/api/Account/FuelConnector.md#assets)

#### Defined in

[packages/account/src/connectors/fuel-connector.ts:248](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/connectors/fuel-connector.ts#L248)

___

### callMethod

▸ **callMethod**(`method`, `...args`): `Promise`&lt;`any`\>

Call method from the current connector.

#### Parameters

| Name | Type |
| :------ | :------ |
| `method` | `string` |
| `...args` | `unknown`[] |

#### Returns

`Promise`&lt;`any`\>

#### Defined in

[packages/account/src/connectors/fuel.ts:173](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/connectors/fuel.ts#L173)

___

### clean

▸ **clean**(): `Promise`&lt;`void`\>

Clean all the data from the storage.

#### Returns

`Promise`&lt;`void`\>

#### Implementation of

FuelSdk.clean

#### Defined in

[packages/account/src/connectors/fuel.ts:478](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/connectors/fuel.ts#L478)

___

### connect

▸ **connect**(): `Promise`&lt;`boolean`\>

Should start the connection process and return
true if the account authorize the connection.

and return false if the user reject the connection.

 accounts

#### Returns

`Promise`&lt;`boolean`\>

boolean - connection status.

#### Inherited from

[FuelConnector](/api/Account/FuelConnector.md).[connect](/api/Account/FuelConnector.md#connect)

#### Defined in

[packages/account/src/connectors/fuel-connector.ts:143](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/connectors/fuel-connector.ts#L143)

___

### connectors

▸ **connectors**(): `Promise`&lt;[`FuelConnector`](/api/Account/FuelConnector.md)[]\>

Return the list of connectors with the status of installed and connected.

#### Returns

`Promise`&lt;[`FuelConnector`](/api/Account/FuelConnector.md)[]\>

#### Implementation of

FuelSdk.connectors

#### Defined in

[packages/account/src/connectors/fuel.ts:340](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/connectors/fuel.ts#L340)

___

### currentAccount

▸ **currentAccount**(): `Promise`&lt;``null`` \| `string`\>

Should return the current account selected inside the connector, if the account
is authorized for the connection.

If the account is not authorized it should return null.

#### Returns

`Promise`&lt;``null`` \| `string`\>

The current account selected otherwise null.

#### Inherited from

[FuelConnector](/api/Account/FuelConnector.md).[currentAccount](/api/Account/FuelConnector.md#currentaccount)

#### Defined in

[packages/account/src/connectors/fuel-connector.ts:209](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/connectors/fuel-connector.ts#L209)

___

### currentConnector

▸ **currentConnector**(): `undefined` \| ``null`` \| [`FuelConnector`](/api/Account/FuelConnector.md)

Return the current selected connector.

#### Returns

`undefined` \| ``null`` \| [`FuelConnector`](/api/Account/FuelConnector.md)

#### Implementation of

FuelSdk.currentConnector

#### Defined in

[packages/account/src/connectors/fuel.ts:382](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/connectors/fuel.ts#L382)

___

### currentNetwork

▸ **currentNetwork**(): `Promise`&lt;[`Network`](/api/Account/index.md#network)\>

Should return the current network selected inside the connector. Even if the connection is not established.

#### Returns

`Promise`&lt;[`Network`](/api/Account/index.md#network)\>

Return the current network selected inside the connector.

#### Inherited from

[FuelConnector](/api/Account/FuelConnector.md).[currentNetwork](/api/Account/FuelConnector.md#currentnetwork)

#### Defined in

[packages/account/src/connectors/fuel-connector.ts:290](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/connectors/fuel-connector.ts#L290)

___

### destroy

▸ **destroy**(): `Promise`&lt;`void`\>

Removes all listeners and cleans the storage.

#### Returns

`Promise`&lt;`void`\>

#### Implementation of

FuelSdk.destroy

#### Defined in

[packages/account/src/connectors/fuel.ts:485](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/connectors/fuel.ts#L485)

___

### disconnect

▸ **disconnect**(): `Promise`&lt;`boolean`\>

Should disconnect the current connection and
return false if the disconnection was successful.

 assets connection

#### Returns

`Promise`&lt;`boolean`\>

The connection status.

#### Inherited from

[FuelConnector](/api/Account/FuelConnector.md).[disconnect](/api/Account/FuelConnector.md#disconnect)

#### Defined in

[packages/account/src/connectors/fuel-connector.ts:154](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/connectors/fuel-connector.ts#L154)

___

### emit

▸ **emit**&lt;`K`\>(`eventName`, `...args`): `boolean`

Synchronously calls each of the listeners registered for the event named `eventName`, in the order they were registered, passing the supplied arguments
to each.

Returns `true` if the event had listeners, `false` otherwise.

```js
import { EventEmitter } from 'node:events';
const myEmitter = new EventEmitter();

// First listener
myEmitter.on('event', function firstListener() {
  console.log('Helloooo! first listener');
});
// Second listener
myEmitter.on('event', function secondListener(arg1, arg2) {
  console.log(`event with parameters ${arg1}, ${arg2} in second listener`);
});
// Third listener
myEmitter.on('event', function thirdListener(...args) {
  const parameters = args.join(', ');
  console.log(`event with parameters ${parameters} in third listener`);
});

console.log(myEmitter.listeners('event'));

myEmitter.emit('event', 1, 2, 3, 4, 5);

// Prints:
// [
//   [Function: firstListener],
//   [Function: secondListener],
//   [Function: thirdListener]
// ]
// Helloooo! first listener
// event with parameters 1, 2 in second listener
// event with parameters 1, 2, 3, 4, 5 in third listener
```

**`Since`**

v0.1.26

#### Type parameters

| Name |
| :------ |
| `K` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `...args` | `AnyRest` |

#### Returns

`boolean`

#### Inherited from

[FuelConnector](/api/Account/FuelConnector.md).[emit](/api/Account/FuelConnector.md#emit)

#### Defined in

node_modules/.pnpm/@types+node@22.2.0/node_modules/@types/node/events.d.ts:859

___

### eventNames

▸ **eventNames**(): (`string` \| `symbol`)[]

Returns an array listing the events for which the emitter has registered
listeners. The values in the array are strings or `Symbol`s.

```js
import { EventEmitter } from 'node:events';

const myEE = new EventEmitter();
myEE.on('foo', () => {});
myEE.on('bar', () => {});

const sym = Symbol('symbol');
myEE.on(sym, () => {});

console.log(myEE.eventNames());
// Prints: [ 'foo', 'bar', Symbol(symbol) ]
```

**`Since`**

v6.0.0

#### Returns

(`string` \| `symbol`)[]

#### Inherited from

[FuelConnector](/api/Account/FuelConnector.md).[eventNames](/api/Account/FuelConnector.md#eventnames)

#### Defined in

node_modules/.pnpm/@types+node@22.2.0/node_modules/@types/node/events.d.ts:922

___

### fetchConnectorStatus

▸ **fetchConnectorStatus**(`connector`): `Promise`&lt;[`Status`](/api/Account/index.md#status)\>

Fetch the status of a connector and set the installed and connected
status.

#### Parameters

| Name | Type |
| :------ | :------ |
| `connector` | [`FuelConnector`](/api/Account/FuelConnector.md) & { `_latestUpdate?`: `number`  } |

#### Returns

`Promise`&lt;[`Status`](/api/Account/index.md#status)\>

#### Defined in

[packages/account/src/connectors/fuel.ts:203](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/connectors/fuel.ts#L203)

___

### fetchConnectorsStatus

▸ **fetchConnectorsStatus**(): `Promise`&lt;[`Status`](/api/Account/index.md#status)[]\>

Fetch the status of all connectors and set the installed and connected
status.

#### Returns

`Promise`&lt;[`Status`](/api/Account/index.md#status)[]\>

#### Defined in

[packages/account/src/connectors/fuel.ts:235](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/connectors/fuel.ts#L235)

___

### getABI

▸ **getABI**(`_id`): `Promise`&lt;``null`` \| `JsonAbi`\>

Should return the ABI from the connector vinculated to the all accounts from a specific Wallet.

#### Parameters

| Name | Type |
| :------ | :------ |
| `_id` | `string` |

#### Returns

`Promise`&lt;``null`` \| `JsonAbi`\>

The ABI if it exists, otherwise return null.

#### Inherited from

[FuelConnector](/api/Account/FuelConnector.md).[getABI](/api/Account/FuelConnector.md#getabi)

#### Defined in

[packages/account/src/connectors/fuel-connector.ts:311](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/connectors/fuel-connector.ts#L311)

___

### getConnector

▸ **getConnector**(`connector`): ``null`` \| [`FuelConnector`](/api/Account/FuelConnector.md)

Get a connector from the list of connectors.

#### Parameters

| Name | Type |
| :------ | :------ |
| `connector` | `string` \| [`FuelConnector`](/api/Account/FuelConnector.md) |

#### Returns

``null`` \| [`FuelConnector`](/api/Account/FuelConnector.md)

#### Implementation of

FuelSdk.getConnector

#### Defined in

[packages/account/src/connectors/fuel.ts:331](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/connectors/fuel.ts#L331)

___

### getMaxListeners

▸ **getMaxListeners**(): `number`

Returns the current max listener value for the `EventEmitter` which is either
set by `emitter.setMaxListeners(n)` or defaults to [defaultMaxListeners](/api/Account/Fuel.md#defaultmaxlisteners).

**`Since`**

v1.0.0

#### Returns

`number`

#### Inherited from

[FuelConnector](/api/Account/FuelConnector.md).[getMaxListeners](/api/Account/FuelConnector.md#getmaxlisteners)

#### Defined in

node_modules/.pnpm/@types+node@22.2.0/node_modules/@types/node/events.d.ts:774

___

### getProvider

▸ **getProvider**(`providerOrNetwork?`): `Promise`&lt;[`Provider`](/api/Account/Provider.md)\>

Return a Fuel Provider instance with extends features to work with
connectors.

**`Deprecated`**

getProvider is deprecated and is going to be removed in the future, use getWallet instead.

#### Parameters

| Name | Type |
| :------ | :------ |
| `providerOrNetwork?` | [`Provider`](/api/Account/Provider.md) \| [`Network`](/api/Account/index.md#network) |

#### Returns

`Promise`&lt;[`Provider`](/api/Account/Provider.md)\>

#### Defined in

[packages/account/src/connectors/fuel.ts:419](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/connectors/fuel.ts#L419)

___

### getStorage

▸ **getStorage**(): `undefined` \| [`StorageAbstract`](/api/Account/StorageAbstract.md)

Return the storage used.

#### Returns

`undefined` \| [`StorageAbstract`](/api/Account/StorageAbstract.md)

#### Defined in

[packages/account/src/connectors/fuel.ts:130](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/connectors/fuel.ts#L130)

___

### getTargetObject

▸ **getTargetObject**(`targetObject?`): ``null`` \| [`TargetObject`](/api/Account/TargetObject.md)

Return the target object to listen for global events.

#### Parameters

| Name | Type |
| :------ | :------ |
| `targetObject?` | [`TargetObject`](/api/Account/TargetObject.md) |

#### Returns

``null`` \| [`TargetObject`](/api/Account/TargetObject.md)

#### Defined in

[packages/account/src/connectors/fuel.ts:114](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/connectors/fuel.ts#L114)

___

### getWallet

▸ **getWallet**(`address`, `providerOrNetwork?`): `Promise`&lt;[`Account`](/api/Account/Account.md)\>

Return a Fuel Wallet Locked instance with extends features to work with
connectors.

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` \| [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) |
| `providerOrNetwork?` | [`Provider`](/api/Account/Provider.md) \| [`Network`](/api/Account/index.md#network) |

#### Returns

`Promise`&lt;[`Account`](/api/Account/Account.md)\>

#### Implementation of

FuelSdk.getWallet

#### Defined in

[packages/account/src/connectors/fuel.ts:455](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/connectors/fuel.ts#L455)

___

### hasABI

▸ **hasABI**(`_id`): `Promise`&lt;`boolean`\>

Should return true if the abi exists in the connector vinculated to the all accounts from a specific Wallet.

#### Parameters

| Name | Type |
| :------ | :------ |
| `_id` | `string` |

#### Returns

`Promise`&lt;`boolean`\>

Returns true if the abi exists or false if not.

#### Inherited from

[FuelConnector](/api/Account/FuelConnector.md).[hasABI](/api/Account/FuelConnector.md#hasabi)

#### Defined in

[packages/account/src/connectors/fuel-connector.ts:321](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/connectors/fuel-connector.ts#L321)

___

### hasConnector

▸ **hasConnector**(): `Promise`&lt;`boolean`\>

Return true if any connector is available.

#### Returns

`Promise`&lt;`boolean`\>

#### Implementation of

FuelSdk.hasConnector

#### Defined in

[packages/account/src/connectors/fuel.ts:389](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/connectors/fuel.ts#L389)

___

### hasWallet

▸ **hasWallet**(): `Promise`&lt;`boolean`\>

#### Returns

`Promise`&lt;`boolean`\>

#### Implementation of

FuelSdk.hasWallet

#### Defined in

[packages/account/src/connectors/fuel.ts:409](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/connectors/fuel.ts#L409)

___

### isConnected

▸ **isConnected**(): `Promise`&lt;`boolean`\>

Should return true if the connector is connected
to any of the accounts available.

#### Returns

`Promise`&lt;`boolean`\>

The connection status.

#### Inherited from

[FuelConnector](/api/Account/FuelConnector.md).[isConnected](/api/Account/FuelConnector.md#isconnected)

#### Defined in

[packages/account/src/connectors/fuel-connector.ts:120](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/connectors/fuel-connector.ts#L120)

___

### listenerCount

▸ **listenerCount**&lt;`K`\>(`eventName`, `listener?`): `number`

Returns the number of listeners listening for the event named `eventName`.
If `listener` is provided, it will return how many times the listener is found
in the list of the listeners of the event.

**`Since`**

v3.2.0

#### Type parameters

| Name |
| :------ |
| `K` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event being listened for |
| `listener?` | `Function` | The event handler function |

#### Returns

`number`

#### Inherited from

[FuelConnector](/api/Account/FuelConnector.md).[listenerCount](/api/Account/FuelConnector.md#listenercount)

#### Defined in

node_modules/.pnpm/@types+node@22.2.0/node_modules/@types/node/events.d.ts:868

___

### listeners

▸ **listeners**&lt;`K`\>(`eventName`): `Function`[]

Returns a copy of the array of listeners for the event named `eventName`.

```js
server.on('connection', (stream) => {
  console.log('someone connected!');
});
console.log(util.inspect(server.listeners('connection')));
// Prints: [ [Function] ]
```

**`Since`**

v0.1.26

#### Type parameters

| Name |
| :------ |
| `K` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |

#### Returns

`Function`[]

#### Inherited from

[FuelConnector](/api/Account/FuelConnector.md).[listeners](/api/Account/FuelConnector.md#listeners)

#### Defined in

node_modules/.pnpm/@types+node@22.2.0/node_modules/@types/node/events.d.ts:787

___

### networks

▸ **networks**(): `Promise`&lt;[`Network`](/api/Account/index.md#network)[]\>

Should return all the networks available from the connector. If the connection is already established.

#### Returns

`Promise`&lt;[`Network`](/api/Account/index.md#network)[]\>

Return all the networks added to the connector.

#### Inherited from

[FuelConnector](/api/Account/FuelConnector.md).[networks](/api/Account/FuelConnector.md#networks)

#### Defined in

[packages/account/src/connectors/fuel-connector.ts:281](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/connectors/fuel-connector.ts#L281)

___

### off

▸ **off**&lt;`K`\>(`eventName`, `listener`): `this`

Alias for `emitter.removeListener()`.

**`Since`**

v10.0.0

#### Type parameters

| Name |
| :------ |
| `K` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

`this`

#### Inherited from

[FuelConnector](/api/Account/FuelConnector.md).[off](/api/Account/FuelConnector.md#off)

#### Defined in

node_modules/.pnpm/@types+node@22.2.0/node_modules/@types/node/events.d.ts:747

___

### on

▸ **on**&lt;`E`, `D`\>(`eventName`, `listener`): `this`

Event listener for the connector.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends [`connectors`](/api/Account/FuelConnectorEventTypes.md#connectors) \| [`currentConnector`](/api/Account/FuelConnectorEventTypes.md#currentconnector) \| [`connection`](/api/Account/FuelConnectorEventTypes.md#connection) \| [`accounts`](/api/Account/FuelConnectorEventTypes.md#accounts) \| [`currentAccount`](/api/Account/FuelConnectorEventTypes.md#currentaccount) \| [`networks`](/api/Account/FuelConnectorEventTypes.md#networks) \| [`currentNetwork`](/api/Account/FuelConnectorEventTypes.md#currentnetwork) \| [`assets`](/api/Account/FuelConnectorEventTypes.md#assets) |
| `D` | extends `never` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `E` | The event name to listen |
| `listener` | (`data`: `D`) => `void` | The listener function |

#### Returns

`this`

#### Inherited from

[FuelConnector](/api/Account/FuelConnector.md).[on](/api/Account/FuelConnector.md#on)

#### Defined in

[packages/account/src/connectors/fuel-connector.ts:331](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/connectors/fuel-connector.ts#L331)

___

### once

▸ **once**&lt;`K`\>(`eventName`, `listener`): `this`

Adds a **one-time** `listener` function for the event named `eventName`. The
next time `eventName` is triggered, this listener is removed and then invoked.

```js
server.once('connection', (stream) => {
  console.log('Ah, we have our first user!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

By default, event listeners are invoked in the order they are added. The `emitter.prependOnceListener()` method can be used as an alternative to add the
event listener to the beginning of the listeners array.

```js
import { EventEmitter } from 'node:events';
const myEE = new EventEmitter();
myEE.once('foo', () => console.log('a'));
myEE.prependOnceListener('foo', () => console.log('b'));
myEE.emit('foo');
// Prints:
//   b
//   a
```

**`Since`**

v0.3.0

#### Type parameters

| Name |
| :------ |
| `K` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

`this`

#### Inherited from

[FuelConnector](/api/Account/FuelConnector.md).[once](/api/Account/FuelConnector.md#once)

#### Defined in

node_modules/.pnpm/@types+node@22.2.0/node_modules/@types/node/events.d.ts:659

___

### ping

▸ **ping**(): `Promise`&lt;`boolean`\>

Should return true if the connector is loaded
in less then one second.

#### Returns

`Promise`&lt;`boolean`\>

Always true.

#### Inherited from

[FuelConnector](/api/Account/FuelConnector.md).[ping](/api/Account/FuelConnector.md#ping)

#### Defined in

[packages/account/src/connectors/fuel-connector.ts:100](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/connectors/fuel-connector.ts#L100)

___

### pingConnector

▸ **pingConnector**(`connector?`): `Promise`&lt;`boolean`\>

Fetch the status of a connector and set the installed and connected
status. If no connector is provided it will ping the current connector.

#### Parameters

| Name | Type |
| :------ | :------ |
| `connector?` | [`FuelConnector`](/api/Account/FuelConnector.md) |

#### Returns

`Promise`&lt;`boolean`\>

#### Defined in

[packages/account/src/connectors/fuel.ts:245](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/connectors/fuel.ts#L245)

___

### prependListener

▸ **prependListener**&lt;`K`\>(`eventName`, `listener`): `this`

Adds the `listener` function to the _beginning_ of the listeners array for the
event named `eventName`. No checks are made to see if the `listener` has
already been added. Multiple calls passing the same combination of `eventName`
and `listener` will result in the `listener` being added, and called, multiple times.

```js
server.prependListener('connection', (stream) => {
  console.log('someone connected!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`Since`**

v6.0.0

#### Type parameters

| Name |
| :------ |
| `K` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

`this`

#### Inherited from

[FuelConnector](/api/Account/FuelConnector.md).[prependListener](/api/Account/FuelConnector.md#prependlistener)

#### Defined in

node_modules/.pnpm/@types+node@22.2.0/node_modules/@types/node/events.d.ts:886

___

### prependOnceListener

▸ **prependOnceListener**&lt;`K`\>(`eventName`, `listener`): `this`

Adds a **one-time**`listener` function for the event named `eventName` to the _beginning_ of the listeners array. The next time `eventName` is triggered, this
listener is removed, and then invoked.

```js
server.prependOnceListener('connection', (stream) => {
  console.log('Ah, we have our first user!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`Since`**

v6.0.0

#### Type parameters

| Name |
| :------ |
| `K` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

`this`

#### Inherited from

[FuelConnector](/api/Account/FuelConnector.md).[prependOnceListener](/api/Account/FuelConnector.md#prependoncelistener)

#### Defined in

node_modules/.pnpm/@types+node@22.2.0/node_modules/@types/node/events.d.ts:902

___

### rawListeners

▸ **rawListeners**&lt;`K`\>(`eventName`): `Function`[]

Returns a copy of the array of listeners for the event named `eventName`,
including any wrappers (such as those created by `.once()`).

```js
import { EventEmitter } from 'node:events';
const emitter = new EventEmitter();
emitter.once('log', () => console.log('log once'));

// Returns a new Array with a function `onceWrapper` which has a property
// `listener` which contains the original listener bound above
const listeners = emitter.rawListeners('log');
const logFnWrapper = listeners[0];

// Logs "log once" to the console and does not unbind the `once` event
logFnWrapper.listener();

// Logs "log once" to the console and removes the listener
logFnWrapper();

emitter.on('log', () => console.log('log persistently'));
// Will return a new Array with a single function bound by `.on()` above
const newListeners = emitter.rawListeners('log');

// Logs "log persistently" twice
newListeners[0]();
emitter.emit('log');
```

**`Since`**

v9.4.0

#### Type parameters

| Name |
| :------ |
| `K` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |

#### Returns

`Function`[]

#### Inherited from

[FuelConnector](/api/Account/FuelConnector.md).[rawListeners](/api/Account/FuelConnector.md#rawlisteners)

#### Defined in

node_modules/.pnpm/@types+node@22.2.0/node_modules/@types/node/events.d.ts:818

___

### removeAllListeners

▸ **removeAllListeners**(`eventName?`): `this`

Removes all listeners, or those of the specified `eventName`.

It is bad practice to remove listeners added elsewhere in the code,
particularly when the `EventEmitter` instance was created by some other
component or module (e.g. sockets or file streams).

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`Since`**

v0.1.26

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName?` | `string` \| `symbol` |

#### Returns

`this`

#### Inherited from

[FuelConnector](/api/Account/FuelConnector.md).[removeAllListeners](/api/Account/FuelConnector.md#removealllisteners)

#### Defined in

node_modules/.pnpm/@types+node@22.2.0/node_modules/@types/node/events.d.ts:758

___

### removeListener

▸ **removeListener**&lt;`K`\>(`eventName`, `listener`): `this`

Removes the specified `listener` from the listener array for the event named `eventName`.

```js
const callback = (stream) => {
  console.log('someone connected!');
};
server.on('connection', callback);
// ...
server.removeListener('connection', callback);
```

`removeListener()` will remove, at most, one instance of a listener from the
listener array. If any single listener has been added multiple times to the
listener array for the specified `eventName`, then `removeListener()` must be
called multiple times to remove each instance.

Once an event is emitted, all listeners attached to it at the
time of emitting are called in order. This implies that any `removeListener()` or `removeAllListeners()` calls _after_ emitting and _before_ the last listener finishes execution
will not remove them from`emit()` in progress. Subsequent events behave as expected.

```js
import { EventEmitter } from 'node:events';
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

const callbackA = () => {
  console.log('A');
  myEmitter.removeListener('event', callbackB);
};

const callbackB = () => {
  console.log('B');
};

myEmitter.on('event', callbackA);

myEmitter.on('event', callbackB);

// callbackA removes listener callbackB but it will still be called.
// Internal listener array at time of emit [callbackA, callbackB]
myEmitter.emit('event');
// Prints:
//   A
//   B

// callbackB is now removed.
// Internal listener array [callbackA]
myEmitter.emit('event');
// Prints:
//   A
```

Because listeners are managed using an internal array, calling this will
change the position indices of any listener registered _after_ the listener
being removed. This will not impact the order in which listeners are called,
but it means that any copies of the listener array as returned by
the `emitter.listeners()` method will need to be recreated.

When a single function has been added as a handler multiple times for a single
event (as in the example below), `removeListener()` will remove the most
recently added instance. In the example the `once('ping')` listener is removed:

```js
import { EventEmitter } from 'node:events';
const ee = new EventEmitter();

function pong() {
  console.log('pong');
}

ee.on('ping', pong);
ee.once('ping', pong);
ee.removeListener('ping', pong);

ee.emit('ping');
ee.emit('ping');
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`Since`**

v0.1.26

#### Type parameters

| Name |
| :------ |
| `K` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

`this`

#### Inherited from

[FuelConnector](/api/Account/FuelConnector.md).[removeListener](/api/Account/FuelConnector.md#removelistener)

#### Defined in

node_modules/.pnpm/@types+node@22.2.0/node_modules/@types/node/events.d.ts:742

___

### selectConnector

▸ **selectConnector**(`connectorName`, `options?`): `Promise`&lt;`boolean`\>

Set the current connector to be used.

#### Parameters

| Name | Type |
| :------ | :------ |
| `connectorName` | `string` |
| `options` | [`FuelConnectorSelectOptions`](/api/Account/index.md#fuelconnectorselectoptions) |

#### Returns

`Promise`&lt;`boolean`\>

#### Implementation of

FuelSdk.selectConnector

#### Defined in

[packages/account/src/connectors/fuel.ts:348](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/connectors/fuel.ts#L348)

___

### selectNetwork

▸ **selectNetwork**(`_network`): `Promise`&lt;`boolean`\>

Should start the select network process and return true if the network has change successfully.

 networks

**`Throws`**

Error if the network already exists

#### Parameters

| Name | Type |
| :------ | :------ |
| `_network` | [`Network`](/api/Account/index.md#network) |

#### Returns

`Promise`&lt;`boolean`\>

Return true if the network was added successfully

#### Inherited from

[FuelConnector](/api/Account/FuelConnector.md).[selectNetwork](/api/Account/FuelConnector.md#selectnetwork)

#### Defined in

[packages/account/src/connectors/fuel-connector.ts:272](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/connectors/fuel-connector.ts#L272)

___

### sendTransaction

▸ **sendTransaction**(`_address`, `_transaction`): `Promise`&lt;`string`\>

Should start the send transaction process and return
the transaction id submitted to the network.

If the network is not available for the connection
it should throw an error to avoid the transaction
to be sent to the wrong network and lost.

#### Parameters

| Name | Type |
| :------ | :------ |
| `_address` | `string` |
| `_transaction` | [`TransactionRequestLike`](/api/Account/index.md#transactionrequestlike) |

#### Returns

`Promise`&lt;`string`\>

The transaction id

#### Inherited from

[FuelConnector](/api/Account/FuelConnector.md).[sendTransaction](/api/Account/FuelConnector.md#sendtransaction)

#### Defined in

[packages/account/src/connectors/fuel-connector.ts:197](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/connectors/fuel-connector.ts#L197)

___

### setDefaultConnector

▸ **setDefaultConnector**(): `Promise`&lt;`undefined` \| `boolean`\>

Setup the default connector from the storage.

#### Returns

`Promise`&lt;`undefined` \| `boolean`\>

#### Defined in

[packages/account/src/connectors/fuel.ts:140](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/connectors/fuel.ts#L140)

___

### setMaxListeners

▸ **setMaxListeners**(`n`): `this`

By default `EventEmitter`s will print a warning if more than `10` listeners are
added for a particular event. This is a useful default that helps finding
memory leaks. The `emitter.setMaxListeners()` method allows the limit to be
modified for this specific `EventEmitter` instance. The value can be set to `Infinity` (or `0`) to indicate an unlimited number of listeners.

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`Since`**

v0.3.5

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

`this`

#### Inherited from

[FuelConnector](/api/Account/FuelConnector.md).[setMaxListeners](/api/Account/FuelConnector.md#setmaxlisteners)

#### Defined in

node_modules/.pnpm/@types+node@22.2.0/node_modules/@types/node/events.d.ts:768

___

### setupConnectorEvents

▸ **setupConnectorEvents**(`events`): `void`

Start listener for all the events of the current
connector and emit them to the Fuel instance

#### Parameters

| Name | Type |
| :------ | :------ |
| `events` | `string`[] |

#### Returns

`void`

#### Defined in

[packages/account/src/connectors/fuel.ts:157](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/connectors/fuel.ts#L157)

___

### setupConnectorListener

▸ **setupConnectorListener**(): () => `void`

Setup a listener for the FuelConnector event and add the connector
to the list of new connectors.

#### Returns

`fn`

▸ (): `void`

##### Returns

`void`

#### Defined in

[packages/account/src/connectors/fuel.ts:267](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/connectors/fuel.ts#L267)

___

### setupMethods

▸ **setupMethods**(): `void`

Create a method for each method proxy that is available on the Common interface
and call the method from the current connector.

#### Returns

`void`

#### Defined in

[packages/account/src/connectors/fuel.ts:193](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/connectors/fuel.ts#L193)

___

### signMessage

▸ **signMessage**(`_address`, `_message`): `Promise`&lt;`string`\>

Should start the sign message process and return
the signed message.

#### Parameters

| Name | Type |
| :------ | :------ |
| `_address` | `string` |
| `_message` | `string` |

#### Returns

`Promise`&lt;`string`\>

Message signature

#### Inherited from

[FuelConnector](/api/Account/FuelConnector.md).[signMessage](/api/Account/FuelConnector.md#signmessage)

#### Defined in

[packages/account/src/connectors/fuel-connector.ts:167](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/connectors/fuel-connector.ts#L167)

___

### signTransaction

▸ **signTransaction**(`_address`, `_transaction`): `Promise`&lt;`string`\>

Should start the sign transaction process and return
the signed transaction.

#### Parameters

| Name | Type |
| :------ | :------ |
| `_address` | `string` |
| `_transaction` | [`TransactionRequestLike`](/api/Account/index.md#transactionrequestlike) |

#### Returns

`Promise`&lt;`string`\>

Transaction signature

#### Inherited from

[FuelConnector](/api/Account/FuelConnector.md).[signTransaction](/api/Account/FuelConnector.md#signtransaction)

#### Defined in

[packages/account/src/connectors/fuel-connector.ts:180](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/connectors/fuel-connector.ts#L180)

___

### triggerConnectorEvents

▸ **triggerConnectorEvents**(): `Promise`&lt;`void`\>

#### Returns

`Promise`&lt;`void`\>

#### Defined in

[packages/account/src/connectors/fuel.ts:309](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/connectors/fuel.ts#L309)

___

### unsubscribe

▸ **unsubscribe**(): `void`

Remove all open listeners this is useful when you want to
remove the Fuel instance and avoid memory leaks.

#### Returns

`void`

#### Implementation of

FuelSdk.unsubscribe

#### Defined in

[packages/account/src/connectors/fuel.ts:467](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/connectors/fuel.ts#L467)

___

### version

▸ **version**(): `Promise`&lt;[`Version`](/api/Account/index.md#version)\>

Should return the current version of the connector
and the network version that is compatible.

#### Returns

`Promise`&lt;[`Version`](/api/Account/index.md#version)\>

boolean - connection status.

#### Inherited from

[FuelConnector](/api/Account/FuelConnector.md).[version](/api/Account/FuelConnector.md#version)

#### Defined in

[packages/account/src/connectors/fuel-connector.ts:110](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/connectors/fuel-connector.ts#L110)

___

### addAbortListener

▸ **addAbortListener**(`signal`, `resource`): `Disposable`

Listens once to the `abort` event on the provided `signal`.

Listening to the `abort` event on abort signals is unsafe and may
lead to resource leaks since another third party with the signal can
call `e.stopImmediatePropagation()`. Unfortunately Node.js cannot change
this since it would violate the web standard. Additionally, the original
API makes it easy to forget to remove listeners.

This API allows safely using `AbortSignal`s in Node.js APIs by solving these
two issues by listening to the event such that `stopImmediatePropagation` does
not prevent the listener from running.

Returns a disposable so that it may be unsubscribed from more easily.

```js
import { addAbortListener } from 'node:events';

function example(signal) {
  let disposable;
  try {
    signal.addEventListener('abort', (e) => e.stopImmediatePropagation());
    disposable = addAbortListener(signal, (e) => {
      // Do something when signal is aborted.
    });
  } finally {
    disposable?.[Symbol.dispose]();
  }
}
```

**`Since`**

v20.5.0

#### Parameters

| Name | Type |
| :------ | :------ |
| `signal` | `AbortSignal` |
| `resource` | (`event`: `Event`) => `void` |

#### Returns

`Disposable`

Disposable that removes the `abort` listener.

#### Inherited from

[FuelConnector](/api/Account/FuelConnector.md).[addAbortListener](/api/Account/FuelConnector.md#addabortlistener)

#### Defined in

node_modules/.pnpm/@types+node@22.2.0/node_modules/@types/node/events.d.ts:437

___

### getEventListeners

▸ **getEventListeners**(`emitter`, `name`): `Function`[]

Returns a copy of the array of listeners for the event named `eventName`.

For `EventEmitter`s this behaves exactly the same as calling `.listeners` on
the emitter.

For `EventTarget`s this is the only way to get the event listeners for the
event target. This is useful for debugging and diagnostic purposes.

```js
import { getEventListeners, EventEmitter } from 'node:events';

{
  const ee = new EventEmitter();
  const listener = () => console.log('Events are fun');
  ee.on('foo', listener);
  console.log(getEventListeners(ee, 'foo')); // [ [Function: listener] ]
}
{
  const et = new EventTarget();
  const listener = () => console.log('Events are fun');
  et.addEventListener('foo', listener);
  console.log(getEventListeners(et, 'foo')); // [ [Function: listener] ]
}
```

**`Since`**

v15.2.0, v14.17.0

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | `EventTarget` \| `EventEmitter`&lt;`DefaultEventMap`\> |
| `name` | `string` \| `symbol` |

#### Returns

`Function`[]

#### Inherited from

[FuelConnector](/api/Account/FuelConnector.md).[getEventListeners](/api/Account/FuelConnector.md#geteventlisteners)

#### Defined in

node_modules/.pnpm/@types+node@22.2.0/node_modules/@types/node/events.d.ts:358

___

### getMaxListeners

▸ **getMaxListeners**(`emitter`): `number`

Returns the currently set max amount of listeners.

For `EventEmitter`s this behaves exactly the same as calling `.getMaxListeners` on
the emitter.

For `EventTarget`s this is the only way to get the max event listeners for the
event target. If the number of event handlers on a single EventTarget exceeds
the max set, the EventTarget will print a warning.

```js
import { getMaxListeners, setMaxListeners, EventEmitter } from 'node:events';

{
  const ee = new EventEmitter();
  console.log(getMaxListeners(ee)); // 10
  setMaxListeners(11, ee);
  console.log(getMaxListeners(ee)); // 11
}
{
  const et = new EventTarget();
  console.log(getMaxListeners(et)); // 10
  setMaxListeners(11, et);
  console.log(getMaxListeners(et)); // 11
}
```

**`Since`**

v19.9.0

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | `EventTarget` \| `EventEmitter`&lt;`DefaultEventMap`\> |

#### Returns

`number`

#### Inherited from

[FuelConnector](/api/Account/FuelConnector.md).[getMaxListeners](/api/Account/FuelConnector.md#getmaxlisteners-1)

#### Defined in

node_modules/.pnpm/@types+node@22.2.0/node_modules/@types/node/events.d.ts:387

___

### listenerCount

▸ **listenerCount**(`emitter`, `eventName`): `number`

A class method that returns the number of listeners for the given `eventName` registered on the given `emitter`.

```js
import { EventEmitter, listenerCount } from 'node:events';

const myEmitter = new EventEmitter();
myEmitter.on('event', () => {});
myEmitter.on('event', () => {});
console.log(listenerCount(myEmitter, 'event'));
// Prints: 2
```

**`Since`**

v0.9.12

**`Deprecated`**

Since v3.2.0 - Use `listenerCount` instead.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `emitter` | `EventEmitter`&lt;`DefaultEventMap`\> | The emitter to query |
| `eventName` | `string` \| `symbol` | The event name |

#### Returns

`number`

#### Inherited from

[FuelConnector](/api/Account/FuelConnector.md).[listenerCount](/api/Account/FuelConnector.md#listenercount-1)

#### Defined in

node_modules/.pnpm/@types+node@22.2.0/node_modules/@types/node/events.d.ts:330

___

### on

▸ **on**(`emitter`, `eventName`, `options?`): `AsyncIterableIterator`&lt;`any`[]\>

```js
import { on, EventEmitter } from 'node:events';
import process from 'node:process';

const ee = new EventEmitter();

// Emit later on
process.nextTick(() => {
  ee.emit('foo', 'bar');
  ee.emit('foo', 42);
});

for await (const event of on(ee, 'foo')) {
  // The execution of this inner block is synchronous and it
  // processes one event at a time (even with await). Do not use
  // if concurrent execution is required.
  console.log(event); // prints ['bar'] [42]
}
// Unreachable here
```

Returns an `AsyncIterator` that iterates `eventName` events. It will throw
if the `EventEmitter` emits `'error'`. It removes all listeners when
exiting the loop. The `value` returned by each iteration is an array
composed of the emitted event arguments.

An `AbortSignal` can be used to cancel waiting on events:

```js
import { on, EventEmitter } from 'node:events';
import process from 'node:process';

const ac = new AbortController();

(async () => {
  const ee = new EventEmitter();

  // Emit later on
  process.nextTick(() => {
    ee.emit('foo', 'bar');
    ee.emit('foo', 42);
  });

  for await (const event of on(ee, 'foo', { signal: ac.signal })) {
    // The execution of this inner block is synchronous and it
    // processes one event at a time (even with await). Do not use
    // if concurrent execution is required.
    console.log(event); // prints ['bar'] [42]
  }
  // Unreachable here
})();

process.nextTick(() => ac.abort());
```

Use the `close` option to specify an array of event names that will end the iteration:

```js
import { on, EventEmitter } from 'node:events';
import process from 'node:process';

const ee = new EventEmitter();

// Emit later on
process.nextTick(() => {
  ee.emit('foo', 'bar');
  ee.emit('foo', 42);
  ee.emit('close');
});

for await (const event of on(ee, 'foo', { close: ['close'] })) {
  console.log(event); // prints ['bar'] [42]
}
// the loop will exit after 'close' is emitted
console.log('done'); // prints 'done'
```

**`Since`**

v13.6.0, v12.16.0

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | `EventEmitter`&lt;`DefaultEventMap`\> |
| `eventName` | `string` \| `symbol` |
| `options?` | `StaticEventEmitterIteratorOptions` |

#### Returns

`AsyncIterableIterator`&lt;`any`[]\>

An `AsyncIterator` that iterates `eventName` events emitted by the `emitter`

#### Inherited from

[FuelConnector](/api/Account/FuelConnector.md).[on](/api/Account/FuelConnector.md#on-1)

#### Defined in

node_modules/.pnpm/@types+node@22.2.0/node_modules/@types/node/events.d.ts:303

▸ **on**(`emitter`, `eventName`, `options?`): `AsyncIterableIterator`&lt;`any`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | `EventTarget` |
| `eventName` | `string` |
| `options?` | `StaticEventEmitterIteratorOptions` |

#### Returns

`AsyncIterableIterator`&lt;`any`[]\>

#### Inherited from

[FuelConnector](/api/Account/FuelConnector.md).[on](/api/Account/FuelConnector.md#on-1)

#### Defined in

node_modules/.pnpm/@types+node@22.2.0/node_modules/@types/node/events.d.ts:308

___

### once

▸ **once**(`emitter`, `eventName`, `options?`): `Promise`&lt;`any`[]\>

Creates a `Promise` that is fulfilled when the `EventEmitter` emits the given
event or that is rejected if the `EventEmitter` emits `'error'` while waiting.
The `Promise` will resolve with an array of all the arguments emitted to the
given event.

This method is intentionally generic and works with the web platform [EventTarget](https://dom.spec.whatwg.org/#interface-eventtarget) interface, which has no special`'error'` event
semantics and does not listen to the `'error'` event.

```js
import { once, EventEmitter } from 'node:events';
import process from 'node:process';

const ee = new EventEmitter();

process.nextTick(() => {
  ee.emit('myevent', 42);
});

const [value] = await once(ee, 'myevent');
console.log(value);

const err = new Error('kaboom');
process.nextTick(() => {
  ee.emit('error', err);
});

try {
  await once(ee, 'myevent');
} catch (err) {
  console.error('error happened', err);
}
```

The special handling of the `'error'` event is only used when `events.once()` is used to wait for another event. If `events.once()` is used to wait for the
'`error'` event itself, then it is treated as any other kind of event without
special handling:

```js
import { EventEmitter, once } from 'node:events';

const ee = new EventEmitter();

once(ee, 'error')
  .then(([err]) => console.log('ok', err.message))
  .catch((err) => console.error('error', err.message));

ee.emit('error', new Error('boom'));

// Prints: ok boom
```

An `AbortSignal` can be used to cancel waiting for the event:

```js
import { EventEmitter, once } from 'node:events';

const ee = new EventEmitter();
const ac = new AbortController();

async function foo(emitter, event, signal) {
  try {
    await once(emitter, event, { signal });
    console.log('event emitted!');
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('Waiting for the event was canceled!');
    } else {
      console.error('There was an error', error.message);
    }
  }
}

foo(ee, 'foo', ac.signal);
ac.abort(); // Abort waiting for the event
ee.emit('foo'); // Prints: Waiting for the event was canceled!
```

**`Since`**

v11.13.0, v10.16.0

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | `EventEmitter`&lt;`DefaultEventMap`\> |
| `eventName` | `string` \| `symbol` |
| `options?` | `StaticEventEmitterOptions` |

#### Returns

`Promise`&lt;`any`[]\>

#### Inherited from

[FuelConnector](/api/Account/FuelConnector.md).[once](/api/Account/FuelConnector.md#once-1)

#### Defined in

node_modules/.pnpm/@types+node@22.2.0/node_modules/@types/node/events.d.ts:217

▸ **once**(`emitter`, `eventName`, `options?`): `Promise`&lt;`any`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | `EventTarget` |
| `eventName` | `string` |
| `options?` | `StaticEventEmitterOptions` |

#### Returns

`Promise`&lt;`any`[]\>

#### Inherited from

[FuelConnector](/api/Account/FuelConnector.md).[once](/api/Account/FuelConnector.md#once-1)

#### Defined in

node_modules/.pnpm/@types+node@22.2.0/node_modules/@types/node/events.d.ts:222

___

### setMaxListeners

▸ **setMaxListeners**(`n?`, `...eventTargets`): `void`

```js
import { setMaxListeners, EventEmitter } from 'node:events';

const target = new EventTarget();
const emitter = new EventEmitter();

setMaxListeners(5, target, emitter);
```

**`Since`**

v15.4.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n?` | `number` | A non-negative number. The maximum number of listeners per `EventTarget` event. |
| `...eventTargets` | (`EventTarget` \| `EventEmitter`&lt;`DefaultEventMap`\>)[] | - |

#### Returns

`void`

#### Inherited from

[FuelConnector](/api/Account/FuelConnector.md).[setMaxListeners](/api/Account/FuelConnector.md#setmaxlisteners-1)

#### Defined in

node_modules/.pnpm/@types+node@22.2.0/node_modules/@types/node/events.d.ts:402
