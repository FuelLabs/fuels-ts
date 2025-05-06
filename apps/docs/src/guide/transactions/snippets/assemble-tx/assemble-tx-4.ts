import { Provider, Wallet } from 'fuels';
import { TestAssetId } from 'fuels/test-utils';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { CounterFactory, ScriptTransferToContract } from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const account = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const contractDeploy = await new CounterFactory(account).deploy();
const { contract } = await contractDeploy.waitForResult();
const contractId = contract.id.toB256();

// #region assemble-tx-4
const transferAmountA = 400;
const transferAmountB = 600;

const script = new ScriptTransferToContract(account);

const { waitForResult } = await script.functions
  .main(
    contractId,
    { bits: TestAssetId.A.value },
    transferAmountA,
    { bits: TestAssetId.B.value },
    transferAmountB
  )
  .assembleTx({
    feePayerAccount: account,
    accountCoinQuantities: [
      {
        amount: transferAmountA,
        assetId: TestAssetId.A.value,
        account,
        changeOutputAccount: account,
      },
      {
        amount: transferAmountB,
        assetId: TestAssetId.B.value,
        account,
        changeOutputAccount: account,
      },
    ],
  })
  .call();

const {
  transactionResult: { isStatusSuccess },
} = await waitForResult();
// #endregion assemble-tx-4

console.log('isStatusSuccess', isStatusSuccess);
