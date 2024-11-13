# Date conversion

To allow for easier manipulation of date and time, the SDK exports the `DateTime` class which is a wrapper around the [built-in](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) `Date` class. Below we will go over the methods of instantiation, utility functions and time formats.

Internally the transactions and other time/date assets are encoded using the [`TAI64`](#tai-format) format. We return a `DateTime` class, to allow of easier conversion and formatting between the two formats.

## Instantiating a `DateTime`

We have a host of static method for **instantiation** of our `DateTime` class.

<<< @/../../docs/src/snippets/utilities/date-conversion/instantiation.ts#create-from-multiple-sources{ts:line-numbers}

### TAI64

`fromTai64` is a _static_ method, that allows the creation of `DateTime` class from a `TAI64` string.

`toTai64` is an _instance_ method, that allows the conversion of a `DateTime` class to a `TAI64` string.

<<< @/../../docs/src/snippets/utilities/date-conversion/tai64.ts#from-tai-64-and-to-tai-64{ts:line-numbers}

### UNIX

`fromUnixMilliseconds` is a _static_ method, that allows the creation of `DateTime` class from a UNIX Milliseconds number.

`toUnixMilliseconds` is an _instance_ method, that allows the conversion of a `DateTime` class to a `UNIX` number in milliseconds.

<<< @/../../docs/src/snippets/utilities/date-conversion/unix-milliseconds.ts#from-unix-milliseconds-and-to-unix-milliseconds{ts:line-numbers}

`fromUnixSeconds` is a _static_ method, that allows the creation of `DateTime` class from a UNIX Seconds number.

`toUnixSeconds` is an _instance_ method, that allows the conversion of a `DateTime` class to a `UNIX` number in seconds.

<<< @/../../docs/src/snippets/utilities/date-conversion/unix-seconds.ts#from-unix-seconds-and-to-unix-seconds{ts:line-numbers}

### Date

The `DateTime` class extends the functionality of the `Date` object, so all method are available for your usages.

<<< @/../../docs/src/snippets/utilities/date-conversion/date-object.ts#date-object-methods{ts:line-numbers}

## Formats

Here we will go over the different date/time formats that we use in the SDK. Internally the blockchain uses the `TAI64` format, but we also support the `UNIX` format for ease of use.

### UNIX Format

UNIX time is the number of seconds that have elapsed since **00:00:00 Coordinated Universal Time (UTC), Thursday, 1 January 1970**, minus leap seconds. Every day is treated as if it contains exactly 86400 seconds, so leap seconds are ignored.

### TAI Format

TAI stands for _Temps Atomique International_ and is the current international real-time standard [Source](https://cr.yp.to/libtai/tai64.html).

We use `TAI64` is a 64-bit integer representing the number of nanoseconds since the epoch.

- the TAI second beginning exactly _(2^62 - s) seconds_ before the beginning of 1970 TAI, if s is between 0 inclusive and 2^62 exclusive; or

- the TAI second beginning exactly _(2^62 + s) seconds_ after the beginning of 1970 TAI, if s is between -2^62 inclusive and 0 exclusive.

[Source](https://cr.yp.to/libtai/tai64.html)
