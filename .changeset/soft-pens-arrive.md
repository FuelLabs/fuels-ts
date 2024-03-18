---
"create-fuels": minor
---

feat: add wallet connections via the wallet SDK to the create-fuels template

Users can now connect browser wallets like the Fuel Wallet and Fuelet to the create-fuels template. Under the hood, the template uses the [Fuel Wallet SDK's React Hooks](https://wallet.fuel.network/docs/dev/hooks-reference/).

Having a browser wallet installed is not required to use the template, as it falls back to a local burner wallet if no browser wallet is connected.
