# Date Time

To allow for easier manipulation of date and time, the SDK defines the `DateTime` class, which is a wrapper around the `Date` class ([reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)).

## Creating a DateTime Instance

We have listed below, all the methods for instantiating a `DateTime` object:

<<< @/../../docs-snippets/src/guide/types/date-time.test.ts#instantiation-methods{ts:line-numbers}

## Utility Functions

The `DateTime` class extends all the methods from the `Date` class, and also provides some practical utility functions:

<<< @/../../docs-snippets/src/guide/types/date-time.test.ts#utility-functions{ts:line-numbers}
