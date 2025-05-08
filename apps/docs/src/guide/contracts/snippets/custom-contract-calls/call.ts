import { Provider, Wallet } from 'fuels';
import { TestAssetId } from 'fuels/test-utils';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import {
  LiquidityPool,
  LiquidityPoolFactory,
  ReturnTruePredicate,
} from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const predicate = new ReturnTruePredicate({ provider });

const configurableConstants = {
  TOKEN: { bits: TestAssetId.A.value },
};

const deploy = await LiquidityPoolFactory.deploy(wallet, {
  configurableConstants,
});

const { contract } = await deploy.waitForResult();
const contractId = contract.id.toB256();

const res = await wallet.transfer(predicate.address, 500_000);
await res.waitForResult();

// #region custom-contract-call-1
// Create a new contract instance using the contract id
const liquidityPoolContract = new LiquidityPool(contractId, wallet);

// Create invocation scope to call the deposit function
const scope = liquidityPoolContract.functions
  .deposit({ bits: wallet.address.toB256() })
  .callParams({
    forward: [1000, TestAssetId.A.value],
  });

// Get the transaction request
const request = await scope.getTransactionRequest();

/**
 * Using "assembleTx" to estimate and fund the transaction. The estimated and funded values
 * are going to be persisted in the transaction request object inside the scope instance
 */
await provider.assembleTx({
  request,
  feePayerAccount: predicate, // Using predicate as fee payer
  accountCoinQuantities: [
    {
      amount: 1000,
      assetId: TestAssetId.A.value,
      account: wallet,
      changeOutputAccount: wallet,
    },
  ],
});

// Use the "call" method to submit the transaction, skipping the "assembleTx" step
const response = await scope.call({ skipAssembleTx: true });

const {
  transactionResult: { isStatusSuccess },
} = await response.waitForResult();

// #endregion custom-contract-call-1
console.log('isStatusSuccess', isStatusSuccess);
