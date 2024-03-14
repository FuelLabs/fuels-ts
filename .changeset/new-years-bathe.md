---
"create-fuels": minor
---

The `create-fuels` template app now provides a local faucet and uses a local burner wallet to execute transactions.

Previously, the app was using a hardcoded key to sign all transactions. This key is now being used as the key for the faucet, and the burner wallet is being used to execute transactions.

For convenience, the burner wallet is persisted in local storage so that it can be used across multiple sessions.

The burner wallet is also topped up with 10,000 coins on first load.

This is an important step towards adding support for the Fuel Wallet SDK, which will allow users to sign transactions using their own wallets.
