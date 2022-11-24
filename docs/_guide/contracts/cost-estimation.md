# Estimating contract call cost

With the function `getTransactionCost` provided by the `provider`, you can get a cost estimation for a specific call. The return type, `TransactionCost`, is an object that contains relevant information for the estimation:

```typescript
type TransactionCost = {
  minGasPrice: BN;
  gasPrice: BN;
  gasUsed: BN;
  fee: BN;
};
```

Below are examples that show how to get the estimated transaction cost from single and multi call transactions.

[@code:typescript](./packages/fuel-gauge/src/contract.test.ts#typedoc:Contract-cost)

The transaction cost estimation can be used to set the gas limit for an actual call, or to show the user the estimated cost.
