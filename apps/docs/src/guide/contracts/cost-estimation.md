# Estimating contract call cost

The `getTransactionCost` function provided by the `provider` allows you to estimate the cost of a specific contract call. The return type, `TransactionCost`, is an object containing relevant information for the estimation:

<<< @/../../../packages/providers/src/provider.ts#transaction-cost{ts:line-numbers}

The following example demonstrate how to get the estimated transaction cost for:

1. Single contract call transaction:

<<< @/../../docs-snippets/src/guide/contracts/cost-estimation.test.ts#cost-estimation-1{ts:line-numbers}

2.  Multi contracts calls transaction:

<<< @/../../docs-snippets/src/guide/contracts/cost-estimation.test.ts#cost-estimation-2{ts:line-numbers}

You can use the transaction cost estimation to set the gas limit for an actual call or display the estimated cost to the user.
