import { Provider, Wallet } from 'fuels';
import { TestAssetId } from 'fuels/test-utils';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { CounterFactory, ScriptTransferToContract } from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const account = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const { waitForResult } = await new CounterFactory(account).deploy();
const { contract } = await waitForResult();
const contractId = contract.id.toB256();

// #region get-cost-and-fund-contract-call-new
const transferAmountA = 400;
const transferAmountB = 600;

const script = new ScriptTransferToContract(account);

const request = await script.functions
  .main(
    contractId,
    { bits: TestAssetId.A.value },
    transferAmountA,
    { bits: TestAssetId.B.value },
    transferAmountB
  )
  .getTransactionRequest();

const { assembledRequest } = await provider.assembleTx({
  request,
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
});

const tx = await account.sendTransaction(assembledRequest);
const { isStatusSuccess } = await tx.waitForResult();
// #endregion get-cost-and-fund-contract-call-new

console.log('isStatusSuccess', isStatusSuccess);
