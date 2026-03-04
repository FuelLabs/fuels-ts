/* eslint-disable @typescript-eslint/no-unused-vars */
// #region full
import { BN, ScriptTransactionRequest, coinQuantityfy } from 'fuels';
import { ASSET_A, ASSET_B, launchTestNode } from 'fuels/test-utils';

import { EchoValuesFactory } from '../../../typegend/contracts/EchoValuesFactory';
import { ScriptTransferToContract } from '../../../typegend/scripts/ScriptTransferToContract';

using launched = await launchTestNode({
  contractsConfigs: [{ factory: EchoValuesFactory }],
});
const {
  contracts: [contract],
  wallets: [wallet],
  provider,
} = launched;

const defaultTxParams = {
  gasLimit: 10000,
};

// #region custom-transactions-2

// 1. Create a script transaction using the script binary
const request = new ScriptTransactionRequest({
  ...defaultTxParams,
  gasLimit: 3_000_000,
  script: ScriptTransferToContract.bytecode,
});

// 2. Instantiate the script main arguments
const scriptArguments = [
  contract.id.toB256(),
  { bits: ASSET_A },
  new BN(1000),
  { bits: ASSET_B },
  new BN(500),
];

// 3. Populate the script data and add the contract input and output
request
  .setData(ScriptTransferToContract.abi, scriptArguments)
  .addContractInputAndOutput(contract.id);

// 4. Estimate and fund the transaction
const { assembledRequest } = await provider.assembleTx({
  request,
  feePayerAccount: wallet,
  accountCoinQuantities: [
    {
      amount: 1000,
      assetId: ASSET_A,
      account: wallet,
      changeOutputAccount: wallet,
    },
    {
      amount: 500,
      assetId: ASSET_B,
      account: wallet,
      changeOutputAccount: wallet,
    },
  ],
});

// 5. Send the transaction
const tx = await wallet.sendTransaction(assembledRequest);
await tx.waitForResult();

const contractFinalBalanceAssetA = await contract.getBalance(ASSET_A);
const contractFinalBalanceAssetB = await contract.getBalance(ASSET_B);
// #endregion custom-transactions-2

// #endregion full
