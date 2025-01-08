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

// 4. Get the transaction resources
const quantities = [
  coinQuantityfy([1000, ASSET_A]),
  coinQuantityfy([500, ASSET_B]),
];

// 5. Estimate and fund the transaction
await request.autoCost(wallet, { quantities });

// 6. Send the transaction
const tx = await wallet.sendTransaction(request);
await tx.waitForResult();

const contractFinalBalanceAssetA = await contract.getBalance(ASSET_A);
const contractFinalBalanceAssetB = await contract.getBalance(ASSET_B);
// #endregion custom-transactions-2

// #endregion full
