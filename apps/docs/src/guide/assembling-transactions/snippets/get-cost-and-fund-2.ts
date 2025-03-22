import { bn, Provider, Wallet } from 'fuels';
import { TestAssetId } from 'fuels/test-utils';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../env';
import { CounterFactory, ScriptTransferToContract } from '../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const account = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const { waitForResult } = await new CounterFactory(account).deploy();
const { contract } = await waitForResult();
const contractId = contract.id.toB256();

// #region get-cost-and-fund-2
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
  .addContracts([contract])
  .getTransactionRequest();

const txCost = await account.getTransactionCost(request, {
  quantities: [
    {
      amount: bn(transferAmountA),
      assetId: TestAssetId.A.value,
    },
    {
      amount: bn(transferAmountB),
      assetId: TestAssetId.B.value,
    },
  ],
});

request.maxFee = txCost.maxFee;
request.gasLimit = txCost.gasUsed;

await account.fund(request, txCost);

const tx = await account.sendTransaction(request);
const { isStatusSuccess } = await tx.waitForResult();
// #endregion get-cost-and-fund-2

console.log('isStatusSuccess', isStatusSuccess);
