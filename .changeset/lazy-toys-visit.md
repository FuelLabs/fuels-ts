---
"@fuel-ts/program": patch
---

feat: log out custom require messages for error enums when tx reverts

The SDK does not unfortunately support decoding str slices in the v0 Sway encoding scheme and hence does not log out the message associated with a require revert error if the message is just a string.

To work around this, you can use custom enums to represent the error messages for now. This PR adds logging of the message associated with a require revert error if the message is an enum.
