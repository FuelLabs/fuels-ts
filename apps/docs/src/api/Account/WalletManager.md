# Class: WalletManager

[@fuel-ts/account](/api/Account/index.md).WalletManager

WalletManager is a upper package to manage multiple vaults like mnemonic and privateKeys.

- VaultTypes can be add to `WalletManager.Vaults` enabling to add custom Vault types.
- Storage can be instantiate when initializing enabling custom storage types.

## Hierarchy

- `EventEmitter`

  ↳ **`WalletManager`**

## Constructors

### constructor

• **new WalletManager**(`options?`): [`WalletManager`](/api/Account/WalletManager.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`WalletManagerOptions`](/api/Account/index.md#walletmanageroptions) |

#### Returns

[`WalletManager`](/api/Account/WalletManager.md)

#### Overrides

EventEmitter.constructor

#### Defined in

[packages/account/src/wallet-manager/wallet-manager.ts:71](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/wallet-manager/wallet-manager.ts#L71)

## Properties

### #isLocked

• `Private` **#isLocked**: `boolean` = `true`

#### Defined in

[packages/account/src/wallet-manager/wallet-manager.ts:69](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/wallet-manager/wallet-manager.ts#L69)

___

### #passphrase

• `Private` **#passphrase**: `string` = `''`

#### Defined in

[packages/account/src/wallet-manager/wallet-manager.ts:68](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/wallet-manager/wallet-manager.ts#L68)

___

### #vaults

• `Private` **#vaults**: [`VaultsState`](/api/Account/index.md#vaultsstate) = `[]`

#### Defined in

[packages/account/src/wallet-manager/wallet-manager.ts:67](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/wallet-manager/wallet-manager.ts#L67)

___

### STORAGE\_KEY

• `Readonly` **STORAGE\_KEY**: `string` = `'WalletManager'`

#### Defined in

[packages/account/src/wallet-manager/wallet-manager.ts:64](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/wallet-manager/wallet-manager.ts#L64)

___

### storage

• `Readonly` **storage**: [`StorageAbstract`](/api/Account/StorageAbstract.md)

Storage

Persistent encrypted data. `The default storage works only on memory`.

#### Defined in

[packages/account/src/wallet-manager/wallet-manager.ts:62](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/wallet-manager/wallet-manager.ts#L62)

___

### Vaults

▪ `Static` **Vaults**: (typeof [`MnemonicVault`](/api/Account/MnemonicVault.md) \| typeof [`PrivateKeyVault`](/api/Account/PrivateKeyVault.md))[]

Vaults

Vaults are responsible to store secret keys and return an `Wallet` instance,
to interact with the network.

Each vault has access to its own state

#### Defined in

[packages/account/src/wallet-manager/wallet-manager.ts:56](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/wallet-manager/wallet-manager.ts#L56)

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

## Accessors

### isLocked

• `get` **isLocked**(): `boolean`

#### Returns

`boolean`

#### Defined in

[packages/account/src/wallet-manager/wallet-manager.ts:76](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/wallet-manager/wallet-manager.ts#L76)

## Methods

### #deserializeVaults

▸ **#deserializeVaults**(`vaults`): { `title`: `undefined` \| `string` ; `type`: `string` ; `vault`: [`MnemonicVault`](/api/Account/MnemonicVault.md) \| [`PrivateKeyVault`](/api/Account/PrivateKeyVault.md)  }[]

Deserialize all vaults to state

`This is only accessible from inside the class`

#### Parameters

| Name | Type |
| :------ | :------ |
| `vaults` | [`VaultsState`](/api/Account/index.md#vaultsstate) |

#### Returns

{ `title`: `undefined` \| `string` ; `type`: `string` ; `vault`: [`MnemonicVault`](/api/Account/MnemonicVault.md) \| [`PrivateKeyVault`](/api/Account/PrivateKeyVault.md)  }[]

#### Defined in

[packages/account/src/wallet-manager/wallet-manager.ts:287](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/wallet-manager/wallet-manager.ts#L287)

___

### #serializeVaults

▸ **#serializeVaults**(`vaults`): { `data`: { `secret?`: `string`  } ; `title`: `undefined` \| `string` ; `type`: `string`  }[]

Serialize all vaults to store

`This is only accessible from inside the class`

#### Parameters

| Name | Type |
| :------ | :------ |
| `vaults` | [`VaultsState`](/api/Account/index.md#vaultsstate) |

#### Returns

{ `data`: { `secret?`: `string`  } ; `title`: `undefined` \| `string` ; `type`: `string`  }[]

#### Defined in

[packages/account/src/wallet-manager/wallet-manager.ts:274](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/wallet-manager/wallet-manager.ts#L274)

___

### addAccount

▸ **addAccount**(`options?`): `Promise`&lt;[`WalletManagerAccount`](/api/Account/index.md#walletmanageraccount)\>

Add account to a selected vault or on the first vault as default.
If not vaults are adds it will return error

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `Object` |
| `options.vaultId` | `number` |

#### Returns

`Promise`&lt;[`WalletManagerAccount`](/api/Account/index.md#walletmanageraccount)\>

#### Defined in

[packages/account/src/wallet-manager/wallet-manager.ts:143](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/wallet-manager/wallet-manager.ts#L143)

___

### addListener

▸ **addListener**(`eventName`, `listener`): [`WalletManager`](/api/Account/WalletManager.md)

Alias for `emitter.on(eventName, listener)`.

**`Since`**

v0.1.26

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`WalletManager`](/api/Account/WalletManager.md)

#### Inherited from

EventEmitter.addListener

#### Defined in

node_modules/.pnpm/@types+node@18.15.3/node_modules/@types/node/events.d.ts:354

___

### addVault

▸ **addVault**(`vaultConfig`): `Promise`&lt;`void`\>

Add Vault, the `vaultConfig.type` will look for the Vaults supported if
didn't found it will throw.

#### Parameters

| Name | Type |
| :------ | :------ |
| `vaultConfig` | [`VaultConfig`](/api/Account/index.md#vaultconfig) |

#### Returns

`Promise`&lt;`void`\>

#### Defined in

[packages/account/src/wallet-manager/wallet-manager.ts:170](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/wallet-manager/wallet-manager.ts#L170)

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

### exportPrivateKey

▸ **exportPrivateKey**(`address`): `string`

Export specific account privateKey

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` \| [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) |

#### Returns

`string`

#### Defined in

[packages/account/src/wallet-manager/wallet-manager.ts:128](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/wallet-manager/wallet-manager.ts#L128)

___

### exportVault

▸ **exportVault**&lt;`T`\>(`vaultId`): `ReturnType`&lt;`T`[``"serialize"``]\>

Return the vault serialized object containing all the privateKeys,
the format of the return depends on the Vault type.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Vault`](/api/Account/Vault.md)&lt;{ `secret?`: `string`  }\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `vaultId` | `number` |

#### Returns

`ReturnType`&lt;`T`[``"serialize"``]\>

#### Defined in

[packages/account/src/wallet-manager/wallet-manager.ts:84](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/wallet-manager/wallet-manager.ts#L84)

___

### getAccounts

▸ **getAccounts**(): [`WalletManagerAccount`](/api/Account/index.md#walletmanageraccount)[]

List all accounts on the Wallet Manager not vault information is revealed

#### Returns

[`WalletManagerAccount`](/api/Account/index.md#walletmanageraccount)[]

#### Defined in

[packages/account/src/wallet-manager/wallet-manager.ts:105](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/wallet-manager/wallet-manager.ts#L105)

___

### getMaxListeners

▸ **getMaxListeners**(): `number`

Returns the current max listener value for the `EventEmitter` which is either
set by `emitter.setMaxListeners(n)` or defaults to [defaultMaxListeners](/api/Account/WalletManager.md#defaultmaxlisteners).

**`Since`**

v1.0.0

#### Returns

`number`

#### Inherited from

EventEmitter.getMaxListeners

#### Defined in

node_modules/.pnpm/@types+node@18.15.3/node_modules/@types/node/events.d.ts:526

___

### getVaultClass

▸ **getVaultClass**(`type`): typeof [`MnemonicVault`](/api/Account/MnemonicVault.md) \| typeof [`PrivateKeyVault`](/api/Account/PrivateKeyVault.md)

Return a instantiable Class reference from `WalletManager.Vaults` supported list.

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |

#### Returns

typeof [`MnemonicVault`](/api/Account/MnemonicVault.md) \| typeof [`PrivateKeyVault`](/api/Account/PrivateKeyVault.md)

#### Defined in

[packages/account/src/wallet-manager/wallet-manager.ts:301](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/wallet-manager/wallet-manager.ts#L301)

___

### getVaults

▸ **getVaults**(): { `title?`: `string` ; `type`: `string` ; `vaultId`: `number`  }[]

List all vaults on the Wallet Manager, this function not return secret's

#### Returns

{ `title?`: `string` ; `type`: `string` ; `vaultId`: `number`  }[]

#### Defined in

[packages/account/src/wallet-manager/wallet-manager.ts:94](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/wallet-manager/wallet-manager.ts#L94)

___

### getWallet

▸ **getWallet**(`address`): [`WalletUnlocked`](/api/Account/WalletUnlocked.md)

Create a Wallet instance for the specific account

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` \| [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) |

#### Returns

[`WalletUnlocked`](/api/Account/WalletUnlocked.md)

#### Defined in

[packages/account/src/wallet-manager/wallet-manager.ts:115](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/wallet-manager/wallet-manager.ts#L115)

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

### loadState

▸ **loadState**(): `Promise`&lt;`void`\>

Retrieve and decrypt WalletManager state from storage

#### Returns

`Promise`&lt;`void`\>

#### Defined in

[packages/account/src/wallet-manager/wallet-manager.ts:246](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/wallet-manager/wallet-manager.ts#L246)

___

### lock

▸ **lock**(): `void`

Lock wallet. It removes passphrase from class instance, encrypt and hide all address and
secrets.

#### Returns

`void`

#### Defined in

[packages/account/src/wallet-manager/wallet-manager.ts:191](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/wallet-manager/wallet-manager.ts#L191)

___

### off

▸ **off**(`eventName`, `listener`): [`WalletManager`](/api/Account/WalletManager.md)

Alias for `emitter.removeListener()`.

**`Since`**

v10.0.0

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`WalletManager`](/api/Account/WalletManager.md)

#### Inherited from

EventEmitter.off

#### Defined in

node_modules/.pnpm/@types+node@18.15.3/node_modules/@types/node/events.d.ts:499

___

### on

▸ **on**(`eventName`, `listener`): [`WalletManager`](/api/Account/WalletManager.md)

Adds the `listener` function to the end of the listeners array for the
event named `eventName`. No checks are made to see if the `listener` has
already been added. Multiple calls passing the same combination of `eventName`and `listener` will result in the `listener` being added, and called, multiple
times.

```js
server.on('connection', (stream) => {
  console.log('someone connected!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

By default, event listeners are invoked in the order they are added. The`emitter.prependListener()` method can be used as an alternative to add the
event listener to the beginning of the listeners array.

```js
const myEE = new EventEmitter();
myEE.on('foo', () => console.log('a'));
myEE.prependListener('foo', () => console.log('b'));
myEE.emit('foo');
// Prints:
//   b
//   a
```

**`Since`**

v0.1.101

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

[`WalletManager`](/api/Account/WalletManager.md)

#### Inherited from

EventEmitter.on

#### Defined in

node_modules/.pnpm/@types+node@18.15.3/node_modules/@types/node/events.d.ts:385

___

### once

▸ **once**(`eventName`, `listener`): [`WalletManager`](/api/Account/WalletManager.md)

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

[`WalletManager`](/api/Account/WalletManager.md)

#### Inherited from

EventEmitter.once

#### Defined in

node_modules/.pnpm/@types+node@18.15.3/node_modules/@types/node/events.d.ts:414

___

### prependListener

▸ **prependListener**(`eventName`, `listener`): [`WalletManager`](/api/Account/WalletManager.md)

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

[`WalletManager`](/api/Account/WalletManager.md)

#### Inherited from

EventEmitter.prependListener

#### Defined in

node_modules/.pnpm/@types+node@18.15.3/node_modules/@types/node/events.d.ts:634

___

### prependOnceListener

▸ **prependOnceListener**(`eventName`, `listener`): [`WalletManager`](/api/Account/WalletManager.md)

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

[`WalletManager`](/api/Account/WalletManager.md)

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

▸ **removeAllListeners**(`event?`): [`WalletManager`](/api/Account/WalletManager.md)

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

[`WalletManager`](/api/Account/WalletManager.md)

#### Inherited from

EventEmitter.removeAllListeners

#### Defined in

node_modules/.pnpm/@types+node@18.15.3/node_modules/@types/node/events.d.ts:510

___

### removeListener

▸ **removeListener**(`eventName`, `listener`): [`WalletManager`](/api/Account/WalletManager.md)

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

[`WalletManager`](/api/Account/WalletManager.md)

#### Inherited from

EventEmitter.removeListener

#### Defined in

node_modules/.pnpm/@types+node@18.15.3/node_modules/@types/node/events.d.ts:494

___

### removeVault

▸ **removeVault**(`index`): `Promise`&lt;`void`\>

Remove vault by index, by remove the vault you also remove all accounts
created by the vault.

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

#### Returns

`Promise`&lt;`void`\>

#### Defined in

[packages/account/src/wallet-manager/wallet-manager.ts:161](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/wallet-manager/wallet-manager.ts#L161)

___

### saveState

▸ **saveState**(): `Promise`&lt;`void`\>

Store encrypted WalletManager state on storage

#### Returns

`Promise`&lt;`void`\>

#### Defined in

[packages/account/src/wallet-manager/wallet-manager.ts:259](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/wallet-manager/wallet-manager.ts#L259)

___

### setMaxListeners

▸ **setMaxListeners**(`n`): [`WalletManager`](/api/Account/WalletManager.md)

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

[`WalletManager`](/api/Account/WalletManager.md)

#### Inherited from

EventEmitter.setMaxListeners

#### Defined in

node_modules/.pnpm/@types+node@18.15.3/node_modules/@types/node/events.d.ts:520

___

### unlock

▸ **unlock**(`passphrase`): `Promise`&lt;`void`\>

Unlock wallet. It sets passphrase on WalletManger instance load all address from configured vaults.
Vaults with secrets are not unlocked or instantiated on this moment.

#### Parameters

| Name | Type |
| :------ | :------ |
| `passphrase` | `string` |

#### Returns

`Promise`&lt;`void`\>

#### Defined in

[packages/account/src/wallet-manager/wallet-manager.ts:205](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/wallet-manager/wallet-manager.ts#L205)

___

### updatePassphrase

▸ **updatePassphrase**(`oldpass`, `newpass`): `Promise`&lt;`void`\>

Update WalletManager encryption passphrase

#### Parameters

| Name | Type |
| :------ | :------ |
| `oldpass` | `string` |
| `newpass` | `string` |

#### Returns

`Promise`&lt;`void`\>

#### Defined in

[packages/account/src/wallet-manager/wallet-manager.ts:227](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/wallet-manager/wallet-manager.ts#L227)

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
