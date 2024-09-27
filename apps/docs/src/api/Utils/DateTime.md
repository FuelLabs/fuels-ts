[**@fuel-ts/utils v0.94.8**](../index.md) • **Docs**

***

# Class: DateTime

This class is used to represent a date and time in the Tai64 format.

```typescript
import { DateTime } from 'fuels';

// Constants
const tai64 = '4611686020108779340';
const unixMilliseconds = 1681391398000;
const seconds = 1681391398;

// Instantiation
let date: DateTime = DateTime.now();
date = DateTime.fromTai64(tai64);
date = DateTime.fromUnixMilliseconds(unixMilliseconds);
date = DateTime.fromUnixSeconds(seconds);

// Utility functions
tai64.toTai64() // '4611686020108779340'
milliseconds.toUnixMilliseconds() // 1681391398000
seconds.toUnixSeconds() // 1681391398

// All date methods are available
const now: Date = DateTime.now();
now.toISOString(); // '2023-04-13T13:09:58.000Z'
now.getTime(); // 1681391398000
```

## Extends

- `Date`

## Implements

- `Date`

## Properties

### TAI64\_NULL

> `static` **TAI64\_NULL**: `string` = `''`

#### Defined in

[packages/utils/src/utils/date-time.ts:99](https://github.com/FuelLabs/fuels-ts/blob/f2f18fa0b7b675b5fd86d7a2e5587e757a054fae/packages/utils/src/utils/date-time.ts#L99)

## Methods

### \[toPrimitive\]()

#### \[toPrimitive\](hint)

> **\[toPrimitive\]**(`hint`): `string`

Converts a Date object to a string.

##### Parameters

• **hint**: `"default"`

##### Returns

`string`

##### Implementation of

`Date.[toPrimitive]`

##### Inherited from

`Date.[toPrimitive]`

##### Defined in

node\_modules/.pnpm/typescript@5.6.2/node\_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:116

#### \[toPrimitive\](hint)

> **\[toPrimitive\]**(`hint`): `string`

Converts a Date object to a string.

##### Parameters

• **hint**: `"string"`

##### Returns

`string`

##### Implementation of

`Date.[toPrimitive]`

##### Inherited from

`Date.[toPrimitive]`

##### Defined in

node\_modules/.pnpm/typescript@5.6.2/node\_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:120

#### \[toPrimitive\](hint)

> **\[toPrimitive\]**(`hint`): `number`

Converts a Date object to a number.

##### Parameters

• **hint**: `"number"`

##### Returns

`number`

##### Implementation of

`Date.[toPrimitive]`

##### Inherited from

`Date.[toPrimitive]`

##### Defined in

node\_modules/.pnpm/typescript@5.6.2/node\_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:124

#### \[toPrimitive\](hint)

> **\[toPrimitive\]**(`hint`): `string` \| `number`

Converts a Date object to a string or number.

##### Parameters

• **hint**: `string`

The strings "number", "string", or "default" to specify what primitive to return.

##### Returns

`string` \| `number`

A number if 'hint' was "number", a string if 'hint' was "string" or "default".

##### Throws

If 'hint' was given something other than "number", "string", or "default".

##### Implementation of

`Date.[toPrimitive]`

##### Inherited from

`Date.[toPrimitive]`

##### Defined in

node\_modules/.pnpm/typescript@5.6.2/node\_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:133

***

### getDate()

> **getDate**(): `number`

Gets the day-of-the-month, using local time.

#### Returns

`number`

#### Implementation of

`Date.getDate`

#### Inherited from

`Date.getDate`

#### Defined in

node\_modules/.pnpm/typescript@5.6.2/node\_modules/typescript/lib/lib.es5.d.ts:798

***

### getDay()

> **getDay**(): `number`

Gets the day of the week, using local time.

#### Returns

`number`

#### Implementation of

`Date.getDay`

#### Inherited from

`Date.getDay`

#### Defined in

node\_modules/.pnpm/typescript@5.6.2/node\_modules/typescript/lib/lib.es5.d.ts:802

***

### getFullYear()

> **getFullYear**(): `number`

Gets the year, using local time.

#### Returns

`number`

#### Implementation of

`Date.getFullYear`

#### Inherited from

`Date.getFullYear`

#### Defined in

node\_modules/.pnpm/typescript@5.6.2/node\_modules/typescript/lib/lib.es5.d.ts:790

***

### getHours()

> **getHours**(): `number`

Gets the hours in a date, using local time.

#### Returns

`number`

#### Implementation of

`Date.getHours`

#### Inherited from

`Date.getHours`

#### Defined in

node\_modules/.pnpm/typescript@5.6.2/node\_modules/typescript/lib/lib.es5.d.ts:806

***

### getMilliseconds()

> **getMilliseconds**(): `number`

Gets the milliseconds of a Date, using local time.

#### Returns

`number`

#### Implementation of

`Date.getMilliseconds`

#### Inherited from

`Date.getMilliseconds`

#### Defined in

node\_modules/.pnpm/typescript@5.6.2/node\_modules/typescript/lib/lib.es5.d.ts:818

***

### getMinutes()

> **getMinutes**(): `number`

Gets the minutes of a Date object, using local time.

#### Returns

`number`

#### Implementation of

`Date.getMinutes`

#### Inherited from

`Date.getMinutes`

#### Defined in

node\_modules/.pnpm/typescript@5.6.2/node\_modules/typescript/lib/lib.es5.d.ts:810

***

### getMonth()

> **getMonth**(): `number`

Gets the month, using local time.

#### Returns

`number`

#### Implementation of

`Date.getMonth`

#### Inherited from

`Date.getMonth`

#### Defined in

node\_modules/.pnpm/typescript@5.6.2/node\_modules/typescript/lib/lib.es5.d.ts:794

***

### getSeconds()

> **getSeconds**(): `number`

Gets the seconds of a Date object, using local time.

#### Returns

`number`

#### Implementation of

`Date.getSeconds`

#### Inherited from

`Date.getSeconds`

#### Defined in

node\_modules/.pnpm/typescript@5.6.2/node\_modules/typescript/lib/lib.es5.d.ts:814

***

### getTime()

> **getTime**(): `number`

Returns the stored time value in milliseconds since midnight, January 1, 1970 UTC.

#### Returns

`number`

#### Implementation of

`Date.getTime`

#### Inherited from

`Date.getTime`

#### Defined in

node\_modules/.pnpm/typescript@5.6.2/node\_modules/typescript/lib/lib.es5.d.ts:788

***

### getTimezoneOffset()

> **getTimezoneOffset**(): `number`

Gets the difference in minutes between Universal Coordinated Time (UTC) and the time on the local computer.

#### Returns

`number`

#### Implementation of

`Date.getTimezoneOffset`

#### Inherited from

`Date.getTimezoneOffset`

#### Defined in

node\_modules/.pnpm/typescript@5.6.2/node\_modules/typescript/lib/lib.es5.d.ts:822

***

### getUTCDate()

> **getUTCDate**(): `number`

Gets the day-of-the-month, using Universal Coordinated Time (UTC).

#### Returns

`number`

#### Implementation of

`Date.getUTCDate`

#### Inherited from

`Date.getUTCDate`

#### Defined in

node\_modules/.pnpm/typescript@5.6.2/node\_modules/typescript/lib/lib.es5.d.ts:800

***

### getUTCDay()

> **getUTCDay**(): `number`

Gets the day of the week using Universal Coordinated Time (UTC).

#### Returns

`number`

#### Implementation of

`Date.getUTCDay`

#### Inherited from

`Date.getUTCDay`

#### Defined in

node\_modules/.pnpm/typescript@5.6.2/node\_modules/typescript/lib/lib.es5.d.ts:804

***

### getUTCFullYear()

> **getUTCFullYear**(): `number`

Gets the year using Universal Coordinated Time (UTC).

#### Returns

`number`

#### Implementation of

`Date.getUTCFullYear`

#### Inherited from

`Date.getUTCFullYear`

#### Defined in

node\_modules/.pnpm/typescript@5.6.2/node\_modules/typescript/lib/lib.es5.d.ts:792

***

### getUTCHours()

> **getUTCHours**(): `number`

Gets the hours value in a Date object using Universal Coordinated Time (UTC).

#### Returns

`number`

#### Implementation of

`Date.getUTCHours`

#### Inherited from

`Date.getUTCHours`

#### Defined in

node\_modules/.pnpm/typescript@5.6.2/node\_modules/typescript/lib/lib.es5.d.ts:808

***

### getUTCMilliseconds()

> **getUTCMilliseconds**(): `number`

Gets the milliseconds of a Date object using Universal Coordinated Time (UTC).

#### Returns

`number`

#### Implementation of

`Date.getUTCMilliseconds`

#### Inherited from

`Date.getUTCMilliseconds`

#### Defined in

node\_modules/.pnpm/typescript@5.6.2/node\_modules/typescript/lib/lib.es5.d.ts:820

***

### getUTCMinutes()

> **getUTCMinutes**(): `number`

Gets the minutes of a Date object using Universal Coordinated Time (UTC).

#### Returns

`number`

#### Implementation of

`Date.getUTCMinutes`

#### Inherited from

`Date.getUTCMinutes`

#### Defined in

node\_modules/.pnpm/typescript@5.6.2/node\_modules/typescript/lib/lib.es5.d.ts:812

***

### getUTCMonth()

> **getUTCMonth**(): `number`

Gets the month of a Date object using Universal Coordinated Time (UTC).

#### Returns

`number`

#### Implementation of

`Date.getUTCMonth`

#### Inherited from

`Date.getUTCMonth`

#### Defined in

node\_modules/.pnpm/typescript@5.6.2/node\_modules/typescript/lib/lib.es5.d.ts:796

***

### getUTCSeconds()

> **getUTCSeconds**(): `number`

Gets the seconds of a Date object using Universal Coordinated Time (UTC).

#### Returns

`number`

#### Implementation of

`Date.getUTCSeconds`

#### Inherited from

`Date.getUTCSeconds`

#### Defined in

node\_modules/.pnpm/typescript@5.6.2/node\_modules/typescript/lib/lib.es5.d.ts:816

***

### setDate()

> **setDate**(`date`): `number`

Sets the numeric day-of-the-month value of the Date object using local time.

#### Parameters

• **date**: `number`

A numeric value equal to the day of the month.

#### Returns

`number`

#### Implementation of

`Date.setDate`

#### Inherited from

`Date.setDate`

#### Defined in

node\_modules/.pnpm/typescript@5.6.2/node\_modules/typescript/lib/lib.es5.d.ts:885

***

### setFullYear()

> **setFullYear**(`year`, `month`?, `date`?): `number`

Sets the year of the Date object using local time.

#### Parameters

• **year**: `number`

A numeric value for the year.

• **month?**: `number`

A zero-based numeric value for the month (0 for January, 11 for December). Must be specified if numDate is specified.

• **date?**: `number`

A numeric value equal for the day of the month.

#### Returns

`number`

#### Implementation of

`Date.setFullYear`

#### Inherited from

`Date.setFullYear`

#### Defined in

node\_modules/.pnpm/typescript@5.6.2/node\_modules/typescript/lib/lib.es5.d.ts:909

***

### setHours()

> **setHours**(`hours`, `min`?, `sec`?, `ms`?): `number`

Sets the hour value in the Date object using local time.

#### Parameters

• **hours**: `number`

A numeric value equal to the hours value.

• **min?**: `number`

A numeric value equal to the minutes value.

• **sec?**: `number`

A numeric value equal to the seconds value.

• **ms?**: `number`

A numeric value equal to the milliseconds value.

#### Returns

`number`

#### Implementation of

`Date.setHours`

#### Inherited from

`Date.setHours`

#### Defined in

node\_modules/.pnpm/typescript@5.6.2/node\_modules/typescript/lib/lib.es5.d.ts:872

***

### setMilliseconds()

> **setMilliseconds**(`ms`): `number`

Sets the milliseconds value in the Date object using local time.

#### Parameters

• **ms**: `number`

A numeric value equal to the millisecond value.

#### Returns

`number`

#### Implementation of

`Date.setMilliseconds`

#### Inherited from

`Date.setMilliseconds`

#### Defined in

node\_modules/.pnpm/typescript@5.6.2/node\_modules/typescript/lib/lib.es5.d.ts:832

***

### setMinutes()

> **setMinutes**(`min`, `sec`?, `ms`?): `number`

Sets the minutes value in the Date object using local time.

#### Parameters

• **min**: `number`

A numeric value equal to the minutes value.

• **sec?**: `number`

A numeric value equal to the seconds value.

• **ms?**: `number`

A numeric value equal to the milliseconds value.

#### Returns

`number`

#### Implementation of

`Date.setMinutes`

#### Inherited from

`Date.setMinutes`

#### Defined in

node\_modules/.pnpm/typescript@5.6.2/node\_modules/typescript/lib/lib.es5.d.ts:857

***

### setMonth()

> **setMonth**(`month`, `date`?): `number`

Sets the month value in the Date object using local time.

#### Parameters

• **month**: `number`

A numeric value equal to the month. The value for January is 0, and other month values follow consecutively.

• **date?**: `number`

A numeric value representing the day of the month. If this value is not supplied, the value from a call to the getDate method is used.

#### Returns

`number`

#### Implementation of

`Date.setMonth`

#### Inherited from

`Date.setMonth`

#### Defined in

node\_modules/.pnpm/typescript@5.6.2/node\_modules/typescript/lib/lib.es5.d.ts:896

***

### setSeconds()

> **setSeconds**(`sec`, `ms`?): `number`

Sets the seconds value in the Date object using local time.

#### Parameters

• **sec**: `number`

A numeric value equal to the seconds value.

• **ms?**: `number`

A numeric value equal to the milliseconds value.

#### Returns

`number`

#### Implementation of

`Date.setSeconds`

#### Inherited from

`Date.setSeconds`

#### Defined in

node\_modules/.pnpm/typescript@5.6.2/node\_modules/typescript/lib/lib.es5.d.ts:844

***

### setTime()

> **setTime**(`time`): `number`

Sets the date and time value in the Date object.

#### Parameters

• **time**: `number`

A numeric value representing the number of elapsed milliseconds since midnight, January 1, 1970 GMT.

#### Returns

`number`

#### Implementation of

`Date.setTime`

#### Inherited from

`Date.setTime`

#### Defined in

node\_modules/.pnpm/typescript@5.6.2/node\_modules/typescript/lib/lib.es5.d.ts:827

***

### setUTCDate()

> **setUTCDate**(`date`): `number`

Sets the numeric day of the month in the Date object using Universal Coordinated Time (UTC).

#### Parameters

• **date**: `number`

A numeric value equal to the day of the month.

#### Returns

`number`

#### Implementation of

`Date.setUTCDate`

#### Inherited from

`Date.setUTCDate`

#### Defined in

node\_modules/.pnpm/typescript@5.6.2/node\_modules/typescript/lib/lib.es5.d.ts:890

***

### setUTCFullYear()

> **setUTCFullYear**(`year`, `month`?, `date`?): `number`

Sets the year value in the Date object using Universal Coordinated Time (UTC).

#### Parameters

• **year**: `number`

A numeric value equal to the year.

• **month?**: `number`

A numeric value equal to the month. The value for January is 0, and other month values follow consecutively. Must be supplied if numDate is supplied.

• **date?**: `number`

A numeric value equal to the day of the month.

#### Returns

`number`

#### Implementation of

`Date.setUTCFullYear`

#### Inherited from

`Date.setUTCFullYear`

#### Defined in

node\_modules/.pnpm/typescript@5.6.2/node\_modules/typescript/lib/lib.es5.d.ts:916

***

### setUTCHours()

> **setUTCHours**(`hours`, `min`?, `sec`?, `ms`?): `number`

Sets the hours value in the Date object using Universal Coordinated Time (UTC).

#### Parameters

• **hours**: `number`

A numeric value equal to the hours value.

• **min?**: `number`

A numeric value equal to the minutes value.

• **sec?**: `number`

A numeric value equal to the seconds value.

• **ms?**: `number`

A numeric value equal to the milliseconds value.

#### Returns

`number`

#### Implementation of

`Date.setUTCHours`

#### Inherited from

`Date.setUTCHours`

#### Defined in

node\_modules/.pnpm/typescript@5.6.2/node\_modules/typescript/lib/lib.es5.d.ts:880

***

### setUTCMilliseconds()

> **setUTCMilliseconds**(`ms`): `number`

Sets the milliseconds value in the Date object using Universal Coordinated Time (UTC).

#### Parameters

• **ms**: `number`

A numeric value equal to the millisecond value.

#### Returns

`number`

#### Implementation of

`Date.setUTCMilliseconds`

#### Inherited from

`Date.setUTCMilliseconds`

#### Defined in

node\_modules/.pnpm/typescript@5.6.2/node\_modules/typescript/lib/lib.es5.d.ts:837

***

### setUTCMinutes()

> **setUTCMinutes**(`min`, `sec`?, `ms`?): `number`

Sets the minutes value in the Date object using Universal Coordinated Time (UTC).

#### Parameters

• **min**: `number`

A numeric value equal to the minutes value.

• **sec?**: `number`

A numeric value equal to the seconds value.

• **ms?**: `number`

A numeric value equal to the milliseconds value.

#### Returns

`number`

#### Implementation of

`Date.setUTCMinutes`

#### Inherited from

`Date.setUTCMinutes`

#### Defined in

node\_modules/.pnpm/typescript@5.6.2/node\_modules/typescript/lib/lib.es5.d.ts:864

***

### setUTCMonth()

> **setUTCMonth**(`month`, `date`?): `number`

Sets the month value in the Date object using Universal Coordinated Time (UTC).

#### Parameters

• **month**: `number`

A numeric value equal to the month. The value for January is 0, and other month values follow consecutively.

• **date?**: `number`

A numeric value representing the day of the month. If it is not supplied, the value from a call to the getUTCDate method is used.

#### Returns

`number`

#### Implementation of

`Date.setUTCMonth`

#### Inherited from

`Date.setUTCMonth`

#### Defined in

node\_modules/.pnpm/typescript@5.6.2/node\_modules/typescript/lib/lib.es5.d.ts:902

***

### setUTCSeconds()

> **setUTCSeconds**(`sec`, `ms`?): `number`

Sets the seconds value in the Date object using Universal Coordinated Time (UTC).

#### Parameters

• **sec**: `number`

A numeric value equal to the seconds value.

• **ms?**: `number`

A numeric value equal to the milliseconds value.

#### Returns

`number`

#### Implementation of

`Date.setUTCSeconds`

#### Inherited from

`Date.setUTCSeconds`

#### Defined in

node\_modules/.pnpm/typescript@5.6.2/node\_modules/typescript/lib/lib.es5.d.ts:850

***

### toDateString()

> **toDateString**(): `string`

Returns a date as a string value.

#### Returns

`string`

#### Implementation of

`Date.toDateString`

#### Inherited from

`Date.toDateString`

#### Defined in

node\_modules/.pnpm/typescript@5.6.2/node\_modules/typescript/lib/lib.es5.d.ts:776

***

### toISOString()

> **toISOString**(): `string`

Returns a date as a string value in ISO format.

#### Returns

`string`

#### Implementation of

`Date.toISOString`

#### Inherited from

`Date.toISOString`

#### Defined in

node\_modules/.pnpm/typescript@5.6.2/node\_modules/typescript/lib/lib.es5.d.ts:920

***

### toJSON()

> **toJSON**(`key`?): `string`

Used by the JSON.stringify method to enable the transformation of an object's data for JavaScript Object Notation (JSON) serialization.

#### Parameters

• **key?**: `any`

#### Returns

`string`

#### Implementation of

`Date.toJSON`

#### Inherited from

`Date.toJSON`

#### Defined in

node\_modules/.pnpm/typescript@5.6.2/node\_modules/typescript/lib/lib.es5.d.ts:922

***

### toLocaleDateString()

#### toLocaleDateString(undefined)

> **toLocaleDateString**(): `string`

Returns a date as a string value appropriate to the host environment's current locale.

##### Returns

`string`

##### Implementation of

`Date.toLocaleDateString`

##### Inherited from

`Date.toLocaleDateString`

##### Defined in

node\_modules/.pnpm/typescript@5.6.2/node\_modules/typescript/lib/lib.es5.d.ts:782

#### toLocaleDateString(locales, options)

> **toLocaleDateString**(`locales`?, `options`?): `string`

Converts a date to a string by using the current or specified locale.

##### Parameters

• **locales?**: `string` \| `string`[]

A locale string or array of locale strings that contain one or more language or locale tags. If you include more than one locale string, list them in descending order of priority so that the first entry is the preferred locale. If you omit this parameter, the default locale of the JavaScript runtime is used.

• **options?**: `DateTimeFormatOptions`

An object that contains one or more properties that specify comparison options.

##### Returns

`string`

##### Implementation of

`Date.toLocaleDateString`

##### Inherited from

`Date.toLocaleDateString`

##### Defined in

node\_modules/.pnpm/typescript@5.6.2/node\_modules/typescript/lib/lib.es5.d.ts:4577

#### toLocaleDateString(locales, options)

> **toLocaleDateString**(`locales`?, `options`?): `string`

Converts a date to a string by using the current or specified locale.

##### Parameters

• **locales?**: `LocalesArgument`

A locale string, array of locale strings, Intl.Locale object, or array of Intl.Locale objects that contain one or more language or locale tags. If you include more than one locale string, list them in descending order of priority so that the first entry is the preferred locale. If you omit this parameter, the default locale of the JavaScript runtime is used.

• **options?**: `DateTimeFormatOptions`

An object that contains one or more properties that specify comparison options.

##### Returns

`string`

##### Implementation of

`Date.toLocaleDateString`

##### Inherited from

`Date.toLocaleDateString`

##### Defined in

node\_modules/.pnpm/typescript@5.6.2/node\_modules/typescript/lib/lib.es2020.date.d.ts:34

***

### toLocaleString()

#### toLocaleString(undefined)

> **toLocaleString**(): `string`

Returns a value as a string value appropriate to the host environment's current locale.

##### Returns

`string`

##### Implementation of

`Date.toLocaleString`

##### Inherited from

`Date.toLocaleString`

##### Defined in

node\_modules/.pnpm/typescript@5.6.2/node\_modules/typescript/lib/lib.es5.d.ts:780

#### toLocaleString(locales, options)

> **toLocaleString**(`locales`?, `options`?): `string`

Converts a date and time to a string by using the current or specified locale.

##### Parameters

• **locales?**: `string` \| `string`[]

A locale string or array of locale strings that contain one or more language or locale tags. If you include more than one locale string, list them in descending order of priority so that the first entry is the preferred locale. If you omit this parameter, the default locale of the JavaScript runtime is used.

• **options?**: `DateTimeFormatOptions`

An object that contains one or more properties that specify comparison options.

##### Returns

`string`

##### Implementation of

`Date.toLocaleString`

##### Inherited from

`Date.toLocaleString`

##### Defined in

node\_modules/.pnpm/typescript@5.6.2/node\_modules/typescript/lib/lib.es5.d.ts:4571

#### toLocaleString(locales, options)

> **toLocaleString**(`locales`?, `options`?): `string`

Converts a date and time to a string by using the current or specified locale.

##### Parameters

• **locales?**: `LocalesArgument`

A locale string, array of locale strings, Intl.Locale object, or array of Intl.Locale objects that contain one or more language or locale tags. If you include more than one locale string, list them in descending order of priority so that the first entry is the preferred locale. If you omit this parameter, the default locale of the JavaScript runtime is used.

• **options?**: `DateTimeFormatOptions`

An object that contains one or more properties that specify comparison options.

##### Returns

`string`

##### Implementation of

`Date.toLocaleString`

##### Inherited from

`Date.toLocaleString`

##### Defined in

node\_modules/.pnpm/typescript@5.6.2/node\_modules/typescript/lib/lib.es2020.date.d.ts:27

***

### toLocaleTimeString()

#### toLocaleTimeString(undefined)

> **toLocaleTimeString**(): `string`

Returns a time as a string value appropriate to the host environment's current locale.

##### Returns

`string`

##### Implementation of

`Date.toLocaleTimeString`

##### Inherited from

`Date.toLocaleTimeString`

##### Defined in

node\_modules/.pnpm/typescript@5.6.2/node\_modules/typescript/lib/lib.es5.d.ts:784

#### toLocaleTimeString(locales, options)

> **toLocaleTimeString**(`locales`?, `options`?): `string`

Converts a time to a string by using the current or specified locale.

##### Parameters

• **locales?**: `string` \| `string`[]

A locale string or array of locale strings that contain one or more language or locale tags. If you include more than one locale string, list them in descending order of priority so that the first entry is the preferred locale. If you omit this parameter, the default locale of the JavaScript runtime is used.

• **options?**: `DateTimeFormatOptions`

An object that contains one or more properties that specify comparison options.

##### Returns

`string`

##### Implementation of

`Date.toLocaleTimeString`

##### Inherited from

`Date.toLocaleTimeString`

##### Defined in

node\_modules/.pnpm/typescript@5.6.2/node\_modules/typescript/lib/lib.es5.d.ts:4584

#### toLocaleTimeString(locales, options)

> **toLocaleTimeString**(`locales`?, `options`?): `string`

Converts a time to a string by using the current or specified locale.

##### Parameters

• **locales?**: `LocalesArgument`

A locale string, array of locale strings, Intl.Locale object, or array of Intl.Locale objects that contain one or more language or locale tags. If you include more than one locale string, list them in descending order of priority so that the first entry is the preferred locale. If you omit this parameter, the default locale of the JavaScript runtime is used.

• **options?**: `DateTimeFormatOptions`

An object that contains one or more properties that specify comparison options.

##### Returns

`string`

##### Implementation of

`Date.toLocaleTimeString`

##### Inherited from

`Date.toLocaleTimeString`

##### Defined in

node\_modules/.pnpm/typescript@5.6.2/node\_modules/typescript/lib/lib.es2020.date.d.ts:41

***

### toString()

> **toString**(): `string`

Returns a string representation of a date. The format of the string depends on the locale.

#### Returns

`string`

#### Implementation of

`Date.toString`

#### Inherited from

`Date.toString`

#### Defined in

node\_modules/.pnpm/typescript@5.6.2/node\_modules/typescript/lib/lib.es5.d.ts:774

***

### toTai64()

> **toTai64**(): `string`

Returns the Tai64 timestamp.

#### Returns

`string`

the Tai64 timestamp

#### Defined in

[packages/utils/src/utils/date-time.ts:139](https://github.com/FuelLabs/fuels-ts/blob/f2f18fa0b7b675b5fd86d7a2e5587e757a054fae/packages/utils/src/utils/date-time.ts#L139)

***

### toTimeString()

> **toTimeString**(): `string`

Returns a time as a string value.

#### Returns

`string`

#### Implementation of

`Date.toTimeString`

#### Inherited from

`Date.toTimeString`

#### Defined in

node\_modules/.pnpm/typescript@5.6.2/node\_modules/typescript/lib/lib.es5.d.ts:778

***

### toUTCString()

> **toUTCString**(): `string`

Returns a date converted to a string using Universal Coordinated Time (UTC).

#### Returns

`string`

#### Implementation of

`Date.toUTCString`

#### Inherited from

`Date.toUTCString`

#### Defined in

node\_modules/.pnpm/typescript@5.6.2/node\_modules/typescript/lib/lib.es5.d.ts:918

***

### toUnixMilliseconds()

> **toUnixMilliseconds**(): `number`

#### Returns

`number`

the unix milliseconds timestamp

#### Defined in

[packages/utils/src/utils/date-time.ts:146](https://github.com/FuelLabs/fuels-ts/blob/f2f18fa0b7b675b5fd86d7a2e5587e757a054fae/packages/utils/src/utils/date-time.ts#L146)

***

### toUnixSeconds()

> **toUnixSeconds**(): `number`

#### Returns

`number`

the unix seconds timestamp

#### Defined in

[packages/utils/src/utils/date-time.ts:153](https://github.com/FuelLabs/fuels-ts/blob/f2f18fa0b7b675b5fd86d7a2e5587e757a054fae/packages/utils/src/utils/date-time.ts#L153)

***

### valueOf()

> **valueOf**(): `number`

Returns the stored time value in milliseconds since midnight, January 1, 1970 UTC.

#### Returns

`number`

#### Implementation of

`Date.valueOf`

#### Inherited from

`Date.valueOf`

#### Defined in

node\_modules/.pnpm/typescript@5.6.2/node\_modules/typescript/lib/lib.es5.d.ts:786

***

### UTC()

#### UTC(year, monthIndex, date, hours, minutes, seconds, ms)

> `static` **UTC**(`year`, `monthIndex`, `date`?, `hours`?, `minutes`?, `seconds`?, `ms`?): `number`

Returns the number of milliseconds between midnight, January 1, 1970 Universal Coordinated Time (UTC) (or GMT) and the specified date.

##### Parameters

• **year**: `number`

The full year designation is required for cross-century date accuracy. If year is between 0 and 99 is used, then year is assumed to be 1900 + year.

• **monthIndex**: `number`

The month as a number between 0 and 11 (January to December).

• **date?**: `number`

The date as a number between 1 and 31.

• **hours?**: `number`

Must be supplied if minutes is supplied. A number from 0 to 23 (midnight to 11pm) that specifies the hour.

• **minutes?**: `number`

Must be supplied if seconds is supplied. A number from 0 to 59 that specifies the minutes.

• **seconds?**: `number`

Must be supplied if milliseconds is supplied. A number from 0 to 59 that specifies the seconds.

• **ms?**: `number`

A number from 0 to 999 that specifies the milliseconds.

##### Returns

`number`

##### Inherited from

`Date.UTC`

##### Defined in

node\_modules/.pnpm/typescript@5.6.2/node\_modules/typescript/lib/lib.es5.d.ts:956

#### UTC(year, monthIndex, date, hours, minutes, seconds, ms)

> `static` **UTC**(`year`, `monthIndex`?, `date`?, `hours`?, `minutes`?, `seconds`?, `ms`?): `number`

Returns the number of milliseconds between midnight, January 1, 1970 Universal Coordinated Time (UTC) (or GMT) and the specified date.

##### Parameters

• **year**: `number`

The full year designation is required for cross-century date accuracy. If year is between 0 and 99 is used, then year is assumed to be 1900 + year.

• **monthIndex?**: `number`

The month as a number between 0 and 11 (January to December).

• **date?**: `number`

The date as a number between 1 and 31.

• **hours?**: `number`

Must be supplied if minutes is supplied. A number from 0 to 23 (midnight to 11pm) that specifies the hour.

• **minutes?**: `number`

Must be supplied if seconds is supplied. A number from 0 to 59 that specifies the minutes.

• **seconds?**: `number`

Must be supplied if milliseconds is supplied. A number from 0 to 59 that specifies the seconds.

• **ms?**: `number`

A number from 0 to 999 that specifies the milliseconds.

##### Returns

`number`

##### Inherited from

`Date.UTC`

##### Defined in

node\_modules/.pnpm/typescript@5.6.2/node\_modules/typescript/lib/lib.es2017.date.d.ts:30

***

### fromTai64()

> `static` **fromTai64**(`tai64`): [`DateTime`](DateTime.md)

Generates a new DateTime instance from a Tai64 timestamp.

#### Parameters

• **tai64**: `string`

Tai64 timestamp

#### Returns

[`DateTime`](DateTime.md)

a new DateTime instance

#### Defined in

[packages/utils/src/utils/date-time.ts:107](https://github.com/FuelLabs/fuels-ts/blob/f2f18fa0b7b675b5fd86d7a2e5587e757a054fae/packages/utils/src/utils/date-time.ts#L107)

***

### fromUnixMilliseconds()

> `static` **fromUnixMilliseconds**(`unixMilliseconds`): [`DateTime`](DateTime.md)

#### Parameters

• **unixMilliseconds**: `number`

unix milliseconds timestamp

#### Returns

[`DateTime`](DateTime.md)

a new DateTime instance

#### Defined in

[packages/utils/src/utils/date-time.ts:115](https://github.com/FuelLabs/fuels-ts/blob/f2f18fa0b7b675b5fd86d7a2e5587e757a054fae/packages/utils/src/utils/date-time.ts#L115)

***

### fromUnixSeconds()

> `static` **fromUnixSeconds**(`unixSeconds`): [`DateTime`](DateTime.md)

#### Parameters

• **unixSeconds**: `number`

unix seconds timestamp

#### Returns

[`DateTime`](DateTime.md)

a new DateTime instance

#### Defined in

[packages/utils/src/utils/date-time.ts:123](https://github.com/FuelLabs/fuels-ts/blob/f2f18fa0b7b675b5fd86d7a2e5587e757a054fae/packages/utils/src/utils/date-time.ts#L123)

***

### now()

> `static` **now**(): `number`

Returns the number of milliseconds elapsed since midnight, January 1, 1970 Universal Coordinated Time (UTC).

#### Returns

`number`

#### Inherited from

`Date.now`

#### Defined in

node\_modules/.pnpm/typescript@5.6.2/node\_modules/typescript/lib/lib.es5.d.ts:958

***

### parse()

> `static` **parse**(`s`): `number`

Parses a string containing a date, and returns the number of milliseconds between that date and midnight, January 1, 1970.

#### Parameters

• **s**: `string`

A date string

#### Returns

`number`

#### Inherited from

`Date.parse`

#### Defined in

node\_modules/.pnpm/typescript@5.6.2/node\_modules/typescript/lib/lib.es5.d.ts:945
