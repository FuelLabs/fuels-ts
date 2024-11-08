# Transaction Dependency Estimation

In [variable outputs](./variable-outputs.md), we mention that a contract call might require you to manually specify external contracts or variable outputs.

However, by default the SDK always automatically estimates these dependencies and double-checks if everything is in order whenever you invoke a contract function or attempt to send a transaction.

The SDK uses the [Provider.estimateTxDependencies](../../api/Account/Provider.md#estimatetxdependencies) method to set any missing dependencies identified during the estimation process. This requires simulating the transaction a few times in the background.

While relying on the SDK's automatic estimation is a decent default behavior, we recommend manually specifying the dependencies if they are known in advance to avoid the performance impact of the estimation process.
