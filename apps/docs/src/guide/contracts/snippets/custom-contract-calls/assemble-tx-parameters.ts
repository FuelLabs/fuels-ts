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

// #region assemble-tx-parameters-1
// Create a new contract instance using the contract id
const liquidityPoolContract = new LiquidityPool(contractId, wallet);

// Execute the contract call manually specifying the assembleTx parameters
const { waitForResult } = await liquidityPoolContract.functions
  .deposit({ bits: wallet.address.toB256() })
  .callParams({
    forward: [1000, TestAssetId.A.value],
  })
  .assembleTxParams({
    feePayerAccount: predicate, // Using predicate as fee payer
    accountCoinQuantities: [
      {
        amount: 1000,
        assetId: TestAssetId.A.value,
        account: wallet,
        changeOutputAccount: wallet,
      },
    ],
  })
  .call();

const {
  transactionResult: { isStatusSuccess },
} = await waitForResult();

// #endregion assemble-tx-parameters-1
console.log('isStatusSuccess', isStatusSuccess);
