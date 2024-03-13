# Debugging Revert Errors

Unfortunately, the SDK does not support debugging revert errors with string messages - at least temporarily. This is because the SDK does not support decoding of Sway `str` slices in the `v0` Sway encoding scheme. This problem will be fixed soon once the `v1` Sway encoding scheme is adopted.

But for now, if your Sway contract has a revert error with a string message like this:

<<< @/../../docs-snippets/test/fixtures/forc-projects/revert-errors/src/main.sw#revert-errors-1{rust:line-numbers}

The SDK will throw an error that says:

<<< @/../../docs-snippets/src/guide/errors/debugging-revert-errors.test.ts#revert-errors-5{ts:line-numbers}

It will not log out the message associated with the revert error. This can make debugging functions with multiple require statements difficult.

## Temporary Workaround

You can work around this by using custom enums to represent the error messages. For example, you can create an enum like this:

<<< @/../../docs-snippets/test/fixtures/forc-projects/revert-errors/src/main.sw#revert-errors-2{rust:line-numbers}

Then, you can use the enum in your contract like this:

<<< @/../../docs-snippets/test/fixtures/forc-projects/revert-errors/src/main.sw#revert-errors-3{rust:line-numbers}

The SDK will log out the message associated with the revert error like so:

<<< @/../../docs-snippets/src/guide/errors/debugging-revert-errors.test.ts#revert-errors-4{ts:line-numbers}
