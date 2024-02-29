# Class: FuelConnector

[@fuel-ts/account](/api/Account/index.md).FuelConnector

FuelConnector

Wallet Connector is a interface that represents a Wallet Connector and all the methods
that should be implemented to be compatible with the Fuel SDK.

## Hierarchy

- `EventEmitter`

  ↳ **`FuelConnector`**

  ↳↳ [`Fuel`](/api/Account/Fuel.md)

## Constructors

### constructor

• **new FuelConnector**(`options?`): [`FuelConnector`](/api/Account/FuelConnector.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `EventEmitterOptions` |

#### Returns

[`FuelConnector`](/api/Account/FuelConnector.md)

#### Inherited from

EventEmitter.constructor

#### Defined in

node_modules/.pnpm/@types+node@18.15.3/node_modules/@types/node/events.d.ts:111

## Properties

### connected

• **connected**: `boolean` = `false`

#### Defined in

[packages/account/src/connectors/fuel-connector.ts:26](https://github.com/FuelLabs/fuels-ts/blob/e239ba64/packages/account/src/connectors/fuel-connector.ts#L26)

___

### events

• **events**: typeof [`FuelConnectorEventTypes`](/api/Account/FuelConnectorEventTypes.md) = `FuelConnectorEventTypes`

#### Defined in

[packages/account/src/connectors/fuel-connector.ts:28](https://github.com/FuelLabs/fuels-ts/blob/e239ba64/packages/account/src/connectors/fuel-connector.ts#L28)

___

### installed

• **installed**: `boolean` = `false`

#### Defined in

[packages/account/src/connectors/fuel-connector.ts:27](https://github.com/FuelLabs/fuels-ts/blob/e239ba64/packages/account/src/connectors/fuel-connector.ts#L27)

___

### metadata

• **metadata**: [`ConnectorMetadata`](/api/Account/index.md#connectormetadata)

#### Defined in

[packages/account/src/connectors/fuel-connector.ts:25](https://github.com/FuelLabs/fuels-ts/blob/e239ba64/packages/account/src/connectors/fuel-connector.ts#L25)

___

### name

• **name**: `string` = `''`

#### Defined in

[packages/account/src/connectors/fuel-connector.ts:24](https://github.com/FuelLabs/fuels-ts/blob/e239ba64/packages/account/src/connectors/fuel-connector.ts#L24)

___

### captureRejectionSymbol

▪ `Static` `Readonly` **captureRejectionSymbol**: typeof [`captureRejectionSymbol`](/api/Account/WalletManager.md#capturerejectionsymbol)

#### Inherited from

EventEmitter.captureRejectionSymbol

#### Defined in

node_modules/.pnpm/@types+node@18.15.3/node_modules/@types/node/events.d.ts:328

___

### captureRejections

▪ `Static` **captureRejections**: `boolean`

Sets or gets the default captureRejection value for all emitters.

#### Inherited from

EventEmitter.captureRejections

#### Defined in

node_modules/.pnpm/@types+node@18.15.3/node_modules/@types/node/events.d.ts:333

___

### defaultMaxListeners

▪ `Static` **defaultMaxListeners**: `number`

#### Inherited from

EventEmitter.defaultMaxListeners

#### Defined in

node_modules/.pnpm/@types+node@18.15.3/node_modules/@types/node/events.d.ts:334

___

### errorMonitor

▪ `Static` `Readonly` **errorMonitor**: typeof [`errorMonitor`](/api/Account/WalletManager.md#errormonitor)

This symbol shall be used to install a listener for only monitoring `'error'`
events. Listeners installed using this symbol are called before the regular
`'error'` listeners are called.

Installing a listener using this symbol does not change the behavior once an
`'error'` event is emitted, therefore the process will still crash if no
regular `'error'` listener is installed.

#### Inherited from

EventEmitter.errorMonitor

#### Defined in

node_modules/.pnpm/@types+node@18.15.3/node_modules/@types/node/events.d.ts:327

## Methods

### accounts

▸ **accounts**(): `Promise`&lt;`string`[]\>

Should return all the accounts authorized for the
current connection.

#### Returns

`Promise`&lt;`string`[]\>

The accounts addresses strings

#### Defined in

[packages/account/src/connectors/fuel-connector.ts:66](https://github.com/FuelLabs/fuels-ts/blob/e239ba64/packages/account/src/connectors/fuel-connector.ts#L66)

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

#### Defined in

[packages/account/src/connectors/fuel-connector.ts:224](https://github.com/FuelLabs/fuels-ts/blob/e239ba64/packages/account/src/connectors/fuel-connector.ts#L224)

___

### addAsset

▸ **addAsset**(`_asset`): `Promise`&lt;`boolean`\>

Should add the the asset metadata to the connector and return true if the asset
was added successfully.

If the asset already exists it should throw an error.

 assets

**`Throws`**

Error if the asset already exists

#### Parameters

| Name | Type |
| :------ | :------ |
| `_asset` | `Asset` |

#### Returns

`Promise`&lt;`boolean`\>

True if the asset was added successfully

#### Defined in

[packages/account/src/connectors/fuel-connector.ts:162](https://github.com/FuelLabs/fuels-ts/blob/e239ba64/packages/account/src/connectors/fuel-connector.ts#L162)

___

### addAssets

▸ **addAssets**(`_assets`): `Promise`&lt;`boolean`\>

Should add the the assets metadata to the connector and return true if the asset
was added successfully.

If the asset already exists it should throw an error.

 assets

**`Throws`**

Error if the asset already exists

#### Parameters

| Name | Type |
| :------ | :------ |
| `_assets` | `Asset`[] |

#### Returns

`Promise`&lt;`boolean`\>

True if the asset was added successfully

#### Defined in

[packages/account/src/connectors/fuel-connector.ts:147](https://github.com/FuelLabs/fuels-ts/blob/e239ba64/packages/account/src/connectors/fuel-connector.ts#L147)

___

### addListener

▸ **addListener**(`eventName`, `listener`): [`FuelConnector`](/api/Account/FuelConnector.md)

Alias for `emitter.on(eventName, listener)`.

**`Since`**

v0.1.26

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`FuelConnector`](/api/Account/FuelConnector.md)

#### Inherited from

EventEmitter.addListener

#### Defined in

node_modules/.pnpm/@types+node@18.15.3/node_modules/@types/node/events.d.ts:354

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

#### Defined in

[packages/account/src/connectors/fuel-connector.ts:183](https://github.com/FuelLabs/fuels-ts/blob/e239ba64/packages/account/src/connectors/fuel-connector.ts#L183)

___

### assets

▸ **assets**(): `Promise`&lt;`Asset`[]\>

Should return all the assets added to the connector. If a connection is already established.

#### Returns

`Promise`&lt;`Asset`[]\>

Array of assets metadata from the connector vinculated to the all accounts from a specific Wallet.

#### Defined in

[packages/account/src/connectors/fuel-connector.ts:171](https://github.com/FuelLabs/fuels-ts/blob/e239ba64/packages/account/src/connectors/fuel-connector.ts#L171)

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

#### Defined in

[packages/account/src/connectors/fuel-connector.ts:79](https://github.com/FuelLabs/fuels-ts/blob/e239ba64/packages/account/src/connectors/fuel-connector.ts#L79)

___

### currentAccount

▸ **currentAccount**(): `Promise`&lt;``null`` \| `string`\>

Should return the current account selected inside the connector, if the account
is authorized for the connection.

If the account is not authorized it should return null.

#### Returns

`Promise`&lt;``null`` \| `string`\>

The current account selected otherwise null.

#### Defined in

[packages/account/src/connectors/fuel-connector.ts:132](https://github.com/FuelLabs/fuels-ts/blob/e239ba64/packages/account/src/connectors/fuel-connector.ts#L132)

___

### currentNetwork

▸ **currentNetwork**(): `Promise`&lt;[`Network`](/api/Account/index.md#network)\>

Should return the current network selected inside the connector. Even if the connection is not established.

#### Returns

`Promise`&lt;[`Network`](/api/Account/index.md#network)\>

Return the current network selected inside the connector.

#### Defined in

[packages/account/src/connectors/fuel-connector.ts:213](https://github.com/FuelLabs/fuels-ts/blob/e239ba64/packages/account/src/connectors/fuel-connector.ts#L213)

___

### disconnect

▸ **disconnect**(): `Promise`&lt;`boolean`\>

Should disconnect the current connection and
return false if the disconnection was successful.

 assets connection

#### Returns

`Promise`&lt;`boolean`\>

The connection status.

#### Defined in

[packages/account/src/connectors/fuel-connector.ts:90](https://github.com/FuelLabs/fuels-ts/blob/e239ba64/packages/account/src/connectors/fuel-connector.ts#L90)

___

### emit

▸ **emit**(`eventName`, `...args`): `boolean`

Synchronously calls each of the listeners registered for the event named`eventName`, in the order they were registered, passing the supplied arguments
to each.

Returns `true` if the event had listeners, `false` otherwise.

```js
const EventEmitter = require('events');
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

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `...args` | `any`[] |

#### Returns

`boolean`

#### Inherited from

EventEmitter.emit

#### Defined in

node_modules/.pnpm/@types+node@18.15.3/node_modules/@types/node/events.d.ts:610

___

### eventNames

▸ **eventNames**(): (`string` \| `symbol`)[]

Returns an array listing the events for which the emitter has registered
listeners. The values in the array are strings or `Symbol`s.

```js
const EventEmitter = require('events');
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

EventEmitter.eventNames

#### Defined in

node_modules/.pnpm/@types+node@18.15.3/node_modules/@types/node/events.d.ts:669

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

#### Defined in

[packages/account/src/connectors/fuel-connector.ts:234](https://github.com/FuelLabs/fuels-ts/blob/e239ba64/packages/account/src/connectors/fuel-connector.ts#L234)

___

### getMaxListeners

▸ **getMaxListeners**(): `number`

Returns the current max listener value for the `EventEmitter` which is either
set by `emitter.setMaxListeners(n)` or defaults to [defaultMaxListeners](/api/Account/FuelConnector.md#defaultmaxlisteners).

**`Since`**

v1.0.0

#### Returns

`number`

#### Inherited from

EventEmitter.getMaxListeners

#### Defined in

node_modules/.pnpm/@types+node@18.15.3/node_modules/@types/node/events.d.ts:526

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

#### Defined in

[packages/account/src/connectors/fuel-connector.ts:244](https://github.com/FuelLabs/fuels-ts/blob/e239ba64/packages/account/src/connectors/fuel-connector.ts#L244)

___

### isConnected

▸ **isConnected**(): `Promise`&lt;`boolean`\>

Should return true if the connector is connected
to any of the accounts available.

#### Returns

`Promise`&lt;`boolean`\>

The connection status.

#### Defined in

[packages/account/src/connectors/fuel-connector.ts:56](https://github.com/FuelLabs/fuels-ts/blob/e239ba64/packages/account/src/connectors/fuel-connector.ts#L56)

___

### listenerCount

▸ **listenerCount**(`eventName`): `number`

Returns the number of listeners listening to the event named `eventName`.

**`Since`**

v3.2.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event being listened for |

#### Returns

`number`

#### Inherited from

EventEmitter.listenerCount

#### Defined in

node_modules/.pnpm/@types+node@18.15.3/node_modules/@types/node/events.d.ts:616

___

### listeners

▸ **listeners**(`eventName`): `Function`[]

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

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |

#### Returns

`Function`[]

#### Inherited from

EventEmitter.listeners

#### Defined in

node_modules/.pnpm/@types+node@18.15.3/node_modules/@types/node/events.d.ts:539

___

### networks

▸ **networks**(): `Promise`&lt;[`Network`](/api/Account/index.md#network)[]\>

Should return all the networks available from the connector. If the connection is already established.

#### Returns

`Promise`&lt;[`Network`](/api/Account/index.md#network)[]\>

Return all the networks added to the connector.

#### Defined in

[packages/account/src/connectors/fuel-connector.ts:204](https://github.com/FuelLabs/fuels-ts/blob/e239ba64/packages/account/src/connectors/fuel-connector.ts#L204)

___

### off

▸ **off**(`eventName`, `listener`): [`FuelConnector`](/api/Account/FuelConnector.md)

Alias for `emitter.removeListener()`.

**`Since`**

v10.0.0

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`FuelConnector`](/api/Account/FuelConnector.md)

#### Inherited from

EventEmitter.off

#### Defined in

node_modules/.pnpm/@types+node@18.15.3/node_modules/@types/node/events.d.ts:499

___

### on

▸ **on**&lt;`E`, `D`\>(`eventName`, `listener`): [`FuelConnector`](/api/Account/FuelConnector.md)

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

[`FuelConnector`](/api/Account/FuelConnector.md)

#### Overrides

EventEmitter.on

#### Defined in

[packages/account/src/connectors/fuel-connector.ts:254](https://github.com/FuelLabs/fuels-ts/blob/e239ba64/packages/account/src/connectors/fuel-connector.ts#L254)

___

### once

▸ **once**(`eventName`, `listener`): [`FuelConnector`](/api/Account/FuelConnector.md)

Adds a **one-time**`listener` function for the event named `eventName`. The
next time `eventName` is triggered, this listener is removed and then invoked.

```js
server.once('connection', (stream) => {
  console.log('Ah, we have our first user!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

By default, event listeners are invoked in the order they are added. The`emitter.prependOnceListener()` method can be used as an alternative to add the
event listener to the beginning of the listeners array.

```js
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

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

[`FuelConnector`](/api/Account/FuelConnector.md)

#### Inherited from

EventEmitter.once

#### Defined in

node_modules/.pnpm/@types+node@18.15.3/node_modules/@types/node/events.d.ts:414

___

### ping

▸ **ping**(): `Promise`&lt;`boolean`\>

Should return true if the connector is loaded
in less then one second.

#### Returns

`Promise`&lt;`boolean`\>

Always true.

#### Defined in

[packages/account/src/connectors/fuel-connector.ts:36](https://github.com/FuelLabs/fuels-ts/blob/e239ba64/packages/account/src/connectors/fuel-connector.ts#L36)

___

### prependListener

▸ **prependListener**(`eventName`, `listener`): [`FuelConnector`](/api/Account/FuelConnector.md)

Adds the `listener` function to the _beginning_ of the listeners array for the
event named `eventName`. No checks are made to see if the `listener` has
already been added. Multiple calls passing the same combination of `eventName`and `listener` will result in the `listener` being added, and called, multiple
times.

```js
server.prependListener('connection', (stream) => {
  console.log('someone connected!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`Since`**

v6.0.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

[`FuelConnector`](/api/Account/FuelConnector.md)

#### Inherited from

EventEmitter.prependListener

#### Defined in

node_modules/.pnpm/@types+node@18.15.3/node_modules/@types/node/events.d.ts:634

___

### prependOnceListener

▸ **prependOnceListener**(`eventName`, `listener`): [`FuelConnector`](/api/Account/FuelConnector.md)

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

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

[`FuelConnector`](/api/Account/FuelConnector.md)

#### Inherited from

EventEmitter.prependOnceListener

#### Defined in

node_modules/.pnpm/@types+node@18.15.3/node_modules/@types/node/events.d.ts:650

___

### rawListeners

▸ **rawListeners**(`eventName`): `Function`[]

Returns a copy of the array of listeners for the event named `eventName`,
including any wrappers (such as those created by `.once()`).

```js
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

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |

#### Returns

`Function`[]

#### Inherited from

EventEmitter.rawListeners

#### Defined in

node_modules/.pnpm/@types+node@18.15.3/node_modules/@types/node/events.d.ts:569

___

### removeAllListeners

▸ **removeAllListeners**(`event?`): [`FuelConnector`](/api/Account/FuelConnector.md)

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
| `event?` | `string` \| `symbol` |

#### Returns

[`FuelConnector`](/api/Account/FuelConnector.md)

#### Inherited from

EventEmitter.removeAllListeners

#### Defined in

node_modules/.pnpm/@types+node@18.15.3/node_modules/@types/node/events.d.ts:510

___

### removeListener

▸ **removeListener**(`eventName`, `listener`): [`FuelConnector`](/api/Account/FuelConnector.md)

Removes the specified `listener` from the listener array for the event named`eventName`.

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
time of emitting are called in order. This implies that any`removeListener()` or `removeAllListeners()` calls _after_ emitting and _before_ the last listener finishes execution
will not remove them from`emit()` in progress. Subsequent events behave as expected.

```js
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
recently added instance. In the example the `once('ping')`listener is removed:

```js
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

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`FuelConnector`](/api/Account/FuelConnector.md)

#### Inherited from

EventEmitter.removeListener

#### Defined in

node_modules/.pnpm/@types+node@18.15.3/node_modules/@types/node/events.d.ts:494

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

#### Defined in

[packages/account/src/connectors/fuel-connector.ts:195](https://github.com/FuelLabs/fuels-ts/blob/e239ba64/packages/account/src/connectors/fuel-connector.ts#L195)

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

#### Defined in

[packages/account/src/connectors/fuel-connector.ts:120](https://github.com/FuelLabs/fuels-ts/blob/e239ba64/packages/account/src/connectors/fuel-connector.ts#L120)

___

### setMaxListeners

▸ **setMaxListeners**(`n`): [`FuelConnector`](/api/Account/FuelConnector.md)

By default `EventEmitter`s will print a warning if more than `10` listeners are
added for a particular event. This is a useful default that helps finding
memory leaks. The `emitter.setMaxListeners()` method allows the limit to be
modified for this specific `EventEmitter` instance. The value can be set to`Infinity` (or `0`) to indicate an unlimited number of listeners.

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`Since`**

v0.3.5

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

[`FuelConnector`](/api/Account/FuelConnector.md)

#### Inherited from

EventEmitter.setMaxListeners

#### Defined in

node_modules/.pnpm/@types+node@18.15.3/node_modules/@types/node/events.d.ts:520

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

#### Defined in

[packages/account/src/connectors/fuel-connector.ts:103](https://github.com/FuelLabs/fuels-ts/blob/e239ba64/packages/account/src/connectors/fuel-connector.ts#L103)

___

### version

▸ **version**(): `Promise`&lt;[`Version`](/api/Account/index.md#version)\>

Should return the current version of the connector
and the network version that is compatible.

#### Returns

`Promise`&lt;[`Version`](/api/Account/index.md#version)\>

boolean - connection status.

#### Defined in

[packages/account/src/connectors/fuel-connector.ts:46](https://github.com/FuelLabs/fuels-ts/blob/e239ba64/packages/account/src/connectors/fuel-connector.ts#L46)

___

### getEventListeners

▸ **getEventListeners**(`emitter`, `name`): `Function`[]

Returns a copy of the array of listeners for the event named `eventName`.

For `EventEmitter`s this behaves exactly the same as calling `.listeners` on
the emitter.

For `EventTarget`s this is the only way to get the event listeners for the
event target. This is useful for debugging and diagnostic purposes.

```js
const { getEventListeners, EventEmitter } = require('events');

{
  const ee = new EventEmitter();
  const listener = () => console.log('Events are fun');
  ee.on('foo', listener);
  getEventListeners(ee, 'foo'); // [listener]
}
{
  const et = new EventTarget();
  const listener = () => console.log('Events are fun');
  et.addEventListener('foo', listener);
  getEventListeners(et, 'foo'); // [listener]
}
```

**`Since`**

v15.2.0, v14.17.0

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | `EventEmitter` \| `_DOMEventTarget` |
| `name` | `string` \| `symbol` |

#### Returns

`Function`[]

#### Inherited from

EventEmitter.getEventListeners

#### Defined in

node_modules/.pnpm/@types+node@18.15.3/node_modules/@types/node/events.d.ts:299

___

### listenerCount

▸ **listenerCount**(`emitter`, `eventName`): `number`

A class method that returns the number of listeners for the given `eventName`registered on the given `emitter`.

```js
const { EventEmitter, listenerCount } = require('events');
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
| `emitter` | `EventEmitter` | The emitter to query |
| `eventName` | `string` \| `symbol` | The event name |

#### Returns

`number`

#### Inherited from

EventEmitter.listenerCount

#### Defined in

node_modules/.pnpm/@types+node@18.15.3/node_modules/@types/node/events.d.ts:271

___

### on

▸ **on**(`emitter`, `eventName`, `options?`): `AsyncIterableIterator`&lt;`any`\>

```js
const { on, EventEmitter } = require('events');

(async () => {
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
})();
```

Returns an `AsyncIterator` that iterates `eventName` events. It will throw
if the `EventEmitter` emits `'error'`. It removes all listeners when
exiting the loop. The `value` returned by each iteration is an array
composed of the emitted event arguments.

An `AbortSignal` can be used to cancel waiting on events:

```js
const { on, EventEmitter } = require('events');
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

**`Since`**

v13.6.0, v12.16.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `emitter` | `EventEmitter` | - |
| `eventName` | `string` | The name of the event being listened for |
| `options?` | `StaticEventEmitterOptions` | - |

#### Returns

`AsyncIterableIterator`&lt;`any`\>

that iterates `eventName` events emitted by the `emitter`

#### Inherited from

EventEmitter.on

#### Defined in

node_modules/.pnpm/@types+node@18.15.3/node_modules/@types/node/events.d.ts:254

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
const { once, EventEmitter } = require('events');

async function run() {
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
    console.log('error happened', err);
  }
}

run();
```

The special handling of the `'error'` event is only used when `events.once()`is used to wait for another event. If `events.once()` is used to wait for the
'`error'` event itself, then it is treated as any other kind of event without
special handling:

```js
const { EventEmitter, once } = require('events');

const ee = new EventEmitter();

once(ee, 'error')
  .then(([err]) => console.log('ok', err.message))
  .catch((err) => console.log('error', err.message));

ee.emit('error', new Error('boom'));

// Prints: ok boom
```

An `AbortSignal` can be used to cancel waiting for the event:

```js
const { EventEmitter, once } = require('events');

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
| `emitter` | `_NodeEventTarget` |
| `eventName` | `string` \| `symbol` |
| `options?` | `StaticEventEmitterOptions` |

#### Returns

`Promise`&lt;`any`[]\>

#### Inherited from

EventEmitter.once

#### Defined in

node_modules/.pnpm/@types+node@18.15.3/node_modules/@types/node/events.d.ts:194

▸ **once**(`emitter`, `eventName`, `options?`): `Promise`&lt;`any`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | `_DOMEventTarget` |
| `eventName` | `string` |
| `options?` | `StaticEventEmitterOptions` |

#### Returns

`Promise`&lt;`any`[]\>

#### Inherited from

EventEmitter.once

#### Defined in

node_modules/.pnpm/@types+node@18.15.3/node_modules/@types/node/events.d.ts:195

___

### setMaxListeners

▸ **setMaxListeners**(`n?`, `...eventTargets`): `void`

```js
const {
  setMaxListeners,
  EventEmitter
} = require('events');

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
| `...eventTargets` | (`EventEmitter` \| `_DOMEventTarget`)[] | - |

#### Returns

`void`

#### Inherited from

EventEmitter.setMaxListeners

#### Defined in

node_modules/.pnpm/@types+node@18.15.3/node_modules/@types/node/events.d.ts:317
