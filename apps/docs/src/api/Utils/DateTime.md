# Class: DateTime

[@fuel-ts/utils](/api/Utils/index.md).DateTime

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

## Hierarchy

- `Date`

  ↳ **`DateTime`**

## Implements

- `Date`

## Constructors

### constructor

• **new DateTime**(`date`): [`DateTime`](/api/Utils/DateTime.md)

Hide the constructor to prevent direct instantiation.

#### Parameters

| Name | Type |
| :------ | :------ |
| `date` | `string` \| `number` \| `Date` |

#### Returns

[`DateTime`](/api/Utils/DateTime.md)

#### Overrides

Date.constructor

#### Defined in

[packages/utils/src/utils/date-time.ts:130](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/utils/src/utils/date-time.ts#L130)

## Properties

### TAI64\_NULL

▪ `Static` **TAI64\_NULL**: `string` = `''`

#### Defined in

[packages/utils/src/utils/date-time.ts:99](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/utils/src/utils/date-time.ts#L99)

## Methods

### [toPrimitive]

▸ **[toPrimitive]**(`hint`): `string`

Converts a Date object to a string.

#### Parameters

| Name | Type |
| :------ | :------ |
| `hint` | ``"default"`` |

#### Returns

`string`

#### Implementation of

Date.[toPrimitive]

#### Inherited from

Date.[toPrimitive]

#### Defined in

node_modules/.pnpm/typescript@5.2.2/node_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:116

▸ **[toPrimitive]**(`hint`): `string`

Converts a Date object to a string.

#### Parameters

| Name | Type |
| :------ | :------ |
| `hint` | ``"string"`` |

#### Returns

`string`

#### Implementation of

Date.[toPrimitive]

#### Inherited from

Date.[toPrimitive]

#### Defined in

node_modules/.pnpm/typescript@5.2.2/node_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:120

▸ **[toPrimitive]**(`hint`): `number`

Converts a Date object to a number.

#### Parameters

| Name | Type |
| :------ | :------ |
| `hint` | ``"number"`` |

#### Returns

`number`

#### Implementation of

Date.[toPrimitive]

#### Inherited from

Date.[toPrimitive]

#### Defined in

node_modules/.pnpm/typescript@5.2.2/node_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:124

▸ **[toPrimitive]**(`hint`): `string` \| `number`

Converts a Date object to a string or number.

**`Throws`**

If 'hint' was given something other than "number", "string", or "default".

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hint` | `string` | The strings "number", "string", or "default" to specify what primitive to return. |

#### Returns

`string` \| `number`

A number if 'hint' was "number", a string if 'hint' was "string" or "default".

#### Implementation of

Date.[toPrimitive]

#### Inherited from

Date.[toPrimitive]

#### Defined in

node_modules/.pnpm/typescript@5.2.2/node_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:133

___

### getDate

▸ **getDate**(): `number`

Gets the day-of-the-month, using local time.

#### Returns

`number`

#### Implementation of

Date.getDate

#### Inherited from

Date.getDate

#### Defined in

node_modules/.pnpm/typescript@5.2.2/node_modules/typescript/lib/lib.es5.d.ts:789

___

### getDay

▸ **getDay**(): `number`

Gets the day of the week, using local time.

#### Returns

`number`

#### Implementation of

Date.getDay

#### Inherited from

Date.getDay

#### Defined in

node_modules/.pnpm/typescript@5.2.2/node_modules/typescript/lib/lib.es5.d.ts:793

___

### getFullYear

▸ **getFullYear**(): `number`

Gets the year, using local time.

#### Returns

`number`

#### Implementation of

Date.getFullYear

#### Inherited from

Date.getFullYear

#### Defined in

node_modules/.pnpm/typescript@5.2.2/node_modules/typescript/lib/lib.es5.d.ts:781

___

### getHours

▸ **getHours**(): `number`

Gets the hours in a date, using local time.

#### Returns

`number`

#### Implementation of

Date.getHours

#### Inherited from

Date.getHours

#### Defined in

node_modules/.pnpm/typescript@5.2.2/node_modules/typescript/lib/lib.es5.d.ts:797

___

### getMilliseconds

▸ **getMilliseconds**(): `number`

Gets the milliseconds of a Date, using local time.

#### Returns

`number`

#### Implementation of

Date.getMilliseconds

#### Inherited from

Date.getMilliseconds

#### Defined in

node_modules/.pnpm/typescript@5.2.2/node_modules/typescript/lib/lib.es5.d.ts:809

___

### getMinutes

▸ **getMinutes**(): `number`

Gets the minutes of a Date object, using local time.

#### Returns

`number`

#### Implementation of

Date.getMinutes

#### Inherited from

Date.getMinutes

#### Defined in

node_modules/.pnpm/typescript@5.2.2/node_modules/typescript/lib/lib.es5.d.ts:801

___

### getMonth

▸ **getMonth**(): `number`

Gets the month, using local time.

#### Returns

`number`

#### Implementation of

Date.getMonth

#### Inherited from

Date.getMonth

#### Defined in

node_modules/.pnpm/typescript@5.2.2/node_modules/typescript/lib/lib.es5.d.ts:785

___

### getSeconds

▸ **getSeconds**(): `number`

Gets the seconds of a Date object, using local time.

#### Returns

`number`

#### Implementation of

Date.getSeconds

#### Inherited from

Date.getSeconds

#### Defined in

node_modules/.pnpm/typescript@5.2.2/node_modules/typescript/lib/lib.es5.d.ts:805

___

### getTime

▸ **getTime**(): `number`

Returns the stored time value in milliseconds since midnight, January 1, 1970 UTC.

#### Returns

`number`

#### Implementation of

Date.getTime

#### Inherited from

Date.getTime

#### Defined in

node_modules/.pnpm/typescript@5.2.2/node_modules/typescript/lib/lib.es5.d.ts:779

___

### getTimezoneOffset

▸ **getTimezoneOffset**(): `number`

Gets the difference in minutes between the time on the local computer and Universal Coordinated Time (UTC).

#### Returns

`number`

#### Implementation of

Date.getTimezoneOffset

#### Inherited from

Date.getTimezoneOffset

#### Defined in

node_modules/.pnpm/typescript@5.2.2/node_modules/typescript/lib/lib.es5.d.ts:813

___

### getUTCDate

▸ **getUTCDate**(): `number`

Gets the day-of-the-month, using Universal Coordinated Time (UTC).

#### Returns

`number`

#### Implementation of

Date.getUTCDate

#### Inherited from

Date.getUTCDate

#### Defined in

node_modules/.pnpm/typescript@5.2.2/node_modules/typescript/lib/lib.es5.d.ts:791

___

### getUTCDay

▸ **getUTCDay**(): `number`

Gets the day of the week using Universal Coordinated Time (UTC).

#### Returns

`number`

#### Implementation of

Date.getUTCDay

#### Inherited from

Date.getUTCDay

#### Defined in

node_modules/.pnpm/typescript@5.2.2/node_modules/typescript/lib/lib.es5.d.ts:795

___

### getUTCFullYear

▸ **getUTCFullYear**(): `number`

Gets the year using Universal Coordinated Time (UTC).

#### Returns

`number`

#### Implementation of

Date.getUTCFullYear

#### Inherited from

Date.getUTCFullYear

#### Defined in

node_modules/.pnpm/typescript@5.2.2/node_modules/typescript/lib/lib.es5.d.ts:783

___

### getUTCHours

▸ **getUTCHours**(): `number`

Gets the hours value in a Date object using Universal Coordinated Time (UTC).

#### Returns

`number`

#### Implementation of

Date.getUTCHours

#### Inherited from

Date.getUTCHours

#### Defined in

node_modules/.pnpm/typescript@5.2.2/node_modules/typescript/lib/lib.es5.d.ts:799

___

### getUTCMilliseconds

▸ **getUTCMilliseconds**(): `number`

Gets the milliseconds of a Date object using Universal Coordinated Time (UTC).

#### Returns

`number`

#### Implementation of

Date.getUTCMilliseconds

#### Inherited from

Date.getUTCMilliseconds

#### Defined in

node_modules/.pnpm/typescript@5.2.2/node_modules/typescript/lib/lib.es5.d.ts:811

___

### getUTCMinutes

▸ **getUTCMinutes**(): `number`

Gets the minutes of a Date object using Universal Coordinated Time (UTC).

#### Returns

`number`

#### Implementation of

Date.getUTCMinutes

#### Inherited from

Date.getUTCMinutes

#### Defined in

node_modules/.pnpm/typescript@5.2.2/node_modules/typescript/lib/lib.es5.d.ts:803

___

### getUTCMonth

▸ **getUTCMonth**(): `number`

Gets the month of a Date object using Universal Coordinated Time (UTC).

#### Returns

`number`

#### Implementation of

Date.getUTCMonth

#### Inherited from

Date.getUTCMonth

#### Defined in

node_modules/.pnpm/typescript@5.2.2/node_modules/typescript/lib/lib.es5.d.ts:787

___

### getUTCSeconds

▸ **getUTCSeconds**(): `number`

Gets the seconds of a Date object using Universal Coordinated Time (UTC).

#### Returns

`number`

#### Implementation of

Date.getUTCSeconds

#### Inherited from

Date.getUTCSeconds

#### Defined in

node_modules/.pnpm/typescript@5.2.2/node_modules/typescript/lib/lib.es5.d.ts:807

___

### setDate

▸ **setDate**(`date`): `number`

Sets the numeric day-of-the-month value of the Date object using local time.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `date` | `number` | A numeric value equal to the day of the month. |

#### Returns

`number`

#### Implementation of

Date.setDate

#### Inherited from

Date.setDate

#### Defined in

node_modules/.pnpm/typescript@5.2.2/node_modules/typescript/lib/lib.es5.d.ts:876

___

### setFullYear

▸ **setFullYear**(`year`, `month?`, `date?`): `number`

Sets the year of the Date object using local time.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `year` | `number` | A numeric value for the year. |
| `month?` | `number` | A zero-based numeric value for the month (0 for January, 11 for December). Must be specified if numDate is specified. |
| `date?` | `number` | A numeric value equal for the day of the month. |

#### Returns

`number`

#### Implementation of

Date.setFullYear

#### Inherited from

Date.setFullYear

#### Defined in

node_modules/.pnpm/typescript@5.2.2/node_modules/typescript/lib/lib.es5.d.ts:900

___

### setHours

▸ **setHours**(`hours`, `min?`, `sec?`, `ms?`): `number`

Sets the hour value in the Date object using local time.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hours` | `number` | A numeric value equal to the hours value. |
| `min?` | `number` | A numeric value equal to the minutes value. |
| `sec?` | `number` | A numeric value equal to the seconds value. |
| `ms?` | `number` | A numeric value equal to the milliseconds value. |

#### Returns

`number`

#### Implementation of

Date.setHours

#### Inherited from

Date.setHours

#### Defined in

node_modules/.pnpm/typescript@5.2.2/node_modules/typescript/lib/lib.es5.d.ts:863

___

### setMilliseconds

▸ **setMilliseconds**(`ms`): `number`

Sets the milliseconds value in the Date object using local time.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ms` | `number` | A numeric value equal to the millisecond value. |

#### Returns

`number`

#### Implementation of

Date.setMilliseconds

#### Inherited from

Date.setMilliseconds

#### Defined in

node_modules/.pnpm/typescript@5.2.2/node_modules/typescript/lib/lib.es5.d.ts:823

___

### setMinutes

▸ **setMinutes**(`min`, `sec?`, `ms?`): `number`

Sets the minutes value in the Date object using local time.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `min` | `number` | A numeric value equal to the minutes value. |
| `sec?` | `number` | A numeric value equal to the seconds value. |
| `ms?` | `number` | A numeric value equal to the milliseconds value. |

#### Returns

`number`

#### Implementation of

Date.setMinutes

#### Inherited from

Date.setMinutes

#### Defined in

node_modules/.pnpm/typescript@5.2.2/node_modules/typescript/lib/lib.es5.d.ts:848

___

### setMonth

▸ **setMonth**(`month`, `date?`): `number`

Sets the month value in the Date object using local time.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `month` | `number` | A numeric value equal to the month. The value for January is 0, and other month values follow consecutively. |
| `date?` | `number` | A numeric value representing the day of the month. If this value is not supplied, the value from a call to the getDate method is used. |

#### Returns

`number`

#### Implementation of

Date.setMonth

#### Inherited from

Date.setMonth

#### Defined in

node_modules/.pnpm/typescript@5.2.2/node_modules/typescript/lib/lib.es5.d.ts:887

___

### setSeconds

▸ **setSeconds**(`sec`, `ms?`): `number`

Sets the seconds value in the Date object using local time.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sec` | `number` | A numeric value equal to the seconds value. |
| `ms?` | `number` | A numeric value equal to the milliseconds value. |

#### Returns

`number`

#### Implementation of

Date.setSeconds

#### Inherited from

Date.setSeconds

#### Defined in

node_modules/.pnpm/typescript@5.2.2/node_modules/typescript/lib/lib.es5.d.ts:835

___

### setTime

▸ **setTime**(`time`): `number`

Sets the date and time value in the Date object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `time` | `number` | A numeric value representing the number of elapsed milliseconds since midnight, January 1, 1970 GMT. |

#### Returns

`number`

#### Implementation of

Date.setTime

#### Inherited from

Date.setTime

#### Defined in

node_modules/.pnpm/typescript@5.2.2/node_modules/typescript/lib/lib.es5.d.ts:818

___

### setUTCDate

▸ **setUTCDate**(`date`): `number`

Sets the numeric day of the month in the Date object using Universal Coordinated Time (UTC).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `date` | `number` | A numeric value equal to the day of the month. |

#### Returns

`number`

#### Implementation of

Date.setUTCDate

#### Inherited from

Date.setUTCDate

#### Defined in

node_modules/.pnpm/typescript@5.2.2/node_modules/typescript/lib/lib.es5.d.ts:881

___

### setUTCFullYear

▸ **setUTCFullYear**(`year`, `month?`, `date?`): `number`

Sets the year value in the Date object using Universal Coordinated Time (UTC).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `year` | `number` | A numeric value equal to the year. |
| `month?` | `number` | A numeric value equal to the month. The value for January is 0, and other month values follow consecutively. Must be supplied if numDate is supplied. |
| `date?` | `number` | A numeric value equal to the day of the month. |

#### Returns

`number`

#### Implementation of

Date.setUTCFullYear

#### Inherited from

Date.setUTCFullYear

#### Defined in

node_modules/.pnpm/typescript@5.2.2/node_modules/typescript/lib/lib.es5.d.ts:907

___

### setUTCHours

▸ **setUTCHours**(`hours`, `min?`, `sec?`, `ms?`): `number`

Sets the hours value in the Date object using Universal Coordinated Time (UTC).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hours` | `number` | A numeric value equal to the hours value. |
| `min?` | `number` | A numeric value equal to the minutes value. |
| `sec?` | `number` | A numeric value equal to the seconds value. |
| `ms?` | `number` | A numeric value equal to the milliseconds value. |

#### Returns

`number`

#### Implementation of

Date.setUTCHours

#### Inherited from

Date.setUTCHours

#### Defined in

node_modules/.pnpm/typescript@5.2.2/node_modules/typescript/lib/lib.es5.d.ts:871

___

### setUTCMilliseconds

▸ **setUTCMilliseconds**(`ms`): `number`

Sets the milliseconds value in the Date object using Universal Coordinated Time (UTC).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ms` | `number` | A numeric value equal to the millisecond value. |

#### Returns

`number`

#### Implementation of

Date.setUTCMilliseconds

#### Inherited from

Date.setUTCMilliseconds

#### Defined in

node_modules/.pnpm/typescript@5.2.2/node_modules/typescript/lib/lib.es5.d.ts:828

___

### setUTCMinutes

▸ **setUTCMinutes**(`min`, `sec?`, `ms?`): `number`

Sets the minutes value in the Date object using Universal Coordinated Time (UTC).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `min` | `number` | A numeric value equal to the minutes value. |
| `sec?` | `number` | A numeric value equal to the seconds value. |
| `ms?` | `number` | A numeric value equal to the milliseconds value. |

#### Returns

`number`

#### Implementation of

Date.setUTCMinutes

#### Inherited from

Date.setUTCMinutes

#### Defined in

node_modules/.pnpm/typescript@5.2.2/node_modules/typescript/lib/lib.es5.d.ts:855

___

### setUTCMonth

▸ **setUTCMonth**(`month`, `date?`): `number`

Sets the month value in the Date object using Universal Coordinated Time (UTC).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `month` | `number` | A numeric value equal to the month. The value for January is 0, and other month values follow consecutively. |
| `date?` | `number` | A numeric value representing the day of the month. If it is not supplied, the value from a call to the getUTCDate method is used. |

#### Returns

`number`

#### Implementation of

Date.setUTCMonth

#### Inherited from

Date.setUTCMonth

#### Defined in

node_modules/.pnpm/typescript@5.2.2/node_modules/typescript/lib/lib.es5.d.ts:893

___

### setUTCSeconds

▸ **setUTCSeconds**(`sec`, `ms?`): `number`

Sets the seconds value in the Date object using Universal Coordinated Time (UTC).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sec` | `number` | A numeric value equal to the seconds value. |
| `ms?` | `number` | A numeric value equal to the milliseconds value. |

#### Returns

`number`

#### Implementation of

Date.setUTCSeconds

#### Inherited from

Date.setUTCSeconds

#### Defined in

node_modules/.pnpm/typescript@5.2.2/node_modules/typescript/lib/lib.es5.d.ts:841

___

### toDateString

▸ **toDateString**(): `string`

Returns a date as a string value.

#### Returns

`string`

#### Implementation of

Date.toDateString

#### Inherited from

Date.toDateString

#### Defined in

node_modules/.pnpm/typescript@5.2.2/node_modules/typescript/lib/lib.es5.d.ts:767

___

### toISOString

▸ **toISOString**(): `string`

Returns a date as a string value in ISO format.

#### Returns

`string`

#### Implementation of

Date.toISOString

#### Inherited from

Date.toISOString

#### Defined in

node_modules/.pnpm/typescript@5.2.2/node_modules/typescript/lib/lib.es5.d.ts:911

___

### toJSON

▸ **toJSON**(`key?`): `string`

Used by the JSON.stringify method to enable the transformation of an object's data for JavaScript Object Notation (JSON) serialization.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key?` | `any` |

#### Returns

`string`

#### Implementation of

Date.toJSON

#### Inherited from

Date.toJSON

#### Defined in

node_modules/.pnpm/typescript@5.2.2/node_modules/typescript/lib/lib.es5.d.ts:913

___

### toLocaleDateString

▸ **toLocaleDateString**(): `string`

Returns a date as a string value appropriate to the host environment's current locale.

#### Returns

`string`

#### Implementation of

Date.toLocaleDateString

#### Inherited from

Date.toLocaleDateString

#### Defined in

node_modules/.pnpm/typescript@5.2.2/node_modules/typescript/lib/lib.es5.d.ts:773

▸ **toLocaleDateString**(`locales?`, `options?`): `string`

Converts a date to a string by using the current or specified locale.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `locales?` | `string` \| `string`[] | A locale string or array of locale strings that contain one or more language or locale tags. If you include more than one locale string, list them in descending order of priority so that the first entry is the preferred locale. If you omit this parameter, the default locale of the JavaScript runtime is used. |
| `options?` | `DateTimeFormatOptions` | An object that contains one or more properties that specify comparison options. |

#### Returns

`string`

#### Implementation of

Date.toLocaleDateString

#### Inherited from

Date.toLocaleDateString

#### Defined in

node_modules/.pnpm/typescript@5.2.2/node_modules/typescript/lib/lib.es5.d.ts:4546

▸ **toLocaleDateString**(`locales?`, `options?`): `string`

Converts a date to a string by using the current or specified locale.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `locales?` | `LocalesArgument` | A locale string, array of locale strings, Intl.Locale object, or array of Intl.Locale objects that contain one or more language or locale tags. If you include more than one locale string, list them in descending order of priority so that the first entry is the preferred locale. If you omit this parameter, the default locale of the JavaScript runtime is used. |
| `options?` | `DateTimeFormatOptions` | An object that contains one or more properties that specify comparison options. |

#### Returns

`string`

#### Implementation of

Date.toLocaleDateString

#### Inherited from

Date.toLocaleDateString

#### Defined in

node_modules/.pnpm/typescript@5.2.2/node_modules/typescript/lib/lib.es2020.date.d.ts:34

___

### toLocaleString

▸ **toLocaleString**(): `string`

Returns a value as a string value appropriate to the host environment's current locale.

#### Returns

`string`

#### Implementation of

Date.toLocaleString

#### Inherited from

Date.toLocaleString

#### Defined in

node_modules/.pnpm/typescript@5.2.2/node_modules/typescript/lib/lib.es5.d.ts:771

▸ **toLocaleString**(`locales?`, `options?`): `string`

Converts a date and time to a string by using the current or specified locale.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `locales?` | `string` \| `string`[] | A locale string or array of locale strings that contain one or more language or locale tags. If you include more than one locale string, list them in descending order of priority so that the first entry is the preferred locale. If you omit this parameter, the default locale of the JavaScript runtime is used. |
| `options?` | `DateTimeFormatOptions` | An object that contains one or more properties that specify comparison options. |

#### Returns

`string`

#### Implementation of

Date.toLocaleString

#### Inherited from

Date.toLocaleString

#### Defined in

node_modules/.pnpm/typescript@5.2.2/node_modules/typescript/lib/lib.es5.d.ts:4540

▸ **toLocaleString**(`locales?`, `options?`): `string`

Converts a date and time to a string by using the current or specified locale.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `locales?` | `LocalesArgument` | A locale string, array of locale strings, Intl.Locale object, or array of Intl.Locale objects that contain one or more language or locale tags. If you include more than one locale string, list them in descending order of priority so that the first entry is the preferred locale. If you omit this parameter, the default locale of the JavaScript runtime is used. |
| `options?` | `DateTimeFormatOptions` | An object that contains one or more properties that specify comparison options. |

#### Returns

`string`

#### Implementation of

Date.toLocaleString

#### Inherited from

Date.toLocaleString

#### Defined in

node_modules/.pnpm/typescript@5.2.2/node_modules/typescript/lib/lib.es2020.date.d.ts:27

___

### toLocaleTimeString

▸ **toLocaleTimeString**(): `string`

Returns a time as a string value appropriate to the host environment's current locale.

#### Returns

`string`

#### Implementation of

Date.toLocaleTimeString

#### Inherited from

Date.toLocaleTimeString

#### Defined in

node_modules/.pnpm/typescript@5.2.2/node_modules/typescript/lib/lib.es5.d.ts:775

▸ **toLocaleTimeString**(`locales?`, `options?`): `string`

Converts a time to a string by using the current or specified locale.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `locales?` | `string` \| `string`[] | A locale string or array of locale strings that contain one or more language or locale tags. If you include more than one locale string, list them in descending order of priority so that the first entry is the preferred locale. If you omit this parameter, the default locale of the JavaScript runtime is used. |
| `options?` | `DateTimeFormatOptions` | An object that contains one or more properties that specify comparison options. |

#### Returns

`string`

#### Implementation of

Date.toLocaleTimeString

#### Inherited from

Date.toLocaleTimeString

#### Defined in

node_modules/.pnpm/typescript@5.2.2/node_modules/typescript/lib/lib.es5.d.ts:4553

▸ **toLocaleTimeString**(`locales?`, `options?`): `string`

Converts a time to a string by using the current or specified locale.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `locales?` | `LocalesArgument` | A locale string, array of locale strings, Intl.Locale object, or array of Intl.Locale objects that contain one or more language or locale tags. If you include more than one locale string, list them in descending order of priority so that the first entry is the preferred locale. If you omit this parameter, the default locale of the JavaScript runtime is used. |
| `options?` | `DateTimeFormatOptions` | An object that contains one or more properties that specify comparison options. |

#### Returns

`string`

#### Implementation of

Date.toLocaleTimeString

#### Inherited from

Date.toLocaleTimeString

#### Defined in

node_modules/.pnpm/typescript@5.2.2/node_modules/typescript/lib/lib.es2020.date.d.ts:41

___

### toString

▸ **toString**(): `string`

Returns a string representation of a date. The format of the string depends on the locale.

#### Returns

`string`

#### Implementation of

Date.toString

#### Inherited from

Date.toString

#### Defined in

node_modules/.pnpm/typescript@5.2.2/node_modules/typescript/lib/lib.es5.d.ts:765

___

### toTai64

▸ **toTai64**(): `string`

Returns the Tai64 timestamp.

#### Returns

`string`

the Tai64 timestamp

#### Defined in

[packages/utils/src/utils/date-time.ts:139](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/utils/src/utils/date-time.ts#L139)

___

### toTimeString

▸ **toTimeString**(): `string`

Returns a time as a string value.

#### Returns

`string`

#### Implementation of

Date.toTimeString

#### Inherited from

Date.toTimeString

#### Defined in

node_modules/.pnpm/typescript@5.2.2/node_modules/typescript/lib/lib.es5.d.ts:769

___

### toUTCString

▸ **toUTCString**(): `string`

Returns a date converted to a string using Universal Coordinated Time (UTC).

#### Returns

`string`

#### Implementation of

Date.toUTCString

#### Inherited from

Date.toUTCString

#### Defined in

node_modules/.pnpm/typescript@5.2.2/node_modules/typescript/lib/lib.es5.d.ts:909

___

### toUnixMilliseconds

▸ **toUnixMilliseconds**(): `number`

#### Returns

`number`

the unix milliseconds timestamp

#### Defined in

[packages/utils/src/utils/date-time.ts:146](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/utils/src/utils/date-time.ts#L146)

___

### toUnixSeconds

▸ **toUnixSeconds**(): `number`

#### Returns

`number`

the unix seconds timestamp

#### Defined in

[packages/utils/src/utils/date-time.ts:153](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/utils/src/utils/date-time.ts#L153)

___

### valueOf

▸ **valueOf**(): `number`

Returns the stored time value in milliseconds since midnight, January 1, 1970 UTC.

#### Returns

`number`

#### Implementation of

Date.valueOf

#### Inherited from

Date.valueOf

#### Defined in

node_modules/.pnpm/typescript@5.2.2/node_modules/typescript/lib/lib.es5.d.ts:777

___

### UTC

▸ **UTC**(`year`, `monthIndex`, `date?`, `hours?`, `minutes?`, `seconds?`, `ms?`): `number`

Returns the number of milliseconds between midnight, January 1, 1970 Universal Coordinated Time (UTC) (or GMT) and the specified date.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `year` | `number` | The full year designation is required for cross-century date accuracy. If year is between 0 and 99 is used, then year is assumed to be 1900 + year. |
| `monthIndex` | `number` | The month as a number between 0 and 11 (January to December). |
| `date?` | `number` | The date as a number between 1 and 31. |
| `hours?` | `number` | Must be supplied if minutes is supplied. A number from 0 to 23 (midnight to 11pm) that specifies the hour. |
| `minutes?` | `number` | Must be supplied if seconds is supplied. A number from 0 to 59 that specifies the minutes. |
| `seconds?` | `number` | Must be supplied if milliseconds is supplied. A number from 0 to 59 that specifies the seconds. |
| `ms?` | `number` | A number from 0 to 999 that specifies the milliseconds. |

#### Returns

`number`

#### Inherited from

Date.UTC

#### Defined in

node_modules/.pnpm/typescript@5.2.2/node_modules/typescript/lib/lib.es5.d.ts:947

▸ **UTC**(`year`, `monthIndex?`, `date?`, `hours?`, `minutes?`, `seconds?`, `ms?`): `number`

Returns the number of milliseconds between midnight, January 1, 1970 Universal Coordinated Time (UTC) (or GMT) and the specified date.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `year` | `number` | The full year designation is required for cross-century date accuracy. If year is between 0 and 99 is used, then year is assumed to be 1900 + year. |
| `monthIndex?` | `number` | The month as a number between 0 and 11 (January to December). |
| `date?` | `number` | The date as a number between 1 and 31. |
| `hours?` | `number` | Must be supplied if minutes is supplied. A number from 0 to 23 (midnight to 11pm) that specifies the hour. |
| `minutes?` | `number` | Must be supplied if seconds is supplied. A number from 0 to 59 that specifies the minutes. |
| `seconds?` | `number` | Must be supplied if milliseconds is supplied. A number from 0 to 59 that specifies the seconds. |
| `ms?` | `number` | A number from 0 to 999 that specifies the milliseconds. |

#### Returns

`number`

#### Inherited from

Date.UTC

#### Defined in

node_modules/.pnpm/typescript@5.2.2/node_modules/typescript/lib/lib.es2017.date.d.ts:30

___

### fromTai64

▸ **fromTai64**(`tai64`): [`DateTime`](/api/Utils/DateTime.md)

Generates a new DateTime instance from a Tai64 timestamp.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tai64` | `string` | Tai64 timestamp |

#### Returns

[`DateTime`](/api/Utils/DateTime.md)

a new DateTime instance

#### Defined in

[packages/utils/src/utils/date-time.ts:107](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/utils/src/utils/date-time.ts#L107)

___

### fromUnixMilliseconds

▸ **fromUnixMilliseconds**(`unixMilliseconds`): [`DateTime`](/api/Utils/DateTime.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `unixMilliseconds` | `number` | unix milliseconds timestamp |

#### Returns

[`DateTime`](/api/Utils/DateTime.md)

a new DateTime instance

#### Defined in

[packages/utils/src/utils/date-time.ts:115](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/utils/src/utils/date-time.ts#L115)

___

### fromUnixSeconds

▸ **fromUnixSeconds**(`unixSeconds`): [`DateTime`](/api/Utils/DateTime.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `unixSeconds` | `number` | unix seconds timestamp |

#### Returns

[`DateTime`](/api/Utils/DateTime.md)

a new DateTime instance

#### Defined in

[packages/utils/src/utils/date-time.ts:123](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/utils/src/utils/date-time.ts#L123)

___

### now

▸ **now**(): `number`

Returns the number of milliseconds elapsed since midnight, January 1, 1970 Universal Coordinated Time (UTC).

#### Returns

`number`

#### Inherited from

Date.now

#### Defined in

node_modules/.pnpm/typescript@5.2.2/node_modules/typescript/lib/lib.es5.d.ts:949

___

### parse

▸ **parse**(`s`): `number`

Parses a string containing a date, and returns the number of milliseconds between that date and midnight, January 1, 1970.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `s` | `string` | A date string |

#### Returns

`number`

#### Inherited from

Date.parse

#### Defined in

node_modules/.pnpm/typescript@5.2.2/node_modules/typescript/lib/lib.es5.d.ts:936
